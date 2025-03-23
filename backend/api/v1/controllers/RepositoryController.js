const { getRepoStructure } = require("../services/RepositoryService.js");

async function getRepositoryStructure(req, res) {
    const path = "";
    const indent = 0;
    const data = await getRepoStructure(path, indent);

    res.json(data);
}

module.exports = {
    getRepositoryStructure
}