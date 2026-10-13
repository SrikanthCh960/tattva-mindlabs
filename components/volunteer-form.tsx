'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {CheckCircle2, Mail, MessageCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {contact} from '@/lib/content';

const initialDetails = {name: '', phone: '', email: '', city: '', interest: '', availability: '', format: 'Open to discussion', message: ''};
const areas = ['Events and workshop support', 'Community coordination', 'Content, design and communication', 'Administration and logistics', 'Other skills / open to guidance'];

export function VolunteerForm() {
  const [details, setDetails] = useState(initialDetails);
  const [consent, setConsent] = useState(false);
  const [ready, setReady] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {if (ready) result.current?.focus();}, [ready]);
  const update = (field: keyof typeof initialDetails, value: string) => setDetails(current => ({...current, [field]: value}));
  const message = [
    'Hello Tattva Mindlabs,', 'I would like to express my interest in volunteering.', '',
    `Name: ${details.name.trim()}`, `Mobile: ${details.phone.trim()}`,
    ...(details.email.trim() ? [`Email: ${details.email.trim()}`] : []),
    `City: ${details.city.trim()}`, `Area of interest: ${details.interest}`,
    `Availability: ${details.availability}`, `Preferred way to contribute: ${details.format}`,
    ...(details.message.trim() ? [`Skills / motivation: ${details.message.trim()}`] : []),
    '', 'I agree to be contacted about volunteering. Please share suitable opportunities and next steps. Thank you.',
  ].join('\n');
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const email = `mailto:${contact.email}?subject=${encodeURIComponent('Volunteering interest — Tattva Mindlabs')}&body=${encodeURIComponent(message)}`;

  return <div className="volunteer-form-card" id="volunteer-interest">
    <p className="eyebrow">Let’s get to know you</p>
    <h2>Your time. <em>Your contribution.</em></h2>
    <p className="volunteer-form-intro">Fill in your details, review your message, then send it to our team through WhatsApp or email.</p>
    <form onSubmit={event => {event.preventDefault(); if (consent && event.currentTarget.checkValidity()) setReady(true);}} onChange={() => {if (ready) setReady(false);}}>
      <div className="volunteer-fields">
        <label htmlFor="volunteer-name">Full name <span aria-hidden="true">*</span>
          <input id="volunteer-name" name="name" autoComplete="name" value={details.name} onChange={e => update('name', e.target.value)} required pattern=".*\S.*" maxLength={100} placeholder="Your full name"/>
        </label>
        <label htmlFor="volunteer-phone">Mobile number <span aria-hidden="true">*</span>
          <input id="volunteer-phone" name="phone" type="tel" autoComplete="tel" value={details.phone} onChange={e => update('phone', e.target.value)} required pattern="\+?[0-9](?:[0-9]| |\(|\)|-){7,19}" maxLength={20} title="Enter a mobile number with 8 to 20 characters." placeholder="Your mobile number"/>
        </label>
        <label htmlFor="volunteer-email">Email address <small>Optional</small>
          <input id="volunteer-email" name="email" type="email" autoComplete="email" value={details.email} onChange={e => update('email', e.target.value)} maxLength={160} placeholder="you@example.com"/>
        </label>
        <label htmlFor="volunteer-city">City <span aria-hidden="true">*</span>
          <input id="volunteer-city" name="city" autoComplete="address-level2" value={details.city} onChange={e => update('city', e.target.value)} required pattern=".*\S.*" maxLength={100} placeholder="Where are you based?"/>
        </label>
        <label htmlFor="volunteer-area" className="volunteer-field-full">Where would you like to contribute? <span aria-hidden="true">*</span>
          <select id="volunteer-area" name="interest" value={details.interest} onChange={e => update('interest', e.target.value)} required>
            <option value="" disabled>Select an area of interest</option>{areas.map(area => <option key={area}>{area}</option>)}
          </select>
        </label>
        <label htmlFor="volunteer-availability">Your availability <span aria-hidden="true">*</span>
          <select id="volunteer-availability" name="availability" value={details.availability} onChange={e => update('availability', e.target.value)} required>
            <option value="" disabled>Select availability</option><option>Weekdays</option><option>Weekends</option><option>Occasional events</option><option>Flexible / let’s discuss</option>
          </select>
        </label>
        <label htmlFor="volunteer-format">How would you prefer to help?
          <select id="volunteer-format" name="format" value={details.format} onChange={e => update('format', e.target.value)}>
            <option>Open to discussion</option><option>In person in Hyderabad, if available</option><option>Remotely, if available</option>
          </select>
        </label>
        <label htmlFor="volunteer-message" className="volunteer-field-full">A little about you <small>Optional</small>
          <textarea id="volunteer-message" name="message" rows={4} maxLength={1000} value={details.message} onChange={e => update('message', e.target.value)} placeholder="Share your skills, what interests you, and any preferred days or times."/>
        </label>
      </div>
      <label className="volunteer-consent" htmlFor="volunteer-consent">
        <input id="volunteer-consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required/>
        <span>I agree to be contacted by Tattva Mindlabs about my volunteering interest.</span>
      </label>
      <p className="volunteer-privacy">Your details stay on this page until you choose how to send them. <Link href="/privacy/">Read our privacy information.</Link></p>
      <Button type="submit" className="button volunteer-submit">Review my interest</Button>
    </form>
    {ready && <div className="volunteer-ready" ref={result} tabIndex={-1} aria-live="polite">
      <div className="volunteer-ready-title"><CheckCircle2 size={24}/><h3>Your message is ready.</h3></div>
      <p>Check your details below, then choose WhatsApp or email. Nothing has been sent yet.</p>
      <pre className="volunteer-message-preview">{message}</pre>
      <div className="volunteer-send-options">
        <a className="button" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Continue on WhatsApp</a>
        <a className="button button-outline" href={email}><Mail size={18}/>Open email</a>
      </div>
      <small>The team will discuss suitable opportunities after receiving your message.</small>
    </div>}
  </div>;
}
