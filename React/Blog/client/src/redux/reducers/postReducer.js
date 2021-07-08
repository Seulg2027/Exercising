import {
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS,
    POST_LOADING_FAILURE,
    POST_UPLOAD_REQUEST,
    POST_UPLOAD_SUCCESS,
    POST_UPLOAD_FAILURE,
    POST_DETAIL_LOADING_REQUEST,
    POST_DETAIL_LOADING_SUCCESS,
    POST_DETAIL_LOADING_FAILURE,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from '../types';

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: '',
    postCount: '',
    loading: false,
    error: '',
    creatorId: '',
    categoryFindResult: '',
    title: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_UPLOAD_REQUEST:
        case POST_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                // 원래 있던 게시글 + 추가되는 게시글 //server3 봐라
                posts: [...state.posts, ...action.payload.postFindResult],
                categoryFindResult: action.payload.categoryFindResult,
                postCount: action.payload.postCount,
            };
        case POST_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case POST_UPLOAD_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case POST_UPLOAD_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case POST_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case POST_DETAIL_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                postDetail: action.payload,
                creatorId: action.payload.creator._id,
                title: action.payload.title,
            };
        case POST_DETAIL_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SEARCH_REQUEST:
            return {
                ...state,
                posts: [],
                searchBy: action.payload,
                loading: true,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchBy: action.payload,
                searchResult: action.payload,
                loading: false,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                searchResult: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
