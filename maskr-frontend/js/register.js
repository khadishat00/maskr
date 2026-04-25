document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const messageDiv = document.getElementById("register-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Verberg externe melding
    messageDiv.style.display = "none";
    messageDiv.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    
    if (!username || !email || !password) {
      messageDiv.textContent = "Vul alle velden in!";
      messageDiv.style.display = "block";
      return;
    }

    if (password.length < 8) {
      messageDiv.textContent = "Wachtwoord moet minstens 8 tekens bevatten!";
      messageDiv.style.display = "block";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      messageDiv.textContent = "Er bestaat al een account met deze e-mail!";
      messageDiv.style.display = "block";
      return;
    }

    // Opslaan nieuwe gebruiker
    const user = { username, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Succesmelding 
    messageDiv.textContent = "Account aangemaakt!";
    messageDiv.classList.remove("text-danger");
    messageDiv.classList.add("text-success");
    messageDiv.style.display = "block";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500); 
  });
});