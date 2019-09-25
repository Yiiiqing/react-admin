import React from 'react'
import {Card,Table, Modal, message, Badge} from 'antd'
import axios from '../../axios'
import { Button } from 'antd/lib/radio'
import Utils from '../../utils/utils'

export default class HighTable extends React.Component{
    state = {

    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request()
    }
     //动态获取mock数据
     request = () => {
        let _this = this
        axios.ajax({
            //这其实都是options
            url:'/table/high',
            data:{
                params:{
                    //不用this.state,因为this.state是用来渲染DOM的,不需要渲染的话只是等于设置一个变量
                    page:this.params.page,
                },
                isShowLoading:true
            }
        }).then((res)=>{
            res.result.list.map((item,index)=>{
                item.key = index;
            })
            this.setState({
                dataSource:res.result.list,
            })
        })
    }

    handleChange = (pagination,filters,sorter) =>{
        //sorter是一个对象
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'确定要删除吗?',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render(){
        
        const columns = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,

            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,

                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,

                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业大亨'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,

                render(abc){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸',
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'地址',
                dataIndex:'address',
                width:120,

            },
            {
                title:'早起时间',
                dataIndex:'time',
                width:80,

            }
        ]
        const columns2 = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
                fixed:'left'
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,
                fixed:'left'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,

                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,

                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业大亨'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,

                render(abc){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸',
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'地址',
                dataIndex:'address',
                width:120,
                fixed:'right'
            },
            {
                title:'早起时间',
                dataIndex:'time',
                width:80,
                fixed:'right'
            }
        ]
        const columns3 = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,

            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,

                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width:80,
                //
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                //排序方式/
                sortOrder:this.state.sortOrder
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,

                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业大亨'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,

                render(abc){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸',
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'地址',
                dataIndex:'address',
                width:120,

            },
            {
                title:'早起时间',
                dataIndex:'time',
                width:80,
            }
        ]
        const columns4 = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,

            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,

                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width:80,
                //
            },
            {
                title:'状态',
                dataIndex:'state',
                width:80,

                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业大亨'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                width:80,

                render(abc){
                    let config = {
                        '1':<Badge status="success" text="游泳"/>,
                        '2':<Badge status="error" text="打篮球"/>,
                        '3':<Badge status="default" text="踢足球"/>,
                        '4':<Badge status="warning" text="警告"/>,
                        '5':<Badge status="processing" text="进行"/>,
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸',
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120,

            },
            {
                title:'地址',
                dataIndex:'address',
                width:120,

            },
            {
                title:'操作',
                width:80,
                render:(text,item)=>{
                    return <Button onClick={(item)=>this.handleDelete(item)}>删除</Button>
                }
            }
        ]
        return(
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns} 
                        dataSource={this.state.dataSource}   
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:10}}>
                    <Table
                        bordered
                        columns={columns2} 
                        dataSource={this.state.dataSource}   
                        pagination={false}
                        scroll={{x:1920}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:10}}>
                    <Table
                        bordered
                        columns={columns3} 
                        dataSource={this.state.dataSource}   
                        onChange={this.handleChange}
                        pagination={false}
                    />
                </Card>
                <Card title="操作表格" style={{margin:10}}>
                    <Table
                        bordered
                        columns={columns4} 
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}