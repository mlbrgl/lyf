function activate() {
  chrome.tabs.executeScript({
    code: "document.querySelector('body').classList.toggle('lyf-d205f28767a5');"
  }, function (){
    chrome.tabs.insertCSS({
      file: 'style.css'
    });
    chrome.storage.local.set({active: true});
    chrome.browserAction.setIcon({path: 'icons/icon16.png'})
  });
}

function deactivate() {
  chrome.tabs.executeScript({
    code: "document.querySelector('body').classList.toggle('lyf-d205f28767a5');"
  }, function (){
    chrome.storage.local.set({active: false});
    chrome.browserAction.setIcon({path: 'icons/icon16_inactive.png'});
  });
}

chrome.webNavigation.onCompleted.addListener(function (details){
  chrome.storage.local.get(['active'], function(result){
    if(result.active) {
      activate()
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.local.get(['active'], function(result){
    if(!result.active) {
      activate();
    } else {
      deactivate();
    }
  });
})
