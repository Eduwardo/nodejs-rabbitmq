const Channel = require('./channel');
const amqp = require('amqplib');

class Consumer extends Channel {
  constructor() {
    super();
  }

  async consume(queue) {
    try {
        this.consumers.push(queue);
        if (!this.channel) throw new Error('Channel unavailable');
        await this.channel.assertQueue(queue);
        await this.channel.consume(queue, (msg) => {
          console.log(`[AMQP] [CONSUME] Success: ${msg.content}`);
        }, { noAck: true });
    } catch(err) {
      console.error(`[AMQP] [CONSUME] Error: ${err.message}`);
    } 
  }

}

module.exports = Consumer;