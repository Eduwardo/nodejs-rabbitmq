const http = require('http');
const { Producer, Consumer } = require('./AMQP/module.js');
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
    const producer = new Producer();
    await producer.getConnection();
    setInterval(async () => {
      await producer.publish('earth', `Hello world! ${new Date().toLocaleTimeString()}`);
      setTimeout(async () => { await producer.publish('mars', `Hello mars! ${new Date().toLocaleTimeString()}`) }, 1500);
      }, 3000);

    const consumer = new Consumer();
    await consumer.getConnection();
    await consumer.consume('earth');
    await consumer.consume('mars');

  } catch(err) {
    console.error(`[APPLICATION] Error: ${err.message}`);
  }
});