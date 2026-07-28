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

module.exports = router;