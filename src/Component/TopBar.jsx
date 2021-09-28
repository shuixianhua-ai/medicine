import React from 'react';
import {Button,  Menu,Dropdown,Modal,Form,Input,message} from 'antd';
import TopMenu from './TopMenu';
import '../assets/css/TopBar.css';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from "axios";

var storage=window.localStorage;
const defaultUrl = 'http://39.174.132.98:5003';


class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            getMenu:true,
            loginloading:false,
        }
    }

    componentDidMount() {
        if(storage['token']===undefined){
            this.setState({
                getMenu:true
            })
            storage['islogin']=false
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
                        getMenu:true
                    })
                    storage['islogin']=false
                }
                else{
                    this.setState({
                        getMenu:false
                    })
                    storage['islogin']=true
                }
            })
        }
    }

    showModal=()=>{
        this.setState({
            visible: true,
        });
    };

    handleOk=()=>{
        this.setState({
            visible: false,
        });
    };

    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    }

    Out=()=>{
        storage.removeItem("user");
        storage.removeItem("token");
        storage.removeItem('identity')

        message.success('登出成功')
        // window.location.reload();
        window.location.href = window.location.href// 注销则跳转到首页
    }

    GetLoginMailbox=(e)=>{
        this.setState({
            loginusername:e.target.value
        })
    };

    GetLoginpwd=(e)=>{
        this.setState({
            loginpwd:e.target.value
        })
    };

    loginMenu=(
      <Menu>
          <Menu.Item key='login' ><div onClick={this.showModal} >登录</div></Menu.Item>
      </Menu>
    );

    logoutMenu=(
        <Menu>
            <Menu.Item key='logout' ><div onClick={this.Out} >退出登录</div></Menu.Item>
        </Menu>
    )

    login=()=>{
        if(this.state.loginusername===''||this.state.loginpwd===''){
            if(this.state.loginusername==='')
                message.warning('请输入用户名！');
            if(this.state.loginpwd==='')
                message.warning('请输入密码！');
        }
        else{
            this.setState({
                loginloading:true
            });
            var params={
                username:this.state.loginusername,
                password:this.state.loginpwd,
            };
            axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/login',
                params,
            }).then(res=>{
                if(res.data.data!==null) {
                    storage['token']=res.data.data.token;
                    storage['user']=this.state.loginusername;
                    storage['identity']=res.data.data.identity;
                    message.success('登录成功!');
                    this.setState({
                        visible:false,
                        loginloading:false,
                        getMenu:false,
                    });
                    window.location.href = window.location.href
                }
                else{
                    message.error('用户名或密码错误！');
                    this.setState({
                        loginloading:false
                    });
                }
            })
        }
    }

    render() {
        return(
            <div className="TopBar">
                <img className='logo' src={require('../assets/picture/logo.jpg').default} alt='logo'/>
                <div className='title'>
                    智慧医疗
                </div>
                <div style={{alignSelf: 'flex-end'}} className='Menu'><TopMenu/></div>
                <div className='username'>
                    {
                        (this.state.getMenu===true)?(
                            ''
                        ):(
                            storage['user']+',欢迎使用！'
                        )
                    }
                </div>
                {
                    (this.state.getMenu===false&&storage['identity']==='2')?(
                        <div style={{marginLeft:'auto'}}>
                            <Button type='primary'>
                                <Link to={'/admin'}>管理员中心</Link>
                            </Button>
                        </div>
                    ):('')
                }
                <div className='User'>
                    {
                        (this.state.getMenu===true)?(
                            <Dropdown overlay={this.loginMenu} trigger={['click']}>
                                    <Button size='large' shape="circle" icon={<UserOutlined/>}/>
                            </Dropdown>
                        ):(
                            <Dropdown overlay={this.logoutMenu} trigger={['click']}>
                                    <Button size='large' shape="circle" icon={<UserOutlined/>}/>
                            </Dropdown>
                        )
                    }
                </div>
                <Modal
                    visible={this.state.visible}
                    title=" "
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}>
                    <div className='myregister'>
                        <img className='Logo' src={require('../assets/picture/logo.jpg').default} alt='logo' style={{marginBottom:10}}/>
                        <div className='registitle' style={{width:"80%",display:"flex",justifyContent:'center'}}>登录</div>
                        <Form style={{width:"90%"}}>
                            <Form.Item name="username" label="用户名" >
                                <Input placeholder="请输入用户名" onChange = {(e)=>this.GetLoginMailbox(e)}/>
                            </Form.Item>
                            <Form.Item name="pwd" label="密码" >
                                <Input.Password placeholder="请输入密码" onChange = {(e)=>this.GetLoginpwd(e)}/>
                            </Form.Item>
                        </Form>
                        <Button type={"primary"} style={{width:"80%"}} loading={this.state.loginloading} onClick={this.login}>登录</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default TopBar