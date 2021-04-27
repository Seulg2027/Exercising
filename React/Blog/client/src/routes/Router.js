import React from 'react';
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

//theme에 관한 import
import { ThemeProvider } from "styled-components"; //ThemeProvider로 감싼 component들은 theme을 전달받아서 사용가능
import { lightTheme, darkTheme } from "../assets/theme";
import { GlobalStyles } from "../assets/global";
import { useDarkMode } from "../assets/useDarkMode";
import Toggle from "../assets/Toggle";

import Fade from "react-reveal/Fade";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "./normalRoute/Main";
import Register from './normalRoute/Register';
import Findpassword from './normalRoute/Findpassword';
import PostList from './normalRoute/PostList';
import PostWrite from './normalRoute/PostWrite';

function Router() {
    // mountedComponent는 컴포넌트가 mount되는지 안되는지 구별
    const [theme, themeToggler, mountedComponent] = useDarkMode();

    //themeMode 선언
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    let HideHeader =
        window.location.pathname
            === "/register" ? null : window.location.pathname
            === "/findpassword" ? null : (<Header theme={theme} />);
    
    if (!mountedComponent) return <div />;
    
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            {HideHeader}
            <Fade right>
                <Toggle theme={theme} toggleTheme={themeToggler} />
            </Fade>
            <Container>
                <Switch>
                    <Route path="/" exact render={()=> <Main theme={theme}/>} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/findpassword" exact component={Findpassword} />
                    <Route path="/postlist" exact render={() => <PostList theme={theme}/> } />
                    <Route path="/postwrite" exact component={PostWrite} />
                </Switch>
            </Container>
            <Footer theme={theme}/>
        </ThemeProvider>
    );
}

export default Router;
