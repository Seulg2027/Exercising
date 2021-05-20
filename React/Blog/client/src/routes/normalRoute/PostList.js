import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import { useSelector } from 'react-redux';
import { Row, Alert } from 'reactstrap';

import { POST_LOADING_REQUEST } from '../../redux/types';
import Category from '../../components/post/Category';
import PostCardOne from '../../components/post/PostCardOne';

// skip/:skip으로 넘어갈 페이지

function PostList({ theme }) {
    const style = {
        categoryBox: {
            width: '96%',
            marginLeft: '2%',
            backgroundColor: `${theme === 'dark' ? 'white' : '#212529'}`,
            color: `${theme === 'dark' ? '#212529' : 'white'}`,
            borderLeft: '4px solid gray',
            borderRight: '4px solid gray',
            transition: 'all 0.50s linear',
        },
    };

    const { posts, categoryFindResult, loading, postCount } = useSelector((state) => state.post);
    // posts : 6개의 게시글
    // categoryFindResult : 모든 게시글들의 카테고리

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POST_LOADING_REQUEST,
            payload: 0,
        });
    }, [dispatch]);

    const skipNumberRef = useRef(0);
    const postCountRef = useRef(0);
    const endMsg = useRef(false);

    // 현재 게시글의 수
    postCountRef.current = postCount - 6;

    const useOnScreen = (options) => {
        const lastPostElementRef = useRef();
    };

    return (
        <>
            <br />
            <br />
            <Helmet title="BLOG - POST" />
            <Row className="d-flex justify-content-center mt-3 py-2 mb-5 sticky-top rounded" style={style.categoryBox}>
                <Category posts={categoryFindResult} />
            </Row>
            <Row>{posts ? <PostCardOne posts={posts} theme={theme} /> : GrowingSpinner}</Row>
            <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
            {loading ? (
                ''
            ) : endMsg ? (
                <div className="mt-4" style={{ width: '94%', marginLeft: '3%' }}>
                    <Alert color="danger" className="text-center font-weight-bolder">
                        더 이상의 포스트가 없습니다.
                    </Alert>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
