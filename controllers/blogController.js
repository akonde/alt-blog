const BlogModel = require('../models/blogModel');
const {preparePagination} = require('../utils/pagination')

require('dotenv').config();

exports.createBlog = async (req, res) => {
    const blog = await BlogModel.create({
        title: req.body.title,
        author: req.validatedToken.user._id,
        description: req.body.description,
        read_count: 0,
        tags: req.body.tags,
        state: 'draft',
        body: req.body.body,
    })

    if (blog) {
        return res.status(201).json({
            message: 'blog successfully created',
            blog
        });
    }
}

exports.publishBlog = async (req, res) => {
    const publishedBlog = await BlogModel.findByIdAndUpdate(req.params.blogId, {
        state: 'published',
    })

    if (publishedBlog) {
        return res.status(200).json({
            message: 'blog successfully published',
            publishedBlog
        });
    }
}

exports.editBlog = async (req, res) => {
    const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.blogId, {
        ...req.body,
    })

    if (updatedBlog) {
        return res.status(200).json({
            message: 'blog successfully updated',
            updatedBlog
        });
    }
}

exports.deleteBlog = async (req, res) => {
    const updatedBlog = await BlogModel.findByIdAndDelete(req.params.blogId)

    if (updatedBlog) {
        return res.status(200).json({
            message: 'blog successfully deleted',
            updatedBlog
        });
    }
}

exports.getAuthorBlogs = async (req, res) => {
    const authorId = req.validatedToken.user._id;
    let { page, limit } = preparePagination(req.query);

    const authorBlogs = await BlogModel.find({ author: authorId })
    .skip(page)
    .limit(limit)
    .exec()
    
    const totalBlog = await BlogModel.countDocuments({ author: authorId })
    const totalPages = Math.ceil(totalBlog / limit);

    return res.status(200).json({
        message: 'blog successfully retrieved',
        authorBlogs,
        totalBlog,
        totalPages,
    });
}

exports.getPublishedBlogs = async (req, res) => {
    let { page } = preparePagination(req.query);

    const publishedBlogs = await BlogModel.find({ state: 'published' })
    .skip(page)
    .limit(20)
    .exec()
    
    const totalBlog = await BlogModel.countDocuments({ state: 'published' })
    const totalPages = Math.ceil(totalBlog / 20);

    return res.status(200).json({
        message: 'blog successfully retrieved',
        publishedBlogs,
        totalBlog,
        totalPages,
    });
}

exports.getSingleBlog = async (req, res) => {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId)
    .populate('author', '-password')
    .exec()

    await BlogModel.findByIdAndUpdate(blogId, {
        read_count: blog.read_count + 1,
    })

    return res.status(200).json({
        message: 'blog successfully retrieved',
        blog,
    });
}
