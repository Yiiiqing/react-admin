import React from 'react';
import { Card }from 'antd';
import axios from '../../axios'
import './detail.less'

export default class OrderDetail extends React.Component{
    state={}
    componentDidMount(){
        let orderId = this.props.match.params.orderId;//这个要记下来!!!match.params取参数
        if(orderId){
            this.getDetailInfo(orderId)
        }

    }

    getDetailInfo = (orderId) => {
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }

        })
    }
    renderMap = (result) => {
        this.map = new window.BMap.Map("orderDetailMap",{enableMapClick:false});
        this.map.centerAndZoom('北京',11);
        //添加地图控件
        this.addMapControl();
        //调用路线图绘制方法
        this.drawBikeRoute(result.position_list)
    }
    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
    }
    //绘制行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length>0){
            let arr = positionList[0]//起始坐标
            startPoint = new window.Bmap.Point(arr.lon,arr.lat)
            let startIcon = new window.BMap.Icon('/assets/point05.png', new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(36,42)
            })
            let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
            this.map.addOverlay(startMarker);
        }
    }
    render(){
        const info = this.state.orderInfo || {}//如果是空就给大括号
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                </Card>

                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
