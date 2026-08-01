const blogContainer = document.getElementById("blog-container");

async function loadBlogs() {

    try {

        const response = await fetch("/api/blogs");

        const result = await response.json();

        const blogs = result.data;

        if (blogs.length === 0) {

            blogContainer.innerHTML = `
                <div class="blog-card">
                    <h3>No Blogs Yet..</h3>
                    <p>Create your first blog from the Add Blog page.</p>
                </div>
            `;

            return;
        }

        blogContainer.innerHTML = "";

        blogs.forEach(blog => {

            blogContainer.innerHTML += `

            <div class="blog-card">

                <h3>${blog.title}</h3>

                <small>By ${blog.author}</small>

                <p>${blog.description}</p>

                <span class="date">${blog.createdAt}</span>

                <div class="btn-group">
                
                    <button onclick="editBlog(${blog.id})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteBlog(${blog.id})">
                        Delete
                    </button>
                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

        blogContainer.innerHTML = `
            <div class="blog-card">
                <h3>Error</h3>
                <p>Unable to load blogs.</p>
            </div>
        `;

    }

}

loadBlogs();

async function editBlog(id){

    const title = prompt("Enter new title");

    if(!title) return;

    const author = prompt("Enter author");

    if(!author) return;

    const description = prompt("Enter description");

    if(!description) return;

    const response = await fetch(`/api/blogs/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title,
            author,
            description
        })

    });

    const result = await response.json();

    alert(result.message);

    loadBlogs();

}

async function deleteBlog(id) {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message);

        loadBlogs();

    } catch (error) {

        console.error(error);
        alert("Failed to delete blog.");

    }

} 