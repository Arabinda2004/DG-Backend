const postModel = require('../models/post.model')

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required!"
            })
        }

        const id = req.user.userId;
        const post = await postModel.create({
            title,
            content,
            author: id
        })

        res.status(201).json({
            success: true,
            message: "Post created successfully!",
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const { search } = req.query
        console.log(search);
        let query = {}
        if (search) {
            query = {
                $or: [
                    {
                        title: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        content: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            }
        }
        const posts = await postModel.find(query).populate("author", "name email")
        res.status(200).json({
            success: true,
            message: "Successfully fetched all the posts",
            count: posts.length,
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const getPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await postModel.findById(id).populate("author", "name email")
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully fetched the details",
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body
        const id = req.user.userId
        const pId = req.params.id
        const post = await postModel.findById(pId)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found!"
            })
        }

        if (post.author.toString() !== id) {
            return res.status(403).json({
                success: false,
                message: "You don't have the access to update this post"
            })
        }

        if (title != undefined) {
            post.title = title
        }

        if (content != undefined) {
            post.content = content
        }

        await post.save()

        res.status(200).json({
            success: true,
            message: "Post updated successfully!",
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost
}