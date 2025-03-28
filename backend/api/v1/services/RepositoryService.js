const { fetchFrom } = require("./FetchService.js");
const { parseMarkdown } = require("./MarkdownService.js");

const BASE_GITHUB_API_URL = "https://api.github.com/repos";

/**
 * Fetches the structure of a repository from GitHub
 * @param {Object} options - The options for the request
 * @param {string} options.githubOwner - The owner of the GitHub repository
 * @param {string} options.githubRepo - The name of the GitHub repository
 * @param {string} options.path - The path to the directory in the repository (optional)
 * @param {string} options.headers - The headers for the request (optional)
 * 
 * @returns {Promise<Array>} - The structure of the repository
 */
async function getRepoStructure({ githubOwner, githubRepo, path = "", headers = {} }) {
	const url = `${BASE_GITHUB_API_URL}/${githubOwner}/${githubRepo}/contents/${path}`;

	try {
		const { data: items } = await fetchFrom(url, "GET", headers);
		let structure = [];

		for (let item of items) {
			// Skip hidden files
			if (item.name.startsWith(".")) continue;

			// Skip unsupported file types
			if (item.type === "file" && !item.name.endsWith(".md")) continue;

			// Create a node for the item
			let node = {
				name: item.name,
				type: item.type,
				path: item.path
			};

			if (node.type === "dir") {
				node.children = await getRepoStructure({ githubOwner, githubRepo, path: item.path, headers });
				if (node.children.length === 0) continue;
				
			} else if (node.type === "file") {
				node.url = item.download_url;
			}

			structure.push(node);
		}

		return structure;

	} catch (error) {
		console.error("Error fetching repo structure from GitHub: ", url);
		throw new Error(`Failed to fetch repository structure from GitHub: ${url}`);
	}
}

/**
 * Fetches the content of a file from GitHub
 * @param {Object} options - The options for the request
 * @param {string} options.githubOwner - The owner of the GitHub repository
 * @param {string} options.githubRepo - The name of the GitHub repository
 * @param {string} options.path - The path to the file in the repository (optional)
 * @param {string} options.token - The GitHub token for authentication (optional)
 * 
 * @returns {Promise<string>} - The content of the file
 */
async function getFileContent({ githubOwner, githubRepo, path = "", headers = {} }) {
	const url = `${BASE_GITHUB_API_URL}/${githubOwner}/${githubRepo}/contents/${path}`;

	try {
		const { data: fileData } = await fetchFrom(url, "GET", headers);
		const fileContentResponse = await fetchFrom(fileData.download_url, "GET", headers);

		// Parse file metadata and content
		const parsedFile = parseMarkdown(fileContentResponse.data);

		return {
			name: fileData.name,
			frontmatter: parsedFile.frontmatter,
			content: parsedFile.content,
		}
	} catch (error) {
		console.error("Error fetching file content from GitHub: ", url);
		throw new Error(`Failed to fetch file content from GitHub: ${url}`);
	}
}

module.exports = {
	getRepoStructure,
	getFileContent
}
