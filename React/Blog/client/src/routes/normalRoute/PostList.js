import React from 'react';
import { useSelector } from 'react-redux';
import { POST_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet';
// react-helmet : 문서 헤드에 대한 모든 변경사항을 관리할 수 있는 컴포넌트
// html 태그를 끌어와 사용할 수 있어서 편리하다고함

import { Alert, Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner';
import PostCardOne from '../../components/post/PostCardOne';
import Category from '../../components/post/Category';

function PostList({ theme }) {
    const style = {
        categoryBox: {
          width: "96%",
          marginLeft: "2%",
          backgroundColor: `${theme === "dark" ? "white" : "#212529"}`,
          color: `${theme === "dark" ? "#212529" : "white"}`,
          borderLeft: "4px solid gray",
          borderRight: "4px solid gray",
          transition: "all 0.50s linear",
        },
      };
    
    // postReducer => initialState안의 변수 가져온다.
    // post 모든 게시글 / categoryFindResult 모든 카테고리의 배열
    const { posts, categoryFindResult } = useSelector(
        (state) => state.posts
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POST_LOADING_REQUEST,
        });
    }, [dispatch]); //컴포넌트가 다 mount된 후 loading request를 saga에 보내준다.

    return (
        <>
            <br/>
            <br/>
            <Helmet title="BLOG - POST" />
            <Row
                className="d-flex justify-content-center mt-5 py-2 mb-5 sticky-top rounded"
                style={style.categoryBox}
            >
                <Category posts={categoryFindResult} />    
            </Row>
            <Row>
                {posts ? <PostCardOne posts={posts} theme={theme}/> : GrowingSpinner}
            </Row>
        </>
    );
}

export default PostList;