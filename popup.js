document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('toggle');
  const maxTabsInput = document.getElementById('maxTabs');
  const setButton = document.getElementById('setMaxTabs');

  // Load stored values
  const { enabled, maxTabs } = await chrome.storage.local.get(['enabled', 'maxTabs']);
  toggle.checked = !!enabled;
  maxTabsInput.value = maxTabs || 5;

  // Save toggle state
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  // Save maxTabs on button click or Enter
  function saveMaxTabs() {
    const value = parseInt(maxTabsInput.value.trim(), 10);
    if (!isNaN(value) && value > 0 && value != maxTabs) {
      chrome.storage.local.set({ maxTabs: value });
      maxTabsInput.value = null;
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Successfully set new limit',
        message: `New tab limit: ${value}.`,
      });
    }
  }

  setButton.addEventListener('click', saveMaxTabs);
  maxTabsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveMaxTabs();
    }
  });
});
