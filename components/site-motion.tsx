'use client';

import {useEffect, useSyncExternalStore} from 'react';
import {usePathname} from 'next/navigation';
import {motion, useScroll, useSpring} from 'motion/react';
import Lenis from 'lenis';
import './site-motion.css';

const motionPreference = '(prefers-reduced-motion: reduce)';
const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
const revealSelector = [
  '.reveal-block', '.section-heading', '.split-editorial>div', '.pathway-card',
  '.solution-item', '.founder-copy', '.founder-image', '.ritual-copy', '.ritual-image',
  '.media-card', '.practice-card', '.dimension-grid article', '.values-grid article',
  '.contact-information', '.enquiry-card', '.faq-grid>div:first-child', '.cta-inner',
  '.social-tile', '.story-image', '.recognitions-heading', '.recognition-list>li',
  '.volunteer-teaser-copy', '.volunteer-photo', '.volunteer-guidance',
  '.volunteer-form-card', '.connect-banner-copy', '.related-grid>a', '.footer-grid>div',
].join(',');

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(motionPreference);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function SiteMotion() {
  const path = usePathname();
  const reduced = useSyncExternalStore(subscribeToMotionPreference,
    () => window.matchMedia(motionPreference).matches, () => true);
  const {scrollYProgress} = useScroll();
  const progress = useSpring(scrollYProgress, {stiffness: 160, damping: 30, mass: .25});

  useEffect(() => {
    const root = document.documentElement;
    const pointer = () => {root.dataset.motionInput = 'pointer';};
    const keyboard = () => {root.dataset.motionInput = 'keyboard';};
    document.addEventListener('pointerdown', pointer, {passive: true});
    document.addEventListener('keydown', keyboard);
    return () => {
      document.removeEventListener('pointerdown', pointer);
      document.removeEventListener('keydown', keyboard);
      delete root.dataset.motionInput;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({autoRaf: true, duration: 1.05, smoothWheel: true,
      syncTouch: false, anchors: {offset: -110}, autoToggle: true,
      stopInertiaOnNavigate: true, prevent: node => !!node.closest('[data-lenis-prevent]')});
    const syncLock = () => {
      if (document.body.hasAttribute('data-scroll-locked')) lenis.stop();
      else lenis.start();
    };
    syncLock();
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, {attributes: true, attributeFilter: ['data-scroll-locked']});
    return () => {lockObserver.disconnect(); lenis.destroy();};
  }, [reduced, path]);

  useEffect(() => {
    if (reduced || typeof HTMLElement.prototype.animate !== 'function' ||
      typeof IntersectionObserver === 'undefined') return;

    const main = document.getElementById('main');
    const pending = new Set<HTMLElement>();
    const seen = new WeakSet<HTMLElement>();
    const animations = new Set<Animation>();
    const keyboardInput = () => document.documentElement.dataset.motionInput === 'keyboard';
    let scanFrame = 0;

    function play(element: HTMLElement, frames: Keyframe[], duration: number, delay = 0) {
      try {
        const animation = element.animate(frames, {duration, delay, easing: easeOut, fill: 'both'});
        animations.add(animation);
        animation.onfinish = () => {animation.cancel(); animations.delete(animation);};
      } catch {
        // If an animation is unsupported, keep the original readable state.
      } finally {
        element.classList.remove('tattva-motion-pending');
        pending.delete(element);
      }
    }

    // Above-the-fold content stays readable; page entry is a short opacity transition.
    if (main && !keyboardInput()) play(main, [{opacity: .84}, {opacity: 1}], 260);

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (keyboardInput()) {
          element.classList.remove('tattva-motion-pending');
          pending.delete(element);
          continue;
        }
        const groupItem = element.parentElement?.matches('li') ? element.parentElement : element;
        const siblings = Array.from(groupItem.parentElement?.children ?? []);
        const stagger = Math.max(0, siblings.indexOf(groupItem)) % 4 * 55;
        const delay = Math.min(165, Number(element.dataset.revealDelay || 0) + stagger);
        play(element, [{opacity: 0, translate: '0 14px'}, {opacity: 1, translate: '0 0'}], 560, delay);
      }
    }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});

    const scan = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach(element => {
        if (seen.has(element) || keyboardInput() || element.contains(document.activeElement)) return;
        seen.add(element);
        // Reveal each block once, without nesting motion or replacing hover transforms.
        if (element.parentElement?.closest(revealSelector)) return;
        const bounds = element.getBoundingClientRect();
        if (!bounds.height || bounds.top < window.innerHeight) return;
        pending.add(element);
        element.classList.add('tattva-motion-pending');
        observer.observe(element);
      });
    };
    scan();

    // A single scheduled scan handles filtered cards and newly mounted form content.
    const updates = new MutationObserver(() => {
      cancelAnimationFrame(scanFrame);
      scanFrame = requestAnimationFrame(scan);
    });
    if (main) updates.observe(main, {childList: true, subtree: true});
    const showFocused = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>('.tattva-motion-pending');
      if (element) {
        observer.unobserve(element);
        element.classList.remove('tattva-motion-pending');
        pending.delete(element);
      }
    };
    document.addEventListener('focusin', showFocused);
    return () => {
      observer.disconnect(); updates.disconnect(); cancelAnimationFrame(scanFrame);
      document.removeEventListener('focusin', showFocused);
      animations.forEach(animation => animation.cancel());
      pending.forEach(element => element.classList.remove('tattva-motion-pending'));
    };
  }, [path, reduced]);

  return <motion.div className="reading-progress" aria-hidden="true" style={{scaleX: reduced ? scrollYProgress : progress}}/>;
}
