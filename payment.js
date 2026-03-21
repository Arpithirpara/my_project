if(!localStorage.getItem("cartTotal")){
    window.location.replace("Grocery.html");
}
history.replaceState(null, null, "payment.html");
let itemTotal;
let deliveryFee;
let grandTotal;
let selectedMethod = "card";
window.onload = function() {
    itemTotal = parseInt(localStorage.getItem("cartTotal")) || 0;
    selectedMethod = "card";
    if(itemTotal >= 200){
        deliveryFee = 0;
        alert("🎉 Congratulations! You got FREE Delivery!");
    } else {
        deliveryFee = 20;
    }
    grandTotal = itemTotal + deliveryFee;
    document.getElementById("itemsTotal").innerText = "₹" + itemTotal;
    document.getElementById("deliveryFee").innerText = "₹" + deliveryFee;
    document.getElementById("finalTotal").innerText = "₹" + grandTotal;
    window.processPayment = function() {
        let orderId = "ORD" + Math.floor(Math.random()*1000000);
        let paymentData = {
            orderId: orderId,
            totalAmount: grandTotal,
            paymentMethod: selectedMethod.toUpperCase(),
            status: "SUCCESS",
            paymentDate: new Date().toLocaleString()
        };
        fetch("https://groceryproject-production.up.railway.app/api/payment/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        })
        .then(res => res.json())
        .then(data => {
            // ✅ NAYA - paymentInfo save karo
            let orderData = {
                orderId: orderId,
                amount: grandTotal,
                date: new Date().toLocaleDateString(),
                status: "Paid ✅"
            };
            localStorage.setItem("paymentInfo", JSON.stringify(orderData));
            localStorage.removeItem("cart");
            localStorage.removeItem("cartTotal");
            window.location.href = "success.html";
        })
        .catch(err => console.error("Error:", err));
    }; 
};
function selectMethod(method, element) {
    selectedMethod = method;
    document.querySelectorAll(".payment-option").forEach(opt => {
        opt.classList.remove("active");
    });
    element.classList.add("active");
    document.querySelectorAll(".method").forEach(m => {
        m.classList.add("hidden");
    });
    document.getElementById(method).classList.remove("hidden");
}
