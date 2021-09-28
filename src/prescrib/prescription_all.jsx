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



const count = 3;




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



// 定义了首行列标题
const columns = [
	{
	  title: '标题',
	  dataIndex: 'pres_id',
	  key: 'pres_id',
	  width: '70%',
	   
	  render: (text, record) => {
		//   console.log(text);
		//   console.log(record.post_id);
		  return (
			<Link to={{pathname:"/prescription/"+record.pres_id}}>处方单{text}</Link>
		  );
	  }
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


class Prescription_all extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
            //list: [],
			list: ori_data,
			

		};

		
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
							<Content style = {{marginTop: 20, backgroundColor: '#ffffff'}}>
						<Table columns={columns} dataSource={this.state.list} />
					</Content>
									
							





							







							

						</div>
					</div>

				</Content>
			</Layout>
		)
	}
}

export default Prescription_all;

