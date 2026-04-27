(() => {
  "use strict";

  const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

  const TEXT_BLOCK_TAGS = new Set([
    "P", "LI", "TD", "TH", "BLOCKQUOTE",
    "H1", "H2", "H3", "H4", "H5", "H6",
    "DT", "DD", "FIGCAPTION", "SUMMARY",
    "LABEL", "BUTTON", "ARTICLE", "SECTION",
    "ASIDE", "HEADER", "FOOTER", "MAIN", "NAV",
    "UL", "OL", "DL", "MENU",
    "TABLE", "THEAD", "TBODY", "TR"
  ]);

  const SKIP_TAGS = new Set([
    "SCRIPT", "STYLE", "NOSCRIPT", "SVG", "MATH", "CANVAS",
    "PRE", "CODE", "KBD", "SAMP", "VAR", "TT",
    "INPUT", "IMG", "VIDEO", "AUDIO", "IFRAME"
  ]);

  const SKIP_CLOSEST = "pre, code, kbd, samp, [data-rtl-skip]";

  const PROCESSED = new WeakSet();

  const SITE_INPUTS = {
    "claude.ai": [
      'div[contenteditable="true"].ProseMirror',
      'div[contenteditable="true"]',
      "fieldset textarea"
    ],
    "chatgpt.com": [
      "#prompt-textarea",
      'div[contenteditable="true"]#prompt-textarea',
      "textarea"
    ],
    "chat.openai.com": ["#prompt-textarea", "textarea"],
    "gemini.google.com": [
      ".ql-editor",
      "rich-textarea .ql-editor",
      'div[contenteditable="true"]'
    ]
  };

  function siteKey() {
    const host = location.hostname;
    if (host.endsWith("claude.ai")) return "claude";
    if (host.endsWith("chatgpt.com") || host.endsWith("chat.openai.com")) return "chatgpt";
    if (host.endsWith("gemini.google.com")) return "gemini";
    return null;
  }

  function inputSelectors() {
    const host = location.hostname;
    for (const key of Object.keys(SITE_INPUTS)) {
      if (host === key || host.endsWith("." + key)) return SITE_INPUTS[key];
    }
    return [];
  }

  function hasArabic(text) {
    return !!text && ARABIC_RE.test(text);
  }

  function isLayoutContainer(el) {
    const cs = getComputedStyle(el);
    if (cs.display === "flex" || cs.display === "inline-flex") return true;
    if (cs.display === "grid" || cs.display === "inline-grid") return true;
    return false;
  }

  function hasBlockChildren(el) {
    for (const child of el.children) {
      const tag = child.tagName;
      if (TEXT_BLOCK_TAGS.has(tag) || tag === "DIV" || tag === "UL" || tag === "OL") {
        return true;
      }
    }
    return false;
  }

  function shouldDirAuto(el) {
    if (!el || el.nodeType !== 1) return false;
    if (PROCESSED.has(el)) return false;
    if (SKIP_TAGS.has(el.tagName)) return false;
    if (el.hasAttribute("dir")) return false;
    if (el.closest(SKIP_CLOSEST)) return false;
    if (!hasArabic(el.textContent)) return false;

    if (TEXT_BLOCK_TAGS.has(el.tagName)) return true;

    if (el.tagName === "DIV" || el.tagName === "SPAN") {
      if (hasBlockChildren(el)) return false;
      if (isLayoutContainer(el)) return false;
      return true;
    }

    return false;
  }

  function applyDirAuto(el) {
    el.setAttribute("dir", "auto");
    PROCESSED.add(el);
  }

  function processSubtree(root) {
    if (!root || root.nodeType !== 1) return;

    if (shouldDirAuto(root)) applyDirAuto(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode(el) {
        if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
        if (el.closest(SKIP_CLOSEST) && el.closest(SKIP_CLOSEST) !== el) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      if (shouldDirAuto(node)) applyDirAuto(node);
    }
  }

  function bindInput(el) {
    if (!el || PROCESSED.has(el)) return;
    PROCESSED.add(el);
    el.setAttribute("dir", "auto");
    if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") {
      el.querySelectorAll("p, div").forEach((child) => {
        if (!child.hasAttribute("dir")) child.setAttribute("dir", "auto");
      });
    }
  }

  function scanInputs() {
    const sels = inputSelectors();
    if (!sels.length) return;
    document.querySelectorAll(sels.join(",")).forEach(bindInput);
  }

  let pendingNodes = new Set();
  let scheduled = false;

  function schedule(node) {
    if (node) pendingNodes.add(node);
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(flush);
  }

  function flush() {
    scheduled = false;
    const nodes = pendingNodes;
    pendingNodes = new Set();
    for (const node of nodes) {
      if (node.isConnected) processSubtree(node);
    }
    scanInputs();
  }

  function start() {
    document.documentElement.classList.add("arabic-rtl-ext");
    const key = siteKey();
    if (key) document.documentElement.dataset.rtlExtSite = key;

    schedule(document.body || document.documentElement);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) schedule(node);
          }
        } else if (m.type === "characterData") {
          const parent = m.target.parentElement;
          if (parent) {
            PROCESSED.delete(parent);
            schedule(parent);
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });

    document.addEventListener("focusin", (e) => {
      const sels = inputSelectors();
      if (sels.length && e.target?.matches?.(sels.join(","))) bindInput(e.target);
    });
  }

  function init() {
    chrome.storage?.sync.get({ enabled: true, perSite: {} }, (data) => {
      if (data.enabled === false) return;
      const key = siteKey();
      if (key && data.perSite?.[key] === false) return;
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
      } else {
        start();
      }
    });
  }

  init();
})();
