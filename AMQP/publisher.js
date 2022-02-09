const Connection = require('./connection');
const { stringify } = require('../helpers/utils');
const amqp = require('amqplib');

class Publisher extends Connection {
  constructor() {
    super();
  }

  async publish(queue, msg) {
    try {
        await this.channel.assertQueue(queue);
        await this.channel.sendToQueue(queue, Buffer.from(stringify(msg)));
        console.log(`[PUBLISH] Success: ${msg}`);
    } catch(err) {
      console.error(`[PUBLISH] Error: ${err.message}`);
    } 
  }

}

module.exports = Publisher;