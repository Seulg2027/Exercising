import React from 'react';
import { Provider } from "react-redux";
import Router from './Route/Router';
import { ConnectedRouter } from "connected-react-router";
// import { history } from "./store";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Main from "./Route/normalRoute/Main";
import Header from "./Component/Header";

import "./assets/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import store from './store';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;