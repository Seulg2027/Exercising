import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const EditProtectedRoute = ({ component: Component, rest}) =>{ // rest => path, exact이다.
    const { userId } = useSelector((state) => state.auth); // 로그인한 유저
    const { creatorId } = useSelector((state) => state.post); // 포스트 작성한 유저

    return (
        <Route
            {...rest}
            render ={(props) =>{ if (userId === creatorId) {
                return <Component {...props}/>
            } else {
                // 로그인한 유저 != 작성자 이면 홈으로 돌아감
                return <Redirect to={{pathname: "/", state: { from: props.location, }}}/>
            }}}
        />
    );
}