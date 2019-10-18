import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Admin from './admin';
import 'antd/dist/antd.css';
import Router from './router'

import * as serviceWorker from './serviceWorker';
// 整个项目的根组件要通过redux进行包裹,provider是提供数据源的,
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
