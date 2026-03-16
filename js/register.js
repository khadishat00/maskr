document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Waarden uit formulier
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
      alert("Vul alle velden in!");
      return;
    }

    if (password.length < 8) {
      alert("Wachtwoord moet minstens 8 tekens bevatten!");
      return;
    }

    const user = { username, email, password };

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("Er bestaat al een account met deze e-mail!");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account aangemaakt! Je wordt doorgestuurd naar de homepagina.");

    window.location.href = "home.html";
  });
});
