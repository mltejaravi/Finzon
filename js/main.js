/* ==========================================================================
   Finzon Marketing — site script
   Shared header/footer, carousel, EMI calculator, forms & animations.
   Edit CONFIG and LOANS below to update contact details and loan products.
   ========================================================================== */

const CONFIG = {
  brand: "Finzon Marketing",
  email: "finzonmarketing@gmail.com",
  phone: "+91 90300 06779",
  whatsapp: "919030006779",           // digits only, used for wa.me link
  address: "Hyderabad, Telangana, India", // TODO: replace with your office address
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  currency: "INR",
  locale: "en-IN",
  // Paste a form endpoint (e.g. https://formspree.io/f/xxxx) to receive enquiries.
  // Left empty, forms validate and show a success message without sending anything.
  formEndpoint: "",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    x: "#",
    youtube: "#",
  },
};

const LOANS = [
  {
    slug: "home-loan", name: "Home Loan", icon: "home",
    short: "Buy, build or renovate your dream home with long, flexible tenures.",
    rate: 8.35, upTo: "₹10 Cr", tenure: "30 yrs",
    emi: { min: 100000, max: 50000000, step: 100000, amount: 5000000, rate: 8.35, tenure: 20, maxTenure: 30 },
  },
  {
    slug: "personal-loan", name: "Personal Loan", icon: "user",
    short: "Instant funds for weddings, travel, medical or any personal need.",
    rate: 10.49, upTo: "₹40 L", tenure: "6 yrs",
    emi: { min: 50000, max: 4000000, step: 10000, amount: 500000, rate: 10.49, tenure: 3, maxTenure: 6 },
  },
  {
    slug: "mortgage-loan", name: "Mortgage Loan", icon: "building",
    short: "Unlock the value of your property with a loan against property.",
    rate: 9.25, upTo: "₹15 Cr", tenure: "20 yrs",
    emi: { min: 500000, max: 50000000, step: 100000, amount: 7500000, rate: 9.25, tenure: 15, maxTenure: 20 },
  },
  {
    slug: "business-loan", name: "Business Loan", icon: "briefcase",
    short: "Working capital, expansion or equipment — fuel your business growth.",
    rate: 11.5, upTo: "₹75 L", tenure: "5 yrs",
    emi: { min: 100000, max: 7500000, step: 50000, amount: 1500000, rate: 11.5, tenure: 3, maxTenure: 5 },
  },
  {
    slug: "car-loan", name: "Car Loan", icon: "car",
    short: "Drive home a new or pre-owned car with up to 100% on-road funding.",
    rate: 8.75, upTo: "₹1 Cr", tenure: "7 yrs",
    emi: { min: 100000, max: 5000000, step: 25000, amount: 800000, rate: 8.75, tenure: 5, maxTenure: 7 },
  },
  {
    slug: "education-loan", name: "Education Loan", icon: "graduation",
    short: "Study in India or abroad with collateral-free options and moratorium.",
    rate: 8.9, upTo: "₹1.5 Cr", tenure: "15 yrs",
    emi: { min: 100000, max: 15000000, step: 50000, amount: 2000000, rate: 8.9, tenure: 10, maxTenure: 15 },
  },
];

/* ---------- Icons (24×24 stroke) ---------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  car: '<path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M5 18H4a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1M9 18h6"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  graduation: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
  "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  "arrow-up": '<path d="M12 19V5M5 12l7-7 7 7"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M16 3.1a4 4 0 0 1 0 7.8M22 21v-1a6 6 0 0 0-4-5.6"/>',
  headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2zM18 18v1a3 3 0 0 1-3 3h-3"/>',
  star: '<path fill="currentColor" stroke="none" d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.2L5.8 21 7 14.1 2 9.3l6.9-1z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4"/>',
  trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 12h-4a2 2 0 0 0 0 4h4z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  whatsapp: '<path d="M3 21l1.7-5A9 9 0 1 1 8 19.4z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  xsocial: '<path d="M4 4h4.5L20 20h-4.5zM20 4l-6.6 7.2M4 20l6.6-7.2"/>',
  youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m9.8 15 5.7-3-5.7-3z"/>',
};

const icon = (name, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

/* ---------- Brand logo (original image — do not alter) ---------- */
const brandLogo = (size) => `
  <a class="brand" href="index.html" aria-label="${CONFIG.brand} — home">
    <img src="assets/img/${size > 100 ? "logo-480" : "logo-240"}.webp" alt="${CONFIG.brand}" width="${size}" height="${size}">
  </a>`;

