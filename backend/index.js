const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_bookslive",
  port: "3307",
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

app.post("/login", (req, res) => {
  const { erabiltzailea, pasahitza } = req.body;

  if (!erabiltzailea || !pasahitza) {
    return res
      .status(400)
      .json({ message: "Erabiltzailea eta pasahitza behar dira" });
  }

  const query = "SELECT * FROM user WHERE erabiltzailea = ? AND pasahitza = ?";
  db.query(query, [erabiltzailea, pasahitza], (err, results) => {
    if (err) {
      console.error("Errorea kontsultan:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const user = results[0];

      return res.status(200).json({ message: "Login ondo", user: user });
    } else {
      return res
        .status(401)
        .json({ message: "Erabiltzailea edo pasahitz okerra" });
    }
  });
});
