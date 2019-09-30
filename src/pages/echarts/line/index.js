import React from 'react'
import {Card} from 'antd'
import echartTheme from '../echartTheme'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component{
    
    componentWillMount(){
        //注册主题
        echarts.registerTheme('yiqing', echartTheme)
    }
    getOption = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,2000,1500,3000,2000,1200,800
                    ]
                }
            ]
        }
        return option;
    }
    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO订单量',
                    type:'line',
                    data:[
                        1200,3000,4500,6000,8000,12000,20000
                    ]
                },
                {
                    name:'摩拜订单量',
                    type:'line',
                    data:[
                        1000,2000,5500,6000,8000,10000,12000
                    ]
                }
            ]
        }
        return option;
    }
    getOption3 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                type:'category',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,2000,1500,3000,2000,1200,800
                    ],
                    //指定区域样式
                    areaStyle:{}
                }
            ]
        }
        return option;
    }
    render(){
        return(
            <div>
                <Card title="折线图之一">
                    <ReactEcharts option={this.getOption()} theme="yiqing" style={{height:500}}/>
                </Card>
                <Card title="折线图之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="yiqing" style={{height:500}}/>
                </Card>
                <Card title="折线图之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="yiqing" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}