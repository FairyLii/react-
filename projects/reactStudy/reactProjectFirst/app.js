import React from 'react';
import ReactDom from 'react-dom';
import App from './src/views/App';
import {Provider} from "react-redux";
import store from "./src/redux/store/store";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));