const express = require("express");
const path = require("path");

const app = express();

const blogRoutes = require("./routes/blogRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/add-blog", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "add-blog.html"));
});

// API Routes
app.use("/api/blogs", blogRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});