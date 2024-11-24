import { EmergencyEvent } from "tilannehuone-shared";
import { EVENT_QUEUE } from "./config";
import mqConnection from "./connection";

export const sendEvents = async (events: EmergencyEvent[]) => {
  // TODO: error handling
  await mqConnection.sendToQueue(EVENT_QUEUE, events);

  console.log(`Sent the notification to consumer`);
};
