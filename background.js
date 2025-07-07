const MAX_TABS = 5;

chrome.tabs.onCreated.addListener(async (tab) => {
  const { enabled } = await chrome.storage.local.get(['enabled']);
  if (!enabled) return;

  const tabs = await chrome.tabs.query({});
  if (tabs.length > MAX_TABS) {
    chrome.tabs.remove(tab.id);
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tab Limit Reached',
      message: `Only ${MAX_TABS} tabs allowed.`,
    });
  }
});
