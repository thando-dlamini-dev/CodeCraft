import { Octokit } from "@octokit/rest";

export class OctokitConfig {
    constructor(acccessToken) {
        this.octokit = new Octokit({ 
            auth: acccessToken 
        });
    }


 /**
   * Create a new repository
   * @param {string} repoName - Name of the repository
   * @param {string} description - Repository description
   * @param {boolean} isPrivate - Whether the repository is private
   * @returns {Promise<Object>} - Repository data
   */

 async createRepo(repoName, description = "", isPrivate = false){
    try {
        const { data } = await this.octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description,
            private: isPrivate,
            auto_init: false
        })

        return data;
    } catch (error) {
        console.log("Error creating repository:", error.message);
    }
 }

 /**
   * Creates a file in a repository
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @param {string} path - File path
   * @param {string} content - File content
   * @param {string} message - Commit message
   * @returns {Promise<Object>} - Response data
   */

 async createFile(owner, repo, path, content, message = "Initial commit") {
    try {
        //Convert content to base64 
        const contentEncoded = Buffer.from(content).toString("base64");

        //destructure data from response object
        const { data } = await this.octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: contentEncoded,
        })

        return data
    } catch (error) {
        console.log(`Error creating file ${path}:`, error.message)
        throw error;
    }
 }

 /**
   * Initializes a repository with starter files
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @param {Object} files - Object with file paths and contents
   * @returns {Promise<Array>} - Array of creation results
   */

 async initializeRepositoryWithFiles(owner, repo, files) {
    const results = [];

    for(const [path, content] of Object.entries(files)) {
        try {
            const result = await this.createFile(
                owner, 
                repo, 
                path,
                content, 
                `Add ${path}`
            )

            results.push({ path, success: true, result})
        } catch (error) {
            results.push({ path, success: false, error: error.message })
        }
    }

    return results
 }

  /**
   * Get user information
   * @returns {Promise<Object>} - User data
   */

  async getUserInfo() {
    try {
        const { data } = await this.octokit.users.getAuthenticated()
        return data
    } catch (error) {
        console.log("Error fetching user info:", error.message)
        throw error
    }
  }
}
