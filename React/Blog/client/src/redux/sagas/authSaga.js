import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE
} from "../types";


const loginUserAPI = (loginData) =>{ //토큰은 로그인이 되어야 생성이 된다.
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return axios.post("api/auth/login", loginData, config);
}

function* loginUser(loginaction) {
    try {
        const result = yield call(loginUserAPI, loginaction.payload);

        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data,
        });
    } catch (e){
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

// 유저가 로그인하는지 takeEvery를 통해 감시하는 function
function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

// Logout
function* logout() {
    try{
        yield put({
            type: LOGOUT_SUCCESS,
        });
    } catch (e){
        yield put({
            type: LOGOUT_FAILURE,
        });
    }
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}

//Clear Error
function* clearError() {
    try{
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e){
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
    }
}

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

//Register
const registerUserAPI = (registerData)=>{
    const config ={
        headers : {
            "Content-Type": "application/json",
        },
    };
    return axios.post("api/user/register", registerData, config);
}

function* registerUser(action) {
    try{
        const result = yield call(registerUserAPI, action.payload);

        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data,
        });
    } catch(e){
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response,
        });
    }
}

function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser)
}

//Change password
const findPasswordAPI =(findpasswordData)=>{
    const config ={
        headers : {
            "Content-Type": "application/json",
        },
    };
    return axios.post("api/user/changepassword", findpasswordData, config);
}

function* findPassword(action) {
    const result = yield call(findPasswordAPI, action.payload);
    try {
        yield put({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: result.data,
        });
        console.log("비번 바꾸기 saga");
    } catch (e) {
        yield put({
            type: CHANGE_PASSWORD_FAILURE,
            payload: e.response,
        });
        console.log("비번 바꾸기 실패 saga");
    }
}

function* watchfindPassword() {
    yield takeEvery(CHANGE_PASSWORD_REQUEST, findPassword)
}

// userLoading 함수
const userLoadingAPI = (token) => {
    const config ={
        headers: {
            "Content-Type": "application/json",
        }
    }
    
    if(token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.get("api/auth/user", config);
}

function* userLoading(action) {
    try {
        const result = yield call(userLoadingAPI, action.payload);

        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch(e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        })
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

//takeEvery함수만 모아서,, export시켜준다
export default function* authSaga() {
    yield all ([fork(watchLoginUser), fork(watchlogout), fork(watchclearError), fork(watchregisterUser), fork(watchfindPassword), fork(watchuserLoading)]);
}