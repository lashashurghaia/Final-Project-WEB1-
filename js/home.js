const savedArticles = JSON.parse(localStorage.getItem("savedArticlesList") ?? "[]");
const searchInput = document.querySelector(".sidebar__search-input");
const saveButtons = document.querySelectorAll(".card-news__save-btn");

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function executeSearch() {
  if (searchInput) {
    searchInput.style.backgroundColor = "#e1e9ff";
    console.log("საძიებო მოთხოვნა გაიგზავნა:", searchInput.value);
  }
}

function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.reload();
}

function toggleSaveArticle(btn, index) {
  if (!savedArticles.includes(index)) {
    savedArticles.push(index);
    btn.textContent = "შენახულია";
  } else {
    const position = savedArticles.indexOf(index);
    savedArticles.splice(position, 1);
    btn.textContent = "შენახვა";
  }
  localStorage.setItem("savedArticlesList", JSON.stringify(savedArticles));
}

export function initHome() {
  const currentUser = localStorage.getItem("currentUser");
  const headerAuthLink = document.querySelector(".header__buttons a[href='login.html']");
  const topNavAuthLink = document.querySelector(".header__list a[href='login.html']");

  if (currentUser) {
    if (headerAuthLink) {
      const userBtn = document.createElement("span");
      userBtn.className = "header__button"; 
      userBtn.textContent = currentUser;
      userBtn.style.cursor = "default";

      headerAuthLink.textContent = "გამოსვლა";
      headerAuthLink.href = "#";
      headerAuthLink.parentNode.insertBefore(userBtn, headerAuthLink);
      headerAuthLink.addEventListener("click", handleLogout);
    }

    if (topNavAuthLink) {
      topNavAuthLink.textContent = `გამოსვლა (${currentUser})`;
      topNavAuthLink.href = "#";
      topNavAuthLink.addEventListener("click", handleLogout);
    }
  }

  // ძებნის ივენთი Debounce
  if (searchInput) {
    const processSearch = debounce(executeSearch, 500);
    searchInput.addEventListener("input", processSearch);
  }

  // შენახვის ღილაკების ივენთები
  if (saveButtons.length > 0) {
    saveButtons.forEach(function (btn, index) {
      if (savedArticles.includes(index)) {
        btn.textContent = "შენახულია";
      }
      btn.addEventListener("click", () => toggleSaveArticle(btn, index));
    });
  }
}