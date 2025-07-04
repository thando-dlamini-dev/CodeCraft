import { Octokit } from "@octokit/rest";

export const CreateRepo = async (data) => {
    const { name, repo, description, priv, message } = data;
    const octokit = new Octokit.repos.createForAuthenticatedUser({
        auth: process.env.GITHUB_REPO_TOKEN,
        owner: name,
        repo,
        private: priv,
        description,
        message
    });

    return octokit;
}

export default CreateRepo