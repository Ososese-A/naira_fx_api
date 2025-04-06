const fs = require("fs").promises


module.exports = {
    read_data: async (filePath) => {
            try {
                const fileData = await fs.readFile(filePath, 'utf8')

                if (fileData.trim() === "") {
                    // console.log("File is empty")
                    return
                } else {
                    return JSON.parse(fileData);
                }
            } catch (err) {
                console.log("Error reading or parsing the file", err);
                throw err;
            }
    }
}