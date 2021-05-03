import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Progress,
} from 'reactstrap';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdpater";

import { POST_UPLOAD_REQUEST } from "../../redux/types";
import { formatWithOptions } from 'util';


function PostWrite() {
    // 인증된 유저만 게시글 작성 가능. 따라서 role: master인 유저만 가능!
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [ form, setValues ] = useState({
        title: "",
        contents: "",
        fileUrl: "",
    });
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        await e.preventDefault();
        
        const { title, contents, fileUrl, category } = form;
        const token = localStorage.getItem("token");
        const body = { title, contents, fileUrl, category, token};

        dispatch({
            type: POST_UPLOAD_REQUEST,
            payload: body,
        });
    }

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 게시글에 이미지 url을 fileUrl에 저장
    const getDataFromCKEditor = (event, editor) => {
        const data = editor.getData();
        // 이미지가 있다면!
        if (data && data.match("<img src=")) {
            const whereImg_start = data.indexOf("<img src=");

            // 이미지 url 지정
            let whereImg_end = "";
            let ext_name_find = "";
            let result_Img_Url = "";

            // 이미지 확장자 지정
            const ext_name = ["jpeg", "png", "gif", "jpg"];

            for (let i=0; i<ext_name.length; i++){
                if (data.match(ext_name[i])){
                    // 확장자 저장
                    ext_name_find = ext_name[i];
                    // 확장자가 나오기 전까지 
                    whereImg_end = data.indexOf(`${ext_name[i]}`);
                }
            }

            if (ext_name_find === "jpeg"){
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
            } else {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
            }
            setValues({
                ...form,
                fileUrl: result_Img_Url,
                contents: data,
            });

        } else {  // 이미지가 없으면 fileUrl을 빈 값으로 저장합니다
            setValues({
                ...form,
                fileUrl: "",
                contents: data,
            });
        }
    }

    return (
        <div>
            {isAuthenticated ? (
                <Form onSubmit={onSubmit} className="mt-5">
                    <FormGroup className="mb-3">
                        <Label for="title">Title</Label>
                        <Input 
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="category">Category</Label>
                        <Input
                            type="text"
                            name="category"
                            id="category"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    {/* CKEditor 넣는 부분 */}
                    <FormGroup className="mb-3">
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            onReady={Myinit}
                            onBlur={getDataFromCKEditor}
                        />
                        <Button
                            color="success"
                            block
                            className="mt-3 col-md-2 offset-md-10 mb-3"
                            >
                            작성하기
                        </Button>
                    </FormGroup>
                </Form>
            ) : (
                <Col width={50} className="p-5 m-5">
                    <Progress animated color="info" value={100}/>
                </Col>
            )}
        </div>
    );
}


export default PostWrite;