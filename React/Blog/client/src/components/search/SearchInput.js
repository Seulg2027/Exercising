import React, { useState, useRef } from "react";
import { Form, Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { SEARCH_REQUEST } from "../../redux/types";

function SearchInput() {
    const dispatch = useDispatch();
    const [form, setValues] = useState({ searchBy: "" });
    const style = {
        searchInput: {
        width: "25%",
        marginLeft: "74%",
        },
    };

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: [e.target.value],
        });
    };
    const resetValue = useRef(null);

    const onSubmit = async(e) =>{
        await e.preventDefault();
        const { searchBy } = form;

        dispatch({
            type: SEARCH_REQUEST,
            payload: searchBy,
        });
        resetValue.current.value = "";
    }

    return (
        <>
            <Form onSubmit={onSubmit} className="col" style={style.searchInput}>
                <Input
                name="searchBy"
                onChange={onChange}
                innerRef={resetValue}
                className="form-control is-valid"
                placeholder="Search"
                />
            </Form>
        </>
    );
}

export default SearchInput;