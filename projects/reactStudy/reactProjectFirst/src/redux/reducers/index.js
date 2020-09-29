const initialState = {
    number: 0
};
// reducer 用来处理action触发的对应的状态树的更改； 接受两个参数 - oldState , action
const incrementReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            state.number += 1;
            return {...state};
            break
        };
        default: return state;
    }
};

export default incrementReducer;