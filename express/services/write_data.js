const fs = require("fs").promises

module.exports = {
    write_data: async (filePath, responseData) => {
        try {
            await fs.writeFile(filePath, JSON.stringify(responseData, null, 4))
            // console.log("File updated successfully")
        } catch (writeErr) {
            console.log("Error occured while writing", writeErr)
        }
    }
}