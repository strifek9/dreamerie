import assert from 'node:assert/strict'
import test from 'node:test'
import { dreamForDate, playableDreams } from '../src/v3/dailyDream.ts'
import { differencesFor } from '../src/v2/landscapeCollection.ts'
import { findDifference } from '../src/game/dailyRecall.ts'
import { parseSession, sessionSnapshot } from '../src/game/dailySession.ts'

test('Apricot fresh rounds reject mouse taps while retaining star edge allowance and repeat rules', () => {
  const card = dreamForDate(new Date(2026, 10, 1, 12))
  assert.equal(card.id, 'v4-fairness-dream-039-v1')
  const differences = differencesFor(card)
  for (const [x, y] of [[530,536],[511,551],[565,515],[568,565]]) {
    assert.equal(findDifference({ x:x/1672,y:y/941 }, [], differences), undefined)
  }
  for (const [x,y] of [[517,617],[474,577],[560,658],[466,617],[568,617]]) {
    assert.equal(findDifference({x:x/1672,y:y/941}, [], differences)?.id, 'star')
  }
  assert.equal(findDifference({x:517/1672,y:617/941}, ['star'], differences), undefined)
})

test('Apricot replay preserves published 5/5 and pending rounds; fresh mouse guess finishes 4/5', () => {
  const date = new Date(2026,10,1,12)
  const old=playableDreams.find(card=>card.id==='v4-dream-039')!
  const fresh=dreamForDate(date)
  for (const card of [old,fresh]) {
    const ds=differencesFor(card)
    const guesses=ds.filter(d=>d.id!=='star').map((d,i)=>({point:{x:d.x,y:d.y},elapsedSeconds:i+1}))
    guesses.push({point:{x:530/1672,y:536/941},elapsedSeconds:5})
    const raw=JSON.stringify({version:1,cardId:card.id,startedAt:1000,guesses,pending:null})
    const restored=dreamForDate(date,raw)
    assert.equal(restored.id,card.id)
    assert.equal(sessionSnapshot(parseSession(raw,card.id),differencesFor(restored),6000).result?.accuracy,card===old?5:4)
    const pending=JSON.stringify({version:1,cardId:card.id,startedAt:1000,guesses:guesses.slice(0,2),pending:{point:{x:0.3,y:0.5},side:'changed'}})
    assert.equal(dreamForDate(date,pending).id,card.id)
    assert.equal(parseSession(pending,card.id)?.startedAt,1000)
  }
})
