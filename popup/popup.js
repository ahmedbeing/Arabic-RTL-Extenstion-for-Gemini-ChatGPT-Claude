const DEFAULTS = {
  enabled: true,
  perSite: { claude: true, chatgpt: true, gemini: true }
};

const enabledEl = document.getElementById("toggle-enabled");
const siteEls = document.querySelectorAll("input[data-site]");
const reloadBtn = document.getElementById("reload-tab");

function load() {
  chrome.storage.sync.get(DEFAULTS, (data) => {
    enabledEl.checked = data.enabled !== false;
    siteEls.forEach((el) => {
      const key = el.dataset.site;
      el.checked = data.perSite?.[key] !== false;
    });
  });
}

function save() {
  const perSite = {};
  siteEls.forEach((el) => {
    perSite[el.dataset.site] = el.checked;
  });
  chrome.storage.sync.set({ enabled: enabledEl.checked, perSite });
}

enabledEl.addEventListener("change", save);
siteEls.forEach((el) => el.addEventListener("change", save));

reloadBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    window.close();
  });
});

load();
