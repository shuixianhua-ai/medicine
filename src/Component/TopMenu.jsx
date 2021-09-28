import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';

import {HomeOutlined} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

var storage = window.localStorage;


class TopMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current:storage.getItem("TopBarKey"),
        }
    }

    handleClick = e => {
        this.setState({
            current:e.key,
        });
        storage.setItem("TopBarKey",e.key);
    };

    render() {
        return(
            <div className="TopMenu">
                <Menu onClick={this.handleClick} selectedKeys={[window.location.pathname]}  mode="horizontal">
                    <MenuItem key = "/" icon={<HomeOutlined/>}>
                        <Link to = "/"> 首页 </Link>
                    </MenuItem>
                    <MenuItem key = "/prescription_all" icon={<HomeOutlined/>}>
                        <Link to = "/prescription_all"> 模块1 </Link>
                    </MenuItem>
                    <MenuItem key = "/prescrib" icon={<HomeOutlined/>}>
                        <Link to = "/prescrib"> 模块2 </Link>
                    </MenuItem>
                    <MenuItem key = "/bbs" icon={<HomeOutlined/>}>
                        <Link to = "/bbs"> 交流论坛 </Link>
                    </MenuItem>
                    <MenuItem key = "/artical/all" icon={<HomeOutlined/>}>
                        <Link to = "/artical/all"> 医疗资讯 </Link>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default TopMenu