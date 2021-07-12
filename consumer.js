const {
  Kafka
} = require('kafkajs');

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["kafka:9092"]
    })

    const consumer = kafka.consumer({
      groupId: "test"
    });
    console.log('Connecting..');
    await consumer.connect();
    console.log('Connected');

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true
    })

    await consumer.run({
      "eachMessage": async result => {
        console.log(`Received message ${JSON.stringify(result.message.value.toString('utf8'))} on partition ${result.partition}`);
      }
    })
  } catch (err) {
    console.error(`Error. ${JSON.stringify(err)}`);
  }
}