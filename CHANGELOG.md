# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-04-27

### Added
- Initial release.
- Manifest V3 extension scaffold with content script and popup.
- Universal RTL detection across all text-bearing elements on supported sites.
- Paragraph-level direction handling via the standard `dir="auto"` attribute.
- `MutationObserver` to handle messages added by the chat platforms after
  initial page load.
- Smart list bullet alignment — `<ul>`, `<ol>`, and `<dl>` flip to RTL when
  containing Arabic items.
- LTR isolation for `pre`, `code`, `kbd`, and `samp` so code snippets remain
  readable inside Arabic paragraphs.
- Layout safety — `flex` and `grid` containers are deliberately skipped to
  preserve the chat UI.
- Per-site enable/disable toggles in the popup, persisted via
  `chrome.storage.sync`.
- Bilingual privacy policy (English + Arabic).
- Brand icons at 16, 32, 48, and 128 px.

### Supported sites
- Claude (`claude.ai`)
- ChatGPT (`chatgpt.com`, `chat.openai.com`)
- Gemini (`gemini.google.com`)
