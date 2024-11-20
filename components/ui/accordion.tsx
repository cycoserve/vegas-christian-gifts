"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, type = "single", collapsible = false, ...props }, ref) => (
    <div
      ref={ref}
      data-type={type}
      data-collapsible={collapsible}
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  )
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      data-value={value}
      className={cn("border-b", className)}
      {...props}
    />
  )
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
