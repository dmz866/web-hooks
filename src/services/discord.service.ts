import { envs } from "../config/envs";

export class DiscordService {
    constructor() {
    }

    async notify(message: string) {
        const body = {
            content: message,
            embeds: [
                {
                    image: { url: 'XXXXXXXXXXXX' }
                }
            ]
        };
        const resp = await fetch(envs.DISCORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            console.log('error!');
            return false;
        }

        return true;
    }
}