import Link from 'next/link';
import {HandHeart} from 'lucide-react';
import {Eyebrow} from './sections';
import {VolunteerImage} from './volunteer-image';
import './community.css';

export function VolunteerSection() {
  return <section className="volunteer-teaser-section" aria-labelledby="volunteer-teaser-heading">
    <div className="container">
      <div className="volunteer-teaser volunteer-teaser-with-image">
        <div className="volunteer-teaser-copy">
          <span className="volunteer-symbol" aria-hidden="true"><HandHeart size={34} strokeWidth={1.2}/></span>
          <Eyebrow>Volunteer with Tattva</Eyebrow>
          <h2 id="volunteer-teaser-heading">Give your time.<br/><em>Share your care.</em></h2>
          <p>Bring your time, skills and care to the Tattva community. Tell us what you enjoy doing, and let’s explore where you could contribute.</p>
          <Link href="/volunteering/" className="button">Explore volunteering</Link>
          <span className="volunteer-teaser-note">Time. Skills. A willingness to help.</span>
        </div>
        <VolunteerImage/>
      </div>
    </div>
  </section>;
}
