const { chromium } = require('playwright-chromium')
const { expect } = require('chai')

const mockData = {
    "messages": {
        "-LxHVtajG3N1sU714pVj": {
            "author": "Spami",
            "content": "Hello, are you there?"
        },
        "-LxIDxC-GotWtf4eHwV8": {
            "author": "Garry",
            "content": "Yep, whats up :?"
        },
        "-LxIDxPfhsNipDrOQ5g_": {
            "author": "Spami",
            "content": "How are you? Long time no see? :)"
        },
        "-LxIE-dM_msaz1O9MouM": {
            "author": "George",
            "content": "Hello, guys! :))"
        },
        "-LxLgX_nOIiuvbwmxt8w": {
            "author": "Spami",
            "content": "Hello, George nice to see you! :)))"
        }
    }
}


function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

let browser, page
describe('tests preparation', function() {
    this.timeout(60000)
    before(async() => {
        // browser = await chromium.launch()
        browser = await chromium.launch({ headless: false, slowMo: 1000 })
    })
    after(async() => { await browser.close() })
    beforeEach(async() => {
        page = await browser.newPage()
        await page.goto('http://localhost:5500')
    })
    afterEach(async() => { await page.close() })

    describe('e2e tests', async() => {

        it(`load all posts clicking on refresh button`, async() => {
            await page.route(
                '**/jsonstore/messenger*',
                request => request.fulfill(json(mockData.messages))
            )
            await page.waitForSelector('#messages')

            const [response] = await Promise.all([
                page.waitForResponse(r => r.request().url()
                    .includes('/jsonstore/messenger') && r.request().method() === 'GET'),
                page.click('#refresh')
            ])

            const responseData = await response.json()

            expect(responseData).to.deep.eq(mockData.messages)
        })
        it(`testing proper form submit`, async() => {
            await page.waitForSelector('#controls')
            await page.route(
                '**/jsonstore/messenger*',
                request => request.fulfill(json({ author: 'Eva', content: 'Eva is from Pernik' }))
            )

            await page.fill('#author', 'Eva')
            await page.fill('#content', 'Eva is from Pernik')

            const [response] = await Promise.all([
                page.waitForRequest(r => r.url()
                    .includes('/jsonstore/messenger') &&
                    r.method() === 'POST'),
                page.click('#submit')
            ])
            const responseData = JSON.parse(await response.postData())

            expect(responseData).to.deep.eq({ 'author': 'Eva', 'content': 'Eva is from Pernik' })
        })
    })
})