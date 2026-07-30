const products = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = [];

function renderProducts() {
  products.innerHTML = "";

  menu.forEach((item) => {
    products.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p class="price">Rs ${item.price}</p>
        <button onclick="addToCart('${item.name}')">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(name) {
  const item = menu.find(p => p.name === name);

  cart.push(item);

  renderCart();
}

function renderCart() {

  cartItems.innerHTML = "";

  let sum = 0;

  cart.forEach(item => {

    sum += item.price;

    cartItems.innerHTML += `
      <p>${item.name} - Rs ${item.price}</p>
    `;

  });

  total.innerText = sum;

}

document.getElementById("order").onclick = function(){

const customer =
document.getElementById("customer").value;

const phone =
document.getElementById("phone").value;

const address =
document.getElementById("address").value;

let message =
`🍗 Chicky Munch Order

Name: ${customer}

Phone: ${phone}

Address: ${address}

------------------

`;

cart.forEach(item=>{

message+=`${item.name} - Rs ${item.price}
`;

});

message += `

------------------

Total = Rs ${total.innerText}`;

window.open(

`https://wa.me/923331917184?text=${encodeURIComponent(message)}`

);

};

renderProducts();
