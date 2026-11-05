// Dependency-free browser regressions. Run against an isolated CDP Chromium
// profile; this intentionally replaces only that profile's QA-origin saves.
// QA_ORIGIN defaults to local dev. QA_CDP defaults to http://127.0.0.1:9455.
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
const base = process.env.QA_ORIGIN || 'http://127.0.0.1:4178'
const cardId = process.env.QA_CARD_ID || 'v4-dream-043'
const targets = await (await fetch(`${process.env.QA_CDP || 'http://127.0.0.1:9455'}/json`)).json()
const socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl)
await new Promise(r => socket.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map(), errors = [], evidence = []
socket.addEventListener('message', ({ data }) => {
  const m = JSON.parse(data)
  if (m.id) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(m.error) : p.resolve(m.result) }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params)
})
const send = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })) })
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails))
  return r.result.value
}
const delay = ms => new Promise(r => setTimeout(r, ms))
async function wait(expression) { for (let n = 0; n < 150; n++) { if (await evaluate(expression)) return; await delay(100) } throw Error(`Timeout: ${expression}`) }
const click = async selector => { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await delay(80) }
const button = async text => { await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===${JSON.stringify(text)}).click()`); await delay(80) }
const boardViews = () => evaluate(`[...document.querySelectorAll('.v2-board .dream-canvas')].map(e=>({scale:Number(e.style.getPropertyValue('--zoom')),x:e.style.getPropertyValue('--pan-x'),y:e.style.getPropertyValue('--pan-y')}))`)
async function fitted() { await wait(`document.querySelectorAll('.v2-board .dream-canvas--scrollable').length===2`); assert.deepEqual(await boardViews(), [0, 1].map(() => ({ scale: 1, x: '0%', y: '0%' }))) }
async function screenshot(name) { const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }); writeFileSync(`.validation/completion-fit/${name}.png`, Buffer.from(r.data, 'base64')) }
async function pointerPan(mobile, hold = false, selector = '.v2-board .dream-canvas') {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`)
  const r = await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width*.5,y:r.y+r.height*.5}})()`)
  if (mobile) {
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x - 30, y: r.y }, { x: r.x + 30, y: r.y }] })
    await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: r.x - 60, y: r.y + 12 }, { x: r.x + 60, y: r.y + 12 }] })
    if (!hold) await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  } else {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...r, button: 'left', clickCount: 1 })
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x + 35, y: r.y + 20, button: 'left', buttons: 1 })
    if (!hold) await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: r.x + 35, y: r.y + 20, button: 'left', clickCount: 1 })
  }
  await delay(100) // Wait for React's pointer-event state commit before assertions.
  return r
}
await send('Page.enable'); await send('Runtime.enable')
await send('Page.addScriptToEvaluateOnNewDocument', { source: `{const NativeDate=Date;const base=NativeDate.now();const fixed=new NativeDate(2026,10,5,12).getTime();globalThis.__qaOffset=0;globalThis.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[fixed+NativeDate.now()-base+globalThis.__qaOffset]))}static now(){return fixed+NativeDate.now()-base+globalThis.__qaOffset}}}` })
mkdirSync('.validation/completion-fit', { recursive: true })
try {
  for (const mobile of [false, true]) {
    await send('Emulation.setDeviceMetricsOverride', { width: mobile ? 390 : 1440, height: mobile ? 844 : 1000, deviceScaleFactor: 1, mobile })
    await send('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: 5 })
    for (const scenario of ['final-inline', 'final-viewer', 'expiry-drag', 'expiry-viewer', 'expiry-help', 'expiry-preview', 'expiry-interrupted', 'other-tab']) {
      await send('Page.navigate', { url: 'about:blank' }); await wait(`location.href==='about:blank'`)
      await send('Page.navigate', { url: base }); await wait(`!!document.querySelector('.v3-app')`)
      // A disposable real-day save exercises persistence, not the dev-only path.
      await evaluate(`localStorage.clear();localStorage.setItem('dreamerie:v2:daily-collection:v1:43',JSON.stringify({version:1,cardId:${JSON.stringify(cardId)},startedAt:Date.now(),guesses:Array.from({length:4},()=>({point:{x:.5,y:.5},elapsedSeconds:0})),pending:null}))`)
      await send('Page.navigate', { url: 'about:blank' }); await wait(`location.href==='about:blank'`)
      await send('Page.navigate', { url: base }); await wait(`!!document.querySelector('.v2-board')`)
      await click('[aria-label="Zoom in both paintings"]'); await click('[aria-label="Zoom in both paintings"]')
      await pointerPan(mobile)
      const before = await boardViews(); assert.ok(before.every(v => v.scale > 1 && (v.x !== '0%' || v.y !== '0%')), JSON.stringify(before))
      const saved = JSON.parse(await evaluate(`localStorage.getItem('dreamerie:v2:daily-collection:v1:43')`))
      if (scenario.includes('viewer')) {
        await click(scenario === 'final-viewer' ? '[aria-label="Expand The Memory"]' : '[aria-label="Expand The Dream"]'); await wait(`!!document.querySelector('dialog[open]')`)
        await click('[aria-label="Zoom in"]'); await pointerPan(mobile, false, 'dialog .dream-canvas')
      }
      if (scenario === 'expiry-help') await click('[aria-label="How to play"]')
      if (scenario === 'expiry-preview') { await click('[aria-label="Dreamerie home"]'); await click('[aria-label="Enlarge the dream preview"]') }
      let active
      if (scenario === 'expiry-drag') active = await pointerPan(mobile, true)
      if (scenario.startsWith('final')) {
        await click(scenario === 'final-viewer' ? 'dialog .dream-canvas' : '.v2-board .dream-canvas')
        await evaluate(`[...document.querySelectorAll(${JSON.stringify(scenario === 'final-viewer' ? 'dialog button' : 'button')})].find(b=>b.textContent==='Remember').click()`)
      } else if (scenario === 'other-tab') {
        await evaluate(`{const key='dreamerie:v2:daily-collection:v1:43';const s=JSON.parse(localStorage.getItem(key));s.guesses.push({point:{x:.5,y:.5},elapsedSeconds:5});localStorage.setItem(key,JSON.stringify(s));window.dispatchEvent(new StorageEvent('storage',{key,newValue:JSON.stringify(s)}))}`)
      } else {
        if (scenario === 'expiry-interrupted') await evaluate(`window.dispatchEvent(new Event('blur'))`)
        await evaluate(`globalThis.__qaOffset+=121000`)
        if (scenario === 'expiry-interrupted') await evaluate(`window.dispatchEvent(new Event('focus'));document.dispatchEvent(new Event('visibilitychange'))`)
      }
      await wait(`!!document.querySelector('#result-title')`); await fitted()
      assert.equal(await evaluate(`!!document.querySelector('dialog[open]')`), false)
      if (active) {
        if (mobile) { await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: active.x - 80, y: active.y + 20 }, { x: active.x + 80, y: active.y + 20 }] }); await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }) }
        else { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: active.x + 80, y: active.y + 40, buttons: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: active.x + 80, y: active.y + 40, button: 'left' }) }
        await fitted()
      }
      const after = JSON.parse(await evaluate(`localStorage.getItem('dreamerie:v2:daily-collection:v1:43')`))
      assert.equal(after.startedAt, saved.startedAt); assert.deepEqual(after.guesses.slice(0, 4), saved.guesses)
      assert.equal(after.guesses.length, scenario.startsWith('final') || scenario === 'other-tab' ? 5 : 4)
      if (scenario === 'final-inline' || scenario === 'expiry-viewer') await screenshot(`${mobile ? 'touch' : 'desktop'}-${scenario}`)
      // Subsequent result updates, zoom/pan, marker toggles and viewer closure
      // must not reapply the automatic Fit.
      if (mobile) { await pointerPan(true); assert.ok((await boardViews()).every(v => v.scale > 1)) }
      else await click('[aria-label="Zoom in both paintings"]')
      await pointerPan(mobile)
      const inspected = await boardViews()
      await button('Hide markers'); await delay(700); assert.deepEqual(await boardViews(), inspected)
      await click('[aria-label="Expand The Dream"]'); await click('[aria-label="Close image viewer"]'); assert.deepEqual(await boardViews(), inspected)
      await button('Fit'); await fitted()
      if (mobile && scenario === 'final-inline') {
        await evaluate(`window.scrollTo(0,0)`)
        const r = await evaluate(`(()=>{const r=document.querySelector('.v2-board .dream-canvas').getBoundingClientRect();return {x:r.x+r.width*.5,y:r.y+r.height*.7}})()`)
        await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [r] })
        for (let n = 1; n <= 5; n++) { await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x:r.x, y:r.y-n*20 }] }); await delay(30) }
        await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
        await wait(`window.scrollY>20`); await fitted()
      }
      evidence.push({ mobile, scenario, fitted: true, savedGuesses: after.guesses.length, deadlinePreserved: true, laterInspectionPreserved: true })
      console.log(`PASS ${mobile ? 'touch' : 'desktop'} ${scenario}`)
    }
  }
  assert.deepEqual(errors, [])
  writeFileSync('.validation/completion-fit/browser-qa.json', JSON.stringify({ base, cardId, evidence, errors }, null, 2))
} finally { socket.close() }
