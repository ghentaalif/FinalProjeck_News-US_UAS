const apiKey = "24315da6cb8b4906b67c39165793f6da";
const apiUrl = "https://newsapi.org/v2/top-headlines?country=us";

$(document).ready(function () {
  // Panggil fungsi untuk mendapatkan berita
  getNews();
  // Panggil fungsi untuk mendapatkan dan menampilkan data MongoDB
  getDataFromMongoDB();
});

// Fungsi untuk mendapatkan berita dengan atau tanpa pencarian
function getNews(searchTerm = "") {
  $.ajax({
    url: `${apiUrl}&apiKey=${apiKey}&q=${searchTerm}`,
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

$(document).ready(function () {
  // Panggil fungsi untuk mendapatkan dan menampilkan data MongoDB
  getDataFromMongoDB();
  // ... Fungsi lainnya ...
});

// ... Fungsi-fungsi lainnya ...

// Fungsi untuk mendapatkan dan menampilkan data MongoDB
function getDataFromMongoDB() {
  $.ajax({
    url: "/display_data",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Proses data MongoDB
      displayData(data);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

// Fungsi untuk menampilkan data MongoDB
function displayData(data) {
  const dataContainer = $("#data-container");

  // Bersihkan kontainer sebelum menambahkan data baru
  dataContainer.empty();

  // Tampilkan setiap data dalam kontainer
  data.forEach((item) => {
    const listItem = `
    <div class="card mt-3 custom-card">
    <div class="card-body">
        <p class="card-text">Nama: ${item.nama_pelanggan}</p>
        <p class="card-text">Email: ${item.email}</p>
        <p class="card-text">Website: <a href="${item.website}" target="_blank" style="color: black;">${item.website}</a></p>
        <p class="card-text">Asal Berita: ${item.asal_berita}</p>
        <p class="card-text">Comment: ${item.comment}</p>
    </div>
</div>

      `;

    dataContainer.append(listItem);
  });
}
