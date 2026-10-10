'use client';
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from '@/components/ui/accordion';import {faqs} from '@/lib/content';
export function FAQ({compact=false}:{compact?:boolean}){return <Accordion type="single" collapsible className="faq-list">{(compact?faqs.slice(0,3):faqs).map((faq,i)=><AccordionItem value={`question-${i}`} key={faq.q} className="faq-item"><AccordionTrigger className="faq-question">{faq.q}</AccordionTrigger><AccordionContent className="faq-answer">{faq.a}</AccordionContent></AccordionItem>)}</Accordion>}
