const express = require('express')
const { authGuard } = require('../middleware');
const blogController = require('../controllers/blogController');


const AuthController = require('../controllers/authController');

const blogRouter = express.Router();

blogRouter.post('/blogs', authGuard, blogController.createBlog)
blogRouter.patch('/blogs/:blogId', authGuard, blogController.publishBlog)
blogRouter.patch('/blogs-edit/:blogId', authGuard, blogController.editBlog)
blogRouter.delete('/blogs/:blogId', authGuard, blogController.deleteBlog)
blogRouter.get('/blogs/', authGuard, blogController.getAuthorBlogs)
blogRouter.get('/blogs/public', blogController.getPublishedBlogs)
blogRouter.get('/blogs/:blogId', blogController.getSingleBlog)

blogRouter.post('/login', async (req, res) => {
    AuthController.login(req, res)
})


module.exports = blogRouter;
