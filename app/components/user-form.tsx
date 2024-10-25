'use client'

import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userFormSchema } from '@/app/actions/schemas';
import type { z } from 'zod';

export type UserFormData = z.infer<typeof userFormSchema>;

interface FormComponentProps {
  form: UseFormReturn<UserFormData>;
  defaultValues: UserFormData;
  onSubmit: (data: UserFormData) => void;
  validationSchema: z.ZodSchema<UserFormData>;
  onChange: () => void;
}

export const UserForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormDescription>
              Enter full name.
            </FormDescription>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error) || ''}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john@example.com" {...field} />
            </FormControl>
            <FormDescription>
              Enter email address.
            </FormDescription>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error) || ''}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="(0X) XXXX XXXX or 04XX XXX XXX" {...field} />
            </FormControl>
            <FormDescription>
              Enter phone number in Australian phone number format.
            </FormDescription>
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {String(fieldState.error) || ''}
              </p>
            )}
          </FormItem>
        )}
      />
    </Form>
  );
};

export default UserForm;
