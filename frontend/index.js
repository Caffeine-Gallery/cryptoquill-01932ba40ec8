import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Initialize Quill editor
    var quill = new Quill('#editor', {
        theme: 'snow'
    });

    // Function to toggle form visibility
    function toggleForm() {
        newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
    }

    newPostBtn.addEventListener('click', toggleForm);

    // Function to show loading spinner
    function showLoading() {
        loadingSpinner.style.display = 'block';
    }

    // Function to hide loading spinner
    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    // Function to fetch and display posts
    async function fetchAndDisplayPosts() {
        showLoading();
        try {
            const posts = await backend.getPosts();
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'uk-card uk-card-default uk-margin';
                postElement.innerHTML = `
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">${post.title}</h3>
                        <p class="uk-text-meta">By ${post.author}</p>
                    </div>
                    <div class="uk-card-body">
                        <div>${post.body}</div>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            hideLoading();
        }
    }

    // Event listener for form submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        try {
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const body = quill.root.innerHTML;
            await backend.addPost(title, author, body);
            toggleForm();
            await fetchAndDisplayPosts();
            postForm.reset();
            quill.setContents([]);
        } catch (error) {
            console.error('Error submitting post:', error);
        } finally {
            hideLoading();
        }
    });

    // Initial fetch of posts
    await fetchAndDisplayPosts();
});
