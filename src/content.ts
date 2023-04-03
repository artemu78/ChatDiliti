const createShowPostButton = (post: HTMLElement): void => {
  const authorAndDate = post.querySelector("h4")?.parentElement?.parentElement?.parentElement?.innerText || 'Author and date not found';

  const button = document.createElement('button');
  button.innerHTML = `${authorAndDate}`;
  button.className = 'show-post-button';
  button.onclick = () => {
    post.style.display = 'block';
    button.style.display = 'none';
  };
  post.parentElement?.insertBefore(button, post);
};

const hidePost = (post: HTMLElement): void => {
  post.style.display = 'none';
  createShowPostButton(post);
};


const processPosts = (): void => {
  const posts = document.querySelectorAll<HTMLElement>("[data-pagelet^='FeedUnit']");
  posts.forEach((post) => {
    if (!post.classList.contains('processed')) {
      hidePost(post);
      post.classList.add('processed');
    }
  });
};

const observeFeed = (): void => {
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