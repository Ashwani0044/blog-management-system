const form = document.querySelector("form");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const description = document.querySelector("#description");

const message = document.querySelector(".message");
const counter = document.querySelector("#counter");

description.addEventListener("input", () => {
    counter.innerText = `${description.value.length}/500 Characters`;
});

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    message.innerHTML = "";
    message.className = "message";

    if (
        title.value.trim() === "" ||
        author.value.trim() === "" ||
        description.value.trim() === ""
    ) {
        message.innerHTML = "Please fill all the fields.";
        message.classList.add("error");
        return;
    }

    if (title.value.length < 5) {
        message.innerHTML = "Title should contain at least 5 characters.";
        message.classList.add("error");
        return;
    }

    if (description.value.length < 20) {
        message.innerHTML = "Description should contain at least 20 characters.";
        message.classList.add("error");
        return;
    }

    try {

        const response = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.value,
                author: author.value,
                description: description.value
            })
        });

        const result = await response.json();

        if(result.success){

            message.innerHTML = "✅ Blog added successfully!";
            message.classList.add("success");

            form.reset();
            counter.innerText = "0/500 Characters";

        }else{

            message.innerHTML = result.message;
            message.classList.add("error");

        }

    } catch(err){

        console.log(err);

        message.innerHTML = "Something went wrong!";
        message.classList.add("error");

    }

});