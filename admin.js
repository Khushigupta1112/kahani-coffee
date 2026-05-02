function loginAdmin(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(email=="admin@gmail.com" && password=="1234"){
window.location="dashboard.html";
}else{
alert("Wrong Login");
}

}

// Load Dashboard Orders
if(document.getElementById("ordersTable")){

loadOrders();

}

function loadOrders(){

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let tbody = document.getElementById("ordersTable");

tbody.innerHTML = "";

let revenue = 0;

orders.forEach((order,index)=>{

revenue += order.amount;

tbody.innerHTML += `
<tr>
<td>${order.id}</td>
<td>${order.table}</td>
<td>₹${order.amount}</td>
<td>${order.payment || "Pending"}</td>
<td>${order.status}</td>

<td>
<button onclick="nextStatus(${index})">
Update
</button>
</td>

</tr>
`;

});

document.getElementById("totalOrders").innerText = orders.length;
document.getElementById("revenue").innerText = "₹" + revenue;

}

// Status Change
function nextStatus(index){

let orders = JSON.parse(localStorage.getItem("orders")) || [];

if(orders[index].status=="Pending"){
orders[index].status="Preparing";
}
else if(orders[index].status=="Preparing"){
orders[index].status="Ready";
}
else if(orders[index].status=="Ready"){
orders[index].status="Served";
}
else{
orders[index].status="Completed";
}

localStorage.setItem("orders", JSON.stringify(orders));

loadOrders();

}