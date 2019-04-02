const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const common = require('./common')

var line_number = 0;
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

const username = process.argv[process.argv.length - 1];
const hostname = process.argv[process.argv.length - 2];
const client = net.createConnection({ port: 5000, host: hostname }, () => {
    var payload = common.encrypt('join:' + username);
    client.write(payload);
});

client.on('data', function(data) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    s = common.decrypt(data.toString());
    s = s.replace(/^\s+|\s+$/g, '');
    console.log(s);
    ++line_number;
});

rl.on('SIGINT', () => {
    rl.close();
});

rl.on('line', (s) => {
    readline.cursorTo(process.stdout, 0, line_number);
    readline.clearLine(process.stdout, 0);
    s = s.replace(/^\s+|\s+$/g, '');
    var payload = common.encrypt(username + ': ' + s + '\n');
    client.write(payload);
});
