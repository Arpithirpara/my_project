if(!localStorage.getItem("cart") || Object.keys(JSON.parse(localStorage.getItem("cart"))).length === 0){
    window.location.replace("index.html");
}
history.replaceState(null, null, "cart.html");

// ✅ YE ADD KARO
window.addEventListener("pageshow", function(event) {
    if(event.persisted || !localStorage.getItem("cart") || Object.keys(JSON.parse(localStorage.getItem("cart"))).length === 0){
        window.location.replace("index.html");
    }
});

window.onload = function(){
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let itemTotal = 0;
    for(let item in cart){
        itemTotal += cart[item].price * cart[item].qty;
    }
    let itemTotalSpan = document.getElementById("itemtotal");
    let deliverySpan = document.getElementById("Deliverytotal");
    let grandSpan = document.getElementById("grandtotall");
    if(itemTotalSpan && deliverySpan && grandSpan){
        itemTotalSpan.textContent = itemTotal;
        let delivery = itemTotal >= 200 ? 0 : 20;
        deliverySpan.textContent = delivery;
        let grandTotal = itemTotal + delivery;
        grandSpan.textContent = grandTotal;
    }
};
function saveCartToBackend(itemTotal, deliveryTotal) {
    const cartData = {
        item_total: itemTotal,
        delivery_total: deliveryTotal
    };
    fetch("https://groceryproject-production.up.railway.app/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cart saved:", data);
        window.location.href = "address.html";
    })
    .catch(error => console.error("Error:", error));
}
document.getElementById("process").addEventListener("click", function(event){
    event.preventDefault();
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("plese sign up/ Login  ❌");
        window.location.href = "signup.html";
        return;
    }
    const itemTotal = parseInt(document.getElementById("itemtotal").textContent);
    const deliveryTotal = parseInt(document.getElementById("Deliverytotal").textContent);
    const grandTotal = itemTotal + deliveryTotal;
    localStorage.setItem("cartTotal", itemTotal);
    localStorage.setItem("deliveryFee", deliveryTotal);
    localStorage.setItem("grandTotal", grandTotal);
    saveCartToBackend(itemTotal, deliveryTotal);
});
