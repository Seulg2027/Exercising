import {
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAILURE,
    COMMENT_WRITE_REQUEST,
    COMMENT_WRITE_SUCCESS,
    COMMENT_WRITE_FAILURE,
    COMMENT_LOADING_REQUEST,
    COMMENT_LOADING_SUCCESS,
    COMMENT_LOADING_FAILURE,
} from '../types';

const initialState = {
    isAuthenticated: false, // 처음엔 false로 해둠
    comments: [],
    creatorId: '',
    isLoading: '',
    errorMsg: '',
    // postId: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case COMMENT_LOADING_REQUEST:
        case COMMENT_WRITE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case COMMENT_LOADING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload, // 데이터 베이스에 저장된 comments를 가져온다.
            };
        case COMMENT_WRITE_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.payload], // 변경한 state값을 가져옴
                isAuthenticated: true,
                isLoading: false,
            };
        case COMMENT_LOADING_FAILURE:
        case COMMENT_WRITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload.data.msg,
            };
        case COMMENT_DELETE_SUCCESS:
            window.location.reload();
            return {
                ...state,
            };
        default:
            return state;
    }
}
