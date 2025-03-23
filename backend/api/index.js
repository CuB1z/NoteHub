// Dotenv
const dotenv = require("dotenv")
dotenv.config()

// Import dependencies
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const config = require("./config/index.js")

// Import different router versions
const v1Router = require("./v1/routes/index.js")

// Create express app
const app = express()

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/v1", v1Router)

app.get("/", (_, res) => res.send("Welcome to the API"))


// Start server
app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`))