const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium")
const { file_data } = require("./file_access");

module.exports = {
    get_pup_data: async () => {
        const timestamp = new Date()

        try {
            const browser = await puppeteer.launch({ 
                    args: chromium.args,
                    executablePath: await chromium.executablePath(),
                    headless: chromium.headless,
                });

                const page = await browser.newPage()
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36')
                await page.goto('https://usd.currencyrate.today/ngn', { waitUntil: 'domcontentloaded' })
                await page.goto('https://usd.currencyrate.today/ngn', { waitUntil: 'networkidle2', timeout: 10000 });
                await page.waitForSelector('#fex-rates')
                const cbnBuyRate = await page.$eval('td[headers="ng-cbn header-buy"]', el => el.textContent.trim())
                const cbnSellRate = await page.$eval('td[headers="ng-cbn header-sell"]', el => el.textContent.trim())
                const blackMarketBuyRate = await page.$eval('td[headers="ng-nairablackmarket header-buy"]', el => el.textContent.trim())
                const blackMarketSellRate = await page.$eval('td[headers="ng-nairablackmarket header-sell"]', el => el.textContent.trim())
                await browser.close()

                let responseData = []

                const response = {
                    cbn: {
                        buy: cbnBuyRate,
                        sell: cbnSellRate
                    },
                    blackMarket: {
                        buy: blackMarketBuyRate,
                        sell: blackMarketSellRate
                    },
                    timestamp
                }

                responseData.push(response)

                await file_data(responseData)

            return response
        } catch (err) {
            console.log(err)
            console.log(err.message)
            throw new Error("Failed to fetch currency rates due to Puppeteer issue")
        }
    }
}