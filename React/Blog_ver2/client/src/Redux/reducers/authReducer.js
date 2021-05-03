import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../type';

//initialState 초기화는 store.js에서 해줬음!
const initialState = {
    token: localStorage.token("token"),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userRole: "",
    errorMsg: "",
    successMsg: "",
};

export default authReducer(( state = initialState, action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
})