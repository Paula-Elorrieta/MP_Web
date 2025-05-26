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

      return res
        .status(201)
        .json({ message: "Sartu da ondo", user: userBerria });
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

app.get("/get-salmentak", (req, res) => {
  const query = "SELECT * FROM salmenta";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea salmentak jasotzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    return res.status(200).json({ salmentak: results });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});

app.get("/get-liburuak", (req, res) => {
  const query = "SELECT * FROM liburua";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea liburuak jasotzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    return res.status(200).json({ liburuak: results });
  });
});

app.get("/get-liburua/:id", (req, res) => {
  const liburuaId = req.params.id;
  const query = "SELECT * FROM liburua WHERE liburu_id = ?";

  db.query(query, [liburuaId], (err, results) => {
    if (err) {
      console.error("Errorea liburua jasotzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Liburua ez da aurkitu" });
    }

    return res.status(200).json({ liburua: results[0] });
  });
});

app.post("/sortu-notifikazioa", (req, res) => {
  const { liburu_id, saltzailea_id, eroslea_id, mezua } = req.body;

  const insert = `
    INSERT INTO NOTIFIKAZIOA (liburu_id, saltzailea_id, erosketa_egilea_id, egoera, mezua)
    VALUES (?, ?, ?, 'zain', ?)
  `;

  db.query(
    insert,
    [liburu_id, saltzailea_id, eroslea_id, mezua],
    (err, result) => {
      if (err) {
        console.error("Errorea eskaera gordetzean:", err);
        return res.status(500).json({ message: "Errorea" });
      }
      return res.status(200).json({ message: "Eskaera gordea" });
    }
  );
});

app.get("/get-notifikazioak/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT *
    FROM NOTIFIKAZIOA n
    WHERE n.saltzailea_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Errorea" });
    res.status(200).json({ notifikazioak: results });
  });
});

app.post("/onartu-eskaera", (req, res) => {
  const { notifikazioa_id, liburu_id, saltzaile_id } = req.body;

  const updateQuery =
    "UPDATE liburua SET egoera = 'saldua' WHERE liburu_id = ?";
  db.query(updateQuery, [liburu_id], (err1) => {
    if (err1) {
      console.error("Errorea liburua eguneratzean:", err1);
      return res.status(500).json({ message: "Errorea liburua eguneratzean" });
    }

    const insertQuery =
      "INSERT INTO SALMENTA (saltzaile_id, liburu_id) VALUES (?, ?)";
    db.query(insertQuery, [saltzaile_id, liburu_id], (err2) => {
      if (err2) {
        console.error("Errorea salmenta gordetzean:", err2);
        return res.status(500).json({ message: "Errorea salmenta gordetzean" });
      }

      const updateNotif =
        "UPDATE NOTIFIKAZIOA SET egoera = 'onartua' WHERE id = ?";
      db.query(updateNotif, [notifikazioa_id], (err3) => {
        if (err3) {
          console.error("Errorea notifikazioa eguneratzean:", err3);
          return res
            .status(500)
            .json({ message: "Errorea notifikazioa eguneratzean" });
        }

        return res
          .status(200)
          .json({ message: "Eskaria onartua eta salmenta erregistratua" });
      });
    });
  });
});

app.post("/ukatu-eskaera", (req, res) => {
  const { notifikazioId } = req.body;

  const updateQuery = "UPDATE NOTIFIKAZIOA SET egoera = 'ezetsia' WHERE id = ?";
  db.query(updateQuery, [notifikazioId], (err, result) => {
    if (err) {
      console.error("Errorea notifikazioa eguneratzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    return res.status(200).json({ message: "Eskaria ukatua" });
  });
});
