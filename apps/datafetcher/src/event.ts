import { EmergencyEvent } from "tilannehuone-shared";
import { EVENT_QUEUE } from "./config";
import mqConnection from "./connection";
import { Env } from ".";

export const sendEvents = async (events: EmergencyEvent[], env: Env) => {
  // TODO: error handling
  await mqConnection.sendToQueue(EVENT_QUEUE, events, env);

  console.log(`Sent the notification to consumer`);
};
