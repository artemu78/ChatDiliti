const hidePosts = () => {
    const posts = document.querySelectorAll("[data-pagelet^='FeedUnit']");
    posts.forEach((post) => {
      post.style.display = "none";
    });
  };
  
  const showPosts = () => {
    const posts = document.querySelectorAll("[data-pagelet^='FeedUnit']");
    posts.forEach((post) => {
      post.style.display = "block";
    });
  };
  
  let postsHidden = false;
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.toggle) {
      if (postsHidden) {
        showPosts();
      } else {
        hidePosts();
      }
      postsHidden = !postsHidden;
    }
  });
  