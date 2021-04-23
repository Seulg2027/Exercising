import React from "react";
import { Button } from "reactstrap";


function Category({ posts }) {
    return (
        <>
            {Array.isArray(posts)
                ? posts.map(({ _id, categoryName}) => ( //map함수 => key값을 필요로 한다.
                    <div key={_id} className="mr-3">
                        <a href={`/post/category/${categoryName}`}>
                            <span>
                                <Button>{categoryName}</Button>
                            </span>
                        </a>
                    </div>
                ))
            : ""}
        </>
    )
}


export default Category;