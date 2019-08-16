import React from 'react';
import { Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom'
import MenuConfig from './../../config/menuConfig';
import './index.less'
const SubMenu = Menu.SubMenu;
 
export default class NavLeft extends React.Component{
    componentWillMount(){
        //Menuconfig 使用
        //递归
        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState({
            menuTreeNode
        })
    }
    //不用(){}是因为this环境问题
    //递归!!!!!,必须要掌握!!!
    renderMenu = (data) =>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo.ai" alt="logo"/>
                    <h1>Yiqing</h1>
                </div>
                <Menu
                theme="dark">
                    {this.state.menuTreeNode}
                    {/* <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                        </span>
                    }
                    >
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 1</Menu.Item>
                        <Menu.Item key="4">Option 2</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}