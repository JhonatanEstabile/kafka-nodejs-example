const { Kafka } = require('kafkajs')
const config = require('./config');

const kafka = new Kafka({
  clientId: 'producer-teste',
  brokers: config.kafkaBrokers
});

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()

  for (let i = 0; i < 10000; i++) {
    await producer.send({
      topic: config.kafkaTopic,
      messages: [
        { value: `Kafka message ${i}` },
      ],
    });
  }
}

run().catch(console.error)