let orders = JSON.parse(localStorage.getItem("orders")) || [];
let latest = orders[orders.length - 1];
let upiPaid = false;
// Load Bill
document.getElementById("billSummary").innerHTML = `
<h3>Order Summary</h3>
<p>Table No: ${latest.table}</p>
<p>Total: ₹${latest.amount}</p>
<hr>
`;

function showMethod(){

let method =
document.querySelector('input[name="pay"]:checked').value;

let box = document.getElementById("paymentDetails");

if(method=="UPI"){
box.innerHTML = `
<h3>Scan QR & Pay</h3>
<img src="images/qr.png.jpeg" width="180">
<p>UPI ID: kahani@upi</p>
`;
}

else if(method=="Card"){
box.innerHTML = `
<input type="text" placeholder="Card Number">
<input type="text" placeholder="Card Holder Name">N
<input type="text" placeholder="MM/YY">
<input type="password" placeholder="CVV">
`;
}

else{
box.innerHTML = `
<p>Pay cash at counter while collecting order.</p>
`;
}

}

showMethod();
function confirmOrder(){

let method = document.querySelector('input[name="pay"]:checked').value;

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let latest = orders[orders.length - 1];

// ❌ UPI Check
if(method === "UPI" && !upiPaid){
alert("Please complete UPI payment first");
return;
}

// ❌ Card Check
if(method === "Card"){

let inputs = document.querySelectorAll("#paymentDetails input");

let cardNo = inputs[0].value;
let name = inputs[1].value;
let expiry = inputs[2].value;
let cvv = inputs[3].value;

if(cardNo.length < 12 || name=="" || expiry=="" || cvv.length < 3){
alert("Enter valid card details");
return;
}
}

// ✅ Save
latest.payment = method;
latest.status = "Confirmed";

localStorage.setItem("orders", JSON.stringify(orders));

alert("Payment Successful 🎉");

window.location = "menu.html";
}

if(method=="UPI"){
box.innerHTML = `
<h3>Scan QR & Pay</h3>
<img src="qr.png.jpeg" width="180">
<p>UPI ID: kahani@upi</p>

<button onclick="markPaid()" style="margin-top:10px;">
I Have Paid
</button>
`;
}

// ✅ Save payment
latest.payment = method;
latest.status = "Confirmed";

localStorage.setItem("orders", JSON.stringify(orders));

alert("Payment Successful! Order Confirmed 🎉");

window.location = "menu.html";

function markPaid(){
upiPaid = true;
alert("Payment marked as done ✅");
}