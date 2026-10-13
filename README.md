# No Base. No Season. — sign up site

Static site for the Strong & Courageous Rugby teen block at Goliath Fit for Purpose. Built from the Claude Design handoff in `../handoff/`. Upload this folder as is: no build step, works on any static host (Netlify, GitHub Pages, cPanel).

- `index.html`: Home. `sign-up.html`: Sign Up (3 steps). `terms.html`: Terms and Commitment.
- `css/goliath.css`: the Goliath design system (tokens, foundations, components), copied from the design (only change: fonts load as WOFF2 first). Don't edit it.
- `css/site.css`: page level rules. `js/site.js`: mobile menu only.
- `robots.txt`, `sitemap.xml`, `llms.txt`: crawl rules, page list and a plain text summary for AI assistants. Update `lastmod` in the sitemap and the facts in `llms.txt` when dates, price or pages change.
- `netlify.toml`: http to https redirect, security headers and cache rules.
- Structured data (JSON-LD) sits in each page's `<head>`. On Home it describes the programme (dates, price, place), the coach and the FAQs, so keep it in step with the visible text.
- Images are WebP in two or three sizes (`name-800.webp` etc.). Fonts are WOFF2 with the original TTF as fallback.

## Before launch

- **PayFast link.** In `sign-up.html`, look for the `PayFast link not set yet` comment and follow it.
- **Terms.** `terms.html` still says Draft. Remove the Draft badge and its note once the terms are confirmed.
- **Links that appear on every page.** The Google Form (`https://forms.gle/XaMLDP9zuUtkLmPWA`), WhatsApp (`27837056605`) and the Maps pin are written into each page. To change one, find and replace it across all three files.
