const express = require("express");
const { auth } = require("../../middleware/auth");
const { Post } = require("../../models/post");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const { Comment } = require("../../models/comment");

const router = express.Router();

const dotenv = require("dotenv");
const moment = require("moment");
const { isNullOrUndefined } = require("util");

dotenv.config();

// LOADING ALL POSTS
// 모든 포스트를 가져온다
// get은 조회하는 함수이지,, 
router.get("/", async(req, res) => {
    try{
        const postFindResult = await Post.find(); //보통 find를 쓸때는 await를 사용
        const categoryFindResult = await Category.find();
        const result = { postFindResult, categoryFindResult };

        res.json(result);
    } catch(e){
        console.log(e);
        res.json({ msg: "No Post"});
    }
});


// WRITE A POST /POST
router.post("/write", auth, async(req, res) => { // 포스트 작성할 때는 포스트의 아이디가 필요없음
    try{
        const { title, contents, fileUrl, creator, category } = req.body;

        const newPost = await Post.create({
            title,
            contents, 
            fileUrl,
            creator: req.user.id,
            date: moment().format("MMMM DD, YYYY"), //Month가 영어로 나온다^^
        });

        // 게시글 작성 시 카테고리가 있으면 findOne
        const categoryFindResult = await Category.findOne({
            categoryName: category
        });

        // 새로운 카테고리를 만들면 실행되는 함수
        if(isNullOrUndefined(categoryFindResult)) {
            const newCategory = await Category.create({
                categoryName: category,
            });

            await Post.findByIdAndUpdate(newPost._id,{
                $push: {
                    category: newCategory._id,
                },
            });
            await Category.findByIdAndUpdate(newCategory._id, {
                $push : {
                    posts : newPost._id, //mongoDB는 _id로 저장
                },
            });
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    posts: newPost._id,
                },
            });
        } else {
            await Category.findByIdAndUpdate(categoryFindResult._id,{
                $push: { posts: newPost._id },
            });
            await Post.findByIdAndUpdate(newPost._id, {
               category: categoryFindResult._id, 
            });
            await User.findByIdAndUpdate(req.user.id,{
                $push: {
                    posts : newPost._id
                }
            });
        }

        return res.redirect(`/api/post/${newPost._id}`);
    }catch(e){
        console.log(e);
    }
});

//POST DETAIL / GET
router.get("/:id", async(req, res, next)=>{
    try {
        const post = await Post.findById(req.params.id)
            .populate("creator")
            .populate({ path : "category", select : "categoryName" });
        
        post.views += 1;
        post.save();
        
        res.json(post);
    } catch (e){
        console.error(e);
        next(e);
    }
});


// DELETE POST / DELETE
router.delete("/:id", auth, async(req, res) => {
    await Post.deleteMany({ _id: req.params.id}); //deleteMany 함수에서도 await를 써준다
    await Comment.deleteMany({ post: req.params.id });
    await User.findByIdAndUpdate(req.user.id, {
        $pull: {
            post: req.params.id,
            comments: {post_id: req.params.id},
        },
    });

    const CategoryUpdateResult = await Category.findByIdAndUpdate(
        { posts: req.params.id }, // 카테고리에 있는 포스트 선택
        { $pull: { posts: req.params.id }}, //리액트 카테고리에 있는 포스트중에 삭제
        { new: true }
    );

    // 카테고리별로 게시글을 지워라.
    if ( CategoryUpdateResult.posts.length === 0 ){
        await Category.deleteMany({ _id: CategoryUpdateResult });
    }

    return res.json({ success: true });
});


// EDIT POST / POST
router.post("/:id/edit", async(req, res, next) =>{
    const {
        body: { title, contents, fileUrl, id},
    } = req;

    try {
        const modified_post = await Post.findByIdAndUpdate(
            id,
            {
                title,
                contents,
                fileUrl,
                date: moment().format("MMMM DD, YYYY"),
            },
            { new: true }
        );

        res.redirect(`/api/post/${modified_post}`);
    } catch(e){
        console.log(e);
        next(e); //next(e) 이게 모얌...
    }
});

// Find Category
router.get("/category/:cateoryName", async(req, res, next) =>{
    try {
        const result = await Category.findOne(
            {
                categoryName: {
                    $regex: req.params.categoryName,
                    $options: "i",
                },
            },
            "posts"
        ).populate({ path: "posts" });

        res.send(result);
    }catch(e){
        next(e);
    }
});


////////// Comments Route /////////////

// GET ALL COMMENTS / 조회함수,,
router.get("/:id/comments", async(req, res) => {
    try {
        const comment = await Post.findById(req.params.id).populate({
            path: "comments",
        }); // 객체화를 시켜주는 함수
        const result = comment.comments;
        res.json(result);
    } catch (e) {
        console.log(e);
    }
});

// WRITE COMMENT
router.post("/:id/comments", async(req, res, next)=>{
    const newComment = await Comment.create({
        contents: req.body.contents,
        creator: req.body.userId,
        creatorName: req.body.userName,
        post: req.body.id,
        date: moment().format("MMMM DD, YYYY"),
    });

    try {
        await Post.findByIdAndUpdate(req.body.id, {
            $push: {
                comments: newComment._id,
            },
        });

        await User.findByIdAndUpdate(req.body.userId, {
            $push: {
                comments: {
                    post_id: req.body.id,
                    comment_id: newComment._id,
                },
            },
        });

        res.json(newComment);
    } catch (e) {
        console.log(e);
        next(e);
    }
})

module.exports = router;