const express = require('express')
const router = express.Router()
const { createPost, getPost, updatePost, deletePost } = require('../controllers/posts_controller')

router.post('/api/posts', createPost)
router.get('/api/posts/:id', getPost)
router.patch('/api/posts/:id', updatePost)
router.delete('/api/posts/:id', deletePost)

module.exports = router
