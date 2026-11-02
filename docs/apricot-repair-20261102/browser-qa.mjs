import {writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
const targets=await(await fetch('http://127.0.0.1:9447/json')).json()
const target=targets.find(t=>t.type==='page')
const socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}))
let id=0;const pending=new Map();const errors=[]
socket.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params)})
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
const delay=ms=>new Promise(r=>setTimeout(r,ms))
async function wait(expression){for(let n=0;n<100;n++){if(await evaluate(expression))return;await delay(100)}throw Error('Timeout: '+expression)}
await send('Page.enable');await send('Runtime.enable')
await send('Page.addScriptToEvaluateOnNewDocument',{source:`{const NativeDate=Date;const base=NativeDate.now();const fixed=new NativeDate(2026,10,1,12).getTime();globalThis.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[fixed+NativeDate.now()-base]))}static now(){return fixed+NativeDate.now()-base}}}`})
const base=process.env.QA_ORIGIN||'http://127.0.0.1:4177'
const evidence=[]
async function clickButton(text){await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===${JSON.stringify(text)});if(!b)throw Error('Missing button');b.scrollIntoView({block:'center'});b.click()})()`);await delay(100)}
async function tap(point,touch=false){const p=await evaluate(`(()=>{const s=document.querySelectorAll('.v2-board .dream-image')[1];const r=s.getBoundingClientRect();return {x:r.x+r.width*${point[0]}/1672,y:r.y+r.height*${point[1]}/941}})()`);if(touch){await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:p.x,y:p.y,radiusX:2,radiusY:2}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}else {await send('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x,y:p.y,button:'left',clickCount:1})}await delay(150)}
for(const mobile of [false,true]){
 await send('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:mobile?844:1000,deviceScaleFactor:mobile?2:1,mobile})
 await send('Emulation.setTouchEmulationEnabled',{enabled:mobile,maxTouchPoints:5})
 await send('Page.navigate',{url:base});await wait("!!document.querySelector('.v3-app')")
 await evaluate("localStorage.clear()");await send('Page.reload');await wait("[...document.querySelectorAll('button')].some(b=>b.textContent==='Start'&&!b.disabled)")
 assert.equal(await evaluate("document.querySelector('.eyebrow').textContent"),'The Apricot Airship')
 await clickButton('Start');await wait("!!document.querySelector('.v2-board')")
 // Actual taps travel through the production canvas coordinate path.
 const points=[[794,110],[479,713],[330,323],[1421,774],[530,536]]
 for(const point of points){if(point===points.at(-1)){await evaluate("document.querySelector('[aria-label=\"Zoom in both paintings\"]').click()");await wait("document.querySelector('.dream-canvas').style.getPropertyValue('--zoom')==='1.4'")}await evaluate("document.querySelectorAll('.dream-canvas')[1].scrollIntoView({block:'center'})");await delay(100);await tap(point,mobile);await clickButton('Remember')}
 await wait("!!document.querySelector('#result-title')")
 assert.match(await evaluate("document.querySelector('#result-title').textContent"),/^4\/5/)
 const saved=await evaluate("localStorage.getItem('dreamerie:v2:daily-collection:v1:39')")
 assert.equal(JSON.parse(saved).cardId,'v4-fairness-dream-039-v1')
 await clickButton('Fit');await clickButton('Hide markers');await evaluate("document.querySelector('.v2-board').scrollIntoView({block:'center'})");await delay(100)
 const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});writeFileSync(`.validation/apricot-${mobile?'phone':'desktop'}.png`,Buffer.from(screenshot.data,'base64'))
 // Zoom controls and image expansion keep working on the result.
 await evaluate("document.querySelector('[aria-label=\"Zoom in both paintings\"]').click()")
 await wait("document.querySelector('.dream-canvas').style.getPropertyValue('--zoom')==='1.4'")
 await clickButton('Fit');await evaluate("document.querySelector('[aria-label=\"Expand The Memory\"]').click()")
 await wait("!!document.querySelector('dialog[open]')")
 await evaluate("document.querySelector('[aria-label=\"Close image viewer\"]').click()")
 await send('Page.reload');await wait("!!document.querySelector('#result-title') || [...document.querySelectorAll('button')].some(b=>b.textContent==='View result')");if(await evaluate("!document.querySelector('#result-title')"))await clickButton('View result');assert.match(await evaluate("document.querySelector('#result-title').textContent"),/^4\/5/)
 // Replaying a historical record must preserve the player's existing perfect result.
 const old=JSON.parse(saved);old.cardId='v4-dream-039'
 await evaluate(`localStorage.setItem('dreamerie:v2:daily-collection:v1:39',${JSON.stringify(JSON.stringify(old))})`)
 await send('Page.reload');await wait("!!document.querySelector('#result-title') || [...document.querySelectorAll('button')].some(b=>b.textContent==='View result')");if(await evaluate("!document.querySelector('#result-title')"))await clickButton('View result');assert.match(await evaluate("document.querySelector('#result-title').textContent"),/^5\/5/)
 evidence.push({mobile,fresh:'4/5',retained:'5/5',reload:true,zoom:true,expanded:true,cardId:JSON.parse(saved).cardId})
}
assert.equal(errors.length,0,JSON.stringify(errors))
writeFileSync('.validation/apricot-browser-qa.json',JSON.stringify({base,evidence,errors},null,2));console.log(JSON.stringify({base,evidence,errors}));socket.close()
