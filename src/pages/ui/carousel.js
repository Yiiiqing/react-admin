import React from 'react'
import {Card,Carousel} from 'antd'
import './ui.less'
export default class Carousels extends React.Component{

    render(){
        return(
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>很烦</h3></div>
                        <div><h3>心里很难受</h3></div>
                        <div><h3>怎么办</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap">
                    <Carousel autoplay effect="fade" className="slider-wrap">
                        <div>
                            <img src='/gallery/bell.png' alt=""/>
                        </div>
                        <div>
                            <img src='/gallery/sword_2913105.png' alt=""/>
                        </div>
                        <div>
                            <img src='/gallery/socks.png' alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}