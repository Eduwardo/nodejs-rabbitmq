
const amqp = require('amqplib');

class Connection {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  static get() {
    return this.connection;
  } 

  async start() {
    try {
      this.connection = await amqp.connect(process.env.AMQP_URI);
    } catch(err) {
      console.log(`[CONNECTION] [START] Error: ${err.message}`);
    }
  }

}

module.exports = Connection;