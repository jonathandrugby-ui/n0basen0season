# No Base. No Season. — sign up site

Static site for the Strong & Courageous Rugby teen block at Goliath Fit for Purpose. Built from the Claude Design handoff in `../handoff/`. Upload this folder as is: no build step, works on any static host (Netlify, GitHub Pages, cPanel).

- `index.html`: Home. `sign-up.html`: Sign Up (3 steps). `terms.html`: Terms and Commitment.
- `css/goliath.css`: the Goliath design system (tokens, foundations, components), copied unchanged. Don't edit it.
- `css/site.css`: page level rules. `js/site.js`: mobile menu only.

## Before launch

- **PayFast link.** In `sign-up.html`, look for the `PayFast link not set yet` comment and follow it.
- **Terms.** `terms.html` still says Draft. Remove the Draft badge and its note once the terms are confirmed.
- **Links that appear on every page.** The Google Form (`https://forms.gle/XaMLDP9zuUtkLmPWA`), WhatsApp (`27837056605`) and the Maps pin are written into each page. To change one, find and replace it across all three files.
