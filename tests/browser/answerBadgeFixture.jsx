// Local Vite-only browser fixture; never imported by the application build.
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DreamCanvas, DreamViewer } from '../../src/components/InspectableDream'
import { AnswerOverlays } from '../../src/v3/AnswerOverlays'
import { RESTING_VIEW, zoomAt } from '../../src/game/imageInspection'
const points=[[0,0],[.49,0],[.98,0],[0,.49],[.98,.49],[0,.98],[.49,.98],[.98,.98],[.49,.03],[.51,.05]]
const reveals=points.map(([x,y],i)=>({number:i+1,found:i%2===0,difference:{id:`edge-${i+1}`,label:`Edge ${i+1}`,difficulty:'Easy',x:x+.01,y:y+.01,radius:.01,box:{left:x,top:y,width:.02,height:.02}}}))
const art=<><svg className="dream-image" viewBox="0 0 1672 941"><rect width="1672" height="941" fill="#334659"/>{points.map(([x,y],i)=><rect key={i} x={x*1672} y={y*941} width="33.44" height="18.82" fill={i%2?'#d18c97':'#96c9a8'}/>)}</svg><AnswerOverlays reveals={reveals}/></>
function Fixture(){
 const [view,setView]=useState(RESTING_VIEW),[viewer,setViewer]=useState(false)
 return <main id="badge-fixture" className="v2-app v3-app" style={{padding:'8px',maxWidth:'none'}}>
  <div><button onClick={()=>setView(RESTING_VIEW)}>Fixture fit</button><button onClick={()=>setView(zoomAt(view,Math.min(4,view.scale*2),{x:.5,y:.5}))}>Fixture zoom</button><button onClick={()=>setView({...view,x:.15,y:.1})}>Fixture pan</button><button onClick={()=>setViewer(true)}>Fixture viewer</button></div>
  <section className="v2-board" style={{width:'min(750px, 100%)',margin:'30px auto'}}><DreamCanvas label="Badge test artwork" view={view} onView={setView} scrollWhenFitted>{art}</DreamCanvas></section>
  {viewer&&<DreamViewer title="Badge test viewer" fitAspectRatio={1672/941} onClose={()=>setViewer(false)}>{art}</DreamViewer>}
 </main>
}
export function mount(){document.querySelector('#root').style.display='none';const host=document.createElement('div');document.body.append(host);createRoot(host).render(<Fixture/>)}
