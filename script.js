const products = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = [];

function renderProducts() {
    products.innerHTML = "";

    menu.forEach((item, index) => {
        products.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>Rs ${item.price}</p>
            <button onclick="addToCart(${index})">
                Add To Cart
            </button>
        </div>`;
    });
}

function addToCart(index) {
    cart.push(menu[index]);
    renderCart();
}
function renderCart() {
    cartItems.innerHTML = "";

    let sum = 0;

    cart.forEach((item) => {
        sum += item.price;

        cartItems.innerHTML += `
        <div>
            ${item.name} - Rs ${item.price}
        </div>`;
    });

    total.innerText = sum;
}

document.getElementById("order").onclick = function () {

    const customer = document.getElementById("customer").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    let message = `🍔 Chicky Munch Order

Name: ${customer}
Phone: ${phone}
Address: ${address}

------------------

`;
cart.forEach((item) => {
    message += `${item.name} - Rs ${item.price}\n`;
});

message += `
------------------
Total = Rs ${total.innerText}
`;

window.open(
    `https://wa.me/923331917184?text=${encodeURIComponent(message)}`,
    "_blank"
);

};

renderProducts();
