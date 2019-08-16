import React from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topic from './Topic'

export default class Home extends React.Component{

    render(){
        ///根标签一定是路由
        // 实现路由跳转一定要放在容器下面
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Main}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                    </Switch>


                </div>
            </HashRouter>
        )
    }
}