import React from 'react'
import { Card, Button, Spin, Icon, Alert} from 'antd'

export default class Loadings extends React.Component{

    render(){
        //const的内存地址是不能变的,如果是声明对象,对象里的东西是可以变的
        const icon = <Icon type="loading" style={{fontSize:24}}/>
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    {/* indicator只能是动态的才能动 */}
                    <Spin indicator={icon} style={{marginLeft:10}}/>
                </Card>
                <Card title="内容遮罩">
                    <Alert
                        message="React"
                        description="我要成为海贼王"
                        type="info"/>
                    <Alert
                        message="React"
                        description="我要成为海贼王"
                        type="warning"/>
                    <Spin tip="加载中..." indicator={icon}>
                        <Alert
                            message="React"
                            description="我要成为海贼王"
                            type="info"/>
                    </Spin>
                </Card>
            </div>
        )
    }
}