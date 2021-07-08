import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
} from '../types';

//인증의 초기state 지정
const initialState = {
    token: localStorage.getItem('token'),
    //localStorage 데이터를 브라우저상에 저장한다.
    //sessionStorage와 다르게 웹 페이지의 세션이 끝나도 데이터가 지워지지 않음
    isAuthenticated: null,
    isPasswordChange: false,
    isLoading: false,
    user: '',
    userId: '',
    userName: '',
    userRole: '',
    errorMsg: '',
    successMsg: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isPasswordChange: true,
                isLoading: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                userName: action.payload.user.name,
                errorMsg: '',
            };
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isPasswordChange: false,
                errorMsg: action.payload.data.msg,
                isLoading: false,
            };
        case REGISTER_FAILURE:
        case LOGOUT_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload.data.msg,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: '',
            };

        // LoginModal의 에러메세지 없애기
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
            };
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: '',
            };
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: 'Clear Error Fail',
            };

        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload._id,
                userId: action.payload._id, // 여기를 수정
                userName: action.payload.name,
                userRole: action.payload.role,
            };
        case USER_LOADING_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: '',
            };
        default:
            return state;
    }
};

export default authReducer;
