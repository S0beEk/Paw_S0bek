const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contact_app",
});


db.connect((err) => {
    if (err) {
        console.error("Błąd połączenia z bazą danych:", err);
    } else {
        console.log("Połączono z bazą danych MySQL.");
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const footerInfo = {
    name: "Jan Kowalski",
    class: "Klasa 4A",
};


app.get("/", (req, res) => {
    res.render("home", { footerInfo });
});


app.get("/o-nas", (req, res) => {
    res.render("about", { footerInfo });
});


app.get("/oferta", (req, res) => {
    res.render("offer", { footerInfo });
});


app.get("/kontakt", (req, res) => {
    res.render("contact", { footerInfo });
});


app.post("/kontakt", (req, res) => {
    const { name, surname, email, message } = req.body;

    const query = `
        INSERT INTO messages (name, surname, email, message)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [name, surname, email, message], (err) => {
        if (err) {
            console.error("Błąd podczas zapisywania wiadomości:", err);
            res.status(500).send("Błąd serwera");
        } else {
            console.log("Wiadomość zapisana do bazy danych.");
            res.redirect("/");
        }
    });
});


app.get("/api/contact-messages", (req, res) => {
    const query = "SELECT * FROM messages";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Błąd podczas pobierania wiadomości:", err);
            res.status(500).send("Błąd serwera");
        } else {
            res.json(results);
        }
    });
});


app.get("/api/contact-messages/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM messages WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Błąd podczas pobierania wiadomości:", err);
            res.status(500).send("Błąd serwera");
        } else if (results.length === 0) {
            res.status(404).send("Nie znaleziono wiadomości");
        } else {
            res.json(results[0]);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Aplikacja działa na http://localhost:${PORT}`);
});
