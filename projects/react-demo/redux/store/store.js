import {createStore} from "redux";
import incrementReducer from "../reducers/index";

const store = createStore(incrementReducer); // 连接 action和reducer 提供一个getState();dispath();subscribe()

export default store;