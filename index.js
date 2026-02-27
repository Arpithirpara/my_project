
async function load(file, elementId) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(elementId).innerHTML = html;

if (file === "main.html") {
    renderProducts("penal1", penal1);
    renderProducts("penal2", penal2);
    renderProducts("penal3", penal3);
    renderProducts("penal4", penal4);
    renderProducts("penal5", penal5);
    loadCartUI();
  }
}

// page load hote hi status check karo
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:9090/api/admin/status")
    .then(res => res.json())
    .then(data => {
      if (!data.status) { // agar app OFF hai
        document.getElementById("main").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("maintenance").style.display = "block";
      }
    })
    .catch(err => console.error("Failed to fetch app status:", err));
});


document.addEventListener("DOMContentLoaded", () => {
  load("main.html", "main");
  load("footer.html", "footer");
});

window.onload = function () {

  let isLoggedIn = localStorage.getItem("isLoggedIn");

  let signupDiv = document.getElementById("signup");
  let logoutDiv = document.getElementById("logout");

  if (isLoggedIn === "true") {
    signupDiv.style.display = "none";
    logoutDiv.style.display = "block";
  } else {
    signupDiv.style.display = "block";
    logoutDiv.style.display = "none";
  }
};

document.querySelector(".search_input").addEventListener("keyup", function(){
let input=this.value.toLowerCase();
let items=document.querySelectorAll(".p_item");

items.forEach(item=>{

  let name=item.querySelector("h4").textContent.toLowerCase();
  
   if(name.includes(input)){
    item.style.display="block";
   }
   else{
    item.style.display="none";
   }
});
});

document.body.style.visibility = "visible"; // after signup/logout toggle

document.addEventListener("DOMContentLoaded", function () {
    let deliveryTime = localStorage.getItem("deliveryTime");
    if (!deliveryTime) return;

    deliveryTime = parseInt(deliveryTime);

    const timerDiv = document.getElementById("deliveryTimer");
    const timeLeftSpan = document.getElementById("timeLeft");
    if (!timerDiv || !timeLeftSpan) return;

    timerDiv.style.display = "block";

    const timer = setInterval(() => {
        const now = Date.now();
        const distance = deliveryTime - now;

        if (distance <= 0) {
            clearInterval(timer); // stop the interval
            timerDiv.innerHTML = "🎉 Your Order Has Arrived!";
            localStorage.removeItem("deliveryTime");
            return;
        }

        const minutes = Math.floor(distance / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        timeLeftSpan.textContent = `${minutes}m ${seconds}s`;
    }, 1000);
});

