import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category }) => {
  // Use a sanitized version of the question as the value
  const itemValue = question.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  return (
    <AccordionItem value={itemValue}>
      <AccordionTrigger>
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-[#f46f00]" />
          <span className="text-lg font-medium">{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#f3a43c] font-medium">{category}</span>
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
