const cors = require("../middleware/corsMiddleware")
const logger = require("../middleware/loggerMiddleware")
const { get_pup_data } = require("../services/pup_scrape")


module.exports = async (req, res) => {
    cors(req, res, () => {})
    logger(req, res, () => {})
    try {
        const pupData = await get_pup_data()
        res.status(200).json(pupData)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}