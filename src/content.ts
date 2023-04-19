var DatesHasBeenHidden = false;

const buttonSetGrayedOut = (post: HTMLElement, button: HTMLElement): void => {
  debugger;
  const authorAndDateElement = getAuthorAndDateElement(post);
  const isCommercial =
    authorAndDateElement &&
    !!authorAndDateElement.querySelector("a[href^='/ads/']");
  if (isCommercial) {
    button.classList.add('font-size12');
    button.style.border = '1px solid red';
  } else {
    button.style.border = '1px solid blue';
  }
};

const getAuthorAndDateElement = (
  post: HTMLElement,
): HTMLElement | null | undefined =>
  post.querySelector('h4')?.parentElement?.parentElement?.parentElement;

const getPostTime = (authorAndDateElement: HTMLElement): string => {
  const useElement = authorAndDateElement.querySelector('use');
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

  if (
    !DatesHasBeenHidden &&
    timeElement.parentElement &&
    timeElement.parentElement.parentElement &&
    timeElement.parentElement.parentElement.parentElement
  ) {
    timeElement.parentElement.parentElement.parentElement.style.display =
      'none';
    DatesHasBeenHidden = true;
  }

  return timeElement.textContent || '';
};

const getPostReason = (post: HTMLElement): string =>
  post.querySelector('.xcnsx8t')?.textContent || '';

const createShowPostButton = (post: HTMLElement): void => {
  const authorAndDateElement = getAuthorAndDateElement(post);
  const isCommercial =
    authorAndDateElement &&
    !!authorAndDateElement.querySelector("a[href^='/ads/']");
  const authorAndDate =
    authorAndDateElement?.innerText || 'Author and date not found';
  const postTime = authorAndDateElement
    ? getPostTime(authorAndDateElement)
    : '';

  const postMessage =
    post.querySelector('[data-ad-preview=message]')?.textContent || '';

  const postReason = getPostReason(post);

  const svg = post.querySelector('svg')?.cloneNode(true) as HTMLElement;
  svg.style.flexShrink = '0';
  svg.style.marginRight = '8px';

  const isGrayedOut = postReason || isCommercial;

  const button = document.createElement('button');
  button.onclick = () => {
    post.style.display = 'block';
    button.style.display = 'none';
  };

  button.classList.add('custom-button');
  if (isGrayedOut) {
    button.classList.add('font-size12');
  } else {
    button.classList.add('font-size14');
  }

  const buttonContent = document.createElement('div');
  buttonContent.className = 'button-content';
  const textContent = document.createElement('div');
  textContent.className = 'text-content';

  const reason = document.createElement('span');
  reason.className = 'message';
  reason.textContent = postReason;

  const title = document.createElement('span');
  title.className = isGrayedOut ? 'title-grayed' : 'title';
  title.textContent = `${authorAndDate} / ${postTime}`;
  const message = document.createElement('p');
  message.className = 'message';
  message.textContent = postMessage;

  button.appendChild(buttonContent);
  buttonContent.appendChild(svg);
  buttonContent.appendChild(textContent);
  textContent.appendChild(reason);
  textContent.appendChild(title);
  textContent.appendChild(message);

  post.parentElement?.insertBefore(button, post);
  window.setTimeout(() => {
    buttonSetGrayedOut(post, button);
  }, 3000); // wait for the post to be grayed out
};

const processPosts = (feedContainer: HTMLElement): void => {
  const posts = feedContainer.querySelectorAll<HTMLElement>(
    'div.x1lliihq:not(:is([class*=" "]))',
  );
  posts.forEach((post) => {
    if (!post.classList.contains('processed')) {
      createShowPostButton(post);
      post.style.display = 'none';
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
