import { all, fork } from "redux-saga/effects"; //1. redux-saga 모듈
import axios from "axios"; //2. axios

// config,, 인증
import dotenv from "dotenv";
import authSaga from "./authSaga";
import postSaga from "./postSaga";
import commentSaga from "./commentSaga";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)]);
}
// function* => generator function
// 함수가 특정 지점에서 끝나고 다음 실행 때는 끝난 지점에서 다시 시작
// yield -> return처럼 함수를 종료