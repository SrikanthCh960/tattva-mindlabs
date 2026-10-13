import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AntaraaSticky} from '@/components/antaraa-sticky';

const route = vi.hoisted(() => ({pathname: '/'}));
vi.mock('next/navigation', () => ({usePathname: () => route.pathname}));
vi.mock('next/image', () => ({default: ({fill, sizes, ...props}: Record<string, unknown>) => <img {...props}/>}));

beforeEach(() => {route.pathname = '/'; window.sessionStorage.clear();});
afterEach(() => {cleanup(); vi.restoreAllMocks(); window.sessionStorage.clear();});

describe('ANTARAA floating invitation', () => {
  it('opens the workshop page or a preselected enquiry and stays dismissed for the session', async () => {
    const user = userEvent.setup();
    const view = render(<AntaraaSticky/>);
    expect(screen.getByRole('link', {name: 'Discover ANTARAA'}).getAttribute('href')).toMatch(/^\/programs\/antaraa\/?$/);
    const enquiry = new URL((screen.getByRole('link', {name: /Express your interest/}) as HTMLAnchorElement).href);
    expect(enquiry.pathname).toMatch(/^\/contact\/?$/);
    expect(enquiry.searchParams.get('type')).toBe('antaraa');
    expect(enquiry.searchParams.get('interest')).toBe('ANTARAA');
    expect(enquiry.hash).toBe('#enquiry');
    await user.click(screen.getByRole('button', {name: 'Close ANTARAA invitation'}));
    expect(screen.queryByRole('complementary')).toBeNull();
    view.unmount(); route.pathname = '/about/'; render(<AntaraaSticky/>);
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('keeps the enquiry and ANTARAA pages clear while returning on other pages', () => {
    route.pathname = '/contact/'; const view = render(<AntaraaSticky/>);
    expect(screen.queryByRole('complementary')).toBeNull();
    route.pathname = '/programs/antaraa/'; view.rerender(<AntaraaSticky/>);
    expect(screen.queryByRole('complementary')).toBeNull();
    route.pathname = '/services/'; view.rerender(<AntaraaSticky/>);
    expect(screen.getByRole('complementary', {name: 'ANTARAA workshop invitation'})).toBeTruthy();
  });

  it('can be closed with Escape even when browser storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {throw new Error('Storage blocked');});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {throw new Error('Storage blocked');});
    render(<AntaraaSticky/>);
    screen.getByRole('button', {name: 'Close ANTARAA invitation'}).focus();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('complementary')).toBeNull();
  });
});
