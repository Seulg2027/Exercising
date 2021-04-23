import {
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS,
    POST_LOADING_FAILURE,
} from "../types";


const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: "",
    postCount: "",
    loading: false,
    error: "",
    creatorId: "",
    categoryFindResult: "",
    title: "",
    searchBy: "",
    searchResult: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_LOADING_SUCCESS:
            return {
                loading: false,
                posts: [...state.posts, ...action.payload.postFindResult],
                categoryFindResult: action.payload.categoryFindResult,
                postCount: action.payload.postCount,
                loading: false,
            };
        case POST_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        
        default:
            return state;
    }
}