# Facebook Post Hider

Facebook Post Hider is a Chrome extension that hides all Facebook posts by default and displays a "Show Post" button for each hidden post. Users can reveal the original content of individual posts by clicking the corresponding "Show Post" button. The extension also supports infinite scrolling, processing new posts as they are loaded.

## Core Idea

The primary goal of this extension is to provide users with control over the content they see on their Facebook feed. By hiding posts by default, users can choose to view only the posts they find interesting, reducing distractions and improving their overall experience on the platform.

## Installation

To install the Facebook Post Hider Chrome extension, follow these steps:

1. Clone or download this repository to your local machine.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" in the top right corner of the Extensions page.

4. Click the "Load unpacked" button on the Extensions page and select the `facebook-post-hider` directory that you cloned or downloaded.

5. The extension should now be visible in the list of installed extensions and as an icon in the Chrome toolbar.

6. Visit Facebook and start using the extension. All posts will be hidden by default, and you can click the "Show Post" button on individual posts to reveal their content.

## Note

This extension uses a MutationObserver to handle infinite scrolling on Facebook. If Facebook's DOM structure changes, you may need to adjust the selectors in the `content.js` file to locate the post author and date correctly.
