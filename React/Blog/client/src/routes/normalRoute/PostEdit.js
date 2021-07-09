import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
Button,
Col,
Form,
FormGroup,
Input,
Label,
Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdpater";

import { POST_EDIT_UPLOADING_REQUEST } from "../../redux/types";

import dotenv from "dotenv";
dotenv.config();

function PostWrite(){
    // 게시글 작성자만 게시글을 수정할 수 있게 설정
    const { isAuthenticated } = useSelector((state) => state.auth);
    // 원래 작성되어 있는 게시글 가져옴
    const { postDetail } = useSelector((state) => state.post);
    const [form, setValues] = useState({
        title: `${postDetail.title}`,
        contents: `${postDetail.contents}`,
        fileUrl: "",
    });
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        await e.preventDefault();
    
        const { title, contents, fileUrl } = form;
        const token = localStorage.getItem("token");
        const id = postDetail._id;
        const body = { title, contents, fileUrl, token, id };
    
        dispatch({
            type: POST_EDIT_UPLOADING_REQUEST,
            payload: body,
        });
    };

    const getDataFromCKEditor = (event, editor) => {
        const data = editor.getData();
    
        if (data && data.match("<img src=")) {
            const whereImg_start = data.indexOf("<img src=");
        
            let whereImg_end = "";
            let ext_name_find = "";
            let result_Img_Url = "";
    
            const ext_name = ["jpeg", "png", "gif", "jpg"];
    
            for (let i = 0; i < ext_name.length; i++) {
                if (data.match(ext_name[i])) {
                ext_name_find = ext_name[i];
        
                whereImg_end = data.indexOf(`${ext_name[i]}`);
                }
            }
    
            if (ext_name_find === "jpeg") {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
            } else {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
            }
    
            setValues({
                ...form,
                fileUrl: result_Img_Url,
                contents: data,
            });
        } else {
            setValues({
                ...form,
                fileUrl: "",
                contents: data,
            });
        }
    };

    const onChange = (e) =>{
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            {isAuthenticated ? (
                <Form onSubmit={onSubmit} className="mt-5">
                    <FormGroup className="mb-3">
                        <Label for="title">Title</Label>
                        <Input
                            defaultValue={form.title}
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="content">Content</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            data={form.contents}
                            onReady={Myinit}
                            onBlur={getDataFromCKEditor}/>
                        <Button type="submit" color="success" block>수정하기</Button>
                    </FormGroup>
                </Form>
            ) : (
                // 게시글 작성자가 아니면 보여지는 화면
                <Col width={50} className="p-5 m-5">
                    <Progress animated color="info" value={100} />
                </Col>
            )}  
        </div>
    );
}

export default PostWrite;