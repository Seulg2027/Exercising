import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

// rootsaga와 rootreducer 설정!!
import createRootReducer from "./Redux/reducers/index";
import rootSaga from "./Redux/sagas";

export const history = createBrowserHistory();

//saga 설정
const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
    process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;