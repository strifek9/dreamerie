import { useEffect, useRef } from 'react'
import { installSupport } from './support'
export function Support() {
 const host = useRef<HTMLDivElement>(null)
 useEffect(() => { if (host.current) return installSupport(host.current) }, [])
 return <div ref={host} className="support-host"/>
}
