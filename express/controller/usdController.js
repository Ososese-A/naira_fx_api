const {read_data} = require("../services/read_data")
const { usdPath } = require("../paths/usdPath")

const usdCurrent = async (req, res) => {
    const filePath = usdPath
    const exchangeData = await read_data(filePath)
    let oldest = null
    let latest = null

    try {
        //remember to convert this to a function with the oldest and latest variables
        exchangeData.flat().forEach(entry => {
            const currentTimestamp = new Date(entry.timestamp)

            if (!oldest || currentTimestamp < new Date(oldest.timestamp)) oldest = entry

            if (!latest || currentTimestamp > new Date(latest.timestamp)) latest = entry
        })
        res.status(200).json({oldest, latest})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const usdBacklog = async (req, res) => {
    const filePath = usdPath
    const exchangeData = await read_data(filePath)

    try {
        res.status(200).json({exchangeData})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {usdCurrent, usdBacklog}