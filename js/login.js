document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const demoEmail = "test@musicore.com";
  const demoPassword = "testlogin";

  const errorDiv = document.getElementById("error-message");

  // Verberg externe foutmelding
  errorDiv.style.display = "none";
  errorDiv.textContent = "";

  if (!email || !password) {
    errorDiv.textContent = "Vul zowel e-mail als wachtwoord in.";
    errorDiv.style.display = "block";
    return;
  }

  // Check login gegevens
  if (email === demoEmail && password === demoPassword) {
    window.location.href = "home.html";
  } else {
    // Toon foutmelding
    errorDiv.textContent = "Ongeldige e-mail of wachtwoord";
    errorDiv.style.display = "block";
  }
});
