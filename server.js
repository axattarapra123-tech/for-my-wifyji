const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let safeUrl = req.url.split('?')[0];
    let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);
    let ext = path.extname(filePath).toLowerCase();
    let contentType = mimeTypes[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Fallback to index.html
            fs.readFile(path.join(__dirname, 'index.html'), (err2, indexContent) => {
                if (err2) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(indexContent, 'utf-8');
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`💖 For My Princess Ji website is LIVE on port ${PORT}!`);
});
