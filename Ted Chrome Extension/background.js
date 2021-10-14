// Show the page action when on a talk page
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    let tedRule = {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'www.ted.com',
          pathContains: 'talks/',
          schemes: ['https']  
        },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    };
    chrome.declarativeContent.onPageChanged.addRules([tedRule]);
  });
});
