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

    // ✅ UPDATE ALL UI VALUES
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

        fetch("http://localhost:9090/api/payment/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        })
        .then(res => res.json())
        .then(data => {
            // 💥 Cart remove AFTER payment success
            localStorage.removeItem("cart");

     /* const blob = new Blob([invoice], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Invoice_${orderId}.txt`; // filename
        link.click();*/

            // Redirect to success page
            window.location.href = "success.html";
        })
        .catch(err => console.error("Error:", err));

    }; 

}; // <-- end of window.onload


function selectMethod(method, element) {

    selectedMethod = method;

    // remove active class
    document.querySelectorAll(".payment-option").forEach(opt => {
        opt.classList.remove("active");
    });

    element.classList.add("active");

    // hide all forms
    document.querySelectorAll(".method").forEach(m => {
        m.classList.add("hidden");
    });

    // show selected form
    document.getElementById(method).classList.remove("hidden");
}