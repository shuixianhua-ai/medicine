import React from 'react'
import {Form, Input, Button, Radio, Modal} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import  '../assets/css/Admin.css'
import axios from "axios";

const { TextArea } = Input;

const defaultUrl = 'http://39.174.132.98:5003';


class AddSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0
        }
    }

    onFinish = (values) => {
        var params = {
			title: values.title,
			author: values.author,
            type:values.type,
			content: values.content
		}
		console.log(params)

		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/articleSource',
			params
		}).then(res=>{
			console.log(res.data.code)
			if(res.data.code===0){
				Modal.success({
		  		content: '发布文章成功！',
				});
			}
			else{
				Modal.error({
				content: '发布文章失败！',
			});
			}
		});
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onChange = e => {
        this.setState({
            value:e.target.value
        })
      };

	render() {
		return (
			<div class = "courseInput">
                <h2 style={{marginBottom:30}}>发布公告、文章</h2>
                <Form
                name="addsourse"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}>
                    <Form.Item
                        label="文章标题"
                        name="title"
                        rules={[{ required: true, message: '标题不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '作者不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="资源类别"
                        name="type"
                        rules={[{ required: true, message: '资源类别不能为空' }]}
                    >
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                          <Radio value={0}>置顶公告</Radio>
                          <Radio value={1}>推荐文章</Radio>
                          <Radio value={2}>热门文章</Radio>
                          <Radio value={3}>权威发布</Radio>
                          <Radio value={4}>公告</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="文章内容"
                        name="content"
                        rules={[{ required: true, message: '文章内容不能为空' }]}
                    >
                        <TextArea style={{marginTop: 10}} autoSize={{minRows: 3}} showCount maxLength={500} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                        提交
                        </Button>
                    </Form.Item>


                </Form>
			</div>
		)
	}
}

export default AddSource