const str_key = "personal-blog-posts-v1";

let posts = [];
let editingId = null;

const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const titleError = document.getElementById("titleError");
const formHeading = document.getElementById("form-heading");

const contentInput = document.getElementById("content");
const contentError = document.getElementById("contentError");
const postList = document.getElementById("post-list");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancl-edt-btn");

// Load posts
function loadPosts() {
  const saved = localStorage.getItem(str_key);
  if (saved) posts = JSON.parse(saved);
  renderPosts();
}

// Save posts
function savePosts() {
  localStorage.setItem(str_key, JSON.stringify(posts));
}

// Render posts
function renderPosts() {
  postList.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.className = "post";

    li.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <p class="muted">${post.createdAt}</p>
      <button onclick="editPost('${post.id}')">Edit</button>
      <button onclick="deletePost('${post.id}')">Delete</button>
    `;

    postList.appendChild(li);
  });
}

// Validation
function validateForm() {
  let valid = true;

  if (titleInput.value.trim() === "") {
    titleError.textContent = "Title required";
    valid = false;
  } else {
    titleError.textContent = "";
  }

  if (contentInput.value.trim().length < 10) {
    contentError.textContent = "Content must be 10+ characters";
    valid = false;
  } else {
    contentError.textContent = "";
  }

  return valid;
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  if (editingId) {
    const post = posts.find((p) => p.id === editingId);
    post.title = titleInput.value.trim();
    post.content = contentInput.value.trim();
    endEditing();
  } else {
    const newPost = {
      id: Date.now().toString(),
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      createdAt: new Date().toLocaleString(),
    };

    posts.push(newPost);
  }

  savePosts();
  renderPosts();
  form.reset();
});

// Edit post
function editPost(id) {
  const post = posts.find((p) => p.id === id);

  editingId = id;
  titleInput.value = post.title;
  contentInput.value = post.content;

  formHeading.textContent = "Edit Post";
  submitBtn.textContent = "Save Changes";
  cancelEditBtn.style.display = "inline-block";
}

// Cancel edit
cancelEditBtn.addEventListener("click", endEditing);

function endEditing() {
  editingId = null;
  form.reset();
  formHeading.textContent = "Create New Post";
  submitBtn.textContent = "Submit";
  cancelEditBtn.style.display = "none";
}

// Delete post
function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  savePosts();
  renderPosts();
}

loadPosts();
