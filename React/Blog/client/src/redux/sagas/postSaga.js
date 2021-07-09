import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS,
    POST_LOADING_FAILURE,
    POST_UPLOAD_REQUEST,
    POST_UPLOAD_SUCCESS,
    POST_UPLOAD_FAILURE,
    POST_EDIT_UPLOADING_FAILURE,
    POST_EDIT_UPLOADING_REQUEST,
    POST_EDIT_UPLOADING_SUCCESS,
    POST_DETAIL_LOADING_REQUEST,
    POST_DETAIL_LOADING_SUCCESS,
    POST_DETAIL_LOADING_FAILURE,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILURE,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from '../types';

// All Posts Load
const loadPostAPI = () => {
    return axios.get('/api/post/skip/${payload}'); //가져오기만 하는 것이기 때문에 get
};
// skip/:skip으로 되어있고, ${payload}는 :skip을 의미함.

function* loadPosts(action) {
    try {
        const result = yield call(loadPostAPI, action.payload); //함수 실행

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
const uploadPostAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = payload.token;
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.post('/api/post/write', payload, config);
};

function* uploadPost(action) {
    try {
        const result = yield call(uploadPostAPI, action.payload);
        console.log(result); //업로드 payload를 보여줌

        yield put({
            type: POST_UPLOAD_SUCCESS,
            payload: result.data,
        });

        yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: POST_UPLOAD_FAILURE,
            payload: e,
        });
    }
}

function* watchuploadPost() {
    yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

// Post detail loading
const loadPostDetailAPI = (payload) => {
    return axios.get(`/api/post/${payload}`);
};
// 포스트의 payload를 api url로 보냄

function* loadPostDetail(action) {
    try {
        const result = yield call(loadPostDetailAPI, action.payload);

        yield put({
            type: POST_DETAIL_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: POST_DETAIL_LOADING_FAILURE,
            payload: e,
        });

        //포스트 로딩에 실패시 홈으로 돌아감
        yield put(push('/'));
    }
}

function* watchloadPostDetail() {
    yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post delete
const deletePostAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = payload.token;
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
    try {
        const result = yield call(deletePostAPI, action.payload);

        yield put({
            type: POST_DELETE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: POST_DELETE_FAILURE,
            payload: e,
        });
    }
}

function* watchdeletePost() {
    yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

// Post Edit Upload
const PostEditUploadAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const token = payload.token;
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return axios.post(`api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
    try {
        const result = yield call(PostEditUploadAPI, action.payload);
        yield put({
            type: POST_EDIT_UPLOADING_SUCCESS,
            payload: result.data,
        });
        console.log(result);
        yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: POST_EDIT_UPLOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchPostEditUpload() {
    yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

// Search
const SearchResultAPI = (payload) => {
    return axios.get(`/api/search/${payload}`);
};

function* SearchResult(action) {
    try {
        const result = yield call(SearchResultAPI, action.payload);
    
        yield put({
            type: SEARCH_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/search/${action.payload}`));
    } catch (e) {
        yield put({
            type: SEARCH_FAILURE,
            payload: e,
        });
    
        action.put(push("/"));
    }
}

function* watchSearchResult() {
    yield takeEvery(SEARCH_REQUEST, SearchResult);
}


export default function* postSaga() {
    yield all([fork(watchloadPosts), fork(watchuploadPost), fork(watchloadPostDetail), fork(watchdeletePost), fork(watchSearchResult), fork(watchPostEditUpload)]);
}