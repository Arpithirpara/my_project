window.onload = function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.replace("index.html");
  }
};
function logout() {
  console.log("logout clicked");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}
