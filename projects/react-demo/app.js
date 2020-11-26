import React from 'react';
import ReactDom from 'react-dom';
import App from './src/App/index';
import {Provider} from "react-redux";
import store from "./redux/store/store";
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from "moment";
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

ReactDom.render(
    <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'));