const net = require('net');
const common = require('./common')

var clients = [];

net.createServer(function (socket) {
    clients.push(socket);

    socket.on('data', function (data) {
        var s = common.decrypt(data.toString());
        var toks = s.split(':');
        var payload;
        if (toks[0] == 'join') {
            socket.name = toks[1];
            payload = '>>> ' + socket.name + ' has joined the chat. \n';
        }
        else {
            payload = toks[0] + ": " + s.substring(s.indexOf(':') + 1);
        }
        send_to_all(common.encrypt(payload), socket);
    });

    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        var payload = common.encrypt('>>> ' + socket.name + ' has left the chat. \n');
        send_to_all(payload, socket);
    });
    
    function send_to_all(message, sender) {
        clients.forEach(function (client) {
            client.write(message+'\n');
        });
    }

}).listen(5000);

console.log("[Running]");
