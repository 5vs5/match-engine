var app = require('http').createServer( function (req, res) { res.writeHead(200); res.end("Ping"); });
var io = require('socket.io')(app);

app.listen(5555);
console.log("Application started on port 5555...");



io.on('connection', function (socket) {
  console.log("#New user started viwing the match");
});



var match = require('./lib/match');

match.initialize(io);