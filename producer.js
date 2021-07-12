const {
  Kafka
} = require('kafkajs');

run();
async function run() {
  const msg = process.argv[2] || "Default";
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["kafka:9092"]
    })

    const producer = kafka.producer();
    console.log('Connecting..');
    await producer.connect();
    console.log('Connected');
    console.log(msg)
    let partition = msg.toLowerCase()[0] < "h" ? 0 : msg.toLowerCase()[0] < "p" ? 1 : 2;
    console.log(partition)
    const result = await producer.send({
      topic: "Users",
      messages: [{
        value: msg,
        partition: partition
      }]
    })
    console.log(`Send Successfully. ${JSON.stringify(result)}`)
    await producer.disconnect()
  } catch (err) {
    console.error(`Error. ${JSON.stringify(err)}`);
  } finally {
    process.exit(0);
  }
}