const cors = require("../middleware/corsMiddleware")
const logger = require("../middleware/loggerMiddleware")
const { get_cheer_data } = require("../services/cheer_scrape")

module.exports = async (req, res) => {
    cors(req, res, () => {})
    logger(req, res, () => {})

    try {
        const cheer_data = await get_cheer_data()
        res.status(200).json(cheer_data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}