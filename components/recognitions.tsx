import Image from 'next/image';
import {recognitions} from '@/lib/recognitions';
import {Eyebrow} from './sections';
import './community.css';

export function Recognitions() {
  return <section id="recognitions" className="recognitions-section" aria-labelledby="recognitions-heading">
    <div className="container">
      <div className="recognitions-heading">
        <Eyebrow>A journey of connection</Eyebrow>
        <h2 id="recognitions-heading">Awards & <em>Recognitions</em></h2>
        <p>Recognition, professional communities and platforms for shared ideas.</p>
      </div>
      <ul className="recognition-list">
        {recognitions.map(item => <li key={item.file}>
          <figure>
            <div className={`recognition-logo ${item.treatment}`}>
              <Image src={`/media/recognitions/${item.file}`} alt={`${item.name} logo`} width={item.width} height={item.height} sizes="150px"/>
            </div>
            <figcaption><span>{item.name}</span><small>{item.category}</small></figcaption>
          </figure>
        </li>)}
      </ul>
    </div>
  </section>;
}
