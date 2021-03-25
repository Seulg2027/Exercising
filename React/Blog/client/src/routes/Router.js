import React, { Fragment } from 'react';
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "./normalRoute/Main";

function Router() {
    return (
        <Fragment>
            <Header />
                <Container>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/footer" exact component={Footer} />
                    <Route path="/header" exact component={Header} />
                </Switch>
                </Container>
            <Footer/>
        </Fragment>
    )
}

export default Router