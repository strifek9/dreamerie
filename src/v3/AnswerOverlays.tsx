import { useLayoutEffect, useRef, useState } from 'react'
import type { getAnswerReveals } from '../game/dailyRecall'
import { placeAnswerBadges, type BadgePlacement } from '../game/answerBadges'

export function AnswerOverlays({ reveals }: { reveals: ReturnType<typeof getAnswerReveals> }) {
  const root=useRef<HTMLSpanElement>(null)
  const [layout,setLayout]=useState<{scale:number;placements:BadgePlacement[]}>({scale:1,placements:[]})
  // Session ticks recreate reveal arrays. Only geometry/identity changes need
  // new observers; canvas style mutations cover the viewer's independent zoom.
  const signature=JSON.stringify(reveals.map(r=>[r.difference.id,r.difference.box,r.number,r.found]))
  useLayoutEffect(()=>{
    const element=root.current,canvas=element?.closest('.dream-canvas')
    if(!element||!canvas)return
    let frame=0
    const measure=()=>{
      if(!element.isConnected)return
      const art=element.getBoundingClientRect(),clip=canvas.getBoundingClientRect()
      if(!element.offsetWidth||!art.width)return
      const scale=art.width/element.offsetWidth
      const placements=placeAnswerBadges(reveals.map(r=>({id:r.difference.id,box:r.difference.box})),art,clip,scale)
      const next={scale,placements}
      setLayout(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next)
    }
    const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)}
    const resize=new ResizeObserver(schedule);resize.observe(element);resize.observe(canvas)
    const transform=new MutationObserver(schedule);transform.observe(canvas,{attributes:true,attributeFilter:['style']})
    measure()
    return()=>{cancelAnimationFrame(frame);resize.disconnect();transform.disconnect()}
  },[signature])
  return <span ref={root} className="answer-overlays" aria-hidden="true">
    {reveals.map(({difference:d,number,found})=>{
      const placement=layout.placements.find(p=>p.id===d.id),scale=layout.scale
      const cx=placement?placement.badge.left+placement.badge.width/2:0,cy=placement?placement.badge.top+placement.badge.height/2:0
      const dx=placement?cx-placement.anchor.x:0,dy=placement?cy-placement.anchor.y:0
      return <span key={d.id} className={`answer-outline ${found?'answer-found':''}`} data-answer-id={d.id} style={{left:`${d.box.left*100}%`,top:`${d.box.top*100}%`,width:`${d.box.width*100}%`,height:`${d.box.height*100}%`}}>
        {placement?.moved&&Math.hypot(dx,dy)>1&&<i className="answer-badge-leader" style={{left:(placement.anchor.x-placement.box.left)/scale,top:(placement.anchor.y-placement.box.top)/scale,width:Math.hypot(dx,dy)/scale,transform:`rotate(${Math.atan2(dy,dx)}rad)`}}/>}
        <span className="answer-badge" style={{visibility:placement?'visible':'hidden',bottom:'auto',left:placement?(placement.badge.left-placement.box.left)/scale:0,top:placement?(placement.badge.top-placement.box.top)/scale:0}}>{number}</span>
      </span>
    })}
  </span>
}
