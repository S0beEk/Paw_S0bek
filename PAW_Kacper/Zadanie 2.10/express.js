const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


const getMimeType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
    };
    return mimeTypes[ext] || 'application/octet-stream';
};


app.get('/', (req, res) => {
    res.send('Strona główna');
});


app.get('/data', (req, res) => {
    const data = {
        name: 'John Doe',
        age: 30,
        profession: 'developer'
    };
    res.json(data);
});


app.get('/html', (req, res) => {
    res.send(`
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
});


app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'example.html');

    fs.exists(filePath, (exists) => {
        if (exists) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.status(500).send('Błąd serwera');
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(data);
                }
            });
        } else {
            res.status(404).send('Plik nie został znaleziony');
        }
    });
});


app.get('/get_params', (req, res) => {
    const params = req.query;


    const timestamp = Date.now();


    const paramsFilePath = path.join(__dirname, 'params', `params_${timestamp}.json`);

    fs.writeFile(paramsFilePath, JSON.stringify(params, null, 2), (err) => {
        if (err) {
            res.status(500).json({ error: 'Błąd zapisu pliku' });
            return;
        }


        console.log('Otrzymane parametry GET:', params);


        res.json({ ok: 'ok' });
    });
});


app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.url);
    fs.exists(filePath, (exists) => {
        if (exists) {
            const mimeType = getMimeType(filePath);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'Błąd serwera' });
                } else {
                    res.setHeader('Content-Type', mimeType);
                    res.send(data);
                }
            });
        } else {
            res.status(404).json({ error: 'Plik nie został znaleziony' });
        }
    });
});


app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
