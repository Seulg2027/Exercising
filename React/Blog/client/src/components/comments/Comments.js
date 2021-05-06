import React from 'react';
import { useDispatch } from 'react-redux';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";
import {
    COMMENT_WRITE_REQUEST
} from "../../redux/types";


function Comments(req){

    const dispatch = useDispatch();

    const onCommentWriteClick = () => {
        dispatch({
            type: COMMENT_WRITE_REQUEST,
            payload: {
                postId: req.match.params.id,
                comment: req.match.params.Array,
                token: localStorage.getItem("token"),
            }
        })
    }

    return (
        <>
            <InputGroup style={{ width: "400px", height:"70px" }}>
                <Input />
                <InputGroupAddon onClick={onCommentWriteClick}>
                    <InputGroupText>등록</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </>
    );
}



export default Comments;