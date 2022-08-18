const express = require('express')
const router = express.Router()
const { createPost, getPost, getPosts, updatePost, deletePost, upvotePost } = require('../controllers/posts_controller')

router.get("/api/posts", getPosts);
router.post("/api/posts", createPost);
router.get("/api/posts/:id", getPost);
router.patch("/api/posts/:id", updatePost);
router.delete("/api/posts/:id", deletePost);

router.post('/api/posts/:id/upvote', upvotePost)

module.exports = router
