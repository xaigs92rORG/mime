import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
const youtube = await browser.newPage({recordVideo:{dir:'videos'}})
await youtube.goto('https://www.youtube.com/watch?v=epHjCti0dIs')
const moviePlayer = await youtube.$('div#movie_player')
await moviePlayer.evaluateHandle(_ => _.style.display = 'block')
await moviePlayer.waitForElementState('visible')
await moviePlayer.evaluateHandle(_ => _.playVideo())
