import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home'
import Button from './pages/ui/button'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import OrderDetail from './pages/order/detail'
import Common from './common'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import PermissionUser from './pages/permission'
export default class MyRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                {/*子组件不能写很多个route,必须要根组件包裹 */}
                {/* App.js是一切的入口,然后根据路由分发 */}
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={()=>
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" exact component={OrderDetail}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Common>
                        }/>
                        {/* 子路由用render来嵌套 */}
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/ui/buttons" component={Button}/>
                                    <Route path="/ui/modals" component={Modals}/>
                                    <Route path="/ui/loadings" component={Loadings}/>
                                    <Route path="/ui/notification" component={Notice}/>
                                    <Route path="/ui/messages" component={Messages}/>
                                    <Route path="/ui/tabs" component={Tab}/>
                                    <Route path="/ui/gallery" component={Gallery}/>
                                    <Route path="/ui/carousel" component={Carousels}/>
                                    <Route path="/form/login" component={FormLogin}/>
                                    <Route path="/form/reg" component={FormRegister}/>
                                    <Route path="/table/basic" component={BasicTable}/>
                                    <Route path="/table/high" component={HighTable}/>
                                    <Route path="/city" component={City}/>
                                    <Route path="/order" component={Order}/>
                                    <Route path="/user" component={User}/>
                                    <Route path="/bikeMap" component={BikeMap}/>
                                    <Route path="/charts/bar" component={Bar}/>
                                    <Route path="/charts/pie" component={Pie}/>
                                    <Route path="/charts/line" component={Line}/>
                                    <Route path="/rich" component={RichText}/>
                                    <Route path="/permission" component={PermissionUser}/>
                                    <Redirect to="/home"/>
                                    {/* 匹配不到任何路由,重定向 */}
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}