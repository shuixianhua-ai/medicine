import React, {Component} from 'react';
import '../assets/css/listPage.css'
import {List} from "antd";
import {NotificationFilled} from "@ant-design/icons";
import axios from 'axios';
import {Link} from 'react-router-dom';

const defaultUrl = 'http://39.174.132.98:5003';

class listPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            topNoticeList:[],
            recommendRead:{},
            hotArticle:[],
            authorityPost:[],
            allNotice:[],
        }
    }

    componentDidMount() {
        axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/articleSource',
        }).then(res=>{
            this.setState({
                topNoticeList:res.data.data.topNoticeList,
                recommendRead:res.data.data.recommendRead,
                hotArticle:res.data.data.hotArticle,
                authorityPost:res.data.data.authorityPost,
                allNotice:res.data.data.allNotice,
            })
        })
    }


    render() {
        return(
            <div className='mainPage'>
                <div className='leftPart'>
                    <div className='topNotice'>
                        <div className='mainPageTitle1'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled />
                                <div style={{marginLeft:'0.5rem'}}>置顶公告</div>
                            </div>
                        </div>
                        <div className='topNoticeContent'>
                            <List
                                style={{width:'100%'}}
                                dataSource={this.state.topNoticeList}
                                renderItem={item=>(
                                    <List.Item>
                                        <div  style={{fontWeight:'600'}}>
                                            <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className='recommendedReading'>
                        <div className='mainPageTitle2'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled />
                                <div style={{marginLeft:'0.5rem'}}>科普推荐</div>
                            </div>
                        </div>
                        <div className='recommendedReadingContent'>
                            <div className='recommendedReadingImage'>
                                <img src={require('../assets/picture/文学交流.png').default}/>
                            </div>
                            <div className='recommendTitle'>
                                <Link className='detailtitle' to={'/artical/detail/'+this.state.recommendRead.id}>{this.state.recommendRead.title}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mainPageList'>
                            <div className='mainPageTitle1'>
                                <div className='mainPageTitleRow' style={{width:'100%'}}>
                                    <NotificationFilled />
                                    <div style={{marginLeft:'0.5rem'}}>热门文章</div>
                                </div>
                            </div>
                            <div className='mainPageListContent1'>
                                <List
                                    style={{width:'100%'}}
                                    dataSource={this.state.hotArticle}
                                    renderItem={item=>(
                                        <List.Item>
                                            <div  style={{fontWeight:'600'}}>
                                                <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='mainPageList'>
                            <div className='mainPageTitle1'>
                                <div className='mainPageTitleRow' style={{width:'100%'}}>
                                    <NotificationFilled />
                                    <div style={{marginLeft:'0.5rem'}}>权威发布</div>
                                </div>
                            </div>
                            <div className='mainPageListContent1'>
                                <List
                                    style={{width:'100%'}}
                                    dataSource={this.state.authorityPost}
                                    renderItem={item=>(
                                        <List.Item>
                                            <div  style={{fontWeight:'600'}}>
                                                <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightPart'>
                    <div className='allNotice'>
                        <div className='mainPageTitle2'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled />
                                <div style={{marginLeft:'0.5rem'}}>最新公告</div>
                            </div>
                        </div>
                        <div className='schoolNewsContent'>
                            <List
                                style={{width:'100%'}}
                                pagination={{
                                    pageSize:4
                                }}
                                dataSource={this.state.allNotice}
                                renderItem={item=>(
                                    <List.Item>
                                        <div  style={{fontWeight:'600'}}>
                                            <Link className='noticetitle' to={'/artical/detail/'+item.id}>{'['+item.date+']\n'+item.title}</Link>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default listPage