import React from 'react';
import axios from './../../axios'
import {Card,Form,} from 'antd'
import BaseForm from '../../components/BaseForm';

export default class BikeMap extends React.Component{
    state = {}
    map = '';
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
            type:'时间查询',
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            list:[{
                id:'0',
                name:'全部'
            },{
                id:'1',
                name:'进行中'
            },
            {
                id:'2',
                name:'行程结束'
            }]
        }
    ]
    componentWillMount(){
        this.requestList();
    }
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }
    requestList = () => {
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code === 0 ){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res)
            }
        })
    }
    //渲染地图数据
    renderMap = (res) =>{
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length - 1].split(',')
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);
        
        //渲染车辆
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            //偏倚,取x轴的一半
            anchor: new window.BMap.Size(18,42)

        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{icon:startPointIcon})
        this.map.addOverlay(bikeMarkerStart)
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon})
        this.map.addOverlay(bikeMarkerEnd)
        
        //绘制车辆行驶路线
        //路线列表
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]));
        })
        //点位,配置
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1,
        })
        this.map.addOverlay(polyLine)

        //绘制服务区
        let servecePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item)=>{
            servecePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servecePointList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1,
        })
        this.map.addOverlay(polyServiceLine)

        //添加地图中的自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point,{icon:bikeIcon})
            this.map.addOverlay(bikeMarker)
        })
    }
    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}