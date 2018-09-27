const puppeteer = require('puppeteer')

let browser, page

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    page = await browser.newPage()

    await page.goto('http://localhost:3000')

})

afterEach(async () => {
    await browser.close()
})
// headless:false will boot the browser
test("The header has the right text", async () => {

    const text = await page.$eval('a.brand-logo', el => el.innerHTML)

    expect(text).toEqual('Blogster')
})

test("Clicking login starts authentication process", async () => {
    await page.click('.right a')
    const url = await page.url()
    expect(url).toMatch(/accounts\.google\.com/);

})

test("Should display logout button when signed in", async () => {

})