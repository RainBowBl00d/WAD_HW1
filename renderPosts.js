document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById("posts-feed");

    // Task 4 & 5: Fetching posts data
    async function loadPosts() {
        try {
            /*
              // Online endpoint fetch
              const onlineResponse = await fetch("https://posts-525b83.tiiny.site");
              const posts = await onlineResponse.json();
            */

            // Local JSON file fetch
            const response = await fetch("posts.json");
            if (!response.ok) throw new Error("Failed to load posts.json");

            const posts = await response.json();
            renderPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            feedContainer.innerHTML = `<p style="text-align: center; color: red;">Failed to load posts.</p>`;
        }
    }

    function renderPosts(posts) {
        feedContainer.innerHTML = "";

        posts.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("post-card");

            // Post Header
            const headerDiv = document.createElement("div");
            headerDiv.classList.add("post-header");

            const userInfoDiv = document.createElement("div");
            userInfoDiv.classList.add("user-info");

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("avatar");
            avatarDiv.textContent = post.avatar || "U";

            const authorSpan = document.createElement("span");
            authorSpan.textContent = post.author;

            userInfoDiv.appendChild(avatarDiv);
            userInfoDiv.appendChild(authorSpan);

            const dateSpan = document.createElement("span");
            dateSpan.textContent = post.date;

            headerDiv.appendChild(userInfoDiv);
            headerDiv.appendChild(dateSpan);
            article.appendChild(headerDiv);

            // Post Image (if available)
            if (post.image) {
                const img = document.createElement("img");
                img.classList.add("post-image");
                img.src = post.image;
                img.alt = "Post image";
                article.appendChild(img);
            }

            // Post Message (Mandatory text message requirement)
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("post-message");
            messageDiv.textContent = post.message;
            article.appendChild(messageDiv);

            // Post Footer / Like Button
            const footerDiv = document.createElement("div");
            footerDiv.classList.add("post-footer");

            const likeBtn = document.createElement("button");
            likeBtn.classList.add("like-btn");
            likeBtn.textContent = "👍 Like";

            // like counter
            let liked = false;
            likeBtn.addEventListener("click", () => {
                liked = !liked;
                likeBtn.style.backgroundColor = liked ? "#154266" : "";
                likeBtn.textContent = liked ? "👍 Liked" : "👍 Like";
            });

            footerDiv.appendChild(likeBtn);
            article.appendChild(footerDiv);

            feedContainer.appendChild(article);
        });
    }

    loadPosts();

    // Profile Dropdown Menu Toggle Logic
    const profileBtn = document.getElementById("profile-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");

    profileBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor jump
        dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", (event) => {
        if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
});