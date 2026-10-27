# GDR Corporation — God Rare (GDR) landing site

Static marketing / waitlist site for **God Rare (GDR)**, a crypto exchange in development by GDR Corporation.
Plain HTML/CSS/vanilla JS — no build step. Works on GitHub Pages as-is.

## Structure
```
index.html        All page content (hero, features, security, roadmap, FAQ, footer)
css/style.css     Styles; theme colors/fonts are CSS variables at the top (:root)
js/main.js        Mobile menu + waitlist form handler
swap.html         Non-custodial Solana swap (Jupiter Plugin, integrated mode)
js/swap.js        Jupiter Plugin init + FEE CONFIG block at the top
assets/logo.svg   GDR wordmark (also favicon.svg)
```

## Editing
- **Text:** edit `index.html` directly; each section is marked with an HTML comment.
- **Colors:** change `--gold`, `--bg`, etc. in `:root` in `css/style.css`.
- **Logo:** replace `assets/logo.svg` (and `assets/favicon.svg`).
- **Footer links:** Terms / Privacy / Contact are placeholders (`#`, `hello@example.com`) — update before going public.
- **Waitlist form:** currently front-end only (shows a thank-you message). Search for `TODO` in `index.html` and `js/main.js` to wire a real endpoint (Formspree, Netlify Forms, your API, etc.).

## Content rules
Exchange features and roadmap are phrased as planned (GDR Swap is the only live, non-custodial service). Don't add user counts, volumes, licenses, regulatory claims, partners, or testimonials unless they're real and verified. Keep the risk disclaimer in the footer.

## Run locally
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Push to a GitHub repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

## GDR Swap (Jupiter Plugin)
`swap.html` embeds the Jupiter Plugin (formerly Jupiter Terminal) via the official script
`https://plugin.jup.ag/plugin-v1.js` and `window.Jupiter.init({ displayMode: "integrated", integratedTargetId: "jupiter-plugin", ... })`.
Docs: https://developers.jup.ag/docs/tool-kits/plugin/html-app-example , customization: https://developers.jup.ag/docs/tool-kits/plugin/customization .
Wallet connect (Phantom etc.) is built in (Unified Wallet Kit). Theme colors are the `--jupiter-plugin-*` variables at the bottom of `css/style.css`.

### Enabling the swap fee
The fee config is the block at the top of `js/swap.js` (`FEE_OWNER_WALLET`, `REFERRAL_ACCOUNT`, `FEE_BPS`).
The plugin needs a **Jupiter referral account** (a Referral Program PDA), not a plain wallet address. With `REFERRAL_ACCOUNT = ""` the swap works with no GDR fee.

1. Open https://referral.jup.ag/ and connect the fee owner wallet (`FEE_OWNER_WALLET`). Keep a little SOL in it for rent/fees.
2. Create a referral account under the **Jupiter Ultra** project (`DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc`). Copy the resulting *referral account* address.
   (Script alternative with `@jup-ag/referral-sdk` `initializeReferralAccountWithName`: https://developers.jup.ag/docs/swap/order-and-execute#referral-fees , https://developers.jup.ag/docs/ultra/add-fees-to-ultra)
3. Create **referral token accounts** for each mint you expect fees in — at least SOL (wrapped SOL `So111…112`) and USDC (`EPjF…Dt1v`). Jupiter picks the fee mint by priority (SOL > stablecoins > …); if the token account for that mint doesn't exist, the swap still goes through **without** your fee.
4. Paste the referral account into `REFERRAL_ACCOUNT` in `js/swap.js`. `FEE_BPS` must be 50–255 (default 50 = 0.5%). Jupiter keeps 20% of the integrator fee.
5. Commit + push; claim accrued fees from the Referral Dashboard.
Plugin fee FAQ: https://developers.jup.ag/docs/tool-kits/plugin/faq
