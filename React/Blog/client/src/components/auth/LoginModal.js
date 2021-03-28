import React, { useState } from "react";
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


function LoginModal() {
    // useState
    const [modal, setModal] = useState(false);
    
    const dispatch = useDispatch();

    
    // modal을 켜고 끄는 함수!
    // CLEAR_ERROR_REQUEST는 모달에 뜨는 메세지를 지워줌
    const handleToggle = () =>{
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        }); //payload는 설정 안해줌
        setModal(!modal); //모달을 키거나 끈다
    }


    return(
        <div>
            <NavLink
                onClick= {handleToggle}
                to="#"
                className={
                    true
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
                    <Form>

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
};

export default LoginModal;