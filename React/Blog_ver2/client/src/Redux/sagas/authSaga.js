import axios from 'axios';
import { fork, all } from 'redux-saga';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../type';

const loginUserAPI = {
    
}

export default authSaga(()=>{
    yield all([fork()], )
});