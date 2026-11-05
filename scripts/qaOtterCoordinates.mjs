// Landmark mapping QA, separate from scoring/tolerance tests. Isolated CDP only.
import {writeFileSync,mkdirSync} from 'node:fs';import assert from 'node:assert/strict'
const targets=await(await fetch('http://127.0.0.1:9455/json')).json();const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}});const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};const delay=ms=>new Promise(r=>setTimeout(r,ms));async function wait(s){for(let i=0;i<100;i++){if(await ev(s))return;await delay(100)}throw Error(s)}
const base=process.env.QA_ORIGIN||'http://127.0.0.1:4181',key='dreamerie:v2:daily-collection:v1:43',records=[]
await send('Page.enable');await send('Page.addScriptToEvaluateOnNewDocument',{source:`{const N=Date,b=N.now(),f=new N(2026,10,5,12).getTime();globalThis.Date=class extends N{constructor(...a){super(...(a.length?a:[f+N.now()-b]))}static now(){return f+N.now()-b}}}`})
async function nav(){await send('Page.navigate',{url:'about:blank'});await wait(`location.href==='about:blank'`);await send('Page.navigate',{url:base});await wait(`!!document.querySelector('.v3-app')`)}
async function size(mobile,landscape=false){await send('Emulation.setDeviceMetricsOverride',{width:mobile?(landscape?844:390):(landscape?1000:1440),height:mobile?(landscape?390:844):(landscape?1440:1000),deviceScaleFactor:1,mobile});await delay(200)}
async function gesture(p,mobile,dx=0){if(mobile){await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});if(dx)await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x+dx,y:p.y}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}else{await send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});if(dx)await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x+dx,y:p.y,buttons:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x+dx,y:p.y,button:'left',clickCount:1})}await delay(150)}
try{for(const mobile of [false,true]){
await size(mobile);await send('Emulation.setTouchEmulationEnabled',{enabled:mobile,maxTouchPoints:5});await nav();await ev(`localStorage.clear();localStorage.setItem(${JSON.stringify(key)},JSON.stringify({version:1,cardId:'v4-fairness-dream-043-v1',startedAt:Date.now(),guesses:[],pending:null}))`);await nav();await wait(`!!document.querySelector('.v2-board')`)
for(const landmark of [{name:'bucket-emblem',x:827,y:533},{name:'cup-emblem',x:1543,y:545}]){
await size(mobile);await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Fit').click()`);await delay(150)
for(const stage of ['fit','zoom-pan','orientation','scroll']){
 if(stage==='zoom-pan'){
  await ev(`document.querySelector('[aria-label="Zoom in both paintings"]').click()`);await delay(150);await ev(`document.querySelectorAll('.v2-board .dream-canvas')[1].scrollIntoView({block:'center'})`);const p=await ev(`(()=>{const r=document.querySelectorAll('.v2-board .dream-canvas')[1].getBoundingClientRect();return {x:r.x+r.width*.5,y:r.y+r.height*.5}})()`);await gesture(p,mobile,-12)
 }
 if(stage==='orientation')await size(mobile,true)
 if(stage==='scroll'){await size(mobile);await ev(`window.scrollTo(0,150)`)}
 await ev(`document.querySelectorAll('.v2-board .dream-canvas')[1].scrollIntoView({block:'center'})`);await delay(100)
 const p=await ev(`(()=>{const r=document.querySelectorAll('.v2-board .dream-image')[1].getBoundingClientRect();const c=document.querySelectorAll('.v2-board .dream-canvas')[1].getBoundingClientRect();const p={x:r.x+r.width*${landmark.x}/1672,y:r.y+r.height*${landmark.y}/941};return {...p,visible:p.x>=c.left&&p.x<=c.right&&p.y>=c.top&&p.y<=c.bottom}})()`);assert.equal(p.visible,true,`${landmark.name} ${stage} outside clipped viewport`);await gesture({x:p.x,y:p.y},mobile)
 const saved=await ev(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`),actual={x:saved.pending.point.x*1672,y:saved.pending.point.y*941}
 assert.ok(Math.abs(actual.x-landmark.x)<=6&&Math.abs(actual.y-landmark.y)<=6,JSON.stringify({mobile,stage,landmark,actual}));assert.equal(saved.guesses.length,0);records.push({mobile,stage,landmark:landmark.name,expected:{x:landmark.x,y:landmark.y},actual,toleranceNativePixels:6,confirmed:0})
}
}
}mkdirSync('.validation/otter-scoring',{recursive:true});writeFileSync('.validation/otter-scoring/coordinate-mapping.json',JSON.stringify({browser:'Chromium desktop and touch emulation',physicalSafari:false,records},null,2));console.log(`PASS ${records.length} landmark mapping checks`)
}finally{ws.close()}
