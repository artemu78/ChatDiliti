const createShowPostButton = (post: HTMLElement): void => {
  const authorAndDate =
    post.querySelector('h4')?.parentElement?.parentElement?.parentElement
      ?.innerText || 'Author and date not found';
  const svg = post.querySelector('svg')?.cloneNode(true) as HTMLElement;
  svg.style.flexShrink = '0';
  svg.style.marginRight = '8px';
  const text = document.createTextNode(authorAndDate);

  const button = document.createElement('button');
  button.appendChild(svg);
  button.appendChild(text);

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

const processPosts = (feedContainer: HTMLElement): void => {
  const posts = feedContainer.querySelectorAll<HTMLElement>(
    'div.x1lliihq:not(:is([class*=" "]))',
  );
  console.log(`ChatDiliti processing ${posts.length} posts`);
  posts.forEach((post) => {
    if (!post.classList.contains('processed')) {
      hidePost(post);
      post.classList.add('processed');
    }
  });
};

const observeFeed = (): void => {
  const feedContainer = document.querySelector(
    'span#ssrb_feed_start',
  )?.parentElement;
  if (!feedContainer) {
    setTimeout(observeFeed, 1000);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    processPosts(feedContainer);
  });

  observer.observe(feedContainer, { childList: true, subtree: true });
};

observeFeed();
