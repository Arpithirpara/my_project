// 🚫 already logged-in user cannot see signup page
window.onload = function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "grocery.html";
  }
};

function signup(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
   let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;

  // validations
  if (name.length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email");
    return;
  }

  if (password.length <1) {
    alert("Password must be at least 1 characters");
    return;
  }

  if (password !== confirm) {
    alert("Password and Confirm Password do not match");
    return;
  }

  let data = { name, email,phone, password };

  fetch("http://localhost:9090/api/signup", {   // ✅ correct port
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    if (msg === "SIGNUP_SUCCESS") {
      alert("Signup successful ✅ Please login");
      window.location.href = "login.html";
    } else if(msg==="EMAIL_ALREADY_EXISTS")
    {
      alert("Email already exists ❌");
    }
    else if(msg==="PHONE_ALREADY_EXISTS")
    {
      alert("YOUR PHONE NUMBER IS ALREADY REGISTER !");
    }
    else{
      alert("somthing went wrong");
    }
  });
}
