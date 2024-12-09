const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;


    if (url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Strona główna');
    }

    else if (url === '/data') {
        const data = {
            name: 'Dill Doe',
            age: 30,
            profession: 'developer'
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
    else if (url === '/html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <html>
                <head>
                    <title>HTML Generated</title>
                </head>
                <body>
                    <h1>Wygenerowany dokument HTML</h1>
                    <p>To jest dokument HTML generowany wewnętrznie przez Node.js</p>
                </body>
            </html>
        `);
    }
    else if (url === '/file') {
        const filePath = path.join(__dirname, 'example.html');

        fs.exists(filePath, (exists) => {
            if (exists) {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Błąd serwera');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end(data);
                    }
                });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Plik nie został znaleziony');
            }
        });
    }

    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Nieznana ścieżka');
    }
});


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
