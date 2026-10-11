import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, cleanup, fireEvent, render, waitFor} from '@testing-library/react';
import {renderToStaticMarkup} from 'react-dom/server';
import {SiteMotion} from '@/components/site-motion';
import {Reveal} from '@/components/reveal';

const state = vi.hoisted(() => ({path: '/about/', scrollers: [] as {destroy: () => void}[]}));
vi.mock('next/navigation', () => ({usePathname: () => state.path}));
vi.mock('motion/react', () => ({
  motion: {div: ({className}: {className?: string}) => <div className={className}/>},
  useScroll: () => ({scrollYProgress: 0}), useSpring: (value: number) => value,
}));
vi.mock('lenis', () => ({default: class {
  start = vi.fn(); stop = vi.fn(); destroy = vi.fn();
  constructor() {state.scrollers.push(this);}
}}));

let reduced = false;
let subscriptions: Set<() => void>;
let observers: {callback: IntersectionObserverCallback; instance: IntersectionObserver; observed: Set<Element>}[];
let animations: {element: HTMLElement; animation: Animation; frames: Keyframe[]; options: KeyframeAnimationOptions}[];
const originalAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate');

beforeEach(() => {
  reduced = false; subscriptions = new Set(); observers = []; animations = [];
  state.path = '/about/'; state.scrollers = [];
  vi.stubGlobal('matchMedia', () => ({get matches() {return reduced;},
    addEventListener: (_event: string, callback: () => void) => subscriptions.add(callback),
    removeEventListener: (_event: string, callback: () => void) => subscriptions.delete(callback)}));
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 0));
  vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id));
  vi.stubGlobal('IntersectionObserver', class {
    observed = new Set<Element>();
    constructor(callback: IntersectionObserverCallback) {
      observers.push({callback, instance: this as unknown as IntersectionObserver, observed: this.observed});
    }
    observe(element: Element) {this.observed.add(element);}
    unobserve(element: Element) {this.observed.delete(element);}
    disconnect() {this.observed.clear();}
  });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function(this: HTMLElement) {
    const top = Number(this.dataset.motionTop || 0);
    return {top, bottom: top + 64, left: 0, right: 100, height: 64, width: 100, x: 0, y: top, toJSON() {}};
  });
  Object.defineProperty(HTMLElement.prototype, 'animate', {configurable: true, value:
    function(this: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
      const animation = {cancel: vi.fn(), onfinish: null} as unknown as Animation;
      animations.push({element: this, animation, frames, options});
      return animation;
    }});
});

afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals();
  if (originalAnimate) Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate);
  else Reflect.deleteProperty(HTMLElement.prototype, 'animate');
});

function Fixture({extra = false}: {extra?: boolean}) {
  return <><SiteMotion/><main id="main">
    <div className="section-heading" data-testid="visible">The same heading</div>
    <article className="practice-card" data-motion-top="1400" data-testid="later">
      <img src="/media/archana-portrait.webp" alt="The same portrait"/><a href="/about/">The same link</a>
    </article>
    {extra && <article className="practice-card" data-motion-top="1800" data-testid="extra">A newly filtered card</article>}
  </main></>;
}

describe('Shared motion accessibility and navigation', () => {
  it('keeps visible content readable and reveals offscreen content without replacing images or hover transforms', () => {
    const {getByTestId} = render(<Fixture/>);
    const visible = getByTestId('visible');
    const later = getByTestId('later');
    expect(visible.classList.contains('tattva-motion-pending')).toBe(false);
    expect(later.classList.contains('tattva-motion-pending')).toBe(true);
    const image = later.querySelector('img');
    const rect = later.getBoundingClientRect();
    act(() => observers[0].callback([{target: later, isIntersecting: true,
      boundingClientRect: rect, intersectionRatio: 1, intersectionRect: rect,
      rootBounds: null, time: 0}], observers[0].instance));
    expect(later.classList.contains('tattva-motion-pending')).toBe(false);
    expect(later.querySelector('img')).toBe(image);
    const reveal = animations.find(record => record.element === later)!;
    expect(reveal.frames.some(frame => 'transform' in frame)).toBe(false);
    act(() => reveal.animation.onfinish?.({} as AnimationPlaybackEvent));
    expect(reveal.animation.cancel).toHaveBeenCalled();
    expect(later.getAttribute('style')).toBeNull();
  });

  it('responds immediately when reduced motion is enabled while the page is open', () => {
    const {getByTestId} = render(<Fixture/>);
    act(() => {reduced = true; subscriptions.forEach(callback => callback());});
    expect(getByTestId('later').classList.contains('tattva-motion-pending')).toBe(false);
    expect(state.scrollers[0].destroy).toHaveBeenCalled();
    expect(animations.every(record => vi.mocked(record.animation.cancel).mock.calls.length > 0)).toBe(true);
  });

  it('does not delay focused content or keyboard page navigation', () => {
    const {getByTestId, rerender} = render(<Fixture/>);
    fireEvent.keyDown(document, {key: 'Tab'});
    const later = getByTestId('later');
    act(() => later.querySelector('a')!.focus());
    expect(later.classList.contains('tattva-motion-pending')).toBe(false);
    const count = animations.length;
    state.path = '/services/';
    rerender(<Fixture/>);
    expect(animations).toHaveLength(count);
    expect(later.classList.contains('tattva-motion-pending')).toBe(false);
  });

  it('handles newly filtered cards and browsers without the animation API without hiding content', async () => {
    const {getByTestId, rerender, unmount} = render(<Fixture/>);
    rerender(<Fixture extra/>);
    await waitFor(() => expect(observers[0].observed.has(getByTestId('extra'))).toBe(true));
    unmount();
    Reflect.deleteProperty(HTMLElement.prototype, 'animate');
    const fallback = render(<Fixture/>);
    expect(fallback.container.querySelector('.tattva-motion-pending')).toBeNull();
  });

  it('renders all Reveal content as visible HTML before JavaScript runs', () => {
    const html = renderToStaticMarkup(<Reveal delay={.1}><h2>The original heading</h2><p>The original copy</p></Reveal>);
    expect(html).toContain('The original copy');
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('visibility:hidden');
  });
});
