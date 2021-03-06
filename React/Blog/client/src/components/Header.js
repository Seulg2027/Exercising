import React, { useCallback } from 'react';
import { Button, Col, Form, Row } from 'reactstrap';
import Fade from 'react-reveal/Fade'; //스타일 속성
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { LOGOUT_REQUEST } from '../redux/types';
import { CgProfile } from 'react-icons/cg';

import LoginModal from './auth/LoginModal';

function Header({ theme }) {
    const style = {
        logo: { fontSize: '2.3rem', transition: 'all 0.50s linear' },
        container: {
            marginRight: '5rem',
            paddingTop: '2.7rem',
        },
        dropdownToggle: {
            backgroundColor: `${theme === 'dark' ? '#212529' : 'white'}`,
            color: `${theme === 'dark' ? 'white' : '#212529'}`,
            border: '0',
            fontSize: '1.2rem',
            paddingTop: '0',
            transition: 'all 0.50s linear',
        },
        dropdownItem: {
            padding: '0',
        },
        logoutButton: { backgroundColor: 'white', color: '#212529' },
        contactButton: { fontSize: '1.2rem', transition: 'all 0.50s linear' },
    };
    // authReducer에 저장된 isAuthenticated 변수를 가져온다.
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);

    // dispatch 리액트 훅!
    const dispatch = useDispatch();

    // useCallback(function, 값) 값이 변할때마다 function을 실행
    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    return (
        <>
            <Fade top>
                <Row
                    style={{
                        borderBottom: `1px solid ${theme === 'dark' ? 'white' : 'black'}`,
                        transition: 'all 0.50s linear',
                    }}
                >
                    <Col xs="3" sm="3">
                        <a
                            href="/"
                            className={theme === 'dark' ? 'd-flex text-center pt-4 text-white text-decoration-none' : 'd-flex justify-content-center pt-4 text-dark text-decoration-none'}
                            style={style.logo}
                        >
                            <b>블로그</b>
                        </a>
                    </Col>
                    <Col xs="0" sm="2"></Col>
                    <Col xs="9" sm="7">
                        <div //컨테이너 사용
                            className="d-flex justify-content-center"
                            style={style.container}
                        >
                            <span>
                                {userRole === 'Master' ? (
                                    <Form>
                                        <a href="/postWrite" className="btn btn-secondary block text-whites text-decoration-none" style={{ width: '100px' }}>
                                            Add Post
                                        </a>
                                    </Form>
                                ) : (
                                    ''
                                )}
                            </span>
                            <span className="mr-5">
                                {isAuthenticated ? (
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={theme === 'dark' ? style.darkDropdownToggle : style.lightDropdownToggle}>
                                            <CgProfile />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ padding: '0' }}>
                                            <Dropdown.Item style={style.dropdownItem}>
                                                <Button onClick={onLogout} block style={style.logoutButton}>
                                                    LOGOUT
                                                </Button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : (
                                    <LoginModal theme={theme} />
                                )}
                            </span>
                            <a href="/contact" className={theme === 'dark' ? 'text-decoration-none text-white' : 'text-decoration-none text-dark'} style={style.contactButton}>
                                CONTACT
                            </a>
                        </div>
                    </Col>
                </Row>
            </Fade>
        </>
    );
}

const style = {
    logo: { fontSize: '2.3rem' },
    container: {
        marginRight: '5rem',
        paddingTop: '2.7rem',
    },
    darkDropdownToggle: {
        backgroundColor: '#212529',
        border: '0',
        fontSize: '1.2rem',
        paddingTop: '0',
    },
    lightDropdownToggle: {
        backgroundColor: 'white',
        border: '0',
        fontSize: '1.2rem',
        paddingTop: '0',
        color: '#212529',
    },
    dropdownItem: {
        padding: '0',
    },
    logoutButton: {
        backgroundColor: 'white',
        color: '#212529',
    },
    contactButton: { fontSize: '1.2rem' },
};

export default Header;
