import React from 'react';
import { Row, Col } from "reactstrap";
import Fade from "react-reveal/Fade";

function Footer() {
    return (
        <Fade bottom>
            <div className="text-center p-2">
                <Row style={{width: "100%"}}>
                    <Col>
                        <p style={{ fontSize: "0.85rem"}}>
                            &copy;
                            <a
                                href="http://github.com/Lee-developer-git"
                                className="text-decoration-none text-white"
                                target="_blank"
                                rel="noreferrer"
                            >
                            <b>Seulgi</b>
                            </a>
                            , I built a blog in <b>2021</b>
                        </p>
                    </Col>
                </Row>
            </div>
        </Fade>
    )
}

export default Footer