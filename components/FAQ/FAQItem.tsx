import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category }) => {
  return (
    <AccordionItem value={question} className="border-b border-gray-200">
      <AccordionTrigger className="flex items-center gap-4 py-6 text-left hover:no-underline">
        <div className="flex items-center gap-3">
          <QuestionMarkCircledIcon className="h-5 w-5 text-[#f46f00]" />
          <span className="text-lg font-medium">{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="py-4 px-12">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#f3a43c] font-medium">{category}</span>
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
