import './contact-banner.css';
import './explore-banner.css';

export function ExploreBanner() {
  return <section className="contact-banner explore-banner" aria-labelledby="explore-banner-heading">
    <div className="contact-banner-media" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/explore-reflection-banner.webp" srcSet="/media/explore-reflection-banner-640.webp 640w, /media/explore-reflection-banner-960.webp 960w, /media/explore-reflection-banner.webp 1536w" sizes="100vw" width={1536} height={1024} alt="" loading="eager" fetchPriority="high" decoding="async"/>
    </div>
    <div className="container contact-banner-content">
      <div className="contact-banner-copy">
        <p className="eyebrow">Explore · Pause. Listen. Reflect.</p>
        <h1 id="explore-banner-heading">Conversations that open<br/><em>a new perspective.</em></h1>
        <p>Explore Archana’s Telugu interviews on personal growth, everyday habits and spiritual practices. Take a moment to listen, then discover what resonates with you.</p>
      </div>
    </div>
  </section>;
}
