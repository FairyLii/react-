import React from 'react';
import {increment} from "../../redux/actions";
import {connect} from "react-redux";
import RouterMsg from '../../router/router.config'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {createHashHistory} from 'history'; // 如果是hash路由
import {Menu, Button} from 'antd';

const {SubMenu} = Menu;
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../styles/index.scss'
import {bindActionCreators} from 'redux';
import store from "../../redux/store/store";

const history = createHashHistory();

@connect(state => ({number: state.number}), {increment})
// dispatch  => (bindActionCreators(increment, dispatch))
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            currentSelect: 'productsForm'
        };
    }

    gotoContent(item) {
        history.push(`/${item.key}`);
        //this.setState({currentSelect: item.key});
        this.setState((state, props) => ({currentSelect: item.key}));
    }
    componentDidMount() {
        this.setState((state, props) => ({currentSelect: history.location.pathname.replace('/','')}));
    }

    render() {
        return (<div className="total">
            <div className="header">
                出库单系统
            </div>
            <div className="container">
                <div className="menu">
                    <Menu
                        selectedKeys={[this.state.currentSelect]}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="productsForm" onClick={this.gotoContent.bind(this)}>
                            出库单
                        </Menu.Item>
                        <Menu.Item key="productsFormManage" onClick={this.gotoContent.bind(this)}>
                            出库单管理
                        </Menu.Item>
                        <Menu.Item key="clientsManage" onClick={this.gotoContent.bind(this)}>
                            客户管理
                        </Menu.Item>
                        <Menu.Item key="addressManage" onClick={this.gotoContent.bind(this)}>
                            地址管理
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="app_container">
                    <Router>
                        {/*<ul>*/}
                        {/*    <li><Link to='/login/'>to login</Link></li>*/}
                        {/*    <li><Link to='/editor/'>to editor</Link></li>*/}
                        {/*</ul>*/}
                        <div>
                            <RouterMsg/>
                        </div>
                    </Router>
                </div>
            </div>
        </div>)
    }
}

export default App;