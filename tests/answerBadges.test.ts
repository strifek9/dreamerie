import assert from 'node:assert/strict'
import test from 'node:test'
import { placeAnswerBadges, type ScreenRect } from '../src/game/answerBadges.ts'
const frame:ScreenRect={left:10,top:20,width:320,height:180}
const target=(id:string,x:number,y:number)=>({id,box:{left:x,top:y,width:.02,height:.02}})
const inside=(outer:ScreenRect,inner:ScreenRect)=>inner.left>=outer.left&&inner.top>=outer.top&&inner.left+inner.width<=outer.left+outer.width&&inner.top+inner.height<=outer.top+outer.height
test('all four edges and corners retain complete numbered circles',()=>{
  const ds=[[0,0],[.49,0],[.98,0],[0,.49],[.98,.49],[0,.98],[.49,.98],[.98,.98]].map(([x,y],i)=>target(String(i),x,y))
  const before=JSON.stringify(ds),placed=placeAnswerBadges(ds,frame,frame)
  assert.equal(placed.length,8);assert.ok(placed.every(p=>inside(frame,p.badge)));assert.equal(JSON.stringify(ds),before)
  assert.equal(placed[0].box.left,frame.left);assert.equal(placed[0].box.top,frame.top)
})
test('zoomed partial clues keep labels inside the viewport and hide wholly offscreen clues',()=>{
  const art={left:-200,top:-100,width:960,height:540},clip={left:0,top:0,width:320,height:180}
  const ds=[target('partial',.2,.19),target('offscreen',.9,.9)]
  const placed=placeAnswerBadges(ds,art,clip,3)
  assert.deepEqual(placed.map(p=>p.id),['partial']);assert.ok(inside(clip,placed[0].badge))
  assert.equal(placed[0].box.left,-8)
})
test('nearby clue labels choose distinct slots and retain anchors on the true visible box',()=>{
  const placed=placeAnswerBadges([target('a',.49,.02),target('b',.5,.04)],frame,frame)
  const [a,b]=placed.map(p=>p.badge)
  assert.ok(a.left+a.width<=b.left||b.left+b.width<=a.left||a.top+a.height<=b.top||b.top+b.height<=a.top)
  for(const p of placed){assert.ok(p.anchor.x>=p.box.left&&p.anchor.x<=p.box.left+p.box.width);assert.ok(p.anchor.y>=p.box.top&&p.anchor.y<=p.box.top+p.box.height)}
})
test('ordinary labels keep their above-clue position; unusable geometry fails closed',()=>{
  const p=placeAnswerBadges([target('a',.4,.5)],frame,frame)[0]
  assert.equal(p.moved,false);assert.equal(p.badge.left,p.box.left);assert.equal(p.badge.top,p.box.top-23)
  assert.deepEqual(placeAnswerBadges([target('a',.4,.5)],frame,{...frame,width:10}),[])
  assert.deepEqual(placeAnswerBadges([],frame,frame,NaN),[])
})
