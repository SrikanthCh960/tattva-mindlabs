export function VolunteerImage({priority = false}: {priority?: boolean}) {
  return <div className="volunteer-photo">
    {/* Responsive editorial artwork shared by the homepage and volunteering page. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/media/volunteering-seva.webp" srcSet="/media/volunteering-seva-640.webp 640w, /media/volunteering-seva-960.webp 960w, /media/volunteering-seva.webp 1536w" sizes="(max-width: 760px) 100vw, 50vw" width={1536} height={1024} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" alt="Illustrative scene of helping hands serving a warm community meal"/>
    <span className="volunteer-photo-caption">Small acts. Shared purpose.</span>
  </div>;
}
