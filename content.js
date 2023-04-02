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

const hidePost = (post) => {
  const authorElement = post.querySelector("strong a, h2 a");
  const author = authorElement ? authorElement.innerText : "Author not found";

  const timeElement = post.querySelector("abbr");
  const postDate = timeElement ? timeElement.getAttribute("title") : "Date not found";

  console.log('Hidden post:', { author, postDate });
  post.style.display = 'none';
  createShowPostButton(post);
};

const processPosts = () => {
  const posts = document.querySelectorAll("[data-pagelet^='FeedUnit']");
  posts.forEach((post) => {
    if (!post.classList.contains('processed')) {
      hidePost(post);
      post.classList.add('processed');
    }
  });
};

const observeFeed = () => {
  const feedContainer = document.querySelector('[role="feed"]');
  if (!feedContainer) {
    setTimeout(observeFeed, 1000);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    processPosts();
  });

  observer.observe(feedContainer, { childList: true, subtree: true });
};

observeFeed();
