const Connection = require('./connection');
const amqp = require('amqplib');

class Channel extends Connection {
  constructor() {
    super();
    this.consumers = [];
  }

  async createChannel() {
    try {
      if (!this.connection) throw new Error('Connection unavailable');
      this.channel = await this.connection.createChannel();
      await this.assertConsumers();
      await this.channel.on('close', () => {
        console.error(`[AMQP] [CHANNEL] ${this.name} Reinitializing`);
        setTimeout(() => this.createChannel(), 1000);
      });
      console.log(`[AMQP] [CHANNEL] ${this.name} Initialized`);
    } catch(err) {
      console.error(`[AMQP] [CHANNEL] [CREATE] ${this.name} Error: ${err.message}`);
    }
  }

  async assertChannel() {
    try {
      if (!this.channel) await this.createChannel();
    } catch(err) {
      console.error(`[AMQP] [CHANNEL] [ASSERT] ${this.name} Error: ${err.message}`);
    }
  }

  async assertConsumers() {
    try {
      const consumerToBeReinitialized = [...this.consumers]
      this.consumers = [];
      let consumer = consumerToBeReinitialized.shift();
      while(consumer) {
        this.consume(consumer);
        consumer = consumerToBeReinitialized.shift();
      }
    } catch(err) {
      console.error(`[AMQP] [CHANNEL] [ASSERT CONSUMERS] ${this.name} Error: ${err.message}`);
    }
  }

}

module.exports = Channel;