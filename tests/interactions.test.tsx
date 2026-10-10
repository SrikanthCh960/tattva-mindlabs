import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {EnquiryForm} from '@/components/enquiry-form';
import {PracticeCatalog} from '@/components/practice-catalog';
import {MediaGrid} from '@/components/media';
import {FAQ} from '@/components/faq';
import {Header} from '@/components/header';
vi.mock('next/navigation',()=>({usePathname:()=>'/'}));
vi.mock('next/image',()=>({default:({fill,priority,sizes,...props}:Record<string,unknown>)=><img {...props}/>}));
afterEach(()=>{cleanup();window.history.replaceState({},'','/')});
describe('Client interactions',()=>{
 it('preselects ANTARAA and prepares the correct user-controlled WhatsApp/email handoff',async()=>{
  window.history.replaceState({},'','/contact/?type=antaraa&interest=ANTARAA#enquiry');
  render(<EnquiryForm/>);const user=userEvent.setup();
  expect((screen.getByLabelText('I’m interested in') as HTMLSelectElement).value).toBe('antaraa');
  expect((screen.getByLabelText('Practice or area of interest') as HTMLSelectElement).value).toBe('ANTARAA');
  expect(screen.queryByText('Your enquiry is ready to send.')).toBeNull();
  await user.type(screen.getByLabelText(/Your name/),'Review Visitor');
  await user.type(screen.getByLabelText(/Mobile number/),'9999999999');
  await user.click(screen.getByRole('button',{name:'Prepare my enquiry'}));
  const link=screen.getByRole('link',{name:'Continue on WhatsApp'}) as HTMLAnchorElement;
  const url=new URL(link.href);expect(url.host).toBe('wa.me');expect(url.pathname).toBe('/919014428518');
  expect(url.searchParams.get('text')).toContain('ANTARAA');expect(url.searchParams.get('text')).toContain('Review Visitor');
  expect(screen.getByText(/hasn’t been sent yet/)).toBeTruthy();
  expect((screen.getByRole('link',{name:'Open email'}) as HTMLAnchorElement).href).toContain('mailto:tattvamindlabs2k@gmail.com');
  await user.type(screen.getByLabelText(/Your name/),' edited');expect(screen.queryByText('Your enquiry is ready to send.')).toBeNull();
 });
 it('preselects a product enquiry from its CTA',()=>{
  window.history.replaceState({},'','/contact/?type=product&interest=Divine%20Vibrance#enquiry');render(<EnquiryForm/>);
  expect((screen.getByLabelText('I’m interested in') as HTMLSelectElement).value).toBe('product');
  expect((screen.getByLabelText('Practice or area of interest') as HTMLSelectElement).value).toBe('Divine Vibrance');
 });
 it('filters all 11 confirmed practices into their three groups',async()=>{
  render(<PracticeCatalog/>);const user=userEvent.setup();
  expect(screen.getAllByRole('article')).toHaveLength(11);
  await user.click(screen.getByRole('tab',{name:'Energy & rituals'}));expect(screen.getAllByRole('article')).toHaveLength(4);
  await user.click(screen.getByRole('tab',{name:'Inner exploration'}));expect(screen.getAllByRole('article')).toHaveLength(3);
  await user.click(screen.getByRole('tab',{name:'Body & lifestyle'}));expect(screen.getAllByRole('article')).toHaveLength(4);
 });
 it('opens the correct media player only on request and removes it when closed',async()=>{
  const {container}=render(<MediaGrid/>);const user=userEvent.setup();expect(container.querySelector('iframe')).toBeNull();
  await user.click(screen.getByRole('button',{name:'Watch Small habits. A more mindful life.'}));
  const iframe=screen.getByTitle('Small habits. A more mindful life.') as HTMLIFrameElement;
  expect(iframe.src).toContain('youtube-nocookie.com/embed/MTLHPN_kEYg');
  await user.click(screen.getByRole('button',{name:'Close'}));await waitFor(()=>expect(screen.queryByTitle('Small habits. A more mindful life.')).toBeNull());
 });
 it('opens and closes accessible mobile navigation',async()=>{
  render(<Header/>);const user=userEvent.setup();await user.click(screen.getByRole('button',{name:'Open navigation'}));
  expect(screen.getByRole('dialog')).toBeTruthy();await user.click(screen.getByRole('button',{name:'Close'}));
  await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());
 });
 it('expands a real FAQ answer',async()=>{render(<FAQ/>);await userEvent.click(screen.getByRole('button',{name:'How are appointments confirmed?'}));expect(screen.getByText(/only after you receive their confirmation/)).toBeTruthy()});
});
