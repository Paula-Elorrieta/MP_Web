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
app.post("/erregistratu", (req, res) => {
  const {
    izena_abizena,
    email,
    pasahitza,
    erabiltzailea,
    jaiotza_data,
    helbidea,
  } = req.body;


  if (
    !izena_abizena ||
    !email ||
    !pasahitza ||
    !erabiltzailea ||
    !jaiotza_data
  ) {
    return res.status(400).json({ message: "Datu guztiak bete behar dira" });
  }

  const query =
    "INSERT INTO USER (izena_abizena, email, pasahitza, erabiltzailea, jaiotza_data, helbidea) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      izena_abizena,
      email,
      pasahitza,
      erabiltzailea,
      jaiotza_data,
      helbidea || null,
    ],
    (err, results) => {
      if (err) {
        console.error("Errorea erabiltzailea sortzean:", err);
        return res.status(500).json({ message: "Errorea zerbitzarian" });
      }

      const userBerria = {
        id: results.insertId,
        izena_abizena,
        email,
        erabiltzailea,
        jaiotza_data,
        helbidea,
      };

      return res.status(201).json({ message: "Sartu da ondo", user: userBerria });
    }
  );
});

app.get("/get-users", (req, res) => {
  const query = "SELECT * FROM user";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea erabiltzaileak jasotzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    return res.status(200).json({ users: results });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});
