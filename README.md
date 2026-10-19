# ☕ Kahani & Coffee — Digital Café Web Application

Kahani & Coffee is a warm, vintage-themed café web application designed to support QR-table ordering, handcrafted menu browsing, payment flow presentation, café activities exploration, and customer feedback.

---

## 1. Project Overview

Kahani & Coffee is a lightweight, responsive client-side web application built for café environments. Customers can scan a table QR code to explore beverages, meals, and desserts, select items, and submit an order ticket tied to their table. The project is focused on preserving a cozy, premium café ambiance with warm cream and deep roasted-brown aesthetics.

---

## 2. Technology Stack

* **Frontend:** Semantic HTML5, CSS3 (Custom Properties, Flexbox, CSS Grid)
* **Scripting:** Vanilla JavaScript (ES6+)
* **Client-side Storage:** Browser `localStorage` (temporary session persistence)
* **Fonts & Icons:** Google Fonts (`Playfair Display`, `Poppins`)
* **Backend / Database Status:** **Unconfigured / Pending Integration.** (A placeholder `firebase.js` exists in the repository, but no Firebase credentials or SDK imports are configured yet. The application currently operates strictly as a static client-side web application.)

---

## 3. Existing Features

* **Landing / Home Page (`index.html`):**
  * Brand introduction, hero banner with call-to-action ("Click To Order"), "Our Story" narrative section, and quick navigation buttons.
  * Table query parameter reader (`?table=<number>`) that automatically attaches the table reference to menu navigation.
* **Menu Experience (`menu.html`, `menu.js`):**
  * Dynamic rendering of 20+ food and beverage items across categories (Coffee, Pizza, Pasta, Dessert, Combos, Snacks).
  * Category filter bar (All, Coffee, Pizza, Pasta, Dessert, Combos, Snacks) with dynamic visual active-state highlighting.
  * In-page quick order summary panel with real-time running total calculation, item removal, and table number assignment.
  * Bottom floating cart bar for mobile viewports displaying item count and subtotal.
  * Toast notifications upon adding items to the cart.
* **Payment Flow Presentation (`payment.html`, `payment.js`):**
  * Reads the latest pending order from browser `localStorage` and presents the order summary (table number, item list, total amount).
  * Safe empty-state fallback message with navigation redirect if visited without active order data.
  * Payment options:
    * **Cash on Counter:** Instructive guidance for physical cash settlement upon pickup.
    * **UPI Payment:** Displays café UPI QR code and UPI ID (`kahani@upi`) alongside explicit instructions that UPI transfers require manual counter confirmation.
* **Café Activities Showcase (`activities.html`):**
  * Responsive activity cards (Canvas Painting, Book Reading, Board Gaming, Weekend Open Mic, Stargazing).
  * Interactive booking simulation modal with live capacity counters and day-of-week checks for weekend events.
* **Customer Feedback (`feedback.html`):**
  * Interactive 5-star rating selector, guest name, contact info, and feedback comment form.
  * Client-side confirmation popup animation.
* **Admin Dashboard UI (`admin.html`, `dashboard.html`, `admin.js`):**
  * Admin login interface (`admin.html`) with an informative system notice regarding pending Firebase Authentication integration.
  * Dashboard interface (`dashboard.html`) displaying current-browser order metrics (Total Orders, Total Revenue) and an interactive order table to progress order statuses (`Pending` ➔ `Preparing` ➔ `Ready` ➔ `Served` ➔ `Completed`).

---

## 4. Completed Phase 1 — October 2026 (Bug Fixes & Stabilization)

During the Phase 1 stabilization audit, the following critical issues were diagnosed and resolved:

1. **Fixed Hero Background CSS in `activities.html`:**
   * Replaced an invalid CSS rule (`img src="images/1172402.jpg"` inside a CSS property) with standard `url("images/1172402.jpg")` syntax pointing to a verified local asset.
2. **Repaired Shared Stylesheet (`style.css`):**
   * Removed an unwanted hardcoded background color (`#c18863`) on `.cards` that rendered an awkward brown border strip.
   * Deduplicated identical `.cart-bar` and `.view-cart` declarations.
3. **Corrected Menu Category Filter State:**
   * Updated all category buttons in `menu.html` to pass the element reference (`this`) to `filterItems()`.
   * Updated `filterItems()` in `menu.js` to ensure the `.active` highlight updates reliably across all categories.
   * Added an initialization hook ensuring the "All" category button highlights as active on initial load.
4. **Resilient Menu Image Error Handling:**
   * Added an inline `onerror="this.style.display='none'"` fallback to food card image tags in `menu.js` to prevent visual breakage for missing asset paths.
5. **Safe Empty-Cart Handling in `payment.js`:**
   * Implemented defensive null checks when reading `localStorage["orders"]`. If `payment.html` is accessed directly without an order, a friendly empty-cart notice with a "Back to Menu" link renders instead of throwing a JavaScript exception.
