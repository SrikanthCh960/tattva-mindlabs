'use client';

import {forwardRef, Fragment, useEffect, useRef, useState} from 'react';
import type {ComponentPropsWithoutRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {NavigationMenu} from 'radix-ui';
import {ChevronDown, Menu, MessageCircle} from 'lucide-react';
import {Brand} from './brand';
import {SocialLinks} from './social-links';
import {menuGroups} from '@/lib/navigation';
import {Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription} from '@/components/ui/sheet';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import './modern-header.css';

// Native hash links also work when selecting another category on the same page.
const Destination = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'> & {href: string}>(
  ({href, children, ...props}, ref) => href.includes('#')
    ? <a href={href} ref={ref} {...props}>{children}</a>
    : <Link href={href} ref={ref} {...props}>{children}</Link>
);
Destination.displayName = 'Destination';

export function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  // One hover region covers the page link, submenu arrow, and dropdown panel.
  const hoverTimer = useRef<number | undefined>(undefined);
  const hoverTarget = useRef<string | null>(null);
  const clearHover = () => {window.clearTimeout(hoverTimer.current); hoverTarget.current = null;};
  const changeMenu = (value: string) => {clearHover(); setActive(value);};
  const closeMenus = () => {changeMenu(''); setMobileOpen(false);};
  const hoverMenu = (value: string) => {
    if (active === value) {clearHover(); return;}
    if (hoverTarget.current === value) return;
    clearHover();
    hoverTarget.current = value;
    hoverTimer.current = window.setTimeout(() => {
      hoverTarget.current = null;
      setActive(value);
    }, active ? 0 : 160);
  };
  const leaveMenu = (value: string) => {
    clearHover();
    hoverTimer.current = window.setTimeout(() => setActive(current => current === value ? '' : current), 150);
  };
  const isCurrent = (href: string) => pathname === href.replace(/\/$/, '') || pathname.startsWith(href);
  useEffect(() => {
    window.clearTimeout(hoverTimer.current); hoverTarget.current = null;
    setActive(''); setMobileOpen(false);
    return () => window.clearTimeout(hoverTimer.current);
  }, [pathname]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header modern-site-header">
      <div className="container modern-header-container">
        <NavigationMenu.Root className="mega-navigation" aria-label="Main navigation" value={active} onValueChange={changeMenu} activationMode="manual">
          <NavigationMenu.List className="mega-menu-list">
            <li className="masthead-brand"><Brand/></li>
            {menuGroups.map(group => <Fragment key={group.id}>
              <NavigationMenu.Item value={group.id} className="mega-menu-item"
                onPointerEnter={event => {if (group.kind === 'dropdown' && event.pointerType === 'mouse') hoverMenu(group.id);}}
                onPointerMove={event => {if (group.kind === 'dropdown' && event.pointerType === 'mouse') hoverMenu(group.id);}}
                onPointerLeave={event => {if (group.kind === 'dropdown' && event.pointerType === 'mouse') leaveMenu(group.id);}}>
                {group.kind === 'link' ? <NavigationMenu.Link asChild onSelect={closeMenus}>
                  <Destination href={group.href} className="mega-menu-trigger mega-menu-direct-link" aria-current={isCurrent(group.href) ? 'page' : undefined} data-current={isCurrent(group.href) ? 'true' : undefined} onPointerEnter={closeMenus} onFocus={closeMenus}>{group.label}</Destination>
                </NavigationMenu.Link> : <>
                <div className="mega-menu-heading">
                  <NavigationMenu.Link asChild onSelect={closeMenus}>
                    <Destination href={group.href} className="mega-menu-trigger mega-menu-page-link" aria-current={isCurrent(group.href) ? 'page' : undefined} data-current={isCurrent(group.href) ? 'true' : undefined} data-state={active === group.id ? 'open' : 'closed'}>{group.label}</Destination>
                  </NavigationMenu.Link>
                  <NavigationMenu.Trigger className="mega-menu-trigger mega-menu-dropdown-toggle" aria-label={`Open ${group.label} submenu`} data-current={isCurrent(group.href) ? 'true' : undefined}>
                    <ChevronDown size={13} aria-hidden="true"/>
                  </NavigationMenu.Trigger>
                </div>
                <NavigationMenu.Content className="mega-menu-content" data-lenis-prevent>
                  <div className="container mega-panel">
                    <div className="mega-panel-intro">
                      <p className="mega-panel-kicker">Explore Tattva</p>
                      <h2>{group.label}</h2>
                      <p>{group.intro}</p>
                      <ul className="mega-panel-links">
                        {group.links.map(item => <li key={item.href}>
                          <NavigationMenu.Link asChild onSelect={() => setActive('')}>
                            <Destination href={item.href}>{item.label}</Destination>
                          </NavigationMenu.Link>
                        </li>)}
                      </ul>
                    </div>
                    <div className="mega-feature-area">
                      <div className={`mega-feature-grid ${group.features.length === 2 ? 'mega-feature-grid-two' : ''}`}>
                        {group.features.map(item => <NavigationMenu.Link key={item.title} asChild onSelect={() => setActive('')}>
                          <Destination className="mega-feature" href={item.href}>
                            <span className="mega-feature-image"><Image src={item.image} alt="" fill sizes={group.features.length === 2 ? '430px' : '300px'} style={{objectPosition:item.position || 'center'}}/></span>
                            <span className="mega-feature-title">{item.title}</span>{' '}
                            <span className="mega-feature-detail">{item.detail}</span>
                          </Destination>
                        </NavigationMenu.Link>)}
                      </div>
                      {group.note && <p className="mega-panel-note">{group.note}</p>}
                    </div>
                  </div>
                </NavigationMenu.Content>
                </>}
              </NavigationMenu.Item>
            </Fragment>)}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="mobile-masthead">
          <div className="masthead-brand mobile-header-brand"><Brand/></div>
          <Link href="/contact/" className="mobile-contact-icon" aria-label="Contact Tattva Mindlabs"><MessageCircle size={23}/></Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild><button className="modern-menu-toggle" type="button" aria-label="Open navigation"><Menu size={25}/></button></SheetTrigger>
            <SheetContent side="right" className="mobile-sheet modern-mobile-sheet" data-lenis-prevent>
              <SheetTitle className="sr-only">Tattva navigation</SheetTitle>
              <SheetDescription className="sr-only">Explore wellbeing practices, workshops, products and volunteering.</SheetDescription>
              <Brand/>
              <nav aria-label="Mobile navigation">
                <Accordion type="single" collapsible className="mobile-menu-accordion">
                  {menuGroups.map(group => group.kind === 'link' ? <div className="mobile-direct-menu-item" key={group.id}>
                    <Destination href={group.href} className="mobile-direct-menu-link" onClick={closeMenus} aria-current={isCurrent(group.href) ? 'page' : undefined}>{group.label}</Destination>
                  </div> : <AccordionItem value={group.id} key={group.id}>
                    <div className="mobile-group-heading">
                      <Destination href={group.href} className="mobile-group-page-link" onClick={closeMenus} aria-current={isCurrent(group.href) ? 'page' : undefined}>{group.label}</Destination>
                      <AccordionTrigger className="mobile-group-trigger mobile-group-toggle" aria-label={`Open ${group.label} submenu`}/>
                    </div>
                    <AccordionContent className="mobile-group-content">
                      <ul>{group.links.map(item => <li key={item.href}><Destination href={item.href} onClick={closeMenus}>{item.label}</Destination></li>)}</ul>
                    </AccordionContent>
                  </AccordionItem>)}
                </Accordion>
              </nav>
              <Link href="/contact/?type=consultation#enquiry" className="button" onClick={closeMenus}>Book a consultation</Link>
              <SocialLinks compact/>
              <p className="mobile-nav-note">Mind · Body · Energy · Soul</p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  </>;
}
