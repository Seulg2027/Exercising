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
const { runInNewContext } = require("vm");

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

//WRITE A POST /POST
router.post("/write", auth, async(req, res, post) => {
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

        return res.redirect(`/api/post/${newPost_id}`);
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

module.exports = router;