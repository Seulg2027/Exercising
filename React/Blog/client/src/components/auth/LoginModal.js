import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    Label,
    ModalHeader,
    NavLink,
} from 'reactstrap';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';


function LoginModal({ theme }) {
    // useState
    const [ modal, setModal ] = useState(false);
    const [ localMsg, setLocalMsg ] = useState("");
    // 에러를 일으켰을 때 localMsg가 들어감
    const [form, setValues ] = useState({
        email: "",
        password: "",
    });
    
    const dispatch = useDispatch();
    const { errorMsg } = useSelector(state => state.auth);

    useEffect(() => {
        try{
            setLocalMsg(errorMsg); // errorMsg를 로컬메세지 state에 추가
        } catch(e){
            console.log(e);
        }
    }, [errorMsg]);

    const onSubmit = (e) =>{
        e.preventDefault();
        const { email, password } = form; 
        const user = { email, password };
        
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        });
        console.log("로그인버튼 클릭");
    };
    
    // modal을 켜고 끄는 함수!
    // CLEAR_ERROR_REQUEST는 모달에 뜨는 메세지를 지워줌
    const handleToggle = () =>{
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        }); //payload는 설정 안해줌
        setModal(!modal); //모달을 키거나 끈다
    }

    const onChange = (e) =>{
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    }


    return(
        <div>
            <NavLink
                onClick= {handleToggle}
                href="#"
                className={
                    theme === "dark"
                    ? "text-decoration-none text-white p-0"
                    : "text-decoration-none text-dark p-0"
                }
                style={style.loginLink}
            >
                LOGIN
            </NavLink>
            <Modal
                isOpen={modal}
                toggle={handleToggle}
                className="custom-modal-style"
            >
                <ModalHeader toggle={handleToggle} style={style.ModalHeader}>
                    <b>Blog</b>
                </ModalHeader>
                <ModalBody>
                    { localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup> 
                            <div id="line" className="mb-3" style={style.textLine}>
                                소셜 계정으로 로그인
                            </div>
                            <div id="line" className="mt-2 mb-2" style={style.textLine}>
                                이메일로 로그인
                            </div>
                            <div style={style.emailLogin}>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    onChange={onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                                <Button color="dark" style={style.loginButton} block>
                                    LOGIN
                                </Button>
                            </div>
                            <div>
                                <div
                                    className="d-flex justify-content-center mt-3"
                                    style={style.register}>
                                    <span>
                                        <a href="/findpassword" className="text-decoration-none">
                                            Forgot Password?
                                        </a>
                                    </span>
                                </div>
                                <div
                                    className="d-flex justify-content-center mt-1"
                                    style={style.register}>
                                    <span>
                                        <span>Not a member?&nbsp;&nbsp; </span>
                                        <a href="/register" className="text-decoration-none">
                                            REGISTER
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

const style = {
    loginLink: { fontSize : "1.2rem" },
    modalHeader: { fontSize: "2rem" },
    loginButton: { marginTop: "2rem"},
    emailLogin: { width: "100%", marginLeft: "2.5%"},
    textLine: { width: "100%", marginLeft: "0"},
    register: { fontSize: "0.8rem" },
};

export default LoginModal;