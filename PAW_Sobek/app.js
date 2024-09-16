const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const url = req.url;

  if (url === '/route1') {
    // First route: Return "Strona główna" text
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Strona Główna\n');
  } else if (url === '/route2') {
    // Second route: Return a JSON document
    const jsonData = { name: 'John Doe', age: 30 };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(jsonData));
  } else if (url === '/html-generated') {
    // Third route: Return an HTML document generated in Node.js
    const html = `
      <html>
        <head>
          <title>Generated HTML</title>
        </head>
        <body>
          <h1>This HTML is generated in Node.js</h1>
        </body>
      </html>
    `;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else if (url === '/html-file') {
    // Fourth route: Return an HTML document from a file
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File not found\n');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found\n');
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});