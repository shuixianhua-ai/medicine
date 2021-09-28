import React, {Component} from 'react';
import { Breadcrumb, Divider, Button, Input, Layout,Table,   Form, Modal} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TopBar from "../Component/TopBar";
import '../assets/css/Post.css'
import '../assets/css/MainPage.css'
const {Header, Content} = Layout

var storage=window.localStorage;
const { TextArea } = Input;
const defaultUrl = 'http://39.174.132.98:5003';

// 定义了首行列标题
const columns = [
	{
	  title: '标题',
	  dataIndex: 'title',
	  key: 'title',
	  width: '40%',
	//   render: text => <Link to={{pathname:"/study/post/"}}>{text}</Link>,
	  render: (text, record) => {
		//   console.log(text);
		//   console.log(record.post_id);
		  return (
			<Link to={{pathname:"/post/"+record.post_id}}>{text}</Link>
		  );
	  }
	},
	{
		title: '帖主',
		dataIndex: 'user_id',
		key: 'user_id',
		width: '30%',
		render : text => text,
	},
	{
		title: '时间',
		dataIndex: 'time',
		key: 'time',
		width: '30%',
		render: text => text,
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a<b? 1:-1,
		sortDirections: ['ascend'],
	},
  ];

/**
 * 论坛首页
 */

var storage = window.localStorage

class BBS extends Component {
	constructor(props) {
        super(props);
        this.state = {
			postList:[],
			islogin:false,
			canPost:false
        };
    }


	jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
	};


	componentDidMount(){
        axios.defaults.baseURL = defaultUrl;
        axios.get('/posts').then(
            res=>{
                this.setState({
                    postList:res.data.data,
                });
            }
		);
        if(storage['token']!==undefined){
        	var params = {
        		user: storage['user']
			}
			axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/CanPost',
                params
            }).then(res=>{
            	if(res.data.data===1){
            		this.setState({
						canPost:true
					})
				}
            	else{
            		this.setState({
						canPost:false
					})
				}
			})
		}
        if(storage['token']===undefined){
            this.setState({
                islogin:false
            })
        }
        else{
            axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/islogin',
                headers:{
                    'Token':storage['token']
                }
            }).then(res=>{
                if(res.data.code!==0){
                    console.log('true')
                    this.setState({
                        islogin:false
                    })
                }
                else{
                    console.log('false')
                    this.setState({
                        islogin:true
                    })
                }
            })
        }

	}

	// 发表帖子
	onFinish = (values) => {
		var params = {
			title: values.newtitle,
			user_id: storage['user'],
			content: values.newpost
		}
		console.log(params)

		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/posts',
			params
		}).then(res=>{
			console.log(res.data.code)
			if(res.data.code===0){
				Modal.success({
		  		content: '发表帖子成功！',
		  		onOk: ()=>{
		  			window.location.href = window.location.href
				}
				});
			}
			else{
				Modal.error({
				content: '发表帖子失败！',
				onOk: ()=>window.location.href = window.location.href
			});
			}
		});

	};


	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	render() {
		return(
			<Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
				<Content className='mycontent'>
					<div className = "post-back-ground">
				{/* <TopBar/> */}
				<div style = {{marginLeft: 200,  marginRight:200}}>
					<h1 className='PostBig'>交流论坛</h1>


					<Divider />
					{
						
							<Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发帖</Button>
					
					}
					{/* <Search placeholder="搜索帖子内容" style={{marginLeft: 10, width:"30%"}} onSearch={this.onSearch} enterButton /> */}

					{/* 帖子列表 */}
					<Content style = {{marginTop: 20, backgroundColor: '#ffffff'}}>
						<Table columns={columns} dataSource={this.state.postList} />
					</Content>

					<br/>
					{
						
							<div style={{backgroundColor:'#ffffff'}}>
								<div style={{marginLeft:20, marginRight:20}}>
									<br/>
									<p>发表新帖</p>
									{/* <Upload {...props}>
										<Button style={{marginBottom: 20}} icon={<UploadOutlined />}>上传附件</Button>
									</Upload> */}

									<Form
										onFinish={this.onFinish}
										onFinishFailed={this.onFinishFailed}
									>
										<Form.Item
											label="帖子标题"
											name="newtitle"
											rules={[{ required: true, message: '请输入帖子标题!' }]}
										>
											<Input />
										</Form.Item>

										<Form.Item
											label="帖子内容"
											name="newpost"
											rules={[{ required: true, message: '请输入帖子内容!' }]}
										>
											<TextArea style={{marginTop: 10}} showCount maxLength={500} />
										</Form.Item>
										<Form.Item>
											<Button type="primary" htmlType="submit" >
											发表
											</Button>
										</Form.Item>
									</Form>
								</div>
								<br/>
							</div>
						
					}
					{/* 发帖 */}

					<br/>

				</div>
			</div>
				</Content>
			</Layout>
		)
	}
}

export default BBS;

