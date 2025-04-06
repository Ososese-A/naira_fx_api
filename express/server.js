require("dotenv").config()
const express = require("express")
const logger = require("./middleware/loggerMiddleware")
const cors = require("cors")
const { get_cheer_data } = require("./services/cheer_scrape")
const { get_pup_data } = require("./services/pup_scrape")
const { usdCurrent, usdBacklog } = require("./controller/usdController")

const app = express()

app.use(express.json())
app.use(logger)
app.use(cors())

app.get("/", (req, res) => {
    res.json({msg: "Hello world"})
})

app.get("/scrape", async (req, res) => {
    try { 
        const cheer_data = await get_cheer_data()
        res.status(200).json(cheer_data)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.get("/pup-Scrape", async (req, res) => {
    const pup_data = await get_pup_data()
    res.status(200).json(pup_data)
})

setInterval(() => {get_pup_data()}, 2 * 60 * 60 * 1000)

app.get("/usdCurrent", usdCurrent)

app.get("/usdBacklog", usdBacklog)

const PORT = 8080 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Ready and listening at port: ${PORT}`)
})

module.exports = app