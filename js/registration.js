import { verifyWithServer } from "./api.js";

export function initRegistration() {
  const form = document.querySelector(".registration-form");
  const usernameInput = document.querySelector(
    'input[placeholder="მომხმარებლის სახელი"]',
  );
  const title = document.querySelector(".registration-form__title");

  if (!form || !usernameInput || !title) return;

  function counterClosure() {
    let count = 0;
    return function () {
      count++;
      title.textContent = `რეგისტრაცია (კლიკი: ${count})`;
    };
  }
  const countClick = counterClosure();
  title.addEventListener("click", countClick);

  usernameInput.addEventListener("input", function () {
    if (usernameInput.value.length < 4) {
      usernameInput.style.borderColor = "#ff4d4d";
    } else {
      usernameInput.style.borderColor = "#2ed573";
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const passwordInput = form.querySelector('input[type="password"]');
    if (!passwordInput) return;

    const statusText = document.createElement("p");
    statusText.textContent = "იტვირთება...";
    statusText.style.color = "#476BF0";
    statusText.style.textAlign = "center";
    form.appendChild(statusText);

    const result = await verifyWithServer();

    if (result === null) {
      statusText.textContent = "მოხდა შეცდომა სერვერთან კავშირისას!";
      statusText.style.color = "#ff4d4d";
      return;
    }

    statusText.textContent = "რეგისტრაცია წარმატებით დასრულდა!";
    statusText.style.color = "#2ed573";

    const userData = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    const userList = JSON.parse(
      localStorage.getItem("registeredUsersList") ?? "[]",
    );
    userList.push(userData);
    localStorage.setItem("registeredUsersList", JSON.stringify(userList));

    form.reset();
    usernameInput.style.borderColor = "#cdcfde";
  });
}
