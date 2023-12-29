const { MongoClient } = require("mongodb");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tentukan path untuk konfigurasi Express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars engine dan lokasi view
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route untuk halaman utama
app.get("/index", (req, res) => {
  // Render halaman HTML yang menampilkan data MongoDB
  res.render("index");
});

// database mongoDB
app.post("/input_data", async (req, res) => {
  const data = req.body;
  const client = new MongoClient("mongodb://localhost:27017/");

  try {
    await client.connect();
    const db = client.db("iniberita");
    const orders = db.collection("news1");
    const result = await orders.insertOne(data);

    res.send(`Berhasil menambahkan data dengan ID: ${result.insertedId}`);
    // Arahkan kembali ke halaman indeks setelah berhasil menambahkan data
    res.redirect("/index");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menambahkan data ke basis data");
  } finally {
    await client.close();
  }
});

// Rute untuk mengambil dan menampilkan data MongoDB
app.get("/display_data", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");

  try {
    await client.connect();
    const db = client.db("iniberita");
    const collection = db.collection("news1");

    // Ambil semua dokumen dari koleksi MongoDB
    const data = await collection.find({}).toArray();

    // Kirim data sebagai respons JSON
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengambil data dari basis data");
  } finally {
    await client.close();
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
