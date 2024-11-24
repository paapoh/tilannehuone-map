import { config } from "dotenv";

config();

export const rmqUser = String(process.env.RABBITMQ_USERNAME);

export const rmqPass = String(process.env.RABBITMQ_PASSWORD);

export const rmqhost = String(process.env.RABBITMQ_HOST);

export const EVENT_QUEUE = "@event";
