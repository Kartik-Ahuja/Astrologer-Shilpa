import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { FAQS } from "../data";

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center">
          <div className="section-label justify-center"><span>FAQ</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Frequently asked <span className="gold-text italic">questions</span>
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-beige-200/60 data-[state=open]:border-gold/30"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-xl text-ink hover:text-gold-dark hover:no-underline data-[state=open]:text-gold-dark">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-ink-muted text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
