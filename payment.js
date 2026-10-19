// =====================================================================
// payment.js  —  Kahani & Coffee
// Phase 1 stabilisation: null-safety, honest payment labels.
//
// KNOWN LIMITATIONS (to be resolved in Phase 2):
//   • All order data is stored in the browser's localStorage only.
//     This is NOT a real database. Data is lost when the browser
//     clears storage, and it is never visible to café staff.
//   • UPI payment cannot be verified from the client side.
//     Showing the QR code does not confirm the customer has paid.
//   • Card payment is NOT supported. Collecting card numbers and CVVs
//     in plain HTML inputs is insecure and has been removed.
//   • "Confirm Payment" marks the local order as "Confirmed" only as
//     a convenience for the admin dashboard demo. It does NOT represent
//     a verified payment or a persistent record.
//   Phase 2 will integrate Firebase Firestore and Firebase Auth to
//   address these limitations.
// =====================================================================

// ── 1. Safely read the most-recent order from localStorage ──────────

var orders = [];
var latest = null;

try {
    var raw = localStorage.getItem("orders");
    if (raw) {
        orders = JSON.parse(raw);
    }
} catch (e) {
    orders = [];
}

if (Array.isArray(orders) && orders.length > 0) {
    latest = orders[orders.length - 1];
}

// ── 2. Render bill summary or an empty-cart message ─────────────────

var billSummaryEl = document.getElementById("billSummary");

if (!latest) {
    // No order in storage — show a helpful message instead of crashing
    billSummaryEl.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <p>🛒 Your cart is empty.</p>
            <p style="margin-top:10px; font-size:14px; opacity:0.8;">
                Please go back to the menu and add items before proceeding to payment.
            </p>
            <a href="menu.html"
               style="display:inline-block; margin-top:20px; padding:10px 24px;
                      background:#8b4513; color:white; border-radius:20px;
                      text-decoration:none; font-weight:bold;">
               ← Back to Menu
            </a>
        </div>`;
    // Hide the payment method section — nothing to pay for
    var methodSection = document.getElementById("paymentDetails");
    if (methodSection) methodSection.style.display = "none";
    // Hide the radio options and confirm button
    document.querySelectorAll('.pay-option').forEach(function(el){ el.style.display = "none"; });
    var confirmBtn = document.querySelector('.payment-box > button');
    if (confirmBtn) confirmBtn.style.display = "none";
} else {
    // Render order summary
    var itemsHtml = "";
    if (Array.isArray(latest.items) && latest.items.length > 0) {
        itemsHtml = "<ul style='list-style:none; padding:0; margin:10px 0;'>";
        latest.items.forEach(function(item){
            itemsHtml += `<li style="display:flex; justify-content:space-between; padding:4px 0;">
                <span>${item.name}</span><span>₹${item.price}</span>
            </li>`;
        });
        itemsHtml += "</ul>";
    }

    billSummaryEl.innerHTML = `
        <h3>Order Summary</h3>
        <p>Table No: ${latest.table || "—"}</p>
        ${itemsHtml}
        <p><strong>Total: ₹${latest.amount}</strong></p>
        <hr>`;
}

// ── 3. Payment method display ────────────────────────────────────────

function showMethod(){
    var method = document.querySelector('input[name="pay"]:checked');
    if (!method) return;
    var box = document.getElementById("paymentDetails");

    if (method.value === "UPI") {
        box.innerHTML = `
            <h3>Scan QR &amp; Pay</h3>
            <img src="images/qr.png.jpeg" width="180" alt="UPI QR Code">
            <p>UPI ID: <strong>kahani@upi</strong></p>
            <p style="margin-top:10px; font-size:13px; background:rgba(255,165,0,0.2);
                       padding:8px; border-radius:8px;">
                ⚠️ <em>Note: UPI payment cannot be automatically verified.
                Staff will confirm your payment at the counter before
                preparing your order.</em>
            </p>`;
    } else {
        // Cash on counter
        box.innerHTML = `
            <p style="padding:10px 0;">
                💵 Please pay cash at the counter when collecting your order.
            </p>`;
    }
}

showMethod();

// ── 4. Confirm order ─────────────────────────────────────────────────

function confirmOrder(){
    if (!latest) {
        alert("No order found. Please go back to the menu.");
        return;
    }

    var method = document.querySelector('input[name="pay"]:checked');
    if (!method) {
        alert("Please select a payment method.");
        return;
    }

    // Re-read the orders array in case it changed
    var currentOrders = [];
    try {
        var raw2 = localStorage.getItem("orders");
        if (raw2) currentOrders = JSON.parse(raw2);
    } catch(e) { currentOrders = []; }

    // Update the last order with chosen method
    // NOTE: This does NOT verify actual payment. It is a local record only.
    if (Array.isArray(currentOrders) && currentOrders.length > 0) {
        currentOrders[currentOrders.length - 1].payment = method.value;
        // Status remains "Pending" — only staff can confirm payment has been received.
        // Do NOT set status to "Confirmed" here: that would be misleading.
        localStorage.setItem("orders", JSON.stringify(currentOrders));
    }

    if (method.value === "UPI") {
        alert("Order placed! ☕\n\nYour order has been submitted with UPI as the chosen method.\nPlease show your UPI payment confirmation to staff at the counter.\nStaff will verify and begin preparing your order.");
    } else {
        alert("Order placed! ☕\n\nPlease pay cash at the counter when your order is ready.");
    }

    window.location = "menu.html";
}