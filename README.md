# Finzon Marketing — Website

Static marketing site (HTML/CSS/JS, no build step) for home, personal, mortgage, business, car and education loans. Ready for GitHub Pages.

## Pages

| Page | File |
| --- | --- |
| Home (hero carousel, loans, EMI calculator, FAQ) | `index.html` |
| All loans + comparison table | `loans.html` |
| Loan detail pages | `home-loan.html`, `personal-loan.html`, `mortgage-loan.html`, `business-loan.html`, `car-loan.html`, `education-loan.html` |
| EMI calculator with year-wise schedule | `emi-calculator.html` |
| About / Contact / 404 | `about.html`, `contact.html`, `404.html` |

## Editing

- **Contact details, socials, form endpoint** — `CONFIG` at the top of `js/main.js`.
- **Nav / footer / apply modal** — rendered once by `js/main.js`, so changes apply to every page.
- **Loan products in nav, footer and EMI calculator** — `LOANS` in `js/main.js`.
- **Colours & fonts** — CSS variables at the top of `css/style.css`. Dark-theme values sit right below them, under `:root[data-theme="dark"]`, and again in the `prefers-color-scheme` block.
- **Light / Dark / System theme** — the sun/moon button in the header (and "Appearance" in the mobile menu). The choice is saved in the visitor's browser; "System" follows their device setting.
- **Logo & favicon** — `assets/img/logo.webp` is the original logo; `favicon.ico` and `assets/img/icon-*.png` are the round emblem cut from it.

### Receiving form submissions

GitHub Pages can't process forms. Create a free form at a service like Formspree, then paste its URL into `CONFIG.formEndpoint`. Until then, forms validate and show a success message but send nothing.

## Run locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

All links are relative, so the site works on a project subpath or a custom domain.
