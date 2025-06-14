import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Textarea } from "./ui/textarea";

type InputFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl?: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

export const InputArea: React.FC<InputFieldProps> = ({ formControl, name, label, placeholder, description, className }) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} className="shadow" />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
