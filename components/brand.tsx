import Link from 'next/link';
import './brand.css';
export function Brand({footer=false}:{footer?:boolean}) {
  return <Link href="/" className={`brand brand-official ${footer?'brand-footer':''}`} aria-label="Tattva Mindlabs home"><span className="brand-official-viewport" aria-hidden="true"><img className="brand-official-artwork" src="/media/tattva-logo.png" alt="" width="2048" height="2048"/></span></Link>;
}
