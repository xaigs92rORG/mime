import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome', args:['--disable-blink-features=AutomationControlled'], headless:false, proxy:{server:'socks5://24.249.199.4:4145'}})
const context = await browser.newContext({acceptDownloads:true,ignoreHTTPSErrors:true})
context.setDefaultTimeout(0)
let alexamaster = await context.newPage()
await alexamaster.goto('https://www.quora.com/profile/Chaowen-Guo-1/answers')
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.click('a[href="https://dropgalaxy.in/c07hjleup215"]')])
await alexamaster.close()
alexamaster = popup
const methodFree = await alexamaster.waitForSelector('button#method_free')
await methodFree.evaluateHandle(_ => _.click())
const downloadBtnClick = await alexamaster.waitForSelector('button#downloadBtnClick')
await downloadBtnClick.evaluateHandle(_ =>  _.click())
//const [download] = await globalThis.Promise.all([alexamaster.waitForEvent('download'), alexamaster.click('a#dl')])
//await download.saveAs('ha.exe')
await alexamaster.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
await alexamaster.waitForTimeout(1000 * 60 * 2)
await alexamaster.screenshot({path:'ha.png'})
await browser.close()
