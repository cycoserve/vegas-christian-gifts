import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/Input';
import { useToast } from '../ui/use-toast';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingAddressFormProps {
  onSubmit: (data: ShippingFormData) => void;
  initialData?: Partial<ShippingFormData>;
  submitLabel?: string;
  className?: string;
}

export function ShippingAddressForm({
  onSubmit,
  initialData,
  submitLabel = 'Save Address',
  className = '',
}: ShippingAddressFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: 'United States',
      ...initialData
    },
  });

  const onSubmitForm = async (data: ShippingFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: "Address saved",
        description: "Your shipping address has been saved successfully",
        duration: 2000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save address. Please try again.",
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={`space-y-6 ${className}`}>
      <div>
        <select
          {...register('country')}
          className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
            ${errors.country ? 'border-red-300' : 'border-gray-200'}`}
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('fullName')}
          placeholder="Full Name"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
            ${errors.fullName ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('addressLine1')}
          placeholder="Address"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
            ${errors.addressLine1 ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.addressLine1 && (
          <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('addressLine2')}
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <Input
            {...register('city')}
            placeholder="City"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
              ${errors.city ? 'border-red-300' : 'border-gray-200'}`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <select
            {...register('state')}
            className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
              ${errors.state ? 'border-red-300' : 'border-gray-200'}`}
          >
            <option value="">State</option>
            <option value="Arizona">Arizona</option>
            <option value="California">California</option>
            <option value="Nevada">Nevada</option>
            <option value="Texas">Texas</option>
            <option value="Florida">Florida</option>
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <Input
            {...register('zipCode')}
            placeholder="ZIP code"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
              ${errors.zipCode ? 'border-red-300' : 'border-gray-200'}`}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          {...register('phone')}
          placeholder="Phone"
          type="tel"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
            ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}