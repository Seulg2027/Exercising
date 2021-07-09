import { takeEvery, call, put, all, fork } from "redux-saga/effects";
import axios from "axios";
import { push } from "connected-react-router";
import {
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAILURE,
    COMMENT_WRITE_REQUEST,
    COMMENT_WRITE_SUCCESS,
    COMMENT_WRITE_FAILURE,
    COMMENT_LOADING_REQUEST,
    COMMENT_LOADING_SUCCESS,
    COMMENT_LOADING_FAILURE
}from "../types";

// Comment Loading
const commentLoadingAPI = (payload) => {
    return axios.get(`/api/post/${payload}/comments`);
}

function* loadComment(action) {
    try {
        const result = yield call(commentLoadingAPI, action.payload);

        yield put({
            type: COMMENT_LOADING_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        console.log(e)
        yield put({
            type: COMMENT_LOADING_FAILURE,
            payload: e
        })
    }
}

function* watchloadComment(){
    yield takeEvery(COMMENT_LOADING_REQUEST, loadComment);
}

//Write comment
const commentWriteAPI = (payload) => {
    // const config ={
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    // }

    // const token = payload.token;
    // if(token) {
    //     config.headers["x-auth-token"]= token;
    // }

    return axios.post(`/api/post/${payload.id}/comments`, payload);
}

function* writeComment(action){
    try {
        const result = yield call(commentWriteAPI, action.payload);

        yield put({
            type: COMMENT_WRITE_SUCCESS,
            payload: result.data
        });
    } catch(e) {
        yield put({
            type: COMMENT_WRITE_FAILURE,
            payload: e.response
        });
        console.log(e);

        yield push("/"); // react 라우터로 홈으로 보냄
    }
}

function* watchWriteComment(){
    yield takeEvery(COMMENT_WRITE_REQUEST, writeComment);
}


// Delete Comment
const deleteCommentAPI = (payload) =>{
    const config = {
        headers: {
            "Content-Type" : "application/json",
        },
    };

    const token = payload.token;

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return axios.delete(
        `/api/post/comment/${payload.commentId}`, payload, config
    );
};

function* deleteComment(action){
    try{
        const result = yield call(deleteCommentAPI, action.payload);

        yield put({
            type: COMMENT_DELETE_SUCCESS,
            payload: result.data,
        });
    } catch(e) {
        yield put({
            type: COMMENT_DELETE_FAILURE,
            payload: e.response,
        });
    }
}

function* watchdeleteComment() {
    yield takeEvery(COMMENT_DELETE_REQUEST, deleteComment);
}

export default function* commentSaga (){
    yield all([fork(watchWriteComment), fork(watchloadComment), fork(watchdeleteComment)]);
}