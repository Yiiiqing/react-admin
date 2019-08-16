import React from 'react'
export default class NoMatch extends React.Component{

    render(){
        ///根标签一定是路由
        // 实现路由跳转一定要放在容器下面
        return(
            <div>
                抱歉,您的页面不见咯
            </div>
        )
    }
}