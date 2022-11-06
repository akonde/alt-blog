const express = require('express')
const { authGuard } = require('../middleware');
const blogController = require('../controllers/blogController');


const AuthController = require('../controllers/authController');

const blogRouter = express.Router();

blogRouter.post('/blogs', authGuard, blogController.createBlog)
blogRouter.patch('/blogs/:blogId', authGuard, blogController.publishBlog)

blogRouter.post('/login', async (req, res) => {
    AuthController.login(req, res)
})


module.exports = blogRouter;
