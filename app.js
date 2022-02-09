const http = require('http');
const { Channel } = require('./AMQP/module.js');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end();
});

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/ - ${new Date()}`);

  try {
    let publisherConnection = new Channel();
    await publisherConnection.start();
    await publisherConnection.getChannel();
    publisherConnection.publish('messages', 'Hello World');
    
    let consumerConnection = new Channel();
    await consumerConnection.start();
    await consumerConnection.getChannel();
    consumerConnection.consume('messages');

  } catch(err) {
    console.log(`[APPLICATION] Error: ${err.message}`);
  }
});