const cors = require("../middleware/corsMiddleware")
const logger = require("../middleware/loggerMiddleware")

const { usdBacklog } = require("../controller/usdController")

module.exports = (req, res) => {
    cors(req, res, () => {})
    logger(req, res, () => {})

    usdBacklog(req, res)
}