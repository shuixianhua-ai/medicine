import React, { Component, useState, useContext, useEffect, useRef } from 'react';
import { Breadcrumb, Radio, Divider, Button, Input, Select, Layout, Table, InputNumber, Form, Tabs,Skeleton, Modal, Drawer, Space, Popconfirm, Menu,List, message, Avatar, Spin } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moment from 'moment';



import { Link } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../Component/TopBar";
import '../assets/css/Post.css';
import '../assets/css/MainPage.css';
import '../assets/css/Prescribe.css';


import reqwest from 'reqwest';
const count = 3;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';



const EditableContext = React.createContext(null);
const { TabPane } = Tabs;
const { SubMenu } = Menu;






const { Header, Content, Footer, Sider } = Layout;

var storage = window.localStorage;
const { TextArea } = Input;
const defaultUrl = 'http://39.174.132.98:5003';


///////测试
const ori_data = [
	{
		pres_id: '1',
		user_id:'小明',
		doctor_id:'王医生',
		information:'高烧',
		time:'2020-10-01',
		prescription:'退烧贴 4贴装 1 1片/次，2次/日，外用;退烧贴 4贴装 1 1片/次，2次/日，外用;'


		
	},
	{
		pres_id: '2',
		user_id:'小明',
		doctor_id:'李医生',
		information:'高烧',
		time:'2021-03-01',
		prescription:'去痛片 4贴装 1 1片/次，2次/日，外用;退烧贴 4贴装 1 1片/次，2次/日，外用;'
	},
	{
		pres_id: '3',
		user_id:'小明',
		doctor_id:'张医生',
		information:'高烧',
		time:'2021-06-05',
		prescription:'退烧贴 4贴装 1 1片/次，2次/日，外用;去痛片 4贴装 1 1片/次，2次/日，外用;'
	},
	
];

const columns = [
	{
		title: '名称',
		dataIndex: 'medNameZh',
		key: 'medNameZh',
		width: '35%',
		//   render: text => <Link to={{pathid:"/study/post/"}}>{text}</Link>,
		
	},
	{
		title: '规格',
		dataIndex: 'medIcon',
		key: 'medIcon',
		width: '15%',
		
	},
	{
		title: '数量',
		dataIndex: 'mednumber',
		key: 'mednumber',
		width: '10%',
		
	},
	
	{
		title: '用法',
		dataIndex: 'medusage',
		key: 'medusage',
		width: '40%',
		
	},
	
	
];




class Prescription_detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		postID: this.props.match.params.id,
		user_id: 'yu',
		doctor_id: '',
		information: '',
		time: '',
		  
		}
	  }


	
	
	  componentDidMount() {
		  const id=this.props.match.params.id;
		const choicelist=ori_data.filter(function (obj) {
			return obj.pres_id == id ;
		});
		
		const usage=choicelist[0].prescription;
		let medinformation=usage.split(';');
		let test=[];
		
		let test1=[];
		for(var i=0;i<medinformation.length-1;i++)
		{
			console.log(medinformation[i]);
			test1=medinformation[i].split(' ');
			let data1={'medNameZh':'','medIcon':'','mednumber':'','medusage':''};
			data1.medNameZh=test1[0];
			console.log(data1.medNameZh)
			data1.medIcon=test1[1];
			data1.mednumber=test1[2];
			data1.medusage=test1[3];
			test=[...test,data1];
			

		}
		
		
		
		


		
		
		console.log(test);

		

		this.setState((state, props) => {
			// state表示组件的内部原有数据
			// props表示父组件传递过来的数据
			// 采用这种方式修改状态的话，不要直接修改参数中的state
			// 而是要通过返回一个新的state的方式来修改原有的状态数据
			return {
				user_id: choicelist[0].user_id,
				doctor_id: choicelist[0].doctor_id,
				information:choicelist[0].information,
				time:choicelist[0].time,
				list:test
			}
		  })
	 
		


		
	  }
	
			
    
			
			

		
		
		

		

		
	

	

	
	





	render() {
		
		const { initLoading, loading, list } = this.state;
    





		return (
			<Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<TopBar />
				</Header>


				<Content className='mycontent'>


					<div className="post-back-ground">


						{/* <TopBar/> */}

						<div style={{ marginLeft: '15%', marginRight: '15%' }}>
							<div>
								<h1 className='PostBig'>处方显示</h1>
							</div>
							{/* 处方内容 */}
							<div class="prescribbox">
								<div class="presentbox">
									<h1 class="prescribetitle">处方笺</h1>
									<div class="basicbox1">
										<div class="labeltext">
											姓名：
						        </div>
										<label class="underline1" >{this.state.user_id}</label>

										<div class="labeltext_5">
											性别：
						         </div>
										<label class="underline2" >男</label>

										<div class="labeltext_6">
											年龄：
						         </div>
										<label class="underline3" >22</label>

									</div>
									<div class="basicbox1">
									<div class="labeltext">
											医生：
						         </div>
										<label class="underline1" >{this.state.doctor_id}</label>
										
										<div class="labeltext_5">
										日期：
						         </div>
										<label class="underline2" >{this.state.time}</label>

										

									</div>
									<Divider orientation="left" style={{ marginLeft: 0 }}>诊断结果</Divider>

									<div class="basicbox2">

										<label  className="describeshow" >{this.state.information}</label>



									</div>
									<Divider orientation="left">药品</Divider>

									<div class="basicbox3">
										{/* 药品 */}
										<Content style={{ marginTop: 20, backgroundColor: '#ffffff' }}>
											{/*dataSource是返回的数据 */}
											<div>
												
												<Table
													
													
													bordered
													dataSource={list}
													columns={columns}
													pagination={{ pageSize: 5 }}

												/>
											</div>

										</Content>
										



									</div>
									










								</div>








							</div>
									
							





							







							

						</div>
					</div>

				</Content>
			</Layout>
		)
	}
}

export default Prescription_detail;

