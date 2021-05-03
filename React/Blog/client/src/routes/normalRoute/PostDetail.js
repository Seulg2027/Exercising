import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
    POST_DETAIL_LOADING_REQUEST,
    USER_LOADING_REQUEST,
    POST_DELETE_REQUEST,
    COMMENT_DELETE_REQUEST
} from '../../redux/types';
import { Button, Row, Container} from 'reactstrap';
import { Link } from 'react-router-dom';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";


function PostDetail(req) {
    // postDetail의 props에 이미 req가 받아짐.
    // component로 꼭 써서 route에 받아와야함
    // 로컬스토리지에 저장해둔 theme가져온다.
    const theme = localStorage.getItem("theme");

    const style = {
        container: {
            backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
            color: `${theme === "dark" ? "white" : "black"}`,
            minHeight: "70vh",
            transition: "all 0.50s linear",
        },
        editor: {
            width: "100%",
            height: "auto",
            minHeight: "20vh",
            wordBreak: "break-all",
          },
    }

    const dispatch = useDispatch();
    
    const { postDetail, creatorId, title, loading } = useSelector(
        (state) => state.post
    );
    const { date, creator, category, contents } = postDetail;

    const { userId, userName } = useSelector((state) => state.auth);

    //const { comments } = useSelector((state) =>  state.comment);

    useEffect(() => {
        dispatch({
          type: POST_DETAIL_LOADING_REQUEST,
          payload: req.match.params.id,
        });
    
        dispatch({
          type: USER_LOADING_REQUEST,
          payload: localStorage.getItem("token"),
        });
      }, [dispatch, req.match.params.id]);

    //게시글 삭제
    const onDeleteClick = () => {
        //action.payload => id와 token을 같이 줌
        // id : delete할 post를 찾음
        // token : 작성한 유저만 삭제 가능
        dispatch({
            type: POST_DELETE_REQUEST,
            payload: {
                id: req.match.params.id,
                token: localStorage.getItem("token"),
            }
        })
    }

    // 댓글 삭제
    const onCommentDeleteClick = (commentId) => {
        dispatch({
            type: COMMENT_DELETE_REQUEST,
            payload: {
                userId: userId,
                commentId: commentId,
                postId: req.match.params.id,
                token: localStorage.getItem("token"),
            },
        });
    };

    // 수정 삭제 버튼 컴포넌트
    const EditButton = (
        <>
            <div className="d-flex justify-content-end pb-3">
                <div className="mr-2">
                    <Link
                        to={`/post/${req.match.params.id}/edit`}
                        className="btn btn-success btn-block"
                    >
                        EDIT
                    </Link>
                </div>
                <div>
                    <Button
                        className="btn-danger btn-block"
                        onClick={onDeleteClick}
                    >
                        DELETE
                    </Button>
                </div>
            </div>
        </>
    );

    //PostDetail의 전체적인 부분을 나타내는 컴포넌트
    const Body = (
        <Container
            style={style.container} className="mb-4 p-3">
            <Row className="d-flex p-3 mb-1 justify-content-center mt-3 pt-5">
                {(postDetail && creator) ? (
                    <div className="font-weight-bold" style={{ fontSize: "2.5rem" }}>
                        {postDetail.title}
                    </div>
                ) : ("") }
            </Row>
            {postDetail ? (
                <>
                    <div
                        className="d-flex justify-content-between pb-4"
                        style={{ borderBottom: "1px solid gray" }}
                    >
                        <span className="ml-2">
                            <Button outline color="primary">
                                {category.categoryName}
                            </Button>
                        </span>
                        <span className="text-muted" style={{ fontSize: "1.2rem" }}>
                            Posted on {date.split(" ")[0]}&nbsp;
                            {date.split(" ")[1]} {date.split(" ")[2]}
                        </span>
                        <div className="mb-3 mt-4 p-3" style={style.editor}>
                            <CKEditor
                            editor={BalloonEditor}
                            data={contents}
                            config={editorConfiguration}
                            disabled="true"
                            />
                        </div>
                        {/* 로그인한 사용자와 작성자가 같을 시 수정삭제 버튼 */}
                        { userId === creatorId ? EditButton: ""} 
                        {/* <Row>
                            <Container>
                                <div
                                    style={{
                                        borderBottom: `1px solid ${
                                          theme === "dark" ? "white" : "gray"
                                        }`,
                                    }}
                                >
                                    <b>{comments.length}&nbsp;Comments</b>
                                </div>
                                <Comments/>
                                {Array.isArray(comments)
                                    ? comments.map(
                                        ({contents, creator, date, _id, creatorName }) => (
                                            <div key={_id} className="mb-2">
                                                <Row className="d-flex justify-content-between p-2">
                                                    <div style={{ fontSize: "1.1rem" }}>
                                                        <b>{creatorName ? creatorName : creator}</b> &nbsp;
                                                        <span
                                                            className="font-weight-light"
                                                            style={{color: "gray", fontSize:"0.8em"}}
                                                        >
                                                            &nbsp;{date}
                                                        </span>
                                                    </div>
                                                </Row>
                                                <Row className="p-2">
                                                    <div>{contents}</div>
                                                </Row>
                                                {creator === userId && userId ? (
                                                    <div className="d-flex justify-content-center">
                                                        <span
                                                         style={{cursor: "pointer"}}
                                                         onClick={()=> onCommentDeleteClick}>
                                                            삭제
                                                        </span>
                                                    </div> 
                                                ) : ("")}
                                            </div>
                                        )
                                    )
                                : "Creator"}
                            </Container>
                        </Row> */}
                    </div>
                </>
            ) : ("")}
        </Container>
    );

    return (
        <div>
            <Helmet title={title} />
            {loading === true ? GrowingSpinner : Body}
        </div>
    );

}

export default PostDetail;