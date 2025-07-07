const toggle = document.getElementById('toggle');

chrome.storage.local.get(['enabled'], (result) => {
  toggle.checked = result.enabled ?? true; // Default: on
});

toggle.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: toggle.checked });
});
