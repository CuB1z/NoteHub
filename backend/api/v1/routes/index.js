const express = require("express")
const RepositoryController = require("../controllers/RepositoryController.js");

const router = express.Router()

router.get("/", (_, res) => { res.json({ message: "API version 1" }) })
router.get("/repositories/:owner/:repo", RepositoryController.getRepositoryStructure)
router.get("/repositories/:owner/:repo/:path(*)", RepositoryController.getFileContent)

module.exports = router