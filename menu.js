// Food Data
const foodItems = [

{
name:"Cappuccino",
price:120,
category:"coffee",
image:"images/pexels-withoguz-25381257.jpg"
},

{
name:"Espresso",
price:110,
category:"coffee",
image:"images/pexels-siska-april-669214200-21776947 (1).jpg"
},

{
name:"Americano",
price:130,
category:"coffee",
image:"images/pexels-melly-2096840.jpg"
},

{
name:"Latte",
price:160,
category:"coffee",
image:"images/pexels-kevinmenajang-982612.jpg"
},

{
name:"Mocha",
price:180,
category:"coffee",
image:"images/pexels-viniciusvieirafotografia-22608818.jpg"
},

{
name:"Cold Coffee",
price:150,
category:"coffee",
image:"images/pexels-sedanur-kunuk-78972032-27408440.jpg"
},

{
name:"Hazelnut Frappe",
price:210,
category:"coffee",
image:"images/pexels-virgold-24433379.jpg"
},

{
name:"Hot Chocolate",
price:170,
category:"coffee",
image:"images/pexels-tatianeherder-12015601.jpg"
},

{
name:"Farmhouse Pizza",
price:299,
category:"pizza",
image:"images/pexels-anhelina-vasylyk-734724285-33593000.jpg"
},

{
name:"Cheese Pizza",
price:249,
category:"pizza",
image:"images/pexels-pixabay-315755.jpg"
},

{
name:"Margherita Pizza",
price:229,
category:"pizza",
image:"images/pexels-willians-huerta-2157111846-35760006.jpg"
},

{
name:"Paneer Tikka Pizza",
price:319,
category:"pizza",
image:"images/pexels-praful-das-2255383-11974636.jpg"
},

{
name:"White Sauce Pasta",
price:220,
category:"pasta",
image:"images/pexels-enginakyurt-3214161 (1).jpg"
},

{
name:"Red Sauce Pasta",
price:210,
category:"pasta",
image:"images/pexels-shameel-mukkath-3421394-5640046.jpg"
},

{
name:"Pink Sauce Pasta",
price:240,
category:"pasta",
image:"images/pexels-the-qurious-studio-537664004-16525900.jpg"
},

{
name:"Veg Alfredo Pasta",
price:250,
category:"pasta",
image:"images/pexels-enginakyurt-11220209.jpg"
},

{
name:"Brownie",
price:140,
category:"dessert",
image:"images/pexels-vo-van-ti-n-2037497312-29819836.jpg"
},

{
name:"Ice Cream",
price:99,
category:"dessert",
image:"images/pexels-airamdphoto-11441807.jpg"
},

{
name:"Chocolate Lava Cake",
price:160,
category:"dessert",
image:"images/pexels-christian-dala-651910440-19244738.jpg"
},

{
name:"Cheesecake",
price:190,
category:"dessert",
image:"images/pexels-nano-erdozain-120534369-28895988.jpg"
},

{
name:"Tiramisu",
price:220,
category:"dessert",
image:"images/pexels-catscoming-10169991.jpg"
},

{
name:"Coffee + Brownie Combo",
price:199,
category:"combo",
image:"images/pexels-zeynep-sahin-363019162-28744929.jpg"
},

{
name:"Pizza + Coke Combo",
price:349,
category:"combo",
image:"images/pexels-mutecevvil-17900538.jpg"
},

{
name:"Pasta + Garlic Bread Combo",
price:329,
category:"combo",
image:"images/combo3.jpg"
},

{
name:"Couple Café Combo",
price:499,
category:"combo",
image:"images/combo4.jpg"
},

{
name:"French Fries",
price:110,
category:"snacks",
image:"images/fries.jpg"
},

{
name:"Garlic Bread",
price:130,
category:"snacks",
image:"images/garlicbread.jpg"
},

{
name:"Nachos",
price:170,
category:"snacks",
image:"images/pexels-snappr-29851128.jpg"
},

{
name:"Veg Sandwich",
price:150,
category:"snacks",
image:"images/sandwich.jpg"
},

{
name:"Loaded Burger meal",
price:240,
category:"snacks",
image:"images/pexels-jonathanborba-19247580.jpg"
},

{
name:"Peri Peri Fries",
price:140,
category:"snacks",
image:"images/perifries.jpg"
},

{
name:"Blueberry Smoothie",
price:190,
category:"coffee",
image:"images/smoothie.jpg"
},

{
name:"Mint Mojito",
price:160,
category:"coffee",
image:"images/mojito.jpg"
}

];

let cart = [];

function displayItems(items){

let foodGrid = document.getElementById("foodGrid");
foodGrid.innerHTML="";

items.forEach(item=>{

foodGrid.innerHTML += `

<div class="food-card">

<img src="${item.image}" alt="${item.name}">

<h3>${item.name}</h3>

<p class="price">₹${item.price}</p>

<button onclick='addToCart("${item.name}",${item.price})'>
Add to Cart
</button>

</div>

`;

});

}
displayItems(foodItems);

// Filter Category
function filterItems(category){
if(category=="all"){
displayItems(foodItems);
}else{
let filtered = foodItems.filter(item=>item.category==category);
displayItems(filtered);
}
}

// Add To Cart
function addToCart(name,price){

cart.push({name,price});
updateCart();

localStorage.setItem("cart",JSON.stringify(cart));
}

// Update Cart
function updateCart(){

let cartItems = document.getElementById("cartItems");
let total = document.getElementById("total");

cartItems.innerHTML="";
let sum=0;

cart.forEach((item,index)=>{
sum += item.price;

cartItems.innerHTML += `
<li>
${item.name} - ₹${item.price}
<button onclick="removeItem(${index})">❌</button>
</li>
`;
});

total.innerText = sum;
}

// Remove Item
function removeItem(index){
cart.splice(index,1);
updateCart();
localStorage.setItem("cart",JSON.stringify(cart));
}

// Place Order
function placeOrder(){

let tableNo = document.getElementById("tableNumber").value;

if(tableNo==""){
alert("Enter Table Number");
return;
}

if(cart.length==0){
alert("Cart is Empty");
return;
}

let total = 0;

cart.forEach(item=>{
total += item.price;
});

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let newOrder = {
id: Date.now(),
table: tableNo,
items: cart,
amount: total,
status: "Pending"
};

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));

window.location="payment.html";

}