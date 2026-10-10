import type {Metadata} from 'next';
import Link from 'next/link';
import {HandHeart, HeartHandshake, CalendarDays, MessagesSquare} from 'lucide-react';
import {Eyebrow} from '@/components/sections';
import {VolunteerForm} from '@/components/volunteer-form';
import {VolunteerImage} from '@/components/volunteer-image';
import '@/components/community.css';

export const metadata: Metadata = {title: 'Volunteer with Tattva', description: 'Share your time, interests and skills with Tattva Mindlabs. Express your interest in volunteering and connect with the team about suitable opportunities.'};

export default function VolunteeringPage() {
  return <>
    <section className="volunteer-page-hero">
      <div className="container volunteer-hero-grid volunteer-hero-with-image">
        <div><span className="volunteer-symbol" aria-hidden="true"><HandHeart size={34} strokeWidth={1.2}/></span><Eyebrow>Volunteer with Tattva</Eyebrow><h1>Give your time.<br/><em>Share your care.</em></h1><p>Every contribution starts with a willingness to help. Share your skills, interests and availability, and explore how you could be part of the Tattva community.</p><Link href="#volunteer-interest" className="button">Share your interest</Link></div>
        <VolunteerImage priority/>
      </div>
    </section>
    <section className="section volunteer-page-content">
      <div className="container volunteer-page-grid">
        <aside id="contribute" className="volunteer-guidance">
          <Eyebrow>A contribution that fits you</Eyebrow><h2>Begin with what<br/><em>you can offer.</em></h2>
          <p>You might enjoy helping with events, bringing people together, sharing creative skills or supporting coordination. Tell us what interests you; the team will confirm the opportunities available.</p>
          <ol className="volunteer-steps">
            <li><HeartHandshake size={25} aria-hidden="true"/><div><h3>Share your interests</h3><p>Let us know your skills and how you would like to contribute.</p></div></li>
            <li><CalendarDays size={25} aria-hidden="true"/><div><h3>Tell us what works</h3><p>Share your location, availability and preferred way to help.</p></div></li>
            <li><MessagesSquare size={25} aria-hidden="true"/><div><h3>Connect with the team</h3><p>Send your message to discuss suitable opportunities and next steps.</p></div></li>
          </ol>
          <p className="volunteer-guidance-note">Submitting your interest starts a conversation. Roles, schedules and participation are confirmed personally with the team.</p>
        </aside>
        <VolunteerForm/>
      </div>
    </section>
  </>;
}
