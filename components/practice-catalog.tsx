'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {practices} from '@/lib/content';
import {PracticeImage} from './practice-image';
const filters = [{value: 'all', label: 'All practices'}, {value: 'energy', label: 'Energy & rituals'}, {value: 'exploration', label: 'Inner exploration'}, {value: 'body', label: 'Body & lifestyle'}];
export function PracticeCatalog() {
  const [active, setActive] = useState('all');
  useEffect(() => {
    const syncCategory = () => {const hash = window.location.hash.slice(1); if (filters.some(x => x.value === hash)) setActive(hash);};
    syncCategory();
    window.addEventListener('hashchange', syncCategory);
    return () => window.removeEventListener('hashchange', syncCategory);
  }, []);
  return <Tabs value={active} onValueChange={value => {setActive(value); window.history.replaceState(null, '', `#${value}`);}} className="practice-tabs">
    <div className="practice-category-anchors" aria-hidden="true">{filters.map(f => <span id={f.value} key={f.value}/>)}</div>
    <TabsList className="practice-filters" aria-label="Filter holistic practices">
      {filters.map(f => <TabsTrigger value={f.value} key={f.value}>{f.label}</TabsTrigger>)}
    </TabsList>
    {filters.map(filter => <TabsContent value={filter.value} key={filter.value}>
      <div className="practice-grid">
        {practices.filter(p => filter.value === 'all' || p.group === filter.label).map(practice =>
          <article className="practice-card practice-card-photographic" key={practice.slug}>
            <Link className="practice-card-link" href={`/services/${practice.slug}/`}>
              <PracticeImage slug={practice.slug} decorative/>
              <div className="practice-card-copy">
                <p className="practice-group">{practice.group}</p><h2>{practice.name}</h2>
                <p className="practice-summary">{practice.intro}</p><span className="text-link">Explore this practice</span>
              </div>
            </Link>
          </article>)}
      </div>
    </TabsContent>)}
  </Tabs>;
}
