import { atmosphereFor } from './atmosphereTheme'

export function PageAtmosphere({ title }: { title: string }) {
  const theme = atmosphereFor(title)
  return <div className={`v3-atmosphere v3-atmosphere--${theme}`} aria-hidden="true">
    {['left', 'right'].map(side => <svg key={side} className={`v3-edge v3-edge--${side}`} viewBox="0 0 100 600" fill="none" stroke="currentColor" strokeWidth="1" focusable="false">
      {theme === 'water' ? <>
        <path d="M-25 140q35-20 65 0t65 0M-35 152q35-20 65 0t65 0M-40 440q35-20 65 0t65 0M-50 452q35-20 65 0t65 0"/>
        <path d="m32 290-3 8m21-50-3 8m-36 80-3 8"/>
      </> : theme === 'clouds' ? <>
        <path d="M-20 190h83c16-1 13-19 0-20-1-23-36-30-45-8-17-8-30 3-28 13M-30 430h65c18-1 16-20 0-20-2-21-28-23-36-9-14-5-24 3-23 14"/>
      </> : theme === 'leaves' ? <>
        <path d="M-8 390Q48 300 20 210M22 260q37-15 31-44-30 5-31 44Zm6 45q-30-9-31-35 27 2 31 35ZM13 349q35-2 40-28-29-5-40 28Z"/>
      </> : <>
        <path d="m28 160 2 7 7 2-7 2-2 7-2-7-7-2 7-2ZM62 370l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z"/>
        <circle cx="18" cy="315" r="1"/><circle cx="56" cy="224" r="1.2"/><circle cx="23" cy="466" r="1.4"/>
      </>}
    </svg>)}
  </div>
}
