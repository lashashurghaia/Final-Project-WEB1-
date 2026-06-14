export function initSavedPage() {
  const savedContainer = document.querySelector(".saved-articles-container");
  if (!savedContainer) return;

  const savedArticles = JSON.parse(
    localStorage.getItem("savedArticlesList") ?? "[]",
  );

  if (savedArticles.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.textContent = "შენახული სტატიები არ მოიძებნა.";
    savedContainer.appendChild(emptyText);
    return;
  }

  savedArticles.forEach(function (id) {
    const articleBox = document.createElement("div");
    articleBox.style.border = "1px solid #CDCFDE";
    articleBox.style.padding = "20px";
    articleBox.style.borderRadius = "12px";
    articleBox.style.marginBottom = "15px";

    const articleTitle = document.createElement("h3");
    articleTitle.textContent = `შენახული სტატია #${id + 1}`;
    articleTitle.style.color = "#1E222E";

    const articleText = document.createElement("p");
    articleText.textContent =
      "სტატიის სრული შინაარსი ჩაიტვირთა შენი ბრაუზერის მეხსიერებიდან.";
    articleText.style.color = "#7b8df2";

    articleBox.appendChild(articleTitle);
    articleBox.appendChild(articleText);
    savedContainer.appendChild(articleBox);
  });
}
