
/**
 * We use mode to control if this is in practice or not.
 * The page level context menu reflects the state.
 * The value is stored in storage for content script to access.
 */
var modeOnTitle = "Turn on practice mode";
var modeOffTitle = "Turn off practice mode";

var storage = chrome.storage.local;
var mode;

function getMenuTitle(mode) {
  return mode ? modeOffTitle : modeOnTitle;
}

storage.get({'mode': false}, function(data) {
  mode = data.mode;
});

var menuId = chrome.contextMenus.create({
  "title": getMenuTitle(mode),
  "contexts": ["page"],
  "onclick": practiceClickHandler
});

function practiceClickHandler(info, tab) {
  mode = !mode;

  chrome.contextMenus.update(menuId, {
    "title": getMenuTitle(mode)
  });

  // update storage
  storage.set({'mode': mode}, function() {
  });
}
