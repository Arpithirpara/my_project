document.addEventListener("DOMContentLoaded", function() {
    
    if(!localStorage.getItem("paymentInfo")){
        window.location.replace("index.html");
        return;
    }

    let payment = JSON.parse(localStorage.getItem("paymentInfo"));
    let cartItems = JSON.parse(localStorage.getItem("lastCartItems"));

    if(payment){
        let deliveryTime = new Date().getTime() + (10 * 60 * 1000);
        localStorage.setItem("deliveryTime", deliveryTime);
        document.getElementById("orderDetails").innerHTML = `
            <p><strong>Order ID:</strong> ${payment.orderId}</p>
            <p><strong>Amount Paid:</strong> ₹${payment.amount}</p>
            <p><strong>Date:</strong> ${payment.date}</p>
            <p><strong>Status:</strong> ${payment.status}</p>
        `;
    }

    if(cartItems){
        let html = "";
        cartItems.forEach(item => {
            html += `<p>${item.name} <span>₹${item.price}</span></p>`;
        });
        document.getElementById("itemList").innerHTML = html;
    }

    const sound = document.getElementById("orderSound");
    sound.play().catch(() => {
        document.addEventListener("click", function playOnce() {
            sound.play();
            document.removeEventListener("click", playOnce);
        });
    });

});

function goHome(){
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("lastCartItems");
    window.location.replace("index.html");
}
