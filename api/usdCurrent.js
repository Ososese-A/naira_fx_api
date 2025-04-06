const cors = require("../middleware/corsMiddleware")
const logger = require("../middleware/loggerMiddleware")

const { usdCurrent } = require("../controller/usdController")

module.exports = (req, res) => {
    cors(req, res, () => {})
    logger(req, res, () => {})

    usdCurrent(req, res)
}