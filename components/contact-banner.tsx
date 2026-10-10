import './contact-banner.css';

export function ContactBanner() {
  return <section className="contact-banner" aria-labelledby="contact-banner-heading">
    <div className="contact-banner-media" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/contact-sunrise-banner.webp" srcSet="/media/contact-sunrise-banner-640.webp 640w, /media/contact-sunrise-banner-960.webp 960w, /media/contact-sunrise-banner.webp 1536w" sizes="100vw" width={1536} height={1024} alt="" loading="eager" fetchPriority="high" decoding="async"/>
    </div>
    <div className="container contact-banner-content">
      <div className="contact-banner-copy">
        <p className="eyebrow">Contact us · We’re here to listen</p>
        <h1 id="contact-banner-heading">Every journey begins<br/><em>with a conversation.</em></h1>
        <p>Whether you have a practice in mind or simply want to find your starting point, you’re welcome here.</p>
      </div>
    </div>
  </section>;
}
