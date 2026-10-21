// =====================================================================
// admin.js  —  Kahani & Coffee
// Phase 1: Hardcoded credentials removed.
//
// ⚠️  IMPORTANT — AUTHENTICATION NOT YET IMPLEMENTED ⚠️
//
// The previous version of this file compared the entered email and
// password against sample hardcoded values in plain JavaScript.
// That provided zero security: any visitor who opened DevTools could
// read the credentials and bypass the check by navigating directly to dashboard.html.
//
// The hardcoded credentials have been REMOVED in this phase.
// The login button currently shows an informational message so
// the UI remains usable for development, but it makes no security
// claim.
//
// Phase 2 MUST:
//   1. Enable Firebase Authentication (Email/Password provider) in
//      the Firebase Console.
//   2. Create the admin account using the Firebase Console or the
//      Admin SDK — NOT in client-side code.
//   3. Replace loginAdmin() with firebase.auth().signInWithEmailAndPassword()
//      and handle auth state via onAuthStateChanged().
//   4. Add a server-side (Firestore Rules) check so that the
//      "orders" collection is readable only by authenticated admins.
//   5. Add an auth-state guard at the top of dashboard.html that
//      redirects unauthenticated visitors to admin.html.
//
// Until Phase 2 is complete, dashboard.html must NOT be used in
// production or presented as a secure admin interface.
// =====================================================================

function loginAdmin(){
    // TODO (Phase 2): Replace this stub with Firebase Authentication.
    // See comments above for the full implementation plan.
    alert(
        "Admin login requires Firebase Authentication, which has not been " +
        "configured yet.\n\n" +
        "This will be implemented in Phase 2. Please refer to the project " +
        "audit report for the next steps."
    );
}

// ── Dashboard order loader ───────────────────────────────────────────
// NOTE: This reads from localStorage only. It shows orders placed
// in the current browser session on this device — NOT real restaurant
// orders from all customers. A Firestore integration (Phase 2) is
// required to replace this.

if(document.getElementById("ordersTable")){
    loadOrders();
}

function loadOrders(){
    var orders = [];
    try {
        var raw = localStorage.getItem("orders");
        if(raw) orders = JSON.parse(raw);
    } catch(e) { orders = []; }

    var tbody = document.getElementById("ordersTable");
    tbody.innerHTML = "";

    var revenue = 0;

    if(orders.length === 0){
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center; padding:20px;'>No orders in current session.</td></tr>";
    }

    orders.forEach(function(order, index){
        revenue += (order.amount || 0);
        tbody.innerHTML += `
            <tr>
                <td>${order.id || "—"}</td>
                <td>${order.table || "—"}</td>
                <td>₹${order.amount || 0}</td>
                <td>${order.payment || "Not selected"}</td>
                <td>${order.status || "Pending"}</td>
                <td>
                    <button onclick="nextStatus(${index})">Update</button>
                </td>
            </tr>`;
    });

    var totalOrdersEl = document.getElementById("totalOrders");
    var revenueEl = document.getElementById("revenue");
    if(totalOrdersEl) totalOrdersEl.innerText = orders.length;
    if(revenueEl) revenueEl.innerText = "₹" + revenue;
}

// ── Status progression ───────────────────────────────────────────────
function nextStatus(index){
    var orders = [];
    try {
        var raw = localStorage.getItem("orders");
        if(raw) orders = JSON.parse(raw);
    } catch(e) { orders = []; }

    if(!orders[index]) return;

    var current = orders[index].status;
    if(current === "Pending")       orders[index].status = "Preparing";
    else if(current === "Preparing") orders[index].status = "Ready";
    else if(current === "Ready")     orders[index].status = "Served";
    else                             orders[index].status = "Completed";

    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}