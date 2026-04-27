# Chrome Web Store Submission Package

Everything below is **ready to copy-paste** into the Chrome Web Store Developer
Dashboard at https://chrome.google.com/webstore/devconsole. Sections are in the
exact order the form presents them. Following this guide closely maximizes the
chance of getting approved on the first review.

Package: **`arabic-rtl-v1.0.0.zip`** (in this folder, ~20 KB, all 10 required files included).

---

## 1. Store listing

### Item name
```
Arabic RTL for AI Chats
```

### Summary (132 character limit — current: 124)
```
Auto-aligns Arabic text right-to-left in Claude, ChatGPT, and Gemini — paragraph-aware, like Obsidian. Privacy-first.
```

### Description (paste as-is)
```
Arabic RTL for AI Chats brings proper right-to-left text alignment to the three
most popular AI chat platforms: Claude, ChatGPT, and Gemini.

If you write Arabic in these chats, you have probably noticed that paragraphs
often render left-aligned, with broken punctuation and misplaced bullet points.
This extension fixes that — automatically, on every page, on every message.

— FEATURES —

• Universal coverage — every Arabic paragraph on the page is detected and
  aligned right-to-left, not just the input box. Sidebar items, message bubbles,
  lists, headings, tooltips: everything.

• Paragraph-level direction — works exactly like Obsidian's RTL handling.
  Each paragraph independently gets its direction based on its own content.
  Mixed Arabic/English documents render correctly side by side.

• Smart list bullets — fixes the common bug where Arabic list items show
  bullets stranded on the far left. Bullets and numbering automatically move
  to the right side of the text.

• Code stays LTR — code blocks, inline code, and keyboard keys are always kept
  left-to-right, even when surrounded by Arabic text. Your snippets never break.

• Layout-safe — never flips flex/grid containers, so the chat UI itself stays
  intact. Only text-bearing elements are affected.

• Per-site toggle — enable or disable on each platform individually from the
  popup, in case you want it only on one chat service.

• Privacy first — no data collection, no analytics, no remote code, no servers.
  Everything runs locally in your browser.

— SUPPORTED SITES —

• Claude (claude.ai)
• ChatGPT (chatgpt.com, chat.openai.com)
• Gemini (gemini.google.com)

— HOW IT WORKS —

The extension uses the standard HTML "dir=auto" attribute, which is the same
mechanism native browsers and editors like Obsidian use to handle bidirectional
text. It walks the page DOM, identifies elements whose text contains Arabic
characters, and lets the browser's bidi algorithm resolve direction per
paragraph. Nothing is sent off-device.

— WHO IT'S FOR —

Arabic-speaking users of Claude, ChatGPT, and Gemini who want their native
language to render correctly without having to manually format every message.
```

### Category
```
Productivity
```

### Language
```
English (primary)
Arabic (secondary)
```

---

## 2. Graphic assets

You already have the icons inside the ZIP (16, 32, 48, 128). The store also
asks for **store-page images**. Required:

| Asset | Size | Required? | Notes |
|---|---|---|---|
| Store icon | 128×128 PNG | ✅ Required | Use `icons/icon128.png` from the ZIP |
| Screenshot 1 | 1280×800 or 640×400 | ✅ At least 1 | See suggestions below |
| Screenshot 2-5 | 1280×800 | Recommended | More screenshots = better conversion |
| Small promo tile | 440×280 PNG | ❌ Optional | Skip for first submission |
| Marquee promo | 1400×560 PNG | ❌ Optional | Skip |

### Screenshot ideas (take all in 1280×800)

1. **Before/after on Claude** — split image: left side shows Arabic message
   left-aligned and broken; right side shows it properly right-aligned.
2. **ChatGPT with bullet list** — Arabic list with bullets correctly on the
   right side of each line.
3. **Gemini sidebar** — Arabic chat history items aligned right.
4. **The popup** — opened on top of a chat, showing the per-site toggles.
5. **Mixed code + Arabic** — message containing both Arabic explanation and
   an LTR code block, both rendering correctly.

### Screenshot captions (one line each, optional but helps)
```
1. Arabic messages in Claude — properly right-aligned, paragraph by paragraph.
2. Lists in ChatGPT — bullets follow Arabic text to the right side.
3. Gemini sidebar and chat — every Arabic element aligned correctly.
4. One-click toggle per platform from the extension popup.
5. Code blocks stay left-to-right inside Arabic paragraphs — like Obsidian.
```

---

## 3. Privacy practices (the section that gets most extensions rejected)

### Single purpose description
```
This extension has a single purpose: to automatically apply right-to-left text
direction to Arabic content on three specific AI chat websites (Claude, ChatGPT,
Gemini), so Arabic-speaking users can read and write naturally on those sites.
```

### Permission justifications

