
CSS_CLASS = "practice";
POSITION_ATTR = "position";
VIDEO_CONTAINER_SELECTOR = "#video-container";

var storage = chrome.storage.local;

function updateTedVideoPlayer(mode) {
  if (mode) {
    $(VIDEO_CONTAINER_SELECTOR).addClass(CSS_CLASS);
    $(VIDEO_CONTAINER_SELECTOR).css(POSITION_ATTR, 'fixed');
  } else {
    $(VIDEO_CONTAINER_SELECTOR).removeClass(CSS_CLASS);
    $(VIDEO_CONTAINER_SELECTOR).css(POSITION_ATTR, 'relative');
  }
}

storage.get({'mode': false}, function(data) {
  updateTedVideoPlayer(data.mode);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == 'mode') {
      updateTedVideoPlayer(newValue);
    }
  }
});
