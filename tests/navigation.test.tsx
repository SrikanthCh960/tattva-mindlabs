import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {act, cleanup, fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Header} from '@/components/header';
import {PracticeCatalog} from '@/components/practice-catalog';

vi.mock('next/navigation', () => ({usePathname: () => '/services/'}));
vi.mock('next/image', () => ({default: ({fill, priority, sizes, ...props}: Record<string, unknown>) => <img {...props}/>}));

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', class {observe() {} unobserve() {} disconnect() {}});
  vi.stubGlobal('PointerEvent', class extends MouseEvent {
    pointerType: string;
    constructor(type: string, init: PointerEventInit = {}) {super(type, init); this.pointerType = init.pointerType || 'mouse';}
  });
});
afterEach(() => {cleanup(); window.history.replaceState({}, '', '/');});

describe('Photographic navigation', () => {
  const destinations = [
    ['About Us', '/about/'], ['Services', '/services/'],
    ['Workshop', '/programs/'], ['Products', '/products/'],
  ] as const;

  it('links each desktop title directly to its page and keeps its submenu on a separate button', async () => {
    render(<Header/>);
    const user = userEvent.setup();
    const nav = within(screen.getByRole('navigation', {name: 'Main navigation'}));
    for (const [name, href] of destinations) {
      const link = nav.getByRole('link', {name});
      const toggle = nav.getByRole('button', {name: `Open ${name} submenu`});
      expect(link.getAttribute('href')?.replace(/\/$/, '')).toBe(href.replace(/\/$/, ''));
      expect(link.hasAttribute('aria-expanded')).toBe(false);
      expect(link.closest('button')).toBeNull();
      await user.click(toggle);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      // Inspect the native destination and close behavior without leaving jsdom.
      link.addEventListener('click', event => event.preventDefault());
      await user.click(link);
      await waitFor(() => expect(toggle.getAttribute('aria-expanded')).toBe('false'));
    }
  });

  it('opens a submenu from its keyboard control and returns focus after Escape', async () => {
    render(<Header/>);
    const user = userEvent.setup();
    const nav = within(screen.getByRole('navigation', {name: 'Main navigation'}));
    const toggle = nav.getByRole('button', {name: 'Open About Us submenu'});
    toggle.focus();
    await user.keyboard('[Space]');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(document.activeElement).toBe(nav.getByRole('link', {name: 'Our philosophy'})));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(toggle.getAttribute('aria-expanded')).toBe('false'));
    expect(document.activeElement).toBe(toggle);
  });

  it('keeps all four mobile page titles separate from their expandable submenu controls', async () => {
    render(<Header/>);
    const user = userEvent.setup();
    for (const [name, href] of destinations) {
      await user.click(screen.getByRole('button', {name: 'Open navigation'}));
      const dialog = within(screen.getByRole('dialog'));
      const link = dialog.getByRole('link', {name});
      const toggle = dialog.getByRole('button', {name: `Open ${name} submenu`});
      expect(link.getAttribute('href')?.replace(/\/$/, '')).toBe(href.replace(/\/$/, ''));
      expect(link.closest('button')).toBeNull();
      await user.click(toggle);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      link.addEventListener('click', event => event.preventDefault());
      await user.click(link);
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    }
  });

  it('opens on hover, switches groups, and supports keyboard entry and Escape', async () => {
    render(<Header/>);
    const user = userEvent.setup();
    const nav = within(screen.getByRole('navigation', {name: 'Main navigation'}));
    const services = nav.getByRole('button', {name: 'Open Services submenu'});
    const servicesLink = nav.getByRole('link', {name: 'Services'});
    fireEvent.pointerEnter(servicesLink, {pointerType: 'mouse'});
    fireEvent.pointerMove(servicesLink, {pointerType: 'mouse'});
    await waitFor(() => expect(services.getAttribute('aria-expanded')).toBe('true'));
    expect(nav.getByRole('link', {name: /Energy & stillness/}).getAttribute('href')).toMatch(/^\/services\/reiki-healing\/?$/);
    const products = nav.getByRole('button', {name: 'Open Products submenu'});
    fireEvent.pointerLeave(services, {pointerType: 'mouse'});
    fireEvent.pointerEnter(products, {pointerType: 'mouse'});
    fireEvent.pointerMove(products, {pointerType: 'mouse'});
    await waitFor(() => expect(products.getAttribute('aria-expanded')).toBe('true'));
    expect(nav.getByRole('link', {name: /Artisanal Bath Salts A moment/}).getAttribute('href')).toBe('/products/#bath-salts');
    expect(nav.queryByRole('link', {name: /Energy & stillness/})).toBeNull();
    products.focus();
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(document.activeElement).toBe(nav.getByRole('link', {name: 'Explore the collection'})));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(products.getAttribute('aria-expanded')).toBe('false'));
    expect(document.activeElement).toBe(products);
  });

  it('places volunteering under About Us and keeps Explore and Contact Us as direct mobile links', async () => {
    render(<Header/>);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: 'Open navigation'}));
    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.queryByRole('button', {name: 'Explore'})).toBeNull();
    expect(dialog.queryByRole('button', {name: 'Contact Us'})).toBeNull();
    expect(dialog.getByRole('link', {name: 'Explore'}).getAttribute('href')).toMatch(/^\/explore\/?$/);
    expect(dialog.getByRole('link', {name: 'Contact Us'}).getAttribute('href')).toMatch(/^\/contact\/?$/);
    await user.click(dialog.getByRole('button', {name: 'Open About Us submenu'}));
    const interest = dialog.getByRole('link', {name: 'Volunteering'});
    expect(interest.getAttribute('href')).toMatch(/^\/volunteering\/?$/);
    // Keep jsdom from attempting a page navigation while exercising the close handler.
    interest.addEventListener('click', event => event.preventDefault());
    await user.click(interest);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('keeps panels populated on repeated hover switches and closes them over direct links', async () => {
    const {container} = render(<Header/>);
    const nav = within(screen.getByRole('navigation', {name: 'Main navigation'}));
    expect(nav.getAllByRole('button').map(button => button.getAttribute('aria-label'))).toEqual(['Open About Us submenu', 'Open Services submenu', 'Open Workshop submenu', 'Open Products submenu']);
    expect(nav.queryByRole('button', {name: 'Volunteering'})).toBeNull();
    let previous: HTMLElement | null = null;
    for (const name of ['About Us', 'Services', 'Products', 'About Us', 'Workshop', 'Products', 'About Us']) {
      if (previous) fireEvent.pointerLeave(previous, {pointerType: 'mouse'});
      const trigger = nav.getByRole('button', {name: `Open ${name} submenu`});
      fireEvent.pointerEnter(trigger, {pointerType: 'mouse'});
      fireEvent.pointerMove(trigger, {pointerType: 'mouse'});
      await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'));
      const panel = container.querySelector('.mega-menu-content[data-state="open"]');
      expect(panel?.querySelectorAll('.mega-feature').length).toBeGreaterThan(0);
      expect(within(panel as HTMLElement).getByRole('heading', {name})).toBeTruthy();
      previous = trigger;
    }
    expect(nav.getByRole('link', {name: 'Volunteering'}).getAttribute('href')).toMatch(/^\/volunteering\/?$/);
    for (const name of ['Explore', 'Contact Us']) {
      const link = nav.getByRole('link', {name});
      expect(link.hasAttribute('aria-expanded')).toBe(false);
      fireEvent.pointerEnter(link, {pointerType: 'mouse'});
      await waitFor(() => expect(container.querySelector('.mega-menu-content[data-state="open"]')).toBeNull());
    }
  });

  it('updates service filters when following a menu hash on the current page', async () => {
    window.history.replaceState({}, '', '/services/#energy');
    render(<PracticeCatalog/>);
    const user = userEvent.setup();
    expect(screen.getByRole('tab', {name: 'Energy & rituals'}).getAttribute('aria-selected')).toBe('true');
    await user.click(screen.getByRole('tab', {name: 'Body & lifestyle'}));
    expect(window.location.hash).toBe('#body');
    act(() => {window.history.replaceState({}, '', '/services/#exploration'); window.dispatchEvent(new HashChangeEvent('hashchange'));});
    expect(screen.getByRole('tab', {name: 'Inner exploration'}).getAttribute('aria-selected')).toBe('true');
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
