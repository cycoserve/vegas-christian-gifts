import React from 'react';

interface CheckoutStepsProps {
  currentStep?: number;
  className?: string;
}

export function CheckoutSteps({ currentStep = 1, className = '' }: CheckoutStepsProps) {
  const steps = ['Your Cart', 'Details', 'Shipping', 'Payment', 'Complete'];

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-4 px-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${index + 1 === currentStep ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-500'}`}>
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500 whitespace-nowrap">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden sm:block w-12 h-0.5 bg-gray-300 ml-4"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
