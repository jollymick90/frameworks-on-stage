const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    
    let filePath;
     switch (req.url) {
        case '/simplepage':
        case '/simplepage/':
        case '/simplepage/index.html':
            filePath = path.join(__dirname, 'simplepage', 'index.html');
            break;
        case '/foldertree':
        case '/foldertree/':
        case '/foldertree/index.html':
            filePath = path.join(__dirname, 'foldertree', 'index.html');
            break;
        case '/heatmap':
        case '/heatmap/':
        case '/heatmap/index.html':
            filePath = path.join(__dirname, 'heatmap', 'index.html');
            break;
        case '/bodysimulation':
        case '/bodysimulation/':
        case '/bodysimulation/index.html':
            filePath = path.join(__dirname, 'bodysimulation', 'index.html');
            break;
        case '/':
            // Handle the root path, maybe redirect or serve a default page
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Welcome! Navigate to /foldertree, /heatmap, or /bodysimulation.');
            return;
        default:
            // Handle any other paths as a 404 Not Found error
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found');
            return;
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File Not Found');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
