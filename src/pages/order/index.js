import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker }from 'antd';
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{
    state = {
        orderInfo:{},
        orderConfirmVisible:false
    }
    params = {
        page:1
    }
    formList = [
        {
            //必加
            type:'SELECT',
            label:'城市',
            field:'city',
            //选加
            placeholder:'全部',
            // 严格按照getFieldDecorator定义
            initialValue:'1',
            width:80,
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'上海'}],
        },
        {
            //必加
            type:'INPUT',
            label:'模式',
            field:'model',
            //选加
            placeholder:'请输入模式',
            // 严格按照getFieldDecorator定义
            width:100,
        },
        {
            type:'时间查询',
            label:'订单时间'
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            // 严格按照getFieldDecorator定义
            initialValue:'1',
            width:80,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}],
        }
    ]
    componentDidMount(){
        this.requestList()
    }
    //提交
    handleFilter = (params) => {
        this.params = params;
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this,'/order/list',this.params,true)
        // axios.ajax({
        //     url:'/order/list',
        //     data:{
        //         params:this.params//不仅仅是page,还有查询的东西
        //     }
        // }).then((res)=>{
        //     let list = res.result.item_list.map((item,index) => {
        //         item.key = index;
        //         return item;
        //     });
        //     this.setState({
        //         list,
        //         //设置分页
        //         pagination:Utils.pagination(res,(current)=>{
        //             _this.params.page = current;
        //             _this.requestList()
        //         })
        //     })
        // })
    }
    //订单结束确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单进行结束'
            });
            return;
        }
        //请求订单数据,作为info显示在弹窗里
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible:true,
                })
            }
        })
    }
    //结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        })
        .then((res)=>{
            if(res.code === 0){
                message.success('订单结束成功');
                this.setState({
                    orderConfirmVisible:false
                });
                this.requestList();
            }
        })
    }
    //列表点击
    onRowClick = (record,index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //列表选择行
    onSelectChange = (selectedRowKeys,selectedItem) => {
        const record = selectedItem[0];
        this.setState({
            selectedRowKeys:selectedRowKeys,
            selectedItem:record
        })
    }
    //订单详情页
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            });
            return;
        }
        // 通过window.open 进行路由的跳转
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render(){
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,//指定选中项的key数组,需要和onchange进行配合
            onChange:this.onSelectChange
        }
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_fee'
            },
        ]
        return(
            <div>
                <Card>
                    {/* <FilterForm/> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    {/* <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}

                        rowSelection={rowSelection}
                        onRowClick={(record,index)=>{
                            return{
                                onClick: ()=>{
                                    this.onRowClick(record,index)
                                }
                            }
                        }}
                    /> */}

                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        //selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                    >
                        <OpenCityForm {...this.state.orderInfo}/>
                </Modal>
            </div>
        )
    }
}

//1.选择表单
class FilterForm extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form layout="inline">
                <FormItem label="城市">
                    {getFieldDecorator('city_id')(
                        <Select
                            style={{width:100}}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="订单时间">
                    {getFieldDecorator('start_time')(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )}

                </FormItem>
                <FormItem label="~">
                    {getFieldDecorator('start_time')(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )}
                </FormItem>
                <FormItem label="订单状态">
                    {getFieldDecorator('order_status')(
                        <Select
                            style={{width:80}}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">结束行程</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm);


//2.开通城市
class OpenCityForm extends React.Component{
    render(){
        const {bike_sn,battery,start_time,location} = this.props //props传入的是state.orderInfo
        const formItemLayout = {
            labelCol:{
                span: 5
            },
            wrapperCol:{
                span:19
            }
        }
        return(
            <Form>
                <FormItem label="车辆编号" {...formItemLayout}>{bike_sn}</FormItem>
                <FormItem label="剩余电量" {...formItemLayout}>{battery + "%"}</FormItem>
                <FormItem label="行程开始时间" {...formItemLayout}>{start_time}</FormItem>
                <FormItem label="当前位置" {...formItemLayout}>{location}</FormItem>
            </Form>
            
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)