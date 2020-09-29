import React from 'react';
import {increment} from "../../redux/actions";
import {connect} from "react-redux";
import RouterMsg from '../../router/router.config'
import {HashRouter as Router,Route, Link} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import store from "../../redux/store/store";

@connect(state => ({number: state.number}) , { increment})
// dispatch  => (bindActionCreators(increment, dispatch))
class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     number: 1
        // }
        console.log(this.props)
    }
    onClick() {
        // this.props.number.number = this.props.number.number + 1;
    }

    render(){
        /*const {number} = this.props;*/
        return (<div>
            <div>current number: {this.props.number}
            <button onClick={this.props.increment}>+1</button>
            </div>
            <Router>
                <ul>
                    <li><Link to='/login/'>to login</Link></li>
                    <li><Link to='/editor/'>to editor</Link></li>
                </ul>
                <div className='main_container'>
                    <RouterMsg/>
                </div>
            </Router>
        </div>)
    }
}
export default App;