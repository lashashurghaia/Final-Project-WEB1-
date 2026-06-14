const savedArticles = JSON.parse(localStorage.getItem("savedArticlesList") ?? "[]");
const searchInput = document.querySelector(".sidebar__search-input");
const saveButtons = document.querySelectorAll(".card-news__save-btn");

export function initHome() {
  // 1. მომხმარებლის ლოგიკა
  const currentUser = localStorage.getItem("currentUser");
  const headerAuthLink = document.querySelector(".header__buttons a[href='login.html']");
  const topNavAuthLink = document.querySelector(".header__list a[href='login.html']");

  if (currentUser) {
    if (headerAuthLink) {
      // ვქმნით ახალ ელემენტს მომხმარებლის სახელისთვის
      const userBtn = document.createElement("span");
      
      // ვანიჭებთ ზუსტად იმავე კლასს, რაც ავტორიზაციის ღილაკს აქვს
      userBtn.className = "header__button"; 
      userBtn.textContent = currentUser;
      
      // ვინაიდან ეს უბრალოდ სახელია და კლიკზე არაფერს აკეთებს, კურსორს ვუტოვებთ სტანდარტულს
      userBtn.style.cursor = "default";

      // ძველ "ავტორიზაცია" ლინკს კი გადავაკეთებთ "გამოსვლის" ღილაკად
      headerAuthLink.textContent = "გამოსვლა";
      headerAuthLink.href = "#";

      // ჩავსვამთ სახელის ღილაკს "გამოსვლის" ღილაკის ზუსტად გვერდით (მის წინ)
      headerAuthLink.parentNode.insertBefore(userBtn, headerAuthLink);

      // გამოსვლის ფუნქციონალი
      headerAuthLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser"); // ვშლით სესიას
        window.location.reload(); // ვაახლებთ გვერდს
      });
    }

    // ზედა პატარა ნავიგაციის განახლება სრული წესრიგისთვის
    if (topNavAuthLink) {
      topNavAuthLink.textContent = `გამოსვლა (${currentUser})`;
      topNavAuthLink.href = "#";
      topNavAuthLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.reload();
      });
    }
  }

  // 2. ძებნის ლოგიკა
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchInput.style.backgroundColor = "#f0f4ff";
    });
  }

  // 3. შენახვის ლოგიკა
  if (saveButtons.length > 0) {
    saveButtons.forEach(function (btn, index) {
      if (savedArticles.includes(index)) {
        btn.textContent = "შენახულია";
      }

      btn.addEventListener("click", function () {
        if (!savedArticles.includes(index)) {
          savedArticles.push(index);
          btn.textContent = "შენახულია";
        } else {
          const position = savedArticles.indexOf(index);
          savedArticles.splice(position, 1);
          btn.textContent = "შენახვა";
        }
        localStorage.setItem("savedArticlesList", JSON.stringify(savedArticles));
      });
    });
  }
}