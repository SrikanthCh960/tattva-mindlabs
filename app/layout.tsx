import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {SiteMotion} from '@/components/site-motion';
import {AntaraaSticky} from '@/components/antaraa-sticky';
import {Header} from '@/components/header';import {Footer} from '@/components/footer';import './globals.css';import './redesign.css';import './service-imagery.css';
import '@/components/antaraa-theme.css';
const serif=localFont({src:'../public/fonts/cormorant.woff2',variable:'--font-editorial',display:'swap',weight:'400 600'});
const sans=localFont({src:'../public/fonts/dm-sans.woff2',variable:'--font-body',display:'swap',weight:'400 700'});
export const metadata:Metadata={metadataBase:new URL('https://tattva-mindlabs.srikanth-digital2s.chatgpt.site'),title:{default:'Tattva Mindlabs | A journey within',template:'%s | Tattva Mindlabs'},description:'Explore holistic wellbeing through mind, body, energy and soul. Discover ANTARAA, personal wellbeing practices and conversations with Dr Archana Nanduri.',icons:{icon:'/favicon.svg'},openGraph:{title:'Tattva Mindlabs | A journey within',description:'A contemporary Indian space for holistic wellbeing, self-exploration and inner transformation.',type:'website',locale:'en_IN'},robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body><SiteMotion/><Header/><main id="main">{children}</main><Footer/><AntaraaSticky/></body></html>}
