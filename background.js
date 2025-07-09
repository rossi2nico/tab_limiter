chrome.tabs.onCreated.addListener(async (tab) => {
  const { enabled, maxTabs } = await chrome.storage.local.get(['enabled', 'maxTabs']);
  if (!enabled) return;

  const tabs = await chrome.tabs.query({});
  const limit = parseInt(maxTabs, 10) || 5;

  if (tabs.length > limit) {
    chrome.tabs.remove(tab.id);
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tab Limit Reached',
      message: `Only ${limit} tabs allowed.`,
    });
  }
});

 
