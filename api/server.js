const cors = require("../middleware/corsMiddleware")
const logger = require("../middleware/loggerMiddleware")

module.exports = (req, res) => {
    cors(req, res, () => {})
    logger(req, res, () => {})

    res.json({ msg: "Hello world" })
}