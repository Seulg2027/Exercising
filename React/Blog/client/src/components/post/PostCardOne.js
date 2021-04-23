import React from "react";

function PostCardOne({ posts, theme }) {
    return (
        <>
            {Array.isArray(posts)
                ? posts.map(({ _id, title, contents, date}) => {
                    return(
                        <div key={_id} className="mb-3" style={style.container}>
                            <a
                                href={`/post/${_id}`}
                                className="text-light text-decoration-none"
                            >
                                <div
                                    className={theme === "dark" ? "text-white":"text-dark"}
                                >
                                {/* 타이틀 */}
                                    <div style={style.title}>
                                        <b>{title}</b>
                                    </div>
                                    <div className="mt-3" style={style.contents}>
                                        { contents.length >= 70
                                            ? contents.replace(/(<([^>]+)>)/gi, "").slice(0, 70)+
                                                "..."
                                            : contents.replace(/(<([^>]+)>)/gi, "")}
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-end mt-4"
                                    style={style.date}
                                >
                                {/* 날짜 */}
                                    <span>
                                        {/* date를 띄어쓰기 기준으로 자르고 잘린 내용 중 몇 번째 인덱스인지 표현해준다. */}
                                        Posted on {date.split(" ")[0]}&nbsp;{date.split(" ")[1]}{" "}
                                        {date.split(" ")[2]}
                                    </span>
                                </div> 
                            </a>
                        </div>
                    )
                })
            : ""}
        </>
    )
}

const style = {
    container: {
        width: "90%",
        marginLeft: "5%",
    },
    title: {
        fontSize: "2.2rem",
        transition: "all 0.50s linear",
    },
    contents: {
        fontSize: "1.3rem",
        transition: "all 0.50s linear",
    },
    date: { color: "gray", fontSize: "1.2rem" },
}

export default PostCardOne;