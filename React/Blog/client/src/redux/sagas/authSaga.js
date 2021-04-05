import axios from "axios";
import { all, call, put, takeEvery, fork, take } from "redux-saga/effects";
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
    REGISTER_REQUEST
} from "../types";


const loginUserAPI = (loginData) =>{
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
        console.log("login saga,,")
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
const registerUserAPI =(registerData)=>{
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

//takeEvery함수만 모아서,, export시켜준다
export default function* authSaga() {
    yield all ([fork(watchLoginUser), fork(watchlogout), fork(watchclearError), fork(watchregisterUser)]);
}