'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {motion,useReducedMotion,useScroll,useSpring} from 'motion/react';
import Lenis from 'lenis';

export function SiteMotion(){
 const path=usePathname();const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll();const progress=useSpring(scrollYProgress,{stiffness:160,damping:30,mass:.25});
 useEffect(()=>{
  if(reduced!==false)return;
  const lenis=new Lenis({autoRaf:true,duration:1.05,smoothWheel:true,syncTouch:false,anchors:{offset:-110},autoToggle:true,stopInertiaOnNavigate:true,prevent:node=>!!node.closest('[data-lenis-prevent]')});
  const lockObserver=new MutationObserver(()=>{if(document.body.hasAttribute('data-scroll-locked'))lenis.stop();else lenis.start()});
  lockObserver.observe(document.body,{attributes:true,attributeFilter:['data-scroll-locked']});
  return()=>{lockObserver.disconnect();lenis.destroy()};
 },[reduced,path]);
 useEffect(()=>{
  const elements=document.querySelectorAll<HTMLElement>('.section-heading,.split-editorial>div,.pathway-card,.solution-item,.founder-copy,.ritual-copy,.media-card,.practice-card,.dimension-grid article,.values-grid article,.contact-information,.enquiry-card,.faq-grid>div:first-child,.cta-inner,.social-tile');
  if(reduced!==false)return;
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('has-entered');observer.unobserve(entry.target)}}},{threshold:.12,rootMargin:'0px 0px -25px 0px'});
  elements.forEach((element,i)=>{element.classList.add('scroll-reveal');const parent=element.parentElement;const index=parent?Array.from(parent.children).indexOf(element):0;element.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*85}ms`);observer.observe(element)});
  return()=>{observer.disconnect();elements.forEach(el=>{el.classList.remove('scroll-reveal','has-entered');el.style.removeProperty('--reveal-delay')})};
 },[path,reduced]);
 return <motion.div className="reading-progress" aria-hidden="true" style={{scaleX:reduced?scrollYProgress:progress}}/>;
}
