const Publisher = require('./publisher');
const amqp = require('amqplib');

class Consumer extends Publisher {
  constructor() {
    super();
  }

  async consume(queue) {
    try {
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, (msg) => {
          if (msg) {
            console.log(`[CONSUME] Success: ${msg.content}`);
          }
        }, { noAck: true });
    } catch(err) {
      console.error(`[CONSUME] Error: ${err.message}`);
    } 
  }

}

module.exports = Consumer;