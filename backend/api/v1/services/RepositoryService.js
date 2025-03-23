const { GITHUB_TOKEN } = require("../../config/index.js");
const { fetchFrom } = require("./FetchService.js");

const githubOwner = "CuB1z";
const githubRepo = "Obsidian-Notes";
const baseUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents`;

async function getRepoStructure(path = "", indent = 0) {
  const url = `${baseUrl}/${path}`;
  const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };

  const items = await fetchFrom(url, "GET", headers);
  return items.data
};

module.exports = {
  getRepoStructure
};