#### `storage` justification
```
Used solely to remember the user's preferences locally via chrome.storage.sync:
whether the extension is enabled overall, and which of the three supported
sites it should run on. No other data is stored. Settings never leave the
user's browser (except via the user's own Chrome Sync, if they have it
enabled, in which case the data is synced between their own devices through
their own Google account — not through us).
```

#### `activeTab` justification
```
Used only to allow the "Reload tab" button in the extension popup to refresh
the user's current tab after they change a setting, so the new preference
takes effect immediately. The extension does not read tab contents or URLs
through this permission.
```

#### Host permission justification — `https://claude.ai/*`
```
Required to inject the content script that detects Arabic text and applies
right-to-left direction on Claude. The script does not read or transmit
page content for any other purpose.
```

#### Host permission justification — `https://chatgpt.com/*` and `https://chat.openai.com/*`
```
Required to inject the content script that detects Arabic text and applies
right-to-left direction on ChatGPT (both the current chatgpt.com domain and
the legacy chat.openai.com domain that some users still land on). The script
does not read or transmit page content for any other purpose.
```

#### Host permission justification — `https://gemini.google.com/*`
```
Required to inject the content script that detects Arabic text and applies
right-to-left direction on Gemini. The script does not read or transmit
page content for any other purpose.
```

#### Remote code use
```
NO — this extension does not use remote code.
All JavaScript is bundled inside the extension package.
There is no eval(), no remote script loading, no dynamic code execution.
```

### Data usage disclosures

For each of the data categories Google asks about, select **"This item does
not collect or use [category]"** for ALL of the following:

- Personally identifiable information
- Health information
- Financial and payment information
- Authentication information
- Personal communications
- Location
- Web history
- User activity
- Website content

Then check both certification boxes:

- ☑ I do not sell or transfer user data to third parties, outside of the approved use cases
- ☑ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ☑ I do not use or transfer user data to determine creditworthiness or for lending purposes

### Privacy policy URL
You must host `privacy-policy.html` (in this folder) at a public URL and
paste the link here. Easiest options:

- **GitHub Pages** (free): create a public repo, push `privacy-policy.html`
  as `index.html`, enable Pages → URL becomes
  `https://<username>.github.io/<repo>/`
- **Netlify Drop** (free, no signup): https://app.netlify.com/drop — drag the
  HTML file, get a URL in 10 seconds.
- **Cloudflare Pages** / Vercel — also free.

Then paste the URL into the **Privacy policy URL** field.

---

## 4. Distribution

### Visibility
- **Public** — listed in the Chrome Web Store and discoverable via search.
- **Unlisted** — accessible only via direct link, not searchable. Good for
  first launch if you want to share with a small group before going public.

Recommended for first submission: **Public**.

### Regions
Default to **All regions**. There's no reason to restrict — Arabic speakers
exist worldwide.

### Pricing
**Free**. (No paid model is set up; this is a free utility.)

---

## 5. Pre-submission checklist

Tick each before pressing Submit:

- [ ] Uploaded `arabic-rtl-v1.0.0.zip` (the version in this folder, with icons)
- [ ] Pasted the Summary (under 132 chars)
- [ ] Pasted the full Description
- [ ] Selected category: Productivity
- [ ] Set primary language: English; secondary: Arabic
- [ ] Uploaded the 128×128 store icon
- [ ] Uploaded at least 1 screenshot (1280×800)
- [ ] Pasted the Single purpose description
- [ ] Pasted permission justifications (5 of them: storage, activeTab, 3 host permissions)
- [ ] Set "Remote code use" to NO
- [ ] Marked all data categories as "not collected"
- [ ] Checked the three data-handling certification boxes
- [ ] Hosted `privacy-policy.html` on a public URL and pasted the URL
- [ ] Set Visibility to Public (or Unlisted if cautious)
- [ ] Set regions to All
- [ ] Submitted for review

Reviews typically take **1–7 days**. If rejected, the email will include the
specific reason — usually a permission justification needs more detail. Just
edit and resubmit (no fee).

---

## 6. Common rejection reasons (and why this submission avoids them)

| Reason | Why we're safe |
|---|---|
| Vague single purpose | Single purpose is one specific sentence about one specific behavior |
| Over-permissioned | Only 2 API permissions (`storage`, `activeTab`); host permissions limited to 4 explicit hostnames |
| Missing privacy policy | `privacy-policy.html` provided, bilingual, hosted publicly |
| Remote code | Zero remote code, declared NO |
| Misleading screenshots | Screenshots only depict the extension's actual behavior |
| Doesn't work | Tested locally on all three sites before packaging |

---

## 7. After approval — versioning

To push an update later:

1. Edit code.
2. Bump `version` in `manifest.json` (e.g., `1.0.0` → `1.0.1`).
3. Rebuild ZIP (script in `DOCUMENTATION.md`).
4. Developer Dashboard → your item → **Package** → upload new ZIP →
   **Submit for review**. Updates usually approve faster than the initial submission.
