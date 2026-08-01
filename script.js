const products = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = [];

function renderProducts() {
    products.innerHTML = "";

    menu.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">Rs ${item.price}</p>
            <button>Add To Cart</button>
        `;

        const btn = card.querySelector("button");

        btn.addEventListener("click", function () {
            addToCart(index);
        });

        products.appendChild(card);

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
        <div style="margin-bottom:8px;">
            ${item.name} - Rs ${item.price}
        </div>
        `;

    });

    total.textContent = sum;

}

document.getElementById("order").addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Please add at least one item.");
        return;
    }

    const customer = document.getElementById("customer").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    let message = `🍗 Chicky Munch Order

Name: ${customer}
Phone: ${phone}
Address: ${address}

Items:
`;

    cart.forEach((item) => {
        message += `• ${item.name} - Rs ${item.price}\n`;
    });

    message += `\nTotal: Rs ${sumCart()}`;

    window.open(
        `https://wa.me/923331917184?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});

function sumCart() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

renderProducts();
