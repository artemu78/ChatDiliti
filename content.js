const createShowPostButton = (post) => {
  const authorAndDate = post.querySelector("h4")?.parentElement?.parentElement?.parentElement?.innerText || 'Author and date not found';

  const button = document.createElement('button');
  button.innerHTML = `${authorAndDate}`;
  button.className = 'show-post-button';
  button.onclick = () => {
    post.style.display = 'block';
    button.style.display = 'none';
  };
  post.parentElement.insertBefore(button, post);
};

const hidePost = (post) => {
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
