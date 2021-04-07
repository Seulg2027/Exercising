import React from 'react';
import { Container, Row } from 'reactstrap';
import Fade from 'react-reveal/Fade';


function MainBody({ theme }) {
    return(
        <>
            <Fade bottom>
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
            </Fade>
        </>
    );
}

const style = {
    container : {
        marginTop : "5vh",
        height: "65vh"
    }
}

export default MainBody;