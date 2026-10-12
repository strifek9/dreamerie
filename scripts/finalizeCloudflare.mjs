import { copyFileSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { playableDreams, currentDreams, dreamForDate } from '../src/v3/dailyDream.ts'
import { artworkSources } from '../src/v3/artworkDelivery.ts'
const pages=process.argv.includes('--pages')
const root=resolve(import.meta.dirname,'..'), out=resolve(root,pages?'.validation/pages-dist':'.validation/cloudflare-dist')
const manifest=JSON.parse(readFileSync(resolve(root,'.validation/cloudflare-assets.json'),'utf8'))
const mapping=new Map(manifest.files.map(f=>[f.source,f]))
for(const dream of playableDreams) for(const source of artworkSources(dream)) if(!mapping.has(source)) throw Error('Missing saved artwork '+dream.id)
for(let year=2026;year<=2046;year++)for(let day=1;day<=366;day++)for(const source of artworkSources(dreamForDate(new Date(year,0,day,12))))if(!mapping.has(source))throw Error('Missing calendar artwork')
mkdirSync(resolve(out,'art'),{recursive:true})
for(const f of new Map(manifest.files.map(f=>[f.target,f])).values()) {
 const src=resolve(root,'.validation/cloudflare-art',f.target.split('/').at(-1)),data=readFileSync(src)
 if(createHash('sha256').update(data).digest('hex')!==f.sha256)throw Error('Artifact hash mismatch')
 copyFileSync(src,resolve(out,f.target.slice(1)))
}
copyFileSync(resolve(root,'public/dreamerie-mark.svg'),resolve(out,'dreamerie-mark.svg'))
writeFileSync(resolve(out,'_headers'),'/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/art/*\n  Cache-Control: public, max-age=31536000, immutable\n/progress\n  Cache-Control: no-store\n  Referrer-Policy: no-referrer\n/progress.html\n  Cache-Control: no-store\n  Referrer-Policy: no-referrer\n')
if(pages)writeFileSync(resolve(out,'404.html'),'<!doctype html><html lang="en"><meta charset="UTF-8"><title>Dreamerie</title><p>This dream could not be found.</p><a href="/">Return to Dreamerie</a></html>')
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(resolve(d,e.name)):[resolve(d,e.name)])
const files=walk(out);if(files.length>20000||files.some(f=>statSync(f).size>25*1024*1024))throw Error('Free static asset limits exceeded')
if(files.some(f=>f.endsWith('.png')))throw Error('PNG masters must not ship')
const audit={cards:playableDreams.length,current:currentDreams.length,files:files.length,bytes:files.reduce((a,f)=>a+statSync(f).size,0),maxBytes:Math.max(...files.map(f=>statSync(f).size)),nativePNGConversions:manifest.files.filter(f=>f.converted).length,calendarYears:[2026,2046],headers:readFileSync(resolve(out,'_headers'),'utf8')}
writeFileSync(resolve(root,pages?'.validation/pages-audit.json':'.validation/cloudflare-audit.json'),JSON.stringify(audit,null,2));console.log(JSON.stringify(audit))
