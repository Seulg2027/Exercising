import axios from 'axios';
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS,
    POST_LOADING_FAILURE,
    POST_UPLOAD_REQUEST,
    POST_UPLOAD_SUCCESS,
    POST_UPLOAD_FAILURE
}from "../types";

// All Posts Load
const loadPostAPI = () => {
    return axios.get("/api/post/"); //가져오기만 하는 것이기 때문에 get
};

function* loadPosts() {
    try {
        const result = yield call(loadPostAPI);

        yield put({
            type: POST_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: POST_LOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchloadPosts() {
    yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

// Posts upload(write)
const uploadPostAPI = (payload) =>{
    const config ={
        headers: {
            "Content-Type" : "application/json",
        },
    };

    const token = payload.token;
    if(token) {
        config.headers["x-auth-token"]= token;
    }

    return axios.post("/api/post/write", payload, config);
};

function* uploadPost(action) {
    try {
        const result = yield call(uploadPostAPI, action.payload);
        console.log(result); //업로드 payload를 보여줌
        
        yield put({
            type: POST_UPLOAD_SUCCESS,
            payload: result.data,
        });
    } catch(e){
        yield put({
            type: POST_UPLOAD_FAILURE,
            payload: e,
        });
    }
}

function* watchuploadPost() {
    yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

export default function* postSaga() {
    yield all([
        fork(watchloadPosts), fork(watchuploadPost)
    ]);
}