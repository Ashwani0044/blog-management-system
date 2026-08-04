const express = require("express");

const router = express.Router();

let blogs = [];

// GET All Blogs
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: blogs.length,
        data: blogs
    });
});

// POST Blog
router.post("/", (req, res) => {

    const { title, author, description } = req.body;

    if (!title || !author || !description) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    const blog = {
        id: Date.now(),
        title,
        author,
        description,
        createdAt: new Date().toLocaleString()
    };

    blogs.push(blog);

    res.status(201).json({
        success: true,
        message: "Blog created successfully!",
        data: blog
    });

});

// update Blog
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const {title, author, description} = req.body;

    const blog = blogs.find(blog => blog.id == id)

    if(!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found!"
        });
    }

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.description = description || blog.description;

    res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        data: blog
    });
});

// DELETE Blog
router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const blogIndex = blogs.findIndex(blog => blog.id === id);

    if (blogIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    blogs.splice(blogIndex, 1);

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully!"
    });

});

module.exports = router;