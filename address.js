// TOP PE ADD KARO
if(!localStorage.getItem("cartTotal")){
    window.location.replace("Grocery.html");
}

history.replaceState(null, null, "address.html");
function saveAddress(event) {
    event.preventDefault();

    const addressValue = document.getElementById("address").value;

    if (addressValue.trim() === "") {
        alert("Please enter address");
        return;
    }

    fetch("https://groceryproject-production.up.railway.app/api/address/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fulladdress: addressValue })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("savedAddress").innerText = data.fulladdress;
        localStorage.setItem("deliveryAddress", data.fulladdress);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error saving address");
    });
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (Object.keys(cart).length === 0) {
        alert("Cart khali hai!");
        return;
    }

    let name = prompt("Aapka naam batao:");
    if (!name) return;

    let total = Object.values(cart).reduce((sum, item) => {
        return sum + (item.price * item.qty);
    }, 0);

    fetch("https://groceryproject-production.up.railway.app/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            customerName: name,
            items: JSON.stringify(cart),
            total: "₹" + total,
            status: "Pending"
        })
    })
    .then(res => res.json())
    .then(order => {
        localStorage.setItem("lastOrderId", order.id);
        localStorage.setItem("cartTotal", total);
        localStorage.setItem("lastCartItems", JSON.stringify(
            Object.entries(cart).map(([n, v]) => ({ name: n, price: v.price, qty: v.qty }))
        ));
        localStorage.removeItem("cart");
        window.location.href = "payment.html";
    })
    .catch(() => alert("❌ Order nahi hua, backend check karo"));
}