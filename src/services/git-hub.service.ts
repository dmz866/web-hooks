import { GitHubIssue, GitHubStar } from "../interfaces";

export class GitHubService {
    constructor() {
    }

    onStar(payload: GitHubStar) {
        const { action, sender, repository } = payload;

        return `User ${sender?.login} ${action} star on ${repository.name}`;
    }

    onIssue(payload: GitHubIssue) {
        const { action, issue } = payload;

        if (action === 'opened') {
            return `An issue ${issue.title} was opened`;

        }
        else if (action === 'closed') {
            return `Issue "${issue.title}" was closed by ${issue.user.login}`;
        }
        else if (action === 'reopened') {
            return `Issue "${issue.title}" was re-opened by ${issue.user.login}`;
        }

        return 'unknown event';
    }
}