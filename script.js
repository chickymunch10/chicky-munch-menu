const products = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = [];


// SHOW PRODUCTS

function renderProducts(){

products.innerHTML="";

menu.forEach((item,index)=>{
createCard(item,index);
});

}



// CREATE CARD

function createCard(item,index){

let priceText = item.sizes 
? "Select Size"
: `Rs ${item.price}`;


products.innerHTML += `

<div class="card">

<h3>${item.name}</h3>

<p class="price">${priceText}</p>

<button onclick="selectProduct(${index})">
Add To Cart
</button>

</div>

`;

}




// CATEGORY

function showCategory(category){

products.innerHTML="";


if(category==="All"){
renderProducts();
return;
}



if(category==="Deals"){

products.innerHTML="<h2>ZINGER DEALS</h2>";

menu.forEach((item,index)=>{

if(item.category==="Deals" && item.name.includes("Zinger")){
createCard(item,index);
}

});


products.innerHTML += "<h2>PIZZA DEALS</h2>";

menu.forEach((item,index)=>{

if(item.category==="Deals" && item.name.includes("Pizza")){
createCard(item,index);
}

});

return;

}



menu.forEach((item,index)=>{

if(item.category===category){

createCard(item,index);

}

});


}




// SIZE POPUP

function selectProduct(index){

const product = menu[index];


if(product.sizes){


let sizes = Object.keys(product.sizes);


let choice = prompt(

product.name + "\n\nSelect Size:\n\n" +

sizes.map((size,i)=>
`${i+1}. ${size} - Rs ${product.sizes[size]}`
).join("\n")

);



let selectedSize = sizes[choice-1];


if(!selectedSize){
return;
}


addSizeToCart(
product,
selectedSize,
product.sizes[selectedSize]
);


}

else{

addNormalToCart(product);

}


}




// ADD SIZE PRODUCT

function addSizeToCart(product,size,price){


let name = `${product.name} (${size})`;


let exist = cart.find(
item=>item.name===name
);


if(exist){

exist.qty++;

}

else{

cart.push({

name:name,
price:price,
qty:1

});

}


renderCart();

}




// NORMAL PRODUCT

function addNormalToCart(product){


let exist = cart.find(
item=>item.name===product.name
);


if(exist){

exist.qty++;

}

else{

cart.push({

name:product.name,
price:product.price,
qty:1

});

}


renderCart();

}





// CART

function renderCart(){

cartItems.innerHTML="";

let sum=0;


cart.forEach((item,index)=>{


sum += item.price * item.qty;


cartItems.innerHTML += `

<div>

<b>${item.name}</b><br>

Rs ${item.price}


<button onclick="minusItem(${index})">
➖
</button>

${item.qty}

<button onclick="plusItem(${index})">
➕
</button>

</div>

`;

});


total.textContent=sum;


document.getElementById("cartCount").textContent =
cart.reduce((t,i)=>t+i.qty,0);


}




function plusItem(index){

cart[index].qty++;

renderCart();

}



function minusItem(index){

cart[index].qty--;

if(cart[index].qty<=0){

cart.splice(index,1);

}

renderCart();

}




function sumCart(){

return cart.reduce(
(sum,item)=>sum+(item.price*item.qty),0
);

}




// WHATSAPP ORDER

document.getElementById("order")
.addEventListener("click",function(){


if(cart.length===0){

alert("Please add item");
return;

}


let customer=document.getElementById("customer").value;
let phone=document.getElementById("phone").value;
let address=document.getElementById("address").value;



let message=`🍗 Chicky Munch Order

Name: ${customer}
Phone: ${phone}
Address: ${address}

Items:
`;


cart.forEach(item=>{

message += `• ${item.name} x${item.qty} = Rs ${item.price*item.qty}\n`;

});


message += `\nTotal: Rs ${sumCart()}`;


window.open(
`https://wa.me/923331917184?text=${encodeURIComponent(message)}`,
"_blank"
);


});





// CART BUTTON

function toggleCart(){

let cartBox=document.getElementById("cart");

cartBox.style.display =
cartBox.style.display==="block"
?"none"
:"block";

}


document.getElementById("cartBtn")
.addEventListener("click",toggleCart);



document.getElementById("cart").style.display="none";



// START

renderProducts();
