import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Form, Container, Label, Input, Button } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { CHANGE_PASSWORD_REQUEST } from '../../redux/types';

function Findpassword() {
    const { isPasswordChange } = useSelector((state)=>state.auth);

    const [ form, setValue ] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const onSubmit = (e) =>{
        e.preventDefault();
        const { email, password } = form;
        const ChangeUser = {email, password};
        dispatch({
            type: CHANGE_PASSWORD_REQUEST,
            payload: ChangeUser,
        })
    }

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return(
        <>
        { isPasswordChange ? (
            <Container className="text-dark" style={style.firstContainer}>
                <div>
                    비밀번호가 변경되었습니다.
                </div>
            </Container>
        ) : (
        <Fade left>
            <Container style={style.secondContainer}>
                <div className="d-flex justify-content-center mt-4 mb-3">
                    <b style={{fontSize: "2rem"}}>비밀번호 변경</b>
                </div>
                <Form onSubmit={onSubmit} style={style.form}>
                    <FormGroup>
                        <Label for="email">
                            email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            password
                        </Label>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <div style={{width:"100%"}}>
                            <Button className="d-flex justify-content-center" style={{width:"100%"}}>확인</Button>
                        </div>
                    </FormGroup>
                </Form>
            </Container>
        </Fade>
        )}
        </>
    );
}

const style = {
    firstContainer: {

    },
    secondContainer: {
        width: "50%",
        marginTop: "14vh",
        border: "1px solid #212529",
        borderRadius: "5px",
        backgroundColor: "white",
        color: "black",
    },
    form: {
        width: "90%",
        marginLeft: "5%",
    }
}

export default Findpassword;