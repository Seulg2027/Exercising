import React from 'react';
import { Container } from 'reactstrap';
import img1 from '../../assets/images/cat.png';

function Main() {
    return(
        <Container>
            <div className="mt-5">
                <h1 style={{fontSize: "85px"}}>
                    <p style={style.accent}>SGL</p>&nbsp;Blog
                </h1>
                <p style={{ color: "#4f4f4f" }}>
                    생각을 정리하고 쌓아두는 공간입니다.<br/>
                    React 클론 코딩을 통해 만들어졌습니다.
                </p>
                <img src={img1} style={style.img}/>
            </div>
        </Container>
    );
}

const style = {
    accent: { color: "#F48060", display: "inline-block"},
    img: {
        width: "180px",
        float: "right",
        position: "absolute",
        top: "130px",
        left: "900px"
    },
}

export default Main;