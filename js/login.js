function showLoginFeedback(form, text, color) {
  let statusText = form.querySelector(".login-feedback");
  if (statusText) statusText.remove();

  statusText = document.createElement("p");
  statusText.className = "login-feedback";
  statusText.style.textAlign = "center";
  statusText.style.marginTop = "15px";
  statusText.style.fontWeight = "bold";
  statusText.textContent = text;
  statusText.style.color = color;
  
  form.appendChild(statusText);
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const loginForm = e.target;
  const usernameInput = loginForm.querySelector('input[placeholder="მომხმარებელი"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');

  if (!usernameInput || !passwordInput) return;

  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  // ვალიდაცია ცარიელ ველებზე
  if (!enteredUsername || !enteredPassword) {
    showLoginFeedback(loginForm, "გთხოვთ შეავსოთ ორივე ველი!", "#ff4d4d");
    return;
  }

  const users = JSON.parse(localStorage.getItem("registeredUsersList") ?? "[]");
  const userFound = users.some(user => user.username === enteredUsername && user.password === enteredPassword);

  if (userFound) {
    showLoginFeedback(loginForm, "ავტორიზაცია წარმატებულია! გადამისამართება...", "#2ed573");
    localStorage.setItem("currentUser", enteredUsername);

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  } else {
    showLoginFeedback(loginForm, "მომხმარებლის სახელი ან პაროლი არასწორია!", "#ff4d4d");
  }
}

export function initLogin() {
  const loginForm = document.querySelector(".login-banner");
  if (!loginForm) return;
  loginForm.addEventListener("submit", handleLoginSubmit);
}