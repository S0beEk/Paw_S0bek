const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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


const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const method = req.method;


    if (reqUrl.pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Strona główna');
    }

    else if (reqUrl.pathname === '/data') {
        const data = {
            name: 'John Doe',
            age: 30,
            profession: 'developer'
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    else if (reqUrl.pathname === '/html') {
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

    else if (reqUrl.pathname === '/file') {
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
        const filePath = path.join(__dirname, 'assets', reqUrl.pathname);

        fs.exists(filePath, (exists) => {
            if (exists) {
                const mimeType = getMimeType(filePath);
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ error: 'Błąd serwera' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', mimeType);
                        res.end(data);
                    }
                });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Plik nie został znaleziony' }));
            }
        });
    }
});


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
