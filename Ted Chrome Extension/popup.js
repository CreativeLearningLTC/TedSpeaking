async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function clickHandler(e) {
    let activeTab = await getCurrentTab();
    let activeTabId = activeTab.id;

    chrome.tabs.sendMessage(activeTabId, {text: "are_you_there_content_script?"}, async function(msg) {
        msg = msg || {};
        let onOff = 'on';
        if (e.srcElement.id === "turnoff") {
            onOff = 'off';
        }

        if (msg.status != 'yes') {
          await chrome.scripting.insertCSS(
            {
                target: {tabId: activeTabId},
                files: [
                    'styles.css'
                ],
            });
          await chrome.scripting.executeScript(
            {
                target: {tabId: activeTabId},
                files: [
                    'styles.css',
                    'lib/jquery-1.7.2.min.js',
                    'content_scripts.js'
                ],
            });
        }
        chrome.tabs.sendMessage(activeTabId, {text: onOff});
        window.close();
    });
}

let turnonBtn = document.getElementById("turnon");
let turnoffBtn = document.getElementById("turnoff");

turnonBtn.addEventListener("click", clickHandler);
turnoffBtn.addEventListener("click", clickHandler);