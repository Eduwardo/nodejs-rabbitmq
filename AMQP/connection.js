
const amqp = require('amqplib');

class Connection {
  constructor() {
    this.name = this.constructor.name;
    this.connection = null;
    this.channel = null;
  }

  async getConnection() {
    try {
      this.connection = await amqp.connect(process.env.AMQP_URI);
      console.log(`[AMQP] [CONNECTION] ${this.name} Connected`);

      await this.assertChannel();
      await this.connection.on('close', () => {
        console.error(`[AMQP] [CONNECTION] ${this.name} Reconnecting`);
        setTimeout(() => this.getConnection(), 1000);
      });
    } catch(err) {
        if (err.message !== 'Connection closing') {
          this.channel = null;
          console.error(`[AMQP] [CONNECTION] ${this.name} Error: ${err.message}`);
          setTimeout(() => this.getConnection(), 1000);
        }
    }
  }

}

module.exports = Connection;