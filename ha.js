import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const alexamaster = await context.newPage()
const client = await context.newCDPSession(alexamaster)
await client.send('Emulation.setScriptExecutionDisabled', {value:true})
await alexamaster.goto('https://cashmining.me/')
const form = await alexamaster.$('form')
await form.evaluateHandle(_ => {_.style.opacity = 1; _.style.display = 'block'})
console.log(await alexamaster.evaluate(() => globalThis.getComputedStyle(globalThis.document.body).getPropertyValue('visibility')))
await alexamaster.$('head').then(_ => _.evaluateHandle(_ => _.remove()))
await alexamaster.$('body').then(_ => _.evaluateHandle(_ => _.innerHTML = ''))
await alexamaster.$('body').then(_ => _.evaluateHandle((_, form) => _.append(form), form))
await alexamaster.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await alexamaster.fill('input[name="password"]', 'HL798820y+')
await alexamaster.click('button[name="connect"]')
await client.send('Emulation.setScriptExecutionDisabled', {value:false})
//const client = await context.newCDPSession(alexamaster)
//const {result} = await client.send('Runtime.evaluate', {expression:'globalThis', includeCommandLineAPI:true, objectGroup:'handler'}) //https://stackoverflow.com/questions/63059096/chrome-devtools-protocol-how-to-get-click-event-handler-name-of-a-node
//const {listeners} = await client.send('DOMDebugger.getEventListeners', {objectId:result.objectId})
//console.log(listeners)
//await client.send('Runtime.releaseObjectGroup', {objectGroup:'handler'})
//await alexamaster.click('a#wmp-start')
//await alexamaster.click('a#wmp-start')
const popup = await context.newPage()
await popup.goto('http://cashmining.me/mining.php')
await popup.bringToFront()
await alexamaster.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
const it = await browser.newPage()
await it.goto('https://cashmining.forumforyou.it/')
await it.click('a.nav-link')
await it.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await it.fill('input[name="password"]', 'HL798820y+')
await it.click('button[name="connect"]')
const [popupit] = await globalThis.Promise.all([it.waitForEvent('popup'), it.click('button[onclick]')])
await popupit.bringToFront()
await alexamaster.waitForTimeout(1000 * 60 * 60 * 2.5)
await browser.close()