/* ---------- Formatting helpers ---------- */
const money = (v) =>
  new Intl.NumberFormat(CONFIG.locale, { style: "currency", currency: CONFIG.currency, maximumFractionDigits: 0 }).format(Math.round(v));
const num = (v) => new Intl.NumberFormat(CONFIG.locale, { maximumFractionDigits: 0 }).format(Math.round(v));
const moneyShort = (v) => {
  if (v >= 1e7) return `₹${+(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${+(v / 1e5).toFixed(2)} L`;
  if (v >= 1e3) return `₹${+(v / 1e3).toFixed(0)}K`;
  return `₹${v}`;
};
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const currentPage = () => (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
const telHref = () => `tel:${CONFIG.phone.replace(/[^\d+]/g, "")}`;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==========================================================================
   Layout: header, drawer, footer, modal
   ========================================================================== */
function renderLayout() {
  const page = currentPage();
  const isLoanPage = LOANS.some((l) => l.slug === page) || page === "loans";
  const cur = (p) => (page === p ? ' aria-current="page"' : "");

  const megaItems = LOANS.map(
    (l) => `
      <a class="mega-item" href="${l.slug}.html">
        <span class="icon-tile">${icon(l.icon)}</span>
        <span><strong>${l.name}</strong><span>From ${l.rate}% p.a. · up to ${l.upTo}</span></span>
      </a>`
  ).join("");

  const header = `
  <header class="site-header" id="siteHeader">
    <div class="container">
      ${brandLogo(60)}
      <ul class="nav" role="list">
        <li><a class="nav-link" href="index.html"${cur("index")}>Home</a></li>
        <li class="has-mega">
          <button class="nav-link" type="button" aria-expanded="false" aria-haspopup="true"${isLoanPage ? ' aria-current="page"' : ""}>Loans ${icon("chevron-down")}</button>
          <div class="mega">
            ${megaItems}
            <div class="mega-promo">
              <div>
                <h4>Not sure which loan fits?</h4>
                <p>Compare every product side-by-side and get a free expert callback.</p>
              </div>
              <a class="btn btn-primary btn-sm" href="loans.html">View all loans ${icon("arrow-right")}</a>
            </div>
          </div>
        </li>
        <li><a class="nav-link" href="emi-calculator.html"${cur("emi-calculator")}>EMI Calculator</a></li>
        <li><a class="nav-link" href="about.html"${cur("about")}>About Us</a></li>
        <li><a class="nav-link" href="contact.html"${cur("contact")}>Contact</a></li>
      </ul>
      <div class="theme">
        <button class="theme-btn" type="button" aria-label="Change theme" aria-haspopup="true" aria-expanded="false">
          ${icon("sun", "i-sun")}${icon("moon", "i-moon")}
        </button>
        <div class="theme-pop" role="menu" aria-label="Theme">
          ${THEME_OPTIONS.map((o) => `<button class="theme-opt" type="button" role="menuitemradio" aria-checked="false" data-theme-set="${o.value}">${icon(o.icon)}${o.label}${icon("check", "tick")}</button>`).join("")}
        </div>
      </div>
      <div class="header-actions">
        <a class="header-phone" href="${telHref()}">${icon("phone")} ${CONFIG.phone}</a>
        <button class="btn btn-primary btn-sm" type="button" data-apply>Apply Now ${icon("arrow-right")}</button>
      </div>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
    </div>
  </header>
  <nav class="drawer" id="drawer" aria-label="Mobile">
    <a class="drawer-link" href="index.html">Home ${icon("arrow-right", "")}</a>
    <p class="drawer-label">Loans</p>
    <div class="drawer-loans">
      ${LOANS.map((l) => `<a href="${l.slug}.html"><span class="icon-tile">${icon(l.icon)}</span>${l.name}</a>`).join("")}
    </div>
    <a class="drawer-link" href="loans.html">All Loans ${icon("arrow-right")}</a>
    <a class="drawer-link" href="emi-calculator.html">EMI Calculator ${icon("arrow-right")}</a>
    <a class="drawer-link" href="about.html">About Us ${icon("arrow-right")}</a>
    <a class="drawer-link" href="contact.html">Contact ${icon("arrow-right")}</a>
    <p class="drawer-label">Appearance</p>
    <div class="theme-seg" role="radiogroup" aria-label="Theme">
      ${THEME_OPTIONS.map((o) => `<button type="button" role="radio" aria-checked="false" data-theme-set="${o.value}">${icon(o.icon)}${o.label}</button>`).join("")}
    </div>
    <button class="btn btn-primary btn-lg btn-block" type="button" data-apply>Apply Now ${icon("arrow-right")}</button>
    <a class="btn btn-ghost btn-block" href="${telHref()}">${icon("phone")} ${CONFIG.phone}</a>
  </nav>`;

  const s = CONFIG.socials;
  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          ${brandLogo(170)}
          <p>Your trusted loan marketing partner. We connect you with leading banks &amp; NBFCs to get the right loan at the best rate — fast, transparent and free of charge.</p>
          <div class="socials">
            <a href="${s.facebook}" aria-label="Facebook">${icon("facebook")}</a>
            <a href="${s.instagram}" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${s.linkedin}" aria-label="LinkedIn">${icon("linkedin")}</a>
            <a href="${s.x}" aria-label="X">${icon("xsocial")}</a>
            <a href="${s.youtube}" aria-label="YouTube">${icon("youtube")}</a>
          </div>
        </div>
        <div>
          <h4>Loans</h4>
          <ul class="footer-links">${LOANS.map((l) => `<li><a href="${l.slug}.html">${l.name}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="loans.html">All Loans</a></li>
            <li><a href="emi-calculator.html">EMI Calculator</a></li>
            <li><a href="index.html#faq">FAQs</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul class="footer-contact">
            <li>${icon("phone")}<a href="${telHref()}">${CONFIG.phone}</a></li>
            <li>${icon("mail")}<a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
            <li>${icon("pin")}<span>${CONFIG.address}</span></li>
            <li>${icon("clock")}<span>${CONFIG.hours}</span></li>
          </ul>
          <form class="newsletter" data-newsletter novalidate>
            <label class="sr-only" for="nl-email">Email address</label>
            <input id="nl-email" type="email" placeholder="Your email for rate alerts" required>
            <button class="btn btn-primary btn-sm" type="submit">Subscribe</button>
          </form>
          <p class="newsletter-msg" aria-live="polite"></p>
        </div>
      </div>
      <p class="disclaimer">${CONFIG.brand} is a loan marketing and facilitation partner. Loans are sanctioned at the sole discretion of our partner banks and NBFCs, subject to their eligibility criteria and documentation. Interest rates, fees and amounts shown are indicative and may change without notice.</p>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} ${CONFIG.brand}. All rights reserved.</span>
      <nav aria-label="Footer">
        <a href="index.html">Home</a><a href="loans.html">Loans</a><a href="emi-calculator.html">EMI Calculator</a><a href="contact.html">Contact</a>
      </nav>
    </div>
  </footer>
  <button class="to-top" type="button" aria-label="Back to top">${icon("arrow-up")}</button>`;

  const loanOptions = LOANS.map((l) => `<option value="${l.slug}">${l.name}</option>`).join("");
  const modal = `
  <div class="modal" id="applyModal" role="dialog" aria-modal="true" aria-labelledby="applyTitle" aria-hidden="true">
    <div class="modal-backdrop" data-close></div>
    <div class="modal-dialog">
      <button class="modal-close" type="button" aria-label="Close" data-close>${icon("x")}</button>
      <form data-lead-form novalidate>
        <h3 id="applyTitle">Apply in 2 minutes</h3>
        <p class="modal-sub">Share a few details and a Finzon loan expert will call you back with the best offers.</p>
        <div class="form-grid">
          <div class="field full">
            <label for="a-name">Full name</label>
            <input class="input" id="a-name" name="name" autocomplete="name" required>
            <span class="field-error">Please enter your name</span>
          </div>
          <div class="field">
            <label for="a-phone">Mobile number</label>
            <input class="input" id="a-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" pattern="[6-9][0-9]{9}" maxlength="10" required>
            <span class="field-error">Enter a valid 10-digit mobile</span>
          </div>
          <div class="field">
            <label for="a-email">Email</label>
            <input class="input" id="a-email" name="email" type="email" autocomplete="email">
            <span class="field-error">Enter a valid email</span>
          </div>
          <div class="field">
            <label for="a-type">Loan type</label>
            <select class="select" id="a-type" name="loan" required><option value="">Select</option>${loanOptions}</select>
            <span class="field-error">Choose a loan type</span>
          </div>
          <div class="field">
            <label for="a-amount">Loan amount (₹)</label>
            <input class="input" id="a-amount" name="amount" inputmode="numeric" placeholder="e.g. 5,00,000">
          </div>
          <div class="field full">
            <label for="a-city">City</label>
            <input class="input" id="a-city" name="city" autocomplete="address-level2" required>
            <span class="field-error">Please enter your city</span>
          </div>
        </div>
        <label class="check"><input type="checkbox" name="consent" required> <span>I authorise ${CONFIG.brand} and its partner lenders to contact me via call, SMS, WhatsApp or email regarding my loan enquiry.</span></label>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Get my loan offers ${icon("arrow-right")}</button>
        <p class="form-note">${icon("lock", "")} 100% secure · No impact on your credit score</p>
        <div class="form-success" role="status">
          <span class="icon-tile">${icon("check")}</span>
          <h3>Thank you<span data-success-name></span>!</h3>
          <p class="modal-sub">Your enquiry has been received. A Finzon loan expert will call you within 24 working hours.</p>
          <button class="btn btn-ghost" type="button" data-close>Close</button>
        </div>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer + modal);
  $(".form-note svg")?.setAttribute("style", "width:14px;height:14px;display:inline;vertical-align:-2px");
}

/* ==========================================================================
   Theme manager — Light / Dark / System (follows the device)
   The saved choice is applied before first paint by a tiny inline script in each page's <head>.
   ========================================================================== */
const THEME_KEY = "finzon-theme";
const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

const Theme = {
  get() {
    try { const t = localStorage.getItem(THEME_KEY); return t === "light" || t === "dark" ? t : "system"; }
    catch { return "system"; }
  },
  effective(pref = Theme.get()) { return pref === "system" ? (darkQuery.matches ? "dark" : "light") : pref; },
  set(pref) {
    try { pref === "system" ? localStorage.removeItem(THEME_KEY) : localStorage.setItem(THEME_KEY, pref); } catch { /* storage blocked */ }
    Theme.apply(pref);
  },
  apply(pref = Theme.get()) {
    const root = document.documentElement;
    if (pref === "system") delete root.dataset.theme; else root.dataset.theme = pref;
    const eff = Theme.effective(pref);
    $$(".theme-btn").forEach((b) => { b.dataset.effective = eff; b.setAttribute("aria-label", `Change theme (current: ${pref})`); });
    $$("[data-theme-set]").forEach((b) => b.setAttribute("aria-checked", b.dataset.themeSet === pref));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", eff === "dark" ? "#060b1f" : "#0a1230");
  },
};

function initTheme() {
  Theme.apply();
  const wrap = $(".theme");
  const btn = $(".theme-btn", wrap);
  const setOpen = (open) => { wrap.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(!wrap.classList.contains("is-open")); });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  $$("[data-theme-set]").forEach((b) => b.addEventListener("click", () => { Theme.set(b.dataset.themeSet); setOpen(false); }));
  darkQuery.addEventListener("change", () => Theme.get() === "system" && Theme.apply("system"));
  // Keep multiple open tabs in sync
  window.addEventListener("storage", (e) => e.key === THEME_KEY && Theme.apply());
}

/* ---------- Header behaviour ---------- */
function initHeader() {
  const header = $("#siteHeader");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > 40);
    toTop.classList.toggle("is-visible", y > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  const burger = $(".burger");
  const setNav = (open) => {
    document.documentElement.classList.toggle("nav-open", open);
    document.body.classList.toggle("no-scroll", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setNav(!document.documentElement.classList.contains("nav-open")));
  $$("#drawer a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  window.addEventListener("resize", () => window.innerWidth > 960 && setNav(false));

  const mega = $(".has-mega");
  const megaBtn = $("button", mega);
  megaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = !mega.classList.contains("is-open");
    mega.classList.toggle("is-open", open);
    megaBtn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => {
    if (!mega.contains(e.target)) { mega.classList.remove("is-open"); megaBtn.setAttribute("aria-expanded", false); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { mega.classList.remove("is-open"); setNav(false); closeModal(); }
  });
}

/* ==========================================================================
   Hero carousel
   ========================================================================== */
function initCarousel(root) {
  const slides = $$(".slide", root);
  if (slides.length < 2) return;
  const interval = +root.dataset.interval || 6000;
  root.style.setProperty("--slide-ms", `${interval}ms`);
  const dotsWrap = $(".dots", root);
  const countEl = $(".carousel-count", root);
  let index = 0, timer = null, paused = false;

  dotsWrap.innerHTML = slides.map((_, i) => `<button class="dot" type="button" aria-label="Go to slide ${i + 1}"></button>`).join("");
  const dots = $$(".dot", dotsWrap);

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      const active = n === index;
      s.classList.toggle("is-active", active);
      s.setAttribute("aria-hidden", !active);
      $$("a, button", s).forEach((el) => (el.tabIndex = active ? 0 : -1));
    });
    dots.forEach((d, n) => {
      d.classList.remove("is-active");
      if (n === index) { void d.offsetWidth; d.classList.add("is-active"); } // restart progress animation
      d.setAttribute("aria-current", n === index);
    });
    if (countEl) countEl.innerHTML = `<b>${String(index + 1).padStart(2, "0")}</b> / ${String(slides.length).padStart(2, "0")}`;
    restart();
  };
  const restart = () => {
    clearTimeout(timer);
    if (!paused && !reduceMotion) timer = setTimeout(() => go(index + 1), interval);
  };
  const setPaused = (p) => { paused = p; root.classList.toggle("is-paused", p); p ? clearTimeout(timer) : restart(); };

  $(".arrow-prev", root)?.addEventListener("click", () => go(index - 1));
  $(".arrow-next", root)?.addEventListener("click", () => go(index + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  root.addEventListener("mouseenter", () => setPaused(true));
  root.addEventListener("mouseleave", () => setPaused(false));
  root.addEventListener("focusin", () => setPaused(true));
  root.addEventListener("focusout", () => setPaused(false));
  document.addEventListener("visibilitychange", () => setPaused(document.hidden));
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });

  // Touch swipe
  let x0 = null, y0 = null;
  root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  root.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  go(0);
}

/* ==========================================================================
   EMI calculator
   ========================================================================== */
const calcEmi = (P, annualRate, years) => {
  const n = Math.round(years * 12);
  const r = annualRate / 12 / 100;
  if (!P || !n) return { emi: 0, total: 0, interest: 0 };
  const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  return { emi, total, interest: total - P };
};

function initEmi(root) {
  const showTabs = root.hasAttribute("data-tabs");
  const withSchedule = root.hasAttribute("data-schedule");
  let loan = LOANS.find((l) => l.slug === root.dataset.loan) || LOANS[0];
  const C = 2 * Math.PI * 52;

  root.innerHTML = `
    <div class="emi-controls">
      ${showTabs ? `<div class="emi-type" role="tablist" aria-label="Loan type">${LOANS.map((l) => `<button type="button" role="tab" data-slug="${l.slug}">${l.name}</button>`).join("")}</div>` : ""}
      <div class="range-group">
        <div class="range-head"><label for="emi-amt-${root.dataset.uid}">Loan amount</label>
          <span class="range-value"><small>₹</small><input type="text" inputmode="numeric" data-k="amount" aria-label="Loan amount in rupees"></span></div>
        <input type="range" id="emi-amt-${root.dataset.uid}" data-r="amount">
        <div class="range-scale"><span data-min="amount"></span><span data-max="amount"></span></div>
      </div>
      <div class="range-group">
        <div class="range-head"><label for="emi-rate-${root.dataset.uid}">Interest rate (p.a.)</label>
          <span class="range-value"><input type="text" inputmode="decimal" data-k="rate" aria-label="Interest rate" style="width:60px"><small>%</small></span></div>
        <input type="range" id="emi-rate-${root.dataset.uid}" data-r="rate" min="5" max="24" step="0.05">
        <div class="range-scale"><span>5%</span><span>24%</span></div>
      </div>
      <div class="range-group">
        <div class="range-head"><label for="emi-ten-${root.dataset.uid}">Loan tenure</label>
          <span class="range-value"><input type="text" inputmode="numeric" data-k="tenure" aria-label="Tenure in years" style="width:44px"><small>Years</small></span></div>
        <input type="range" id="emi-ten-${root.dataset.uid}" data-r="tenure" min="1" step="1">
        <div class="range-scale"><span>1 Yr</span><span data-max="tenure"></span></div>
      </div>
    </div>
    <div class="emi-result" aria-live="polite">
      <div class="emi-monthly">Your monthly EMI<strong data-out="emi">₹0</strong></div>
      <div class="emi-chart">
        <svg class="donut" viewBox="0 0 120 120" aria-hidden="true">
          <circle class="d-bg" cx="60" cy="60" r="52"/>
          <circle class="d-fg" cx="60" cy="60" r="52" stroke-dasharray="0 ${C}"/>
        </svg>
        <div class="legend">
          <div class="l-p">Principal amount<strong data-out="principal"></strong></div>
          <div class="l-i">Total interest<strong data-out="interest"></strong></div>
        </div>
      </div>
      <div class="emi-total"><span>Total amount payable</span><strong data-out="total"></strong></div>
      <button class="btn btn-primary btn-lg btn-block" type="button" data-apply="${loan.slug}">Apply for this loan ${icon("arrow-right")}</button>
    </div>`;

  let scheduleEl = null;
  if (withSchedule) {
    scheduleEl = document.createElement("div");
    scheduleEl.className = "schedule";
    root.after(scheduleEl);
  }

  const state = {};
  const ranges = { amount: $('[data-r="amount"]', root), rate: $('[data-r="rate"]', root), tenure: $('[data-r="tenure"]', root) };
  const inputs = { amount: $('[data-k="amount"]', root), rate: $('[data-k="rate"]', root), tenure: $('[data-k="tenure"]', root) };
  const out = (k) => $(`[data-out="${k}"]`, root);
  const applyBtn = $(".emi-result [data-apply]", root);

  const paintRange = (r) => {
    const p = ((r.value - r.min) / (r.max - r.min)) * 100;
    r.style.setProperty("--p", `${p}%`);
  };

  const render = () => {
    const { emi, total, interest } = calcEmi(state.amount, state.rate, state.tenure);
    out("emi").textContent = money(emi);
    out("principal").textContent = money(state.amount);
    out("interest").textContent = money(interest);
    out("total").textContent = money(total);
    const share = total ? state.amount / total : 0;
    $(".d-fg", root).setAttribute("stroke-dasharray", `${share * C} ${C}`);
    Object.keys(ranges).forEach((k) => { ranges[k].value = state[k]; paintRange(ranges[k]); });
    if (document.activeElement !== inputs.amount) inputs.amount.value = num(state.amount);
    if (document.activeElement !== inputs.rate) inputs.rate.value = state.rate;
    if (document.activeElement !== inputs.tenure) inputs.tenure.value = state.tenure;
    if (scheduleEl) renderSchedule();
  };

  const renderSchedule = () => {
    const n = state.tenure * 12, r = state.rate / 1200;
    const { emi } = calcEmi(state.amount, state.rate, state.tenure);
    let bal = state.amount, rows = "";
    for (let y = 1; y <= state.tenure; y++) {
      let pp = 0, ip = 0;
      for (let m = 0; m < 12 && (y - 1) * 12 + m < n; m++) {
        const i = bal * r, p = emi - i;
        ip += i; pp += p; bal = Math.max(0, bal - p);
      }
      rows += `<tr><td>Year ${y}</td><td>${money(pp)}</td><td>${money(ip)}</td><td>${money(pp + ip)}</td><td>${money(bal)}</td></tr>`;
    }
    scheduleEl.innerHTML = `
      <div class="section-head section-head--left" style="margin:56px 0 24px"><h3>Year-wise repayment schedule</h3>
      <p style="font-size:.95rem">How your ${loan.name.toLowerCase()} of ${money(state.amount)} is repaid over ${state.tenure} year${state.tenure > 1 ? "s" : ""}.</p></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Year</th><th>Principal paid</th><th>Interest paid</th><th>Total paid</th><th>Balance</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`;
  };

  const setLoan = (l) => {
    loan = l;
    const e = l.emi;
    Object.assign(state, { amount: e.amount, rate: e.rate, tenure: e.tenure });
    Object.assign(ranges.amount, { min: e.min, max: e.max, step: e.step });
    ranges.tenure.max = e.maxTenure;
    $('[data-min="amount"]', root).textContent = moneyShort(e.min);
    $('[data-max="amount"]', root).textContent = moneyShort(e.max);
    $('[data-max="tenure"]', root).textContent = `${e.maxTenure} Yrs`;
    applyBtn.dataset.apply = l.slug;
    applyBtn.firstChild.textContent = `Apply for ${l.name} `;
    $$(".emi-type button", root).forEach((b) => {
      const on = b.dataset.slug === l.slug;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    render();
  };

  Object.entries(ranges).forEach(([k, r]) =>
    r.addEventListener("input", () => { state[k] = +r.value; render(); })
  );
  const clamp = (k, v) => Math.min(+ranges[k].max, Math.max(+ranges[k].min, v));
  Object.entries(inputs).forEach(([k, inp]) => {
    inp.addEventListener("input", () => {
      const raw = k === "rate" ? parseFloat(inp.value.replace(/[^\d.]/g, "")) : parseInt(inp.value.replace(/\D/g, ""), 10);
      if (!isNaN(raw)) { state[k] = k === "amount" ? raw : clamp(k, raw); render(); }
    });
    inp.addEventListener("blur", () => { state[k] = clamp(k, state[k]); render(); });
  });
  $$(".emi-type button", root).forEach((b) =>
    b.addEventListener("click", () => setLoan(LOANS.find((l) => l.slug === b.dataset.slug)))
  );

  setLoan(loan);
}

/* ==========================================================================
   Forms & modal
   ========================================================================== */
let lastFocus = null;
function openModal(slug, prefill = {}) {
  const modal = $("#applyModal");
  const form = $("form", modal);
  form.classList.remove("is-sent");
  if (slug) $("#a-type").value = slug;
  if (prefill.amount) $("#a-amount").value = prefill.amount;
  if (prefill.phone) $("#a-phone").value = prefill.phone;
  lastFocus = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setTimeout(() => $("#a-name").focus(), 50);
}
function closeModal() {
  const modal = $("#applyModal");
  if (!modal?.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.documentElement.classList.contains("nav-open")) document.body.classList.remove("no-scroll");
  lastFocus?.focus?.();
}

function validate(form) {
  let ok = true;
  $$("input, select, textarea", form).forEach((el) => {
    const field = el.closest(".field");
    let valid = el.checkValidity();
    if (el.name === "phone" && el.value) valid = /^[6-9]\d{9}$/.test(el.value.replace(/\D/g, "").slice(-10));
    if (field) field.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  const consent = $('input[name="consent"]', form);
  if (consent && !consent.checked) { ok = false; consent.closest(".check").style.color = "var(--danger)"; }
  else if (consent) consent.closest(".check").style.color = "";
  if (!ok) $(".is-invalid input, .is-invalid select, .is-invalid textarea", form)?.focus();
  return ok;
}

async function submitForm(form) {
  if (!validate(form)) return;
  const btn = $('button[type="submit"]', form);
  const label = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = "Submitting…";
  const data = Object.fromEntries(new FormData(form));
  data.page = location.pathname;
  try {
    if (CONFIG.formEndpoint) {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
    } else {
      await new Promise((r) => setTimeout(r, 700));
    }
    const nameEl = $("[data-success-name]", form);
    if (nameEl) nameEl.textContent = data.name ? `, ${String(data.name).split(" ")[0]}` : "";
    form.reset();
    form.classList.add("is-sent");
  } catch {
    alert(`Sorry, something went wrong. Please call us at ${CONFIG.phone} or email ${CONFIG.email}.`);
  } finally {
    btn.disabled = false;
    btn.innerHTML = label;
  }
}

function initForms() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-apply]");
    if (trigger) { e.preventDefault(); openModal(trigger.dataset.apply); return; }
    if (e.target.closest("[data-close]")) closeModal();
  });

  $$("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (e) => { e.preventDefault(); submitForm(form); });
    form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("is-invalid"));
    $$('input[name="phone"]', form).forEach((p) => p.addEventListener("input", () => (p.value = p.value.replace(/\D/g, "").slice(0, 10))));
    $$('input[name="amount"]', form).forEach((a) =>
      a.addEventListener("input", () => { const v = a.value.replace(/\D/g, ""); a.value = v ? num(+v) : ""; })
    );
  });

  // Home page quick-eligibility bar → opens modal prefilled
  const quick = $("[data-quick]");
  if (quick) {
    const amt = $('[name="q-amount"]', quick);
    amt.addEventListener("input", () => { const v = amt.value.replace(/\D/g, ""); amt.value = v ? num(+v) : ""; });
    const ph = $('[name="q-phone"]', quick);
    ph.addEventListener("input", () => (ph.value = ph.value.replace(/\D/g, "").slice(0, 10)));
    quick.addEventListener("submit", (e) => {
      e.preventDefault();
      openModal($('[name="q-loan"]', quick).value, { amount: amt.value, phone: ph.value });
    });
  }

  $$("[data-newsletter]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", f), msg = f.nextElementSibling;
      if (!input.checkValidity() || !input.value) { msg.style.color = "#ff8095"; msg.textContent = "Please enter a valid email."; return; }
      msg.style.color = ""; msg.textContent = "You're subscribed — watch your inbox for rate drops!";
      f.reset();
    })
  );
}

/* ==========================================================================
   Small UI bits
   ========================================================================== */
function initFaq() {
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    q.setAttribute("aria-expanded", item.classList.contains("is-open"));
    q.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      $$(".faq-item", item.parentElement).forEach((i) => { i.classList.remove("is-open"); $(".faq-q", i).setAttribute("aria-expanded", false); });
      item.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", open);
    });
  });
}

function initReveal() {
  const els = $$(".reveal, .reveal-stagger");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((e) => io.observe(e));
}

function initCounters() {
  const els = $$("[data-count]");
  const run = (el) => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0);
    const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    const fmt = (v) => pre + new Intl.NumberFormat(CONFIG.locale, { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v) + suf;
    if (reduceMotion) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.5 });
  els.forEach((e) => io.observe(e));
}

function fillIcons() {
  $$("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  $$("[data-config]").forEach((el) => { el.textContent = CONFIG[el.dataset.config]; });
  const hrefs = { phone: telHref(), email: `mailto:${CONFIG.email}`, whatsapp: `https://wa.me/${CONFIG.whatsapp}` };
  $$("[data-config-href]").forEach((el) => { el.href = hrefs[el.dataset.configHref]; });
}

/* ---------- Boot ---------- */
document.documentElement.classList.remove("no-js");
renderLayout();
fillIcons();
initTheme();
initHeader();
$$("[data-carousel]").forEach(initCarousel);
$$("[data-emi]").forEach((el, i) => { el.dataset.uid = i; initEmi(el); });
initForms();
initFaq();
initReveal();
initCounters();
