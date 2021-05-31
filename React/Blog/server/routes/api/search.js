const express = require('express');
const { Post } = require('../../models/post');

const router = express.Router();

router.get('/:searchTerm', async (req, res, next) => {
    try {
        const result = await Post.find({
            title: {
                $regex: req.params.searchTerm,
                $options: 'i',
            },
        });

        res.send(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
