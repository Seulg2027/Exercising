import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./normalRoute/Main";
import Header from "../Component/Header";


function Router() {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/' component={Main}/>
            </Switch>
        </>
    );
}

export default Router;