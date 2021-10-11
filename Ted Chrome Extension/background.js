// Show the page action
function checkForTedTalkUrl(tabId, changeInfo, tab) {
  // If the tabs url is a Ted Talk url
  if (tab.url.indexOf('https://www.ted.com/talks/') == 0) {
      chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForTedTalkUrl);

/**
 * Inject content scripts when the talk link got updated.
 */
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