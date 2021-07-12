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

		const admin = kafka.admin();
		console.log('Connecting..');

		await admin.connect();
		console.log('Connected');

		await admin.createTopics({
			topics: [{
				topic: "Users",
				numPartitions: 3
			}]
		})
		console.log('Created Successfully')
		
		await admin.disconnect()
	} catch (err) {
		console.error(`Error. ${err}`);
	} finally {
		process.exit(0);
	}
}