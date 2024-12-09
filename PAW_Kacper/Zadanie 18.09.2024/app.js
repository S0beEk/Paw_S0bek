const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


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

    else if (reqUrl.pathname === '/get_params' && method === 'GET') {
        const params = reqUrl.query; // Parametry GET


        const timestamp = Date.now();


        const paramsFilePath = path.join(__dirname, `params_${timestamp}.json`);

        fs.writeFile(paramsFilePath, JSON.stringify(params, null, 2), (err) => {
            if (err) {
                console.error('Błąd zapisu pliku:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Błąd serwera');
                return;
            }


            console.log('Otrzymane parametry GET:', params);


            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: 'ok' }));
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
