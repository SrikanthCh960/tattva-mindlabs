import Link from 'next/link';
export function Brand({footer=false}:{footer?:boolean}) {
  return <Link href="/" className={`brand ${footer?'brand-footer':''}`} aria-label="Tattva Mindlabs home"><span className="brand-symbol" aria-hidden="true"><img src="/media/tattva-logo.png" alt="" width="2048" height="2048"/></span><span className="brand-name">TATTVA<span>MINDLABS</span></span></Link>;
}
