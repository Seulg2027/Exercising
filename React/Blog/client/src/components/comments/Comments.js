import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Form } from 'reactstrap';
import { COMMENT_LOADING_REQUEST, COMMENT_WRITE_REQUEST } from '../../redux/types';

function Comments({ id, userId, userName }) {
    const dispatch = useDispatch();
    const [form, setValues] = useState({
        contents: '',
    });

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        await e.preventDefault();

        const { contents } = form;
        const token = localStorage.getItem('token');
        const body = { contents, token, id, userId, userName };

        dispatch({
            type: COMMENT_WRITE_REQUEST,
            payload: body,
        });

        resetValue.current.value = '';
        setValues('');
    };
    const resetValue = useRef(null);

    useEffect(() => {
        dispatch({
            type: COMMENT_LOADING_REQUEST,
            payload: id,
        });
    }, [dispatch, id]);

    return (
        <>
            <Form onSubmit={onSubmit}>
                <InputGroup style={{ width: '400px', height: '70px' }}>
                    <Input innerRef={resetValue} type="textarea" name="contents" id="contents" onChange={onChange} placeholder="comments" />
                    <InputGroupAddon>
                        <InputGroupText>등록</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </>
    );
}

export default Comments;
