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

        // Free Delivery Logic
        let delivery = itemTotal >= 200 ? 0 : 20;
        deliverySpan.textContent = delivery;

        let grandTotal = itemTotal + delivery;
        grandSpan.textContent = grandTotal;
    }
};

// Function to save cart to backend
function saveCartToBackend(itemTotal, deliveryTotal) {
    const cartData = {
        item_total: itemTotal,
        delivery_total: deliveryTotal
    };

    fetch("http://localhost:9090/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cart saved:", data);
        // Redirect to address page after save
        window.location.href = "address.html";
    })
    .catch(error => console.error("Error:", error));
}

// ✅ Place Order button click
document.getElementById("process").addEventListener("click", function(event){
    event.preventDefault();

    // Login check
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("plese sign up/ Login  ❌");
                window.location.href = "signup.html";
        return;

        
    }

    const itemTotal = parseInt(document.getElementById("itemtotal").textContent);
    const deliveryTotal = parseInt(document.getElementById("Deliverytotal").textContent);
    const grandTotal = itemTotal + deliveryTotal;

    // Save in localStorage
    localStorage.setItem("cartTotal", itemTotal);
    localStorage.setItem("deliveryFee", deliveryTotal);
    localStorage.setItem("grandTotal", grandTotal);

    // Save to backend and redirect
    saveCartToBackend(itemTotal, deliveryTotal);
});