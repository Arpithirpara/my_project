// Page load hote hi payment check karo
window.addEventListener("load", function() {
    let payment = JSON.parse(localStorage.getItem("paymentInfo"));
    let cartItems = JSON.parse(localStorage.getItem("lastCartItems"));

    // Agar payment nahi hai toh seedha home bhejo
    if (!payment) {
        window.location.replace("index.html");
        return;
    }

    // Delivery timer set karo
    let deliveryTime = new Date().getTime() + (10 * 60 * 1000);
    localStorage.setItem("deliveryTime", deliveryTime);

    // Order details dikhao
    document.getElementById("orderDetails").innerHTML = `
        <p><strong>Order ID:</strong> ${payment.orderId}</p>
        <p><strong>Amount Paid:</strong> ₹${payment.amount}</p>
        <p><strong>Date:</strong> ${payment.date}</p>
        <p><strong>Status:</strong> ${payment.status}</p>
    `;

    // Items dikhao
    if (cartItems) {
        let html = "";
        cartItems.forEach(item => {
            html += `<p>${item.name} <span>₹${item.price}</span></p>`;
        });
        document.getElementById("itemList").innerHTML = html;
    }

    // Sound bajao
    const sound = document.getElementById("orderSound");
    sound.play().catch(() => {
        document.addEventListener("click", function playOnce() {
            sound.play();
            document.removeEventListener("click", playOnce);
        });
    });
});

function goHome() {
    // Payment clear karo taaki back pe na aaye
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("lastCartItems");
    window.location.href = "index.html";
}
