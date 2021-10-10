
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
  "documentUrlPatterns": ["https://www.ted.com/talks/*"],
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

// Inject content scripts when the talk link got updated.
const filter = {
  url: [
    {hostEquals: "www.ted.com"},
    {pathPrefix: "talks\\"}
  ]
};

function injectContentScript(details) {

  chrome.tabs.sendMessage(details.tabId, {text: "are_you_there_content_script?"}, function(msg) {
    msg = msg || {};
    if (msg.status != 'yes') {
      chrome.tabs.insertCSS(details.tabId, {file: "styles.css"});
      chrome.tabs.executeScript(details.tabId, {file: "lib/jquery-1.7.2.min.js"});
      chrome.tabs.executeScript(details.tabId, {file: "content_scripts.js"});
    }
  });

};

chrome.webNavigation.onHistoryStateUpdated.addListener(injectContentScript, filter);