import React, {component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from '../src/App/login';
import Editor from '../src/App/editor'
import ProductsForm from "../src/App/productsForm";
import ClientsManage from "../src/App/clientsManage";
import AddressManage from "../src/App/address";
import ProductsFormManage from "../src/App/productsFormManage";
// react-router 实现了路由的核心功能， react-router-dom 基于react-router ，加入了一些浏览器运行环境下的一些功能。比如Link 已经加载react-router

export default () => (
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/editor' component={Editor}/>
            <Route path='/productsForm' component={ProductsForm}/>
            <Route path='/clientsManage' component={ClientsManage}/>
            <Route path='/addressManage' component={AddressManage}/>
            <Route path='/productsFormManage' component={ProductsFormManage}/>
            <Redirect from='/' to='/productsForm'/>
        </Switch>

)