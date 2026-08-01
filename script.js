const products = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = [];

let selectedProduct = null;


// ================= SHOW PRODUCTS =================

function renderProducts(){

products.innerHTML = "";


menu.forEach((item,index)=>{


let priceText = item.price 
? `Rs ${item.price}`
: "Select Size";


products.innerHTML += `

<div class="card">

<h3>${item.name}</h3>

<p class="price">
${priceText}
</p>


<button onclick="selectProduct(${index})">
Add To Cart
</button>


</div>

`;

});


}



// ================= CATEGORY =================

function showCategory(category){


products.innerHTML="";


// All

if(category==="All"){

renderProducts();

return;

}



// Deals special

if(category==="Deals"){

products.innerHTML += `<h2>ZINGER DEALS</h2>`;


menu.forEach((item,index)=>{

if(
item.category==="Deals" &&
item.name.includes("Zinger")
){

createCard(item,index);

}

});



products.innerHTML += `<h2>PIZZA DEALS</h2>`;


menu.forEach((item,index)=>{

if(
item.category==="Deals" &&
item.name.includes("Pizza")
){

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



// ================= CARD =================

function createCard(item,index){


let price = item.price 
? `Rs ${item.price}`
: "Select Size";


products.innerHTML += `

<div class="card">

<h3>${item.name}</h3>

<p class="price">
${price}
</p>


<button onclick="selectProduct(${index})">
Add To Cart
</button>

</div>

`;

}

// ================= SIZE SELECT =================

function selectProduct(index){

const product = menu[index];


// اگر sizes موجود ہیں تو size select کروائیں

if(product.sizes){


let sizes = Object.keys(product.sizes);


let choice = prompt(
"Select Size:\n\n" +
sizes.map((size,i)=> `${i+1}. ${size} - Rs ${product.sizes[size]}`).join("\n")
);



let selectedSize = sizes[choice-1];


if(!selectedSize){

return;

}



addSizeToCart(product, selectedSize, product.sizes[selectedSize]);


}

else{


addNormalToCart(product);


}


}





// ================= ADD SIZE ITEM =================

function addSizeToCart(product,size,price){


let cartName = `${product.name} (${size})`;



let exist = cart.find(
item=>item.name===cartName
);



if(exist){

exist.qty++;

}

else{


cart.push({

name:cartName,

price:price,

qty:1

});


}



renderCart();


}




// ================= NORMAL ITEM =================

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





// ================= PLUS MINUS =================


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






// ================= CART DISPLAY =================


function renderCart(){


cartItems.innerHTML="";


let sum=0;



cart.forEach((item,index)=>{


sum += item.price * item.qty;



cartItems.innerHTML += `

<div style="
display:flex;
justify-content:space-between;
background:#2b2b2b;
padding:10px;
border-radius:10px;
margin-bottom:10px;">


<div>

<b>${item.name}</b><br>

Rs ${item.price}

</div>



<div>

<button onclick="minusItem(${index})">
➖
</button>


<span>
${item.qty}
</span>


<button onclick="plusItem(${index})">
➕
</button>


</div>


</div>


`;



});



total.textContent=sum;



document.getElementById("cartCount").textContent =
cart.reduce((t,i)=>t+i.qty,0);



}// ================= WHATSAPP ORDER =================

document.getElementById("order")
.addEventListener("click",function(){


if(cart.length===0){

alert("Please add at least one item.");

return;

}



const customer =
document.getElementById("customer").value;


const phone =
document.getElementById("phone").value;


const address =
document.getElementById("address").value;



if(!customer || !phone || !address){

alert("Please fill all details.");

return;

}



let message = `🍗 Chicky Munch Order

Name: ${customer}

Phone: ${phone}

Address: ${address}


Items:
`;



cart.forEach(item=>{


message += 
`• ${item.name} x${item.qty} = Rs ${item.price * item.qty}\n`;


});



message += `

Total: Rs ${sumCart()}`;



window.open(

`https://wa.me/923331917184?text=${encodeURIComponent(message)}`,

"_blank"

);



});





// ================= TOTAL =================

function sumCart(){

return cart.reduce(
(sum,item)=>sum+(item.price*item.qty),
0
);

}




// ================= CART BUTTON =================


function toggleCart(){


const cartBox =
document.getElementById("cart");



if(cartBox.style.display==="block"){


cartBox.style.display="none";


}

else{


cartBox.style.display="block";


}


}




document.getElementById("cartBtn")
.addEventListener("click",function(){

toggleCart();

});




document.getElementById("cart").style.display="none";




// ================= PAGE LOAD =================

renderProducts();
