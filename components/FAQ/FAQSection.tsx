import React from 'react';
import { Accordion } from "@/components/ui/accordion";
import FAQItem from './FAQItem';
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <QuestionMarkCircledIcon className="h-8 w-8 text-[#f46f00]" />
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, services, and policies. 
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
