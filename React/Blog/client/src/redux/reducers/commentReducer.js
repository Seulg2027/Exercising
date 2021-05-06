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


const initialState = {
    isAuthenticated: "",
    comments: "",
    creator: "",
    creatorName: "",
    date: "",
    isLoading: "",
    errorMsg: "",
    postId: "",
    commentId: ""
}

export default function(state=initialState, action) {
    switch (action.type) {
        case COMMENT_LOADING_REQUEST:
        case COMMENT_WRITE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case COMMENT_LOADING_SUCCESS:
            return {
                ...state,
                isLoading:false,
                creator: action.payload.creator,
                creatorName: action.payload.creatorName,
                date: action.payload.date,
                comments: [...state.comments, action.payload.contents]
            };
        case COMMENT_WRITE_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case COMMENT_LOADING_FAILURE:
        case COMMENT_WRITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload,
            }
        
        default:
            return state
    }
};