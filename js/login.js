document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const demoEmail = "test@musicore.com";
  const demoPassword = "testlogin";

  if (email === demoEmail && password === demoPassword) {
    window.location.href = "home.html";
  } else {
    alert("Verkeerde login gegevens!");
  }
});
