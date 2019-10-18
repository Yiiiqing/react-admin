/**
* 引入createStore创建store
*/

import { createStore } from 'redux'//引入创建方法
import reducer from '../reducer'//引入reducer
import { composeWithDevTools } from 'redux-devtools-extension'//引入调试工具

// export default ()=>createStore(reducer)//没有安装工具
export default ()=>createStore(reducer,composeWithDevTools())//有安装工具
