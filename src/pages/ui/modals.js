import React from 'react'
import {Card,Button, Radio, Modal} from 'antd'
import'./ui.less'

export default class Modals extends React.Component{
    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }
    handleOpen = (type) => {
        this.setState({
            // 这个地方!!!用[],type这么写会当做key,[]会当做变量
            [type]:true,
        })
    }
    handleConfirm = (type) => {
        // Modal.confirm()用Model[type]
        Modal[type]({
            title:'',
            content:'你学会了吗?',
            onOk(){
                console.log('Ok')
            },
            onCancel(){
                console.log("cancel")
            }
        })
        // 举例
        // var a = {
        //     confirm:function(){}
        // }
        //这里可以用a.confirm 也可以用a['confirm'] 调用

        // Modal.confirm({
        //     // 这是最基本的,必须要有的
        //     title:'',
        //     content:'你学会了吗?',
        //     onOk(){
        //         console.log('Ok')
        //     },
        //     onCancel(){
        //         console.log("cancel")
        //     }
        // })
    }
    render(){
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    {/* 如果要传参,要用箭头函数,不用箭头函数的写法,相当于onclick事件在一开始就调用了,
                    如果要传参,用箭头函数return一个方法!!!
                    仅当点击触发 */}
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认" className="card-wrap">
                    {/* 如果要传参,要用箭头函数,不用箭头函数的写法,相当于onclick事件在一开始就调用了,
                    如果要传参,用箭头函数return一个方法!!!
                    仅当点击触发 */}
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        })
                    }}
                >
                    欢迎使用我的后台管理系统
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    //定义页脚
                    okText="好的"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModal2:false
                        })
                    }}
                >
                    欢迎使用我的后台管理系统
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal3}
                    style={{top:20}}
                    onCancel={()=>{
                        this.setState({
                            showModal3:false
                        })
                    }}
                >
                    欢迎使用我的后台管理系统
                </Modal>
                <Modal
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={()=>{
                        this.setState({
                            showModal4:false
                        })
                    }}
                >
                    欢迎使用我的后台管理系统
                </Modal>
            </div>
        )
    }
}