const { MongoClient } = require("mongodb");

// Selanjutnya, gunakan MongoClient di dalam kode Anda seperti yang telah Anda lakukan sebelumnya.

const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

    res.send(`Successfully added data with ID: ${result.insertedId}`);
    res.redirect("/index");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add data to database");
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
