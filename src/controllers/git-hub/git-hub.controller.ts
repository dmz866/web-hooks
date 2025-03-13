import { Request, Response } from "express";

export class GitHubController {

    constructor() {
    }

    webHookHandler(req: Request, res: Response) {
        console.log('Called');
        res.json('Shi')
    }
}