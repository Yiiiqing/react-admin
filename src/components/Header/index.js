import React from 'react'
import { Row, Col } from 'antd';
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'
export default class Header extends React.Component{

    componentWillMount(){
        this.setState({
            userName:'张一清'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city ='310112';//闵行
        Axios.jsonp({
            url:'https://restapi.amap.com/v3/weather/weatherInfo?city='+city+'&key=b8b577de4edb39608ec242b13483efbc'
        }).then((res)=>{
            if(res.status === '1'){
                let data = res.lives[0];
                this.setState({
                    // dayPictureUrl:data.dayPictureUrl,
                    //高德无图,更改为地址
                    location:data.city,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        //取出menuType,用作二级导航(父组件Common.js传来)
        const menuType = this.props.menuType;
        return(
            <div className="header">
                <Row className="header-top">
                    {menuType?
                        <Col span="6" className="logo">
                            {/* public文件夹直接/不是./ */}
                            <img src="/assets/PAI-blue.svg" alt=""/>
                            <span>Yiqing的后台管理系统</span>
                        </Col>
                        :
                        ""
                    }
                    <Col span={24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                {
                    menuType?""
                    :
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            首页
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                                {/* <img src={this.state.dayPictureUrl} alt="天气"/> */}
                                {this.state.location}
                            </span> 
                            <span className="weather-detail">
                                {this.state.weather}
                            </span>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}