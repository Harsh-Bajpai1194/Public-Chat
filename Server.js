const WebSocket = require('ws')
const sock = new WebSocket.Server({port: 8080})
let sockets = [];
messages="";
var user="Server";
sock.on('connection', socket => {
    socket.send(`${user}: You Successfully Connected to The Server!`);
    sockets.push(socket);
    if (messages!=""){
        socket.send(messages.slice(0, -2));
    }
    else{}

    socket.on('message', msg => {
        console.log(`${msg}`);
        sockets.forEach(s => s.send(`${msg}`));
        var rem=messages;
        messages=`${msg}\n\n${rem}`;
    });

    socket.on('close', function() {
        sockets = sockets.filter(s => s !== socket);
      });
});