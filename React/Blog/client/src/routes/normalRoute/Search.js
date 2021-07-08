import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/types";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import SearchInput from "../../components/search/SearchInput";

function Search({ theme }) {
    const style = {
        categoryBox: {
        width: "96%",
        marginLeft: "2%",
        backgroundColor: `${theme === "dark" ? "white" : "#212529"}`,
        color: `${theme === "dark" ? "#212529" : "white"}`,
        borderLeft: "4px solid gray",
        borderRight: "4px solid gray",
        },
    };

    const dispatch = useDispatch();
    let { searchTerm } = useParams();
    const { searchResult } = useSelector((state) => state.post);

    useEffect(() => {
        if (searchTerm) { // searchTerm이 존재한다면
        dispatch({
            type: SEARCH_REQUEST,
            payload: searchTerm,
        });
        }
    }, [dispatch, searchTerm]);

    return (
        <>
            <br />
            <br />
            <SearchInput />
            <Row
                className="d-flex justify-content-center mt-3 py-2 mb-5 sticky-top rounded"
                style={style.categoryBox}
            >
                <div className="mr-3">
                <span style={{ fontSize: "1.5rem" }}>
                    Search Result for <b>{searchTerm}</b>
                </span>
                </div>
            </Row>
            <Row>
                <PostCardOne posts={searchResult} theme={theme} />
            </Row>
        </>
    );
}

export default Search;
