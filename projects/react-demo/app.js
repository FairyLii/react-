import React from 'react';
import ReactDom from 'react-dom';
import App from './src/App/index';
import {Provider} from "react-redux";
import store from "./redux/store/store";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));