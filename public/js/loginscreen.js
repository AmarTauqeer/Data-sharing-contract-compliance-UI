var signUpButton = document.getElementById("signUp");
var signInButton = document.getElementById("signIn");
var container = document.getElementById("login-container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
