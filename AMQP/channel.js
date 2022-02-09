const Consumer = require('./consumer');
const amqp = require('amqplib');

class Channel extends Consumer {
  constructor() {
    super();
    this.channel = null;
  }

  async getChannel() {
    try {
      this.channel = this.channel ? this.channel : await this.connection.createChannel();
    } catch(err) {
      console.log(`[CHANNEL] [GET] Error: ${err.message}`);
    }
  }

}

module.exports = Channel;