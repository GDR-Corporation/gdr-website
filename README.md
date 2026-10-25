# GDR Corporation — God Rare (GDR) landing site

Static marketing / waitlist site for **God Rare (GDR)**, a crypto exchange in development by GDR Corporation.
Plain HTML/CSS/vanilla JS — no build step. Works on GitHub Pages as-is.

## Structure
```
index.html        All page content (hero, features, security, roadmap, FAQ, footer)
css/style.css     Styles; theme colors/fonts are CSS variables at the top (:root)
js/main.js        Mobile menu + waitlist form handler
assets/logo.svg   GDR wordmark (also favicon.svg)
```

## Editing
- **Text:** edit `index.html` directly; each section is marked with an HTML comment.
- **Colors:** change `--gold`, `--bg`, etc. in `:root` in `css/style.css`.
- **Logo:** replace `assets/logo.svg` (and `assets/favicon.svg`).
- **Footer links:** Terms / Privacy / Contact are placeholders (`#`, `hello@example.com`) — update before going public.
- **Waitlist form:** currently front-end only (shows a thank-you message). Search for `TODO` in `index.html` and `js/main.js` to wire a real endpoint (Formspree, Netlify Forms, your API, etc.).

## Content rules
Features and roadmap are phrased as planned. Don't add user counts, volumes, licenses, regulatory claims, partners, or testimonials unless they're real and verified. Keep the risk disclaimer in the footer.

## Run locally
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Push to a GitHub repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
