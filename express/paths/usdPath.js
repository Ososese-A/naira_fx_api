const path = require("path")

const directoryPath = path.join(__dirname, "../rateData")
const filePath = path.join(directoryPath, "ngnUsd.json")
const usdPath = filePath

module.exports = {usdPath}