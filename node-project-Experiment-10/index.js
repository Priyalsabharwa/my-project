const http = require('http');
const HandlerRequest = (req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Deepjoy\n');
}

const server = http.createServer(HandlerRequest);

const port = 3000;
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});