import React from "react";
import { Provider } from "react-redux";
// provider -> store랑 연결해주는거
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import Router from "./routes/Router";

import "./assets/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <Router />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;