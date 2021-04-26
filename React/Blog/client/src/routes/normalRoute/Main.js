import React from 'react';
import { Container, Row } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { Helmet } from 'react-helmet';


function MainBody({ theme }) {
    const style = {
        container : {
            marginTop : "5vh",
            height: "65vh",
        },
        goPost :{
            width: "auto",
            backgroundColor: `${theme === "dark" ? "#212529" : "white" }`,
            color: `${theme === "dark" ? "white" : "#212529" }`,
            transition: "all 0.50s linear",
        }
    }
    
    return (
        <>
            <Helmet title="BLOG"/>
            <Container 
                id="content"
                className= "d-flex justify-content-center text-center align-items-center font-weight-bold"
                style={style.container}>
                <Fade left>
                    <Row>
                        Blog
                    </Row>
                </Fade>
            </Container>
            <Fade right>
                <a
                    href="/postlist"
                    className={`d-flex justify-content-end ${
                        theme === "dark" ? "text-white" : "text-dark"
                    } text-decoration-none`}
                    style={style.goPost}
                >
                    Go to Post&nbsp;&rarr;
                </a>
            </Fade> 
        </>
    );
}


export default MainBody;