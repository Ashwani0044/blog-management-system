const express = require("express");
const { desc } = require("framer-motion/client");

const router = express.Router();

// array to store blogs posted basically a temporary storage..
let blogs = [];

router.get("/", (req, res) => {
    res.status(200).json(blogs);
});

router.post("/", (req, res) => {

    const {title, author, description} = req.body;

    const blog = {
        id : Date.now(),
        title, 
        author, 
        description
    };

    blogs.push(blog);

    res.status(201).json({
        message : "Blog added successfully!!",
        blogs
    });

});

module.exports = router;
