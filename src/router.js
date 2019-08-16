import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
export default class MyRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                {/*子组件不能写很多个route,必须要根组件包裹 */}
                <App>
                    <Route path="/login" component={Login}/>
                    {/* 子路由用render来嵌套 */}
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Button}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/order/detail" component={Login}/>
                </App>
            </HashRouter>
        );
    }
}