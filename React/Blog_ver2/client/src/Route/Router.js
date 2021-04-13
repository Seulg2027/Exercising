import React from "react";
import { Provider, Route } from "react-router-dom";

import Main from "./normalRoute/Main";


function Router() {
    return (
        <Provider>
            <Route exact path='/' component={Main}/>
        </Provider>        
    );
}

export default Router;