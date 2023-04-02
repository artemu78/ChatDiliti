const createShowPostButton = (post) => {
  const button = document.createElement('button');
  button.innerHTML = 'Show Post';
  button.className = 'show-post-button';
  button.onclick = () => {
    post.style.display = 'block';
    button.style.display = 'none';
  };
  post.parentElement.insertBefore(button, post);
};

const hidePosts = () => {
  const posts = document.querySelectorAll("[data-pagelet^='FeedUnit']");
  posts.forEach((post) => {
    console.log('Hidden post:', post.innerText);
    post.style.display = 'none';
    createShowPostButton(post);
  });
};

hidePosts();
