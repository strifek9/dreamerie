import assert from 'node:assert/strict'
import test from 'node:test'
import { dreamForDate, playableDreams } from '../src/v3/dailyDream.ts'
import { differencesFor } from '../src/v2/landscapeCollection.ts'
import { findDifference } from '../src/game/dailyRecall.ts'
import { parseSession, sessionSnapshot } from '../src/game/dailySession.ts'
const date = new Date(2026,10,5,12)
const old = playableDreams.find(c=>c.id==='v4-dream-043')!
const fresh = dreamForDate(date)
const point = (x:number,y:number)=>({x:x/1672,y:y/941})

test('Otter fresh version rejects unchanged basket and peel while old scoring is retained',()=>{
  assert.equal(fresh.id,'v4-fairness-dream-043-v1')
  for(const [x,y,id] of [[1600,500,'change-3'],[850,610,'change-2']] as const){
    assert.equal(findDifference(point(x,y),[],differencesFor(old))?.id,id)
    assert.equal(findDifference(point(x,y),[],differencesFor(fresh)),undefined)
  }
  for(const d of differencesFor(fresh))assert.equal(findDifference({x:d.x,y:d.y},[],differencesFor(fresh))?.id,d.id)
})
test('Otter emblem rectangles preserve a native eight-pixel edge allowance and duplicate lock behavior',()=>{
  const ds=differencesFor(fresh)
  for(const id of ['change-2','change-3']){
    const d=ds.find(d=>d.id===id)!, b=d.box
    const x=(b.left+b.width)*1672,y=(b.top+b.height/2)*941
    assert.equal(findDifference(point(x+8,y),[],ds)?.id,id)
    assert.equal(findDifference(point(x+9,y),[],ds),undefined)
    assert.equal(findDifference({x:d.x,y:d.y},[id],ds),undefined)
  }
})
test('Otter correction changes only two tolerances and its versioned identity',()=>{
  const expected={...old,id:fresh.id,edits:old.edits.map(e=>['change-2','change-3'].includes(e.id)?{...e,guessRadius:8/1672}:e)}
  assert.deepEqual(fresh,expected)
  assert.equal(old.edits.find(e=>e.id==='change-2')!.guessRadius,undefined)
  assert.equal(old.edits.find(e=>e.id==='change-3')!.guessRadius,undefined)
})
test('Otter historical result/pending saves keep their ID, score and start; fresh result scores 3/5',()=>{
  const legitimate=differencesFor(old).filter(d=>!['change-2','change-3'].includes(d.id)).map((d,i)=>({point:{x:d.x,y:d.y},elapsedSeconds:i+1}))
  const guesses=[...legitimate,{point:point(1600,500),elapsedSeconds:4},{point:point(850,610),elapsedSeconds:5}]
  for(const card of [old,fresh]){
    const raw=JSON.stringify({version:1,cardId:card.id,startedAt:1000,guesses,pending:null})
    const restored=dreamForDate(date,raw)
    assert.equal(restored.id,card.id)
    assert.equal(sessionSnapshot(parseSession(raw,card.id),differencesFor(restored),6000).result?.accuracy,card===old?5:3)
    const pending=JSON.stringify({version:1,cardId:card.id,startedAt:1000,guesses:guesses.slice(0,2),pending:{point:point(850,610),side:'changed'}})
    assert.equal(dreamForDate(date,pending).id,card.id)
    assert.equal(parseSession(pending,card.id)!.startedAt,1000)
    assert.equal(sessionSnapshot(parseSession(pending,card.id),differencesFor(restored),121000).result?.reason,'time')
  }
})
