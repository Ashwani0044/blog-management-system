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

                    <small>
                        By ${blog.author}
                    </small>

                    <p>
                        ${blog.description}
                    </p>

                    <span class="date">
                        ${blog.createdAt}
                    </span>

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