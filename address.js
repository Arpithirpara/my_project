function saveAddress(event) {
    event.preventDefault();

    const addressValue = document.getElementById("address").value;

    if(addressValue.trim() === ""){
        alert("Please enter address");
        return;
    }

    const addressData = {
        fulladdress: addressValue
    };

    fetch("http://localhost:9090/api/address/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addressData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // 👈 ye add karo
        document.getElementById("savedAddress").innerText = data.fulladdress;
    
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error saving address");
    });
}