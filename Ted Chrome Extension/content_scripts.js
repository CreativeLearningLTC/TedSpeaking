
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

function initTedVideoPlayer() {
  chrome.storage.local.get({'mode': false}, function(data) {
    updateTedVideoPlayer(data.mode);
  });  
}

// Listen to the update from context menu
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == 'mode') {
      updateTedVideoPlayer(newValue);
    }
  }
});

// Inform background script that this has been injected successfully.
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'are_you_there_content_script?') {
    sendResponse({status: "yes"});
    setTimeout(initTedVideoPlayer, 1000); 
  }
});

initTedVideoPlayer();