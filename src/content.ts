const getPostTime = (authorAndDate: HTMLElement): string => {
  const useElement = authorAndDate.querySelector('use');
  if (!useElement) {
    return '';
  }
  const href = useElement.getAttribute('xlink:href');
  if (!href) {
    return '';
  }
  const timeElement = document.querySelector(href);
  if (!timeElement) {
    return '';
  }
  return timeElement.textContent || '';
};

const createShowPostButton = (post: HTMLElement): void => {
  const authorAndDateElement =
    post.querySelector('h4')?.parentElement?.parentElement?.parentElement;
  const authorAndDate =
    authorAndDateElement?.innerText || 'Author and date not found';
  const postTime = authorAndDateElement
    ? getPostTime(authorAndDateElement)
    : '';

  const postMessage =
    post.querySelector('[data-ad-preview=message]')?.textContent || '';
  const svg = post.querySelector('svg')?.cloneNode(true) as HTMLElement;
  svg.style.flexShrink = '0';
  svg.style.marginRight = '8px';

  const button = document.createElement('button');
  button.className = 'custom-button';

  const buttonContent = document.createElement('div');
  buttonContent.className = 'button-content';
  const textContent = document.createElement('div');
  textContent.className = 'text-content';
  const title = document.createElement('span');
  title.className = 'title';
  title.textContent = `${authorAndDate} / ${postTime}`;
  const message = document.createElement('p');
  message.className = 'message';
  message.textContent = postMessage;

  button.appendChild(buttonContent);
  buttonContent.appendChild(svg);
  buttonContent.appendChild(textContent);
  textContent.appendChild(title);
  textContent.appendChild(message);

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
