'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight, X} from 'lucide-react';
import {enquiryLink} from '@/lib/content';
import './antaraa-sticky.css';

const dismissalKey = 'tattva-antaraa-invitation-dismissed';

export function AntaraaSticky() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {setOpen(window.sessionStorage.getItem(dismissalKey) !== 'true');}
    catch {setOpen(true);}
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {window.sessionStorage.setItem(dismissalKey, 'true');}
    catch {/* The close button still works when browser storage is unavailable. */}
  };

  const currentPage = pathname?.replace(/\/$/, '');
  if (!open || currentPage === '/programs/antaraa' || currentPage === '/contact') return null;

  return <aside className="antaraa-sticky" aria-label="ANTARAA workshop invitation" onKeyDown={event => {
    if (event.key === 'Escape') {event.preventDefault(); event.stopPropagation(); dismiss();}
  }}>
    <Link href="/programs/antaraa/" className="antaraa-sticky-poster" aria-label="Discover ANTARAA">
      <div className="antaraa-sticky-copy">
        <span className="antaraa-sticky-eyebrow">Your journey starts within</span>
        <h2 className="antaraa-sticky-wordmark">ANTARAA</h2>
        <p className="antaraa-sticky-description">Signature inner-transformation workshops</p>
        <span className="antaraa-sticky-founder">Dr Archana Nanduri</span>
      </div>
      <div className="antaraa-sticky-portrait">
        <Image src="/media/archana-antaraa-forest.webp" alt="" fill sizes="190px"/>
      </div>
    </Link>
    <div className="antaraa-sticky-actions">
      <Link href={enquiryLink('ANTARAA', 'antaraa')} className="antaraa-sticky-interest">Express your interest<ArrowUpRight size={15} aria-hidden="true"/></Link>
      <button type="button" className="antaraa-sticky-close" onClick={dismiss} aria-label="Close ANTARAA invitation">Close<X size={14} aria-hidden="true"/></button>
    </div>
  </aside>;
}
