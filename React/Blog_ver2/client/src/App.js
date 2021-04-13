import React from 'react';
import { Provider } from 'react-router-dom';
import Router from './Route/Router';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
