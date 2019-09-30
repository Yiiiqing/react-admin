import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
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
export default class MyRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                {/*子组件不能写很多个route,必须要根组件包裹 */}
                {/* App.js是一切的入口,然后根据路由分发 */}
                <App>
                    <Route path="/login" component={Login}/>
                    {/* 子路由用render来嵌套 */}
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Button}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route path="/admin/ui/loadings" component={Loadings}/>
                                <Route path="/admin/ui/notification" component={Notice}/>
                                <Route path="/admin/ui/messages" component={Messages}/>
                                <Route path="/admin/ui/tabs" component={Tab}/>
                                <Route path="/admin/ui/gallery" component={Gallery}/>
                                <Route path="/admin/ui/carousel" component={Carousels}/>
                                <Route path="/admin/form/login" component={FormLogin}/>
                                <Route path="/admin/form/reg" component={FormRegister}/>
                                <Route path="/admin/table/basic" component={BasicTable}/>
                                <Route path="/admin/table/high" component={HighTable}/>
                                <Route path="/admin/city" component={City}/>
                                <Route path="/admin/order" component={Order}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/bikeMap" component={BikeMap}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/rich" component={RichText}/>

                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/common" render={()=>
                        <Common>
                            <Switch>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Common>
                    }/>
                </App>
            </HashRouter>
        );
    }
}