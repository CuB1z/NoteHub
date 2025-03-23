const express = require("express")

const router = express.Router()

router.get("/", (_, res) => { res.json({ message: "API version 1" }) })

module.exports = router