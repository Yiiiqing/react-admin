import React from 'react';
import { Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom'
import MenuConfig from './../../config/menuConfig';
import './index.less'
//引入redux
import { connect } from 'react-redux' //连接器,用于连接redux和组件
import { switchMenu } from './../../redux/action'//触发事件行为

const SubMenu = Menu.SubMenu;
 
class NavLeft extends React.Component{
    state = {
        currentKey:''
    }

    //菜单点击
    handleClick = (item) => {
        const { dispatch } = this.props; //没有connect是拿不到的
        console.log("item",item)
        console.log("title:",item.item.props.title)
        console.log("key:",item.key)
        dispatch(switchMenu(item.item.props.title))
        this.setState({
            currentKey:item.key
        })
    }
    componentWillMount(){
        //Menuconfig 使用
        //递归
        const menuTreeNode = this.renderMenu(MenuConfig)
        //来取到当前路由
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
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
                    <img src="/assets/PAI-blue.svg" alt="logo"/>
                    <h1>Yiqing</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
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
export default connect()(NavLeft);//丢入redux,被其管理