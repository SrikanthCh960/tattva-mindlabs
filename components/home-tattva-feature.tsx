import Image from 'next/image';
import Link from 'next/link';
import {Eyebrow} from './sections';

export function HomeTattvaFeature() {
  return <section className="section antaraa-section" id="about-tattva" aria-labelledby="home-tattva-heading">
    <div className="container">
      <div className="section-heading">
        <Eyebrow>01 / About Tattva Mindlabs</Eyebrow>
        <h2 id="home-tattva-heading">Know yourself more deeply.<br/><em>Live more consciously.</em></h2>
      </div>
      <div className="antaraa-feature">
        <div className="antaraa-copy">
          <span className="launch-label">MIND · BODY · ENERGY · SOUL</span>
          <h3>TATTVA</h3>
          <p className="antaraa-subtitle">Where self-understanding meets everyday life.</p>
          <p>Founded by Archana Nanduri, Tattva Mindlabs brings together Indian wisdom and modern psychological perspectives. Through programmes, reflective practices and shared experiences, we invite you to understand yourself more deeply and bring greater awareness into the way you live.</p>
          <Link className="button button-cream" href="/about/">About Us</Link>
          <span className="small-note">Discover our philosophy and the person behind it.</span>
        </div>
        <div className="antaraa-photo">
          <Image src="/media/archana-riverside.webp" alt="Archana Nanduri, founder of Tattva Mindlabs, in a quiet riverside setting" fill sizes="(max-width:760px) 100vw, 50vw"/>
          <span className="image-annotation">Archana Nanduri · Founder, Tattva Mindlabs</span>
        </div>
      </div>
    </div>
  </section>;
}
