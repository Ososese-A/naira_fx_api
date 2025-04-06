const axios = require("axios")
const cheerio = require("cheerio")

module.exports = {
    get_cheer_data: async () => {
        const url = 'https://usd.currencyrate.today/ngn'
        const tag = 'td[headers="ng-nairablackmarket header-buy"]'

        try {
            process.env.NODE_TLS_UNAUTHORIZED = '0'

            const response = await axios.get(url, {
                headers: {
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Connection': 'keep-alive'
                }
            })

            const html = response.data
            console.log(html)
            const $ = cheerio.load(html)
            const data = []

            $(tag).each((index, element) => {
                data.push({
                    text: $(element).text(),
                    html: $(element).html()
                })
            })

            return data
        } catch (err) {
            console.log(err)
            console.log(err.message)
            throw err
        }
    }
}