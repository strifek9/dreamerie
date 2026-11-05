// Isolated CDP browser only. Replaces QA-origin saves in that disposable profile.
import {writeFileSync,mkdirSync} from 'node:fs'
import assert from 'node:assert/strict'
const targets=await(await fetch(process.env.QA_CDP||'http://127.0.0.1:9455/json')).json()
const socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl)
await new Promise(r=>socket.addEventListener('open',r,{once:true}))
let id=0;const pending=new Map(),errors=[],evidence=[]
socket.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params)})
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
const delay=ms=>new Promise(r=>setTimeout(r,ms))
async function wait(expression){for(let n=0;n<150;n++){if(await evaluate(expression))return;await delay(100)}throw Error('Timeout: '+expression)}
await send('Page.enable');await send('Runtime.enable')
await send('Page.addScriptToEvaluateOnNewDocument',{source:`{const NativeDate=Date;const base=NativeDate.now();const fixed=new NativeDate(2026,10,5,12).getTime();globalThis.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[fixed+NativeDate.now()-base]))}static now(){return fixed+NativeDate.now()-base}}}`})
const base=process.env.QA_ORIGIN||'http://127.0.0.1:4181'
const key='dreamerie:v2:daily-collection:v1:43'
async function navigate(){await send('Page.navigate',{url:'about:blank'});await wait(`location.href==='about:blank'`);await send('Page.navigate',{url:base});await wait(`!!document.querySelector('.v3-app')`)}
async function button(text){await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===${JSON.stringify(text)});if(!b)throw Error('Missing button');b.scrollIntoView({block:'center'});b.click()})()`);await delay(100)}
async function tap(point,mobile){await evaluate(`document.querySelectorAll('.v2-board .dream-canvas')[1].scrollIntoView({block:'center'})`);await delay(80);const p=await evaluate(`(()=>{const r=document.querySelectorAll('.v2-board .dream-image')[1].getBoundingClientRect();return {x:r.x+r.width*${point[0]}/1672,y:r.y+r.height*${point[1]}/941}})()`);if(mobile){await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}else{await send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1})}await delay(150)}
mkdirSync('.validation/otter-scoring',{recursive:true})
try{
for(const mobile of [false,true])for(const round of ['fresh-negatives','historical','fresh-positives']){
 const historical=round==='historical',positives=round==='fresh-positives',expected=historical||positives?5:3
 await send('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:mobile?844:1000,deviceScaleFactor:1,mobile});await send('Emulation.setTouchEmulationEnabled',{enabled:mobile,maxTouchPoints:5})
 await navigate();await evaluate('localStorage.clear()')
 if(historical)await evaluate(`localStorage.setItem(${JSON.stringify(key)},JSON.stringify({version:1,cardId:'v4-dream-043',startedAt:Date.now(),guesses:[],pending:{point:{x:.5,y:.5},side:'changed'}}))`)
 await navigate();if(!historical){await wait(`[...document.querySelectorAll('button')].some(b=>b.textContent==='Start'&&!b.disabled)`);await button('Start')}
 await wait(`!!document.querySelector('.v2-board')`)
 const initial=JSON.parse(await evaluate(`localStorage.getItem(${JSON.stringify(key)})`))
 assert.equal(initial.cardId,historical?'v4-dream-043':'v4-fairness-dream-043-v1')
 const points=positives?[[1543,545],[827,533],[1469,499],[535,661],[1391,47]]:[[1600,500],[850,610],[1469,499],[535,661],[1391,47]]
 for(let i=0;i<points.length;i++){
  await tap(points[i],mobile)
  if(i===points.length-1){await evaluate(`document.querySelector('[aria-label="Zoom in both paintings"]').click()`);await wait(`Number(document.querySelector('.v2-board .dream-canvas').style.getPropertyValue('--zoom'))>1`)}
  await button('Remember')
 }
 await wait(`!!document.querySelector('#result-title')`)
 assert.match(await evaluate(`document.querySelector('#result-title').textContent`),new RegExp(`^${expected}/5`))
 assert.equal(await evaluate(`[...document.querySelectorAll('.v2-board .dream-canvas')].every(e=>e.style.getPropertyValue('--zoom')==='1'&&e.style.getPropertyValue('--pan-x')==='0%'&&e.style.getPropertyValue('--pan-y')==='0%')`),true)
 const saved=JSON.parse(await evaluate(`localStorage.getItem(${JSON.stringify(key)})`));assert.equal(saved.startedAt,initial.startedAt);assert.equal(saved.guesses.length,5)
 const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});writeFileSync(`.validation/otter-scoring/${mobile?'touch':'desktop'}-${round}.png`,Buffer.from(screenshot.data,'base64'))
 await navigate();if(await evaluate(`!document.querySelector('#result-title')`))await button('View result')
 assert.match(await evaluate(`document.querySelector('#result-title').textContent`),new RegExp(`^${expected}/5`))
 assert.deepEqual(JSON.parse(await evaluate(`localStorage.getItem(${JSON.stringify(key)})`)),saved)
 evidence.push({mobile,historical,positives,cardId:saved.cardId,accuracy:expected,confirmed:5,reloadPreserved:true,startedAtPreserved:true,completionFit:true});console.log(`PASS ${mobile?'touch':'desktop'} ${round} ${expected}/5`)
}
assert.deepEqual(errors,[]);writeFileSync('.validation/otter-scoring/browser-qa.json',JSON.stringify({base,evidence,errors},null,2))
}finally{socket.close()}
