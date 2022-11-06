const BlogModel = require('../models/blogModel');

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
    // const blog = await BlogModel.findById(req.params.blogId);

    // if (!blog) {
    //     return res.status(404).json({
    //         error: true,
    //         message: 'blog not found',
    //     });
    // }
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
