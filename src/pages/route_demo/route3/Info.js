import React from 'react'
export default class Info extends React.Component{

    render(){
        ///根标签一定是路由
        // 实现路由跳转一定要放在容器下面
        return(
                <div>
                    this is info page.
                    这里是设置动态路由功能.
                    动态路由: {this.props.match.params.value}
                </div>
        )
    }
}