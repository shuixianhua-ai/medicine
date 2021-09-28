import React, {Component} from 'react';
import {  Breadcrumb, PageHeader, Button, Descriptions, Comment, Input, Form, Row, Modal,Layout} from 'antd';
import  '../assets/css/Post.css'
import '../assets/css/MainPage.css'
import { List, Divider } from 'antd';
import qiushi from "../assets/picture/qiushi.png"
import axios from 'axios';
import TopBar from "../Component/TopBar";

const { TextArea } = Input;
const {Header, Content} = Layout
const defaultUrl = 'http://39.174.132.98:5003';


var storage = window.localStorage

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        islogin:false,
        postID:this.props.match.params.id,
        postInfo:[],
        commentList:[],
        candeletepost:false,
        canReply:false,
    };
  }

  componentDidMount(){
    axios.defaults.baseURL = defaultUrl;

    axios.get('/post/'+this.state.postID.toString()).then(
        res=>{
            this.setState({
                postInfo:res.data.data,
            });
            var candeletepost = this.CanDeletePost();
            console.log(res.data.data)
            this.setState({
                candeletepost:candeletepost
            })
        }
    );

    if(storage['token']!==undefined){
        	var params = {
        		user: storage['user']
			}
			axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/CanReply',
                params
            }).then(res=>{
            	if(res.data.data===1){
            		this.setState({
						canReply:true
					})
				}
            	else{
            		this.setState({
						canReply:false
					})
				}
			})
		}

    axios.get('/replies/'+this.state.postID.toString()).then(
      res=>{
          this.setState({
              commentList:res.data.data,
          });
      }
    );

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
                    this.setState({
                        islogin:false
                    })
                }
                else{
                    this.setState({
                        islogin:true
                    })
                }
            })
        }
  }

  jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
  }

  deletepost = () => {  // 删除帖子

    axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/post/'+this.state.postID,
		}).then(res=>{
		    this.delePostSuccess()
        }).catch(function (error) {
			console.log(error);
        });

  }

  delePostSuccess() {
    Modal.success({
      content: '删除帖子成功',
      onOk: ()=>this.postOK()
    });
  }

  postOK(){
    window.history.back()
  }

  deleComSuccess() {
    Modal.success({
      content: '删除回复成功',
      onOk: ()=>window.location.href = window.location.href
    });
  }

  delecomment = (item) =>{    // 删除回复
    console.log("delete reply:",item.reply_id)

    axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/reply/'+item.reply_id,
		}).then(res=>{
		    this.deleComSuccess()
        }).catch(function (error) {
			console.log(error);
      });
  }



  // 发表回复
  onFinish = (values) => {
		var params = {
			user_id: storage['user'],
			content: values.newcomment
		}

		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/replies/'+this.state.postID,
			params
		}).then(res=>{
		    Modal.success({
		  		content: '回复成功！',
		  		onOk: ()=>window.location.href = window.location.href
			});
        }).catch(function (error) {
			console.log(error);
      });

  };


	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	CanDeletePost=()=>{
	    if(storage['user']===this.state.postInfo.user_id){
	        return true;
        }
	    else{
	        if(storage['identity']==='2')
	            return true;
	        else
	            return false;
        }
    }


    show1=()=>{
	    
            if(this.state.candeletepost===false&&this.state.canReply===true) {
                return(
                    <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发表回复</Button>
                )
            }
            else if(this.state.candeletepost===true&&this.state.canReply===true){
                return(
                    <Row>
                        <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发表回复</Button>
                        <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.deletepost }>删除帖子</Button>
                    </Row>
                )
            }
            else if(this.state.candeletepost===false&&this.state.canReply===false){
                return(
                    ''
                )
            }
            else{
                return(
                    <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.deletepost }>删除帖子</Button>
                )
            }
        
    }

    show2=(item)=>{
	    if(item.user_id===storage['user']){
	        return(
	            <Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.delecomment(item)}>删除回复</Button>
            )
        }
	    else{
	        if(storage['identity']==='2'){
	            return(
	                <Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.delecomment(item)}>删除回复</Button>
                )
	        }
	        else{
	            return('');
            }
        }
    }

    getIdentity=(num)=>{
	    if(num===0)
	        return ''
        else if(num===1)
            return '(医生)'
        else
            return '(管理员)'
    }

	render() {
		return(
		    <Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent'>
			        <div className = "comment-back-ground">
                        <div className="site-page-header-ghost-wrapper">

                        <br/>
                          <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title={this.state.postInfo.title}
                          >
                            <Descriptions size="small" column={3}>
                              <Descriptions.Item label="作者">{this.state.postInfo.user_id+this.getIdentity(this.state.postInfo.user_identity)}</Descriptions.Item>
                              <Descriptions.Item label="发帖时间">{this.state.postInfo.time}</Descriptions.Item>
                            </Descriptions>
                          </PageHeader>
                        </div>

                        {/* 作者帖子内容 */}
                        <div class="comment-list">
                          <Comment
                              actions={[<p>作者</p>]}
                              author={this.state.postInfo.user_id+this.getIdentity(this.state.postInfo.user_identity)}
                              avatar={qiushi}
                              content={this.state.postInfo.content}
                              datetime={this.state.postInfo.time}
                            />
                        {
                          this.show1()
                        }

                        </div>

                        <div><br/></div>

                        {/* 回复列表 */}
                        <div className="comment-list">
                          {/* <Comments /> */}
                          <List

                              // header={`${this.state.ComList.length}个回复`}
                              itemLayout="horizontal"
                              dataSource={this.state.commentList}
                              pagination={{
                                  pageSize: 10,
                              }}
                              renderItem={item => (
                              <li>
                                <Comment
                                      // actions={ [<p>{item.index}楼</p>]}
                                      author={item.user_id+this.getIdentity(item.user_identity)}
                                      avatar={qiushi}
                                      content={item.content}
                                      datetime={item.time}
                                />
                                <div>{
                                    this.show2(item)
                                }

                                </div>


                                  <Divider />
                              </li>
                              )}
                            />
                        </div>


                        {/* 回复框 */}
                        {
                            
                                <div className="comment-box">
                                    <p>发表回复</p>


                                    <Form
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                    >

                                        <Form.Item
                                            // label="回复内容"
                                            name="newcomment"
                                            rules={[{required: true, message: '请输入回复内容!'}]}
                                        >
                                            <TextArea showCount maxLength={500}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                发表
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                       
                        }

                        <div><br/></div>
			</div>
                </Content>
            </Layout>
		)
	}
}

export default PostDetail;