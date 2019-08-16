import React from 'react'
import {Card,Button, Radio} from 'antd'
import'./ui.less'
export default class Home extends React.Component{
    state = {
        loading:true,
        size:'default',
    }
    //不要这么写,上下文指向的不是react对象!
    // handleCloseLoading(){}
    handleCloseLoading = () => {
        this.setState({
            loading:false
        })
    }
    //e是鼠标事件对象
    handleChange = (e) => {
        this.setState({
            size:e.target.value
        })
    }
    render(){
        return(
            <div>
                <Card title="基础按钮" className="card-wrap">
                    {/* 通过type来定主次按钮 */}
                    <Button type="primary">Button</Button>
                    <Button>Button</Button>
                    <Button type="dashed">Button</Button>
                    <Button type="danger">Button</Button>
                    <Button disabled>Button</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    {/* 通过type来定主次按钮 */}
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    {/* 通过type来定主次按钮 */}
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom:'10px'}}>
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">Small</Radio>
                        <Radio value="default">medium</Radio>
                        <Radio value="large">Large</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Button</Button>
                    <Button size={this.state.size}>Button</Button>
                    <Button type="dashed" size={this.state.size}>Button</Button>
                    <Button type="danger" size={this.state.size}>Button</Button>
                    <Button disabled size={this.state.size}>Button</Button>
                </Card>
            </div>
        )
    }
}