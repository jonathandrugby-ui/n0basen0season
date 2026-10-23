# No Base. No Season. — sign up site

Static site for the Strong & Courageous Rugby teen block at Goliath Fit for Purpose. Built from the Claude Design handoff in `../handoff/`. Upload this folder as is: no build step, works on any static host (Netlify, GitHub Pages, cPanel).

- `index.html`: Home. `sign-up.html`: Sign Up (3 steps). `terms.html`: Terms and Commitment.
- `css/goliath.css`: the Goliath design system (tokens, foundations, components), copied from the design (only change: fonts load as WOFF2 first). Don't edit it.
- `css/site.css`: page level rules. `js/site.js`: mobile menu. `js/hero.js`: Home hero slideshow (the photo list is the `data-slides` attribute on the hero; add or remove entries there).
- `robots.txt`, `sitemap.xml`, `llms.txt`: crawl rules, page list and a plain text summary for AI assistants. Update `lastmod` in the sitemap and the facts in `llms.txt` when dates, price or pages change.
- `netlify.toml`: http to https redirect, security headers and cache rules.
- `calendar/`: session invites (.ics): Thursdays, Saturdays and all 10, one event per session so every calendar app adds them all. Rebuild with `../email/make_calendar.py`. Keep the file names stable; sent emails link to them.
- Reviews: `js/reviews.js` shows and posts player and parent reviews via the Apps Script in `../reviews/reviews.gs` (Google Sheet). The block on Home stays hidden until `data-endpoint` on `#reviews` holds the web app URL.
- `email/`: the welcome email (HTML and text) that the Apps Script sender (`../email/send-welcome-email.gs`) fetches. Not indexed by search engines.
- Structured data (JSON-LD) sits in each page's `<head>`. On Home it describes the programme (dates, price, place), the coach and the FAQs, so keep it in step with the visible text.
- Images are WebP in two or three sizes (`name-800.webp` etc.). Fonts are WOFF2 with the original TTF as fallback.

## Before launch

- **Terms.** When you change the terms, update the "Last updated" date in `terms.html` and its `dateModified` in the structured data.
- **Links that appear on every page.** The Google Form (`https://forms.gle/XaMLDP9zuUtkLmPWA`), WhatsApp (`27837056605`) and the Maps pin are written into each page. To change one, find and replace it across all three files.
