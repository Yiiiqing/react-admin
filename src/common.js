import React from 'react';
import {Row, Col} from 'antd';
import Header from './components/Header';
import './style/common.less';
// 不管是什么打开的第三方组件都放到这个Common.js
//通用页面
export default class Common extends React.Component{
    render(){
        return(
            <div>
                <Row className="simple-page">
                    {/* 通过menuType,控制显示header组件的不同样式 */}
                    <Header menuType="second"/>
                </Row>
                <Row className="simple-content">
                    {/* common.js仅仅是承载体 */}
                    {this.props.children}
                </Row>
            </div>
        )
    }
}