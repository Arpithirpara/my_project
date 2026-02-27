function login(event) {
    event.preventDefault();

    const mobileInput = document.querySelector('input[name="mobile"]').value.trim();

    if (mobileInput.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    fetch("http://localhost:9090/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobileInput })
    })
    .then(res => {
        if (!res.ok) throw new Error("Phone number not registered ❌");
        return res.json();
    })
    .then(user => {
        // login success
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userMobile", user.phone);
        localStorage.setItem("userName", user.name);
        alert(`Welcome ${user.name} ✅`);
        window.location.href = "grocery.html";
    })
    .catch(err => {
        alert(err.message);
    });
}

// Already logged-in user redirect
window.onload = function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "grocery.html";
    }
};
