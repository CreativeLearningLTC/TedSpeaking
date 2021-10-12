function clickHandler(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    var activeTab = tabs[0];
    var activeTabId = activeTab.id; 
    chrome.tabs.sendMessage(activeTabId, {text: "are_you_there_content_script?"}, function(msg) {
        msg = msg || {};
        if (msg.status != 'yes') {
          chrome.tabs.insertCSS(activeTabId, {file: "styles.css"});
          chrome.tabs.executeScript(activeTabId, {file: "lib/jquery-1.7.2.min.js"});
          chrome.tabs.executeScript(activeTabId, {file: "content_scripts.js"});
        }
        if (e.srcElement.id === "turnoff") {
            chrome.tabs.sendMessage(activeTabId, {text: "off"});
        } else {
            chrome.tabs.sendMessage(activeTabId, {text: "on"});
        }
        window.close();
    });
  });
}

let turnonBtn = document.getElementById("turnon");
let turnoffBtn = document.getElementById("turnoff");

turnonBtn.addEventListener("click", clickHandler);
turnoffBtn.addEventListener("click", clickHandler);