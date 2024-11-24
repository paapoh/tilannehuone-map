import { EmergencyEvent } from "tilannehuone-shared";
import mqConnection from "./connection";
import { sendEvents } from "./event";
import { fetchData } from "./handleData";

const send = async (events: EmergencyEvent[]) => {
    await mqConnection.connect();

    sendEvents(events);
};

const main = async () => {
    const data = await fetchData();
    if (isEmergencyEventArray(data)) {
        send(data);
    }
}

type InputType = EmergencyEvent[] | { error: string; message: string } | { error: string; message?: undefined };

// TODO: Move to shared lib?
function isEmergencyEventArray(input: InputType): input is EmergencyEvent[] {
    return Array.isArray(input);
}

main()
