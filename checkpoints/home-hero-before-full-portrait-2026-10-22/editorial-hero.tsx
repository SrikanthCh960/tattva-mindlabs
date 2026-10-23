'use client';
import Image from 'next/image';import Link from 'next/link';import {useRef} from 'react';import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';import {Mouse} from 'lucide-react';
export function EditorialHero(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});const y=useTransform(scrollYProgress,[0,1],[0,64]);
 return <section ref={ref} className="editorial-hero" aria-labelledby="hero-title">
  <motion.div className="editorial-hero-media" style={{y:reduced?0:y}}><Image src="/media/archana-hero-sharp.webp" alt="Dr Archana Nanduri in an elegant white sari, against a warm amber backdrop" fill priority sizes="(max-width:760px) 100vw, 58vw"/></motion.div>
  <div className="editorial-hero-shade" aria-hidden="true"/>
  <div className="container editorial-hero-inner"><div className="editorial-hero-copy">
   <p className="eyebrow hero-enter hero-enter-1"><span/>Tattva Mindlabs · A journey within</p>
   <h1 id="hero-title"><span className="hero-line"><span>Come home</span></span><span className="hero-line"><span>to <em>yourself.</em></span></span></h1>
   <p className="hero-description hero-enter hero-enter-3">Pause. Reconnect. Rediscover.<br/>A more conscious way of living begins within.</p>
   <div className="button-row hero-enter hero-enter-4"><Link href="/programs/antaraa/" className="button button-gold">Discover ANTARAA</Link><Link href="/contact/?type=consultation#enquiry" className="button hero-outline">Book a consultation</Link></div>
   <div className="hero-origin hero-enter hero-enter-5"><span/>Rooted in Indian wisdom.<br/>Created for your journey.</div>
  </div><div className="hero-nameplate hero-enter hero-enter-5"><span>Dr Archana Nanduri</span><small>Founder, Tattva Mindlabs</small></div></div>
  <div className="container hero-bottom-bar"><a href="#journey" className="hero-scroll"><span className="scroll-orbit"><Mouse size={18}/></span><span>SCROLL TO EXPLORE</span></a><span className="hero-dimensions">MIND <i>·</i> BODY <i>·</i> ENERGY <i>·</i> SOUL</span><span className="hero-bottom-note">The journey is inward.</span></div>
 </section>
}
