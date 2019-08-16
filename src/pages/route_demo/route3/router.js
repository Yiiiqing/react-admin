import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from './Main'
import Info from './Info'
import About from '../route1/About'
import Topic from './../route1/Topic'
import Home from './Home'
import NoMatch from './NoMatch'
export default class MyRoute extends React.Component{

    render(){
        return(
        ///根标签一定是路由
        // 实现路由跳转一定要放在容器下面
            <Router>
                <Home>
                    {/* 如果exact的话/a就不执行了,去掉他 */}
                    {/* 在父节点是/的时候还有子节点的时候,父节点不能是精准匹配exact */}
                    {/* 嵌套路由时候,要用render先加载子页面,在子页面里写嵌套路由 */}
                    <Switch>
                        <Route path="/main" render={()=>
                            <Main>
                                {/* <div>this is a sub child element</div> */}
                                <Route path='/main/:value' component={Info}></Route>
                            </Main>
                            }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route exact={true} path="/about/abc" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        )
    }
}