const Channel = require('./channel');
const { stringify } = require('../helpers/utils');
const amqp = require('amqplib');

class Producer extends Channel {
  constructor() {
    super();
  }

  async publish(queue, msg) {
    try {
        if (!this.channel) throw new Error('Channel unavailable');
        await this.channel.assertQueue(queue);
        await this.channel.sendToQueue(queue, Buffer.from(stringify(msg)));
    } catch(err) {
      console.error(`[AMQP] [PUBLISH] Error: ${err.message}`);
    } 
  }

}

module.exports = Producer;