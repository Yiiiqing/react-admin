import React from 'react'
import { Link } from 'react-router-dom'
export default class Main extends React.Component{

    render(){
        ///根标签一定是路由
        // 实现路由跳转一定要放在容器下面
        return(
            <div>
                this is main page.
                <br/>
                <Link to="/main/test-id">嵌套路由1</Link>
                <br/>
                <Link to="/main/456">嵌套路由2</Link>

                <hr/>
                {this.props.children}
            </div>
        )
    }
}