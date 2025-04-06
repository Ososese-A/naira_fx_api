const path = require("path")
const fs = require("fs").promises
const { write_data } = require("./write_data")
const { read_data } = require("./read_data")

module.exports = {
    file_data: async (responseData) => {
        const directoryPath = path.join(__dirname, "../rateData")
        const filePath = path.join(directoryPath, "ngnUsd.json")

        try {
            await fs.access(filePath, fs.constants.F_OK)
            console.log("File exists!")
            let prevFileData = await read_data(filePath)
            if (!Array.isArray(prevFileData)) {
                prevFileData = []
            }

            prevFileData.push(responseData)

            await write_data(filePath, prevFileData)
        } catch (err) {
            if (err.code === "ENOENT") {
                console.log("File does not exist, creating a new file")
                await write_data(filePath, [responseData])
            } else {
                console.log("Error accessing the file", err)
                throw err
            }
        }
    }
}