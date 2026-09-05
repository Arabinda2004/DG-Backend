const express = require('express');
const authenticate = require('../middleware/auth.middleware');
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost
} = require('../controllers/post.controller')

const router = express.Router();

router.post('/create', authenticate, createPost) // http://localhost:3000/api/post/create
router.get('/all', getAllPosts) // http://localhost:3000/api/post/all
router.get('/:id', getPost) // GET http://localhost:3000/api/post/{id}
router.patch('/:id', authenticate, updatePost) // PATCH http://localhost:3000/api/post/{id}


module.exports = router