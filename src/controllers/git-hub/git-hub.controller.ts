import { Request, Response } from "express";
import { GitHubService } from '../../services/git-hub.service';
import { DiscordService } from "../../services/discord.service";

export class GitHubController {

    constructor(private readonly gitHubService = new GitHubService(), private readonly discordService = new DiscordService()) {
    }

    webHookHandler = (req: Request, res: Response) => {
        const gitHubEvent = req.headers['x-github-event'] ?? 'unknown';
        const signature = req.headers['x-hub-signature-256'] ?? 'unknown';
        const payload = req.body;
        let message: string = 'uknown';

        switch (gitHubEvent) {
            case 'star':
                message = this.gitHubService.onStar(payload);
                break;
            case 'issues':
                message = this.gitHubService.onIssue(payload);
                break;
        }

        console.log({ message });

        this.discordService.notify(message)
            .then(() => res.status(202).send('Accepted'))
            .catch(() => res.status(500).send('Internal Error'));
    }
}