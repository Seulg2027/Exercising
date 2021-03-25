import { all, fork } from "redux-saga/effects";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([]);
}
// function* => generator function
// 함수가 특정 지점에서 끝나고 다음 실행 때는 끝난 지점에서 다시 시작
// yield -> return처럼 함수를 종료