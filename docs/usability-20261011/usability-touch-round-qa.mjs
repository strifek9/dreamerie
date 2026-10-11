import {currentDreams,dreamForDate} from 'file:///D:/Dreamerie/src/v3/dailyDream.ts';
import assert from 'node:assert/strict';
import {v4PreviewDreams} from 'file:///D:/Dreamerie/src/v4/previewDreams.ts';
const origin='http://127.0.0.1:5180';
const info=await(await fetch('http://127.0.0.1:9336/json/version')).json();const browserSocket=new WebSocket(info.webSocketDebuggerUrl);await new Promise(r=>browserSocket.addEventListener('open',r,{once:true}));let bn=0;const bj=new Map();browserSocket.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const j=bj.get(m.id);bj.delete(m.id);m.error?j.reject(m.error):j.resolve(m.result)}});const bs=(method,params={})=>new Promise((resolve,reject)=>{const id=++bn;bj.set(id,{resolve,reject});browserSocket.send(JSON.stringify({id,method,params}))});const{browserContextId}=await bs('Target.createBrowserContext');const{targetId}=await bs('Target.createTarget',{url:'about:blank',browserContextId});const target=(await(await fetch('http://127.0.0.1:9336/json')).json()).find(t=>t.id===targetId);const socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}));let n=0;const jobs=new Map(),errors=[];socket.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params);if(m.id){const j=jobs.get(m.id);jobs.delete(m.id);m.error?j.reject(m.error):j.resolve(m.result)}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++n;jobs.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value};const pause=ms=>new Promise(r=>setTimeout(r,ms));const waitFor=async expression=>{for(let i=0;i<100;i++){if(await ev(`Boolean(${expression})`))return;await pause(100)}throw Error('Timed out: '+expression)};const click=async s=>{await ev(`document.querySelector(${JSON.stringify(s)}).focus();document.querySelector(${JSON.stringify(s)}).click()`);await pause(80)};
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});await send('Emulation.setTouchEmulationEnabled',{enabled:true});



const {writeFileSync}=await import('node:fs');
const {publishedDreams}=await import('file:///D:/Dreamerie/src/v3/dailyDream.ts');
const {landscapeDay}=await import('file:///D:/Dreamerie/src/v2/landscapeCollection.ts');
const at=new Date(2026,9,11,12).getTime();
await send('Page.addScriptToEvaluateOnNewDocument',{source:`(()=>{const R=Date,base=R.now();window.__qaAt=${at};window.Date=class extends R{constructor(...a){super(...(a.length?a:[window.__qaAt+R.now()-base]))}static now(){return window.__qaAt+R.now()-base}}})()`});
const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});writeFileSync(name,Buffer.from(r.data,'base64'))};
const touch=async(x,y)=>{await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pause(100)};
const key=async(key,modifiers=0)=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:({Escape:27,ArrowLeft:37,ArrowRight:39,ArrowUp:38,ArrowDown:40})[key]??0,modifiers});await send('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:({Escape:27,ArrowLeft:37,ArrowRight:39,ArrowUp:38,ArrowDown:40})[key]??0,modifiers});await pause(100)};
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await send('Page.navigate',{url:origin+'/'});await waitFor(`document.querySelector('.v2-start button') && !document.querySelector('.v2-start button').disabled`);await click('.v2-start button');await waitFor(`document.querySelector('.v2-status')`);await click('.v3-expand-pair');await waitFor(`document.querySelector('.v3-comparison[open]')`);
const card=dreamForDate(new Date(at));
const edits=[...card.edits].sort((a,b)=>Math.hypot(a.box.left+a.box.width/2-.5,a.box.top+a.box.height/2-.5)-Math.hypot(b.box.left+b.box.width/2-.5,b.box.top+b.box.height/2-.5));
for(let i=0;i<5;i++){
 const edit=edits[i];const point={x:edit.box.left+edit.box.width/2,y:edit.box.top+edit.box.height/2};
 if(i===0)await click('.v3-comparison [aria-label="Zoom in both paintings"]');
 const p=await ev(`(()=>{const r=document.querySelector('.v3-comparison [data-side="changed"] svg').getBoundingClientRect();return{x:r.x+r.width*${point.x},y:r.y+r.height*${point.y}}})()`);await touch(p.x,p.y);await waitFor(`document.querySelector('.v3-comparison .dream-marker--pending')`);await click('.v3-comparison .primary-action');
 if(i===0)await ev(`Array.from(document.querySelectorAll('.v3-comparison .v2-zoom button')).find(e=>e.textContent==='Fit').click()`);
 if(i<4)assert.ok(await ev(`document.querySelector('.v3-comparison header').innerText.includes('${4-i} ${i===3?'guess':'guesses'} left')`));
}
await waitFor(`document.querySelector('.v2-result')`);assert.ok(await ev(`document.querySelector('.v2-result').innerText.includes('5/5')`));assert.equal(await ev(`document.querySelectorAll('dialog[open]').length`),0);assert.ok(await ev(`document.activeElement.id==='result-title'`));await send('Page.reload');await waitFor(`document.querySelector('.v2-result')`);assert.ok(await ev(`document.querySelector('.v2-result').innerText.includes('5/5')`));assert.ok(!await ev(`document.querySelector('.v2-start')`));console.log('PASS5 actual changed-region touches in expanded pair, including zoomed hit, five-lock cap, automatic close/result focus, completed reload');
assert.deepEqual(errors,[]);socket.close();await bs('Target.disposeBrowserContext',{browserContextId});browserSocket.close();
