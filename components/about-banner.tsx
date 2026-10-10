import './contact-banner.css';
import './about-banner.css';

export function AboutBanner() {
  return <section className="contact-banner about-banner" aria-labelledby="about-banner-heading">
    <div className="contact-banner-media" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/about-lotus-full-banner.webp" srcSet="/media/about-lotus-full-banner-640.webp 640w, /media/about-lotus-full-banner-960.webp 960w, /media/about-lotus-full-banner.webp 1774w" sizes="100vw" width={1774} height={887} alt="" loading="eager" fetchPriority="high" decoding="async"/>
    </div>
    <div className="container contact-banner-content">
      <div className="contact-banner-copy">
        <p className="eyebrow">The Tattva philosophy</p>
        <h1 id="about-banner-heading">From knowing yourself<br/><em>to living more consciously.</em></h1>
        <p>A contemporary Indian space for holistic wellbeing, meaningful inner change and a deeper understanding of yourself.</p>
      </div>
    </div>
  </section>;
}
