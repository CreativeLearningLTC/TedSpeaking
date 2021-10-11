
CSS_CLASS = "practice";
POSITION_ATTR = "position";
VIDEO_CONTAINER_SELECTOR = "#video-container";

function updateTedVideoPlayer(mode) {
  if (mode) {
    $(VIDEO_CONTAINER_SELECTOR).addClass(CSS_CLASS);
    $(VIDEO_CONTAINER_SELECTOR).css(POSITION_ATTR, 'fixed');
  } else {
    $(VIDEO_CONTAINER_SELECTOR).removeClass(CSS_CLASS);
    $(VIDEO_CONTAINER_SELECTOR).css(POSITION_ATTR, 'relative');
  }
}

// Inform background/popup script that this has been injected successfully.
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'are_you_there_content_script?') {
    sendResponse({status: "yes"});
  } else if (msg.text === 'on') {
    updateTedVideoPlayer(true);
  } else if (msg.text === 'off') {
    updateTedVideoPlayer(false);
  }
});