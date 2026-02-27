let payment = JSON.parse(localStorage.getItem("paymentInfo"));
let cartItems = JSON.parse(localStorage.getItem("lastCartItems"));

if(payment){

    // 🔥 YAHI ADD KARO (order confirm hote hi timer start)
    let deliveryTime = new Date().getTime() + (10 * 60 * 1000);
    localStorage.setItem("deliveryTime", deliveryTime);

    document.getElementById("orderDetails").innerHTML = `
        <p><strong>Order ID:</strong> ${payment.orderId}</p>
        <p><strong>Amount Paid:</strong> ₹${payment.amount}</p>
        <p><strong>Date:</strong> ${payment.date}</p>
        <p><strong>Status:</strong> ${payment.status}</p>
    `;
}
document.addEventListener("DOMContentLoaded", function() {
    const sound = document.getElementById("orderSound");
    
    // Try to play
    sound.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction...");
        
        // Fallback: play on first click
        document.addEventListener("click", function playOnce() {
            sound.play();
            document.removeEventListener("click", playOnce);
        });
    });
});

if(cartItems){
    let html = "";
    cartItems.forEach(item => {
        html += `<p>${item.name} <span>₹${item.price}</span></p>`;
    });
    document.getElementById("itemList").innerHTML = html;
}

function goHome(){
    window.location.href = "Grocery.html";
}