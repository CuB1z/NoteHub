const RepositoryService = require("../services/RepositoryService.js");

async function getRepositoryStructure(req, res) {
    repoData = {
        githubOwner: req.params.owner || "CuB1z",
        githubRepo: req.params.repo || "Obsidian-Notes",
        path: req.query.path || ""
    };

    try {
        const data = await RepositoryService.getRepoStructure(repoData);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFileContent(req, res) {
    const repoData = {
        githubOwner: req.params.owner || "CuB1z",
        githubRepo: req.params.repo || "Obsidian-Notes",
        path: req.params.path || ""
    };

    try {
        const data = await RepositoryService.getFileContent(repoData);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getRepositoryStructure,
    getFileContent
}