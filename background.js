var state = [];

function setTabState(tabState) {
  console.log('set state', state)
  action = tabState.active ? 'add' : 'remove';
  chrome.tabs.executeScript({
    code: "document.querySelector('body').classList." + action + "('lyf-d205f28767a5');"
  }, function (){
    icon = tabState.active ? 'icon16' : 'icon16_inactive';
    chrome.browserAction.setIcon({path: 'icons/' + icon + '.png', tabId: tabState.tabId})

    // Commit state
    state[tabState.tabId] = tabState.active;
  });
}

chrome.webNavigation.onDOMContentLoaded.addListener(function (details){
  if(details.frameId === 0 && state[details.tabId]) {
    setTabState({tabId: details.tabId, active: true});
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  if(!state[tab.id]) {
    setTabState({tabId: tab.id, active: true});
  } else {
    setTabState({tabId: tab.id, active: false});
  }
});
