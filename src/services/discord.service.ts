import { envs } from "../config/envs";

export class DiscordService {
    constructor() {
    }

    async notify(message: string) {
        const resp = await fetch(envs.DISCORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });

        if (!resp.ok) {
            console.log('error!');
            return false;
        }

        return true;
    }
}