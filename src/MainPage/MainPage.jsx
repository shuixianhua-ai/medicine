import React, {Component} from 'react';
import {Layout} from "antd";
import TopBar from "../Component/TopBar";
import '../assets/css/MainPage.css'
const {Header, Content} = Layout

class MainPage extends Component{
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent'>
                    <div>
                        内容
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default MainPage;