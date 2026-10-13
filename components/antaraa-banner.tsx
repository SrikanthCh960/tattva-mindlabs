import Image from 'next/image';
import Link from 'next/link';
import {enquiryLink} from '@/lib/content';
import './antaraa-banner.css';

export function AntaraaBanner() {
  return <section className="antaraa-promo-section" aria-labelledby="antaraa-promo-heading">
    <div className="container">
      <div className="antaraa-promo">
        <div className="antaraa-promo-message">
          <p className="antaraa-promo-eyebrow">Your journey starts within</p>
          <h2 id="antaraa-promo-heading">Make space for<br/><em>inner change.</em></h2>
          <p className="antaraa-promo-founder"><span>with</span> Dr Archana Nanduri</p>
        </div>
        <div className="antaraa-promo-offer">
          <p className="antaraa-promo-name">ANTARAA</p>
          <p className="antaraa-promo-description">Signature inner-transformation<br/>workshops</p>
          <Link href={enquiryLink('ANTARAA', 'antaraa')} className="button antaraa-promo-button">Express your interest</Link>
          <Link href="/programs/antaraa/" className="antaraa-promo-details">Discover the workshop</Link>
        </div>
        <div className="antaraa-promo-portrait">
          <Image src="/media/archana-antaraa-forest.webp" alt="Dr Archana Nanduri in a white saree" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 40vw, 420px"/>
        </div>
      </div>
    </div>
  </section>;
}
