import express from 'express';
import { envs } from './config/envs';
import { GitHubController } from './controllers/git-hub/git-hub.controller';

function main() {
    const app = express();
    const controller = new GitHubController();

    app.use(express.json());
    app.post('/api/git-hub', controller.webHookHandler);

    app.listen(envs.PORT, () => console.log('running app'));
}

main();