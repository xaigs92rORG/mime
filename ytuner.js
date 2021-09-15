import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const ytuner = await context.newPage()
await ytuner.goto('https://www.ytuner.com/user/login')
await ytuner.click('a.tos-agree')
await ytuner.fill('input#email','ga0961663@otc.edu')
await ytuner.fill('input#pass', 'HL798820y+')
await ytuner.click('a.form-submit')
await ytuner.waitForNavigation()
await ytuner.goto('https://www.ytuner.com/dashboard/credits/work')
await ytuner.click('a[href^="work"]')
for (const _ of globalThis.Array(3).keys())
//while (!globalThis.Object.is(await ytuner.url(), 'https://www.ytuner.com/dashboard/credits/work/finish'))
{
    const id = await ytuner.waitForSelector('input#code').then(_ => _.getAttribute('value'))
    const youtube = await context.newPage()
    await youtube.goto('https://www.youtube.com/watch?v=' + id)
    const moviePlayer = await youtube.$('div#movie_player')
    await moviePlayer.evaluateHandle(_ => _.style.display = 'block')
    await moviePlayer.waitForElementState('visible')
    const duration = await moviePlayer.evaluateHandle(_ => _.getDuration()).then(_ => _.jsonValue())
    console.log(duration)
    await moviePlayer.evaluateHandle(_ => _.playVideo())
    console.log(await youtube.$('button[aria-label^="like"]').then(_ => _.innerHTML()))
    const startStep = await ytuner.$('button#start_step')
    await startStep.getProperty('classList').then(_ => _.evaluateHandle(_ => _.remove('disabled')))
    await startStep.waitForElementState('visible')
    await startStep.click()
    //await ytuner.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
    //await new globalThis.Promise(_ => globalThis.setTimeout(_, 1000))
    const restart = await ytuner.waitForSelector('button.restartProcess')
    await restart.evaluateHandle(_ => _.parentElement.nextElementSibling.querySelector('button')).then(_ => _.asElement().click())
    //await ytuner.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
    //await new globalThis.Promise(_ => globalThis.setTimeout(_, 1000))
    await ytuner.fill('input#url','https://youtu.be/' + id)
    await ytuner.click('button#validate-url')
    await ytuner.click('button#openForm')
    const industry = await ytuner.$('select#industry')
    await industry.evaluateHandle(_ => _.style.display = 'block')
    await industry.waitForElementState('visible')
    await industry.selectOption('CP')
    let option = [null, globalThis.Number.POSITIVE_INFINITY]
    const select = await ytuner.$('select#time')
    await select.evaluateHandle(_ => _.style.display = 'block')
    await select.waitForElementState('visible')
    for await (const _ of await select.$$(':scope>option').then(_ => _.map(_ => _.getAttribute('value'))))
    {
        const [hour, minute, second] = _.split(':').map(globalThis.Number)
	const distance = globalThis.Math.abs(hour * 3600 + minute * 60 + second - duration)
        if (distance < option[1]) option = [_, distance]
    }
    console.log(option[0])
    await select.selectOption(option[0])
    await ytuner.waitForSelector('input#form-agree').then(_ => _.evaluateHandle(_ => _.click()))
    await youtube.waitForTimeout(1000 * duration)
    await youtube.close()
    await ytuner.click('a#submit')
    await ytuner.waitForNavigation()
}
await browser.close()//
