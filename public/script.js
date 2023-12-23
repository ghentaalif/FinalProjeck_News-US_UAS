const apiKey = "24315da6cb8b4906b67c39165793f6da";
const apiUrl = "https://newsapi.org/v2/top-headlines?country=us";

$(document).ready(function () {
  // Panggil fungsi untuk mendapatkan berita
  getNews();
});

function getNews() {
  // Panggil API menggunakan jQuery AJAX
  $.ajax({
    url: `${apiUrl}&apiKey=${apiKey}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Proses data berita
      displayNews(data.articles);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

function displayNews(articles) {
  const newsContainer = $("#news-container");

  // Bersihkan kontainer sebelum menambahkan berita baru
  newsContainer.empty();

  // Tampilkan setiap artikel dalam kontainer
  articles.forEach((article) => {
    const newsItem = `
      <div class="news-item">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="News Image">
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `;

    newsContainer.append(newsItem);
  });
}
