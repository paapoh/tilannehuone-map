import client, { Connection, Channel } from "amqplib";

import { rmqUser, rmqPass, rmqhost } from "./config";

// TODO: This might be better of in the shared lib, from which producer and consumer could inherit from...
class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            console.log(`Connecting to Rabbit-MQ Server`);
            this.connection = await client.connect(
                `amqp://${rmqUser}:${rmqPass}@${rmqhost}:5672`
            );

            console.log(`Rabbit MQ Connection is ready`);

            this.channel = await this.connection.createChannel();

            console.log(`Created RabbitMQ Channel successfully`);
        } catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
        }
    }

    async sendToQueue(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;
