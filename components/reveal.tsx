'use client';
import {useReducedMotion} from 'motion/react';import {BlurFade} from '@/components/ui/blur-fade';
export function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}){const reduce=useReducedMotion();return <BlurFade className="reveal-block" inView inViewMargin="-25px" delay={delay} direction="up" duration={reduce?0:.7} blur="0px" offset={reduce?0:24}>{children}</BlurFade>}
