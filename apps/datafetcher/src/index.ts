import { EmergencyEvent } from "tilannehuone-shared";
import mqConnection from "./connection";
import { sendEvents } from "./event";
import { fetchData } from "./handleData";
import { ScheduledEvent, EventContext } from '@cloudflare/workers-types'

const send = async (events: EmergencyEvent[], env: Env) => {
    await mqConnection.connect(env);

    sendEvents(events, env);
    return "Success";
};

const main = async (env: Env) => {
    const data = await fetchData();
    if (isEmergencyEventArray(data)) {
        return send(data, env);
    }
}

type InputType = EmergencyEvent[] | { error: string; message: string } | { error: string; message?: undefined };

// TODO: Move to shared lib?
function isEmergencyEventArray(input: InputType): input is EmergencyEvent[] {
    return Array.isArray(input);
}

export interface Env {
    RABBITMQ_USERNAME: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_HOST: string;
}

export default {
    async scheduled(
        _event: ScheduledEvent,
        env: Env,
        ctx: EventContext<Env, any, any>
    ) {
        ctx.waitUntil(main(env));
    },
}