6. **Payment Safety & Honesty Improvements:**
   * Removed insecure card number, expiry, and CVV plain `<input>` fields and deleted the unfunctional "Card Payment" radio option.
   * Removed misleading client-side auto-"Confirmed" flags upon clicking payment buttons; UPI is explicitly documented as requiring counter verification.
7. **Removed Executable Hardcoded Admin Credentials:**
   * Removed the hardcoded plain-text login condition (`admin@gmail.com` / `1234`) from `admin.js` and replaced it with an honest dialogue explaining that backend authentication is pending.
8. **Cleaned Dashboard Markup & Noted Storage Scope:**
   * Removed malformed dummy `<tr>` rows floating outside the table tag and eliminated duplicate headings in `dashboard.html`.
   * Added a clear notice in the dashboard explaining that displayed order metrics are currently scoped to the local browser session.

---

## 5. Verification & Testing Status

### Automated & Scripted Validation (Current Session)
* `git diff --check`: **Passed (0 errors)** — No whitespace or merge conflict markers.
* **Credential Scan:** **Passed** — No plain-text passwords, API keys, or private keys exist in tracked code.
* **Structural Checks:**
  * Validated CSS background syntax in `activities.html`.
  * Verified all 7 category buttons in `menu.html` pass `this`.
  * Confirmed single canonical `<table>` structure in `dashboard.html`.
  * Verified defensive `if (!latest)` guard in `payment.js`.

### Testing Scope Notice
* **Executed:** Static code analysis, regex validation, pattern matching, Git history inspections, and CLI regression tests.
* **Not Executed:** Live browser UI interaction, backend Firebase verification, and end-to-end payment gateway transaction testing (as no backend or payment gateway is configured in this phase).

---

## 6. Current Limitations

Recruiters and evaluators reviewing this project should note the following architectural boundaries currently in place:

1. **`cart.html` and `cart.js`:** Currently empty 0-byte stub files. Menu orders currently utilize the in-page cart sidebar and transition directly to `payment.html`.
2. **Backend Authentication & Persistence:** `firebase.js` is unconfigured. Order records and status changes are stored solely in the client browser's `localStorage` and will clear if cache/storage is reset.
3. **Dashboard Access Control:** While executable credentials were removed, `dashboard.html` is accessible directly by URL until server-side authentication state guards and Firestore rules are implemented.
4. **Missing Menu Image Assets:** A subset of snack and combo items (`combo3.jpg`, `combo4.jpg`, `fries.jpg`, `garlicbread.jpg`, `sandwich.jpg`, `perifries.jpg`, `smoothie.jpg`, `mojito.jpg`) are not present in `images/` and are hidden via image error handlers.
5. **`landing-page.html`:** Contains standalone React JSX code; it is currently unlinked and inactive in this vanilla HTML/CSS/JS deployment.
6. **Payment Verification:** UPI payment display is non-transactional; it provides a visual QR code and requires manual counter verification by café personnel.

---

## 7. Planned Roadmap

The project is structured according to a multi-phase engineering roadmap:

* **Phase 1 (Completed):** Critical bug stabilization, stylesheet repair, null-safety, and credential cleanup.
* **Phase 2 (Upcoming):** Firebase SDK initialization (Auth + Firestore), admin authentication flow, role verification (`admins/{uid}`), and initial restrictive `firestore.rules`.
* **Phase 3:** Dedicated standalone cart page (`cart.html`, `cart.js`), item quantity manipulation, and Firestore order creation.
* **Phase 4:** Real-time restaurant dashboard powered by Firestore snapshot listeners, live status tracking, and audio/toast alerts.
* **Phase 5:** Responsive design refinements, mobile hamburger navigation, complete asset provisioning, and accessibility standards (WCAG).
* **Phase 6:** Dynamic QR table code generation, PWA offline manifest, and cloud deployment.

---

## 8. Local Setup & Execution

Because this project uses standard vanilla web technologies without bundlers or package managers, no compilation step is required:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Khushigupta1112/kahani-coffee.git
   cd kahani-coffee
   ```
2. **Run locally:**
   * Option A (Recommended): Use the VS Code extension **Live Server** (Right-click `index.html` ➔ "Open with Live Server").
   * Option B: Run a quick Python local HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Navigate to `http://localhost:8000/index.html` in your browser.
   * Option C: Open `index.html` directly in any modern web browser.
3. **Table Ordering Simulation:**
   * Simulate a QR scan at Table 3 by navigating to:
     ```
     http://localhost:8000/index.html?table=3
     ```

---

## 9. Security Notes

* **Client Storage:** Browser `localStorage` is completely accessible to user scripts and browser extensions; it is never a substitute for a secure database.
* **Client-Side Navigation:** Hiding UI elements or performing client-side JavaScript redirects (`window.location`) does not provide real access control. True access security requires backend token validation (e.g., Firebase Security Rules).
* **Payment State:** Client-rendered success messages or radio selections do not prove payment settlement. All financial transactions require backend webhooks or counter verification.
