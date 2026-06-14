export function initLogin() {
  const loginForm = document.querySelector(".login-banner");
  const usernameInput = document.querySelector(
    'input[placeholder="მომხმარებელი"]',
  );
  const passwordInput = document.querySelector('input[type="password"]');

  if (!loginForm || !usernameInput || !passwordInput) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const existingFeedback = loginForm.querySelector(".login-feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }

    const statusText = document.createElement("p");
    statusText.className = "login-feedback";
    statusText.style.textAlign = "center";
    statusText.style.marginTop = "15px";
    statusText.style.fontWeight = "bold";

    const users = JSON.parse(
      localStorage.getItem("registeredUsersList") ?? "[]",
    );
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    let userFound = false;

    users.forEach(function (user) {
      if (
        user.username === enteredUsername &&
        user.password === enteredPassword
      ) {
        userFound = true;
      }
    });

    if (userFound) {
      statusText.textContent = "ავტორიზაცია წარმატებულია! გადამისამართება...";
      statusText.style.color = "#2ed573";
      loginForm.appendChild(statusText);

      localStorage.setItem("currentUser", enteredUsername);

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    } else {
      statusText.textContent = "მომხმარებლის სახელი ან პაროლი არასწორია!";
      statusText.style.color = "#ff4d4d";
      loginForm.appendChild(statusText);
    }
  });
}
