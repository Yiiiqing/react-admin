import React from 'react'
import {Card, Row, Col, Modal} from 'antd'

export default class Gallery extends React.Component{
    state={
        visible:false
    }
    openGallery = (imgSrc) =>{
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render(){
        const imgs = [
            ['300_dpi.png','adventure_map_2913095.png','bell.png','bow_arrow_2913123.png','candy.png'],
            ['castle_2913096.png','christmas_tree.png','destructive_magic_2913121.png','elf_2913120.png','fairy_2913099.png'],
            ['gift.png','item_bag_2913117.png','king_2913101.png','mistle_toe_2.png','mistle_toe.png'],
            ['mistle_toe.png','monster_2913115.png','orc_2913114.png','potion_2913113.png','santa_hat.png'],
            ['snowman.png','socks.png','spell_scroll_2913111.png','sword_2913105.png','viking_2913107.png']
        ]
        //双层map
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                style={{marginBottom:10}}
                cover={<img src={"/gallery/"+item} alt="gallery" onClick={()=>this.openGallery(item)}/>}
            >
                <Card.Meta
                    title="心情很差"
                    description="昨天分手,心情很差"/>
            </Card>
        ))
        return(
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[0]}
                    </Col>
                    <Col md={4}>
                        {imgList[1]}
                    </Col>
                    <Col md={4}>
                        {imgList[2]}
                    </Col>
                    <Col md={4}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    title="Gallery"
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                    >
                    <img src={this.state.currentImg} alt="图片" style={{width:'100%'}}/>
                </Modal>
            </div>
        )
    }
}