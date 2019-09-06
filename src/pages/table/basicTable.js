import React from 'react'
import {Card,Table, Modal, message} from 'antd'
import axios from '../../axios'
import { Button } from 'antd/lib/radio'
import Utils from '../../utils/utils'

export default class BasicTable extends React.Component{
    state={
        dataSource2:[],
        selectedRows:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'Yiqing',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'你心里',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Lingjun',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'你心里',
                time:'09:00'
            },
            {
                id:'3',
                userName:'Miao',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'你心里',
                time:'09:00'
            }
        ]
        //循环添加key
        dataSource.map((item,index) =>{
            console.log(112)
            item.key = index;
        })
        this.setState({
            dataSource
        })
        this.request();
    }
    //动态获取mock数据
    request = () => {
        let _this = this
        axios.ajax({
            //这其实都是options
            url:'/table/list',
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
                dataSource2:res.result.list,
                selectedRows:null,
                selectedRowKeys:[],
                //pagination两个值,res,callback
                //是在这里定义的callback函数
                //注意!是在这里设置table的参数pagination的,每次请求后会设置
                pagination:Utils.pagination(res,(current)=>{
                    //page切换回调
                    _this.params.page = current;
                    this.request();
                })
            })
        })
    }

    onRowClick = (record,index) =>{
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        console.log(rows)
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'提示',
            content:`确定要删除吗?${ids.join(',')}`,
            onOk:()=>{
                message.success("删除成功")
                this.request()
            }
        })
    }
    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
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
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox', 
            //这个是必须的
            selectedRowKeys,
            //事件
            onChange:(selectedRowKeys,selectedRows)=>{
                let ids = [];
                // console.log(ids)
                console.log(selectedRows)
                selectedRows.map((item)=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return(
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns} 
                        dataSource={this.state.dataSource}   
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-动态数据渲染表格" style={{margin:10}}>
                    <Table
                        bordered
                        columns={columns} 
                        dataSource={this.state.dataSource2}   
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{margin:10}}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                        columns={columns} 
                        dataSource={this.state.dataSource2}   
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选" style={{margin:10}}>
                    <div>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered 
                        rowSelection={rowCheckSelection}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                        columns={columns} 
                        dataSource={this.state.dataSource2}   
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-分页" style={{margin:10}}>
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2}   
                        // pagination是要传参的
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}