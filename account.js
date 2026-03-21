window.addEventListener("pageshow", function(event) {
    if(event.persisted || localStorage.getItem("isLoggedIn") !== "true"){
        window.location.replace("grocery.html");
    }
});

window.onload = function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.replace("grocery.html");
  }
};
function logout() {
  console.log("logout clicked");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  window.location.replace("login.html");
}
