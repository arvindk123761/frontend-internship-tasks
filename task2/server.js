const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

console.log('✅ WebSocket server started on port 3000');

wss.on('connection', function connection(ws) {
  console.log('🟢 Client connected');

  ws.on('message', function incoming(message) {
    console.log('📨 Received: %s', message);

    // Broadcast message to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});
