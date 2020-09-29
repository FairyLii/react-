import React, {component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '../src/App/login';
import Editor from '../src/App/editor'
// react-router 实现了路由的核心功能， react-router-dom 基于react-router ，加入了一些浏览器运行环境下的一些功能。比如Link 已经加载react-router

export default () => (
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/editor' component={Editor}/>
        </Switch>

)