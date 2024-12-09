const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware do obsługi statycznych plików (CSS, obrazy)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware do parsowania danych z formularza (POST)
app.use(express.urlencoded({ extended: true }));

// Strona główna "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Strona "O nas" "/o-nas"
app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Strona "Oferta" "/oferta"
app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'offer.html'));
});

// Strona "Kontakt" "/kontakt"
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Obsługa danych z formularza kontaktowego
app.post('/kontakt', (req, res) => {
    // Wyświetlenie danych w konsoli
    console.log('Dane z formularza:', req.body);

    // Przekierowanie na stronę główną
    res.redirect('/');
});

// Uruchomienie serwera na porcie 3000
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
