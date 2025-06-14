import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Control } from "react-hook-form";
import { id } from "date-fns/locale/id";

type DatePickerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl?: Control<any>;
  name: string;
  label?: string;
  description?: string;
  className?: string;
  noNewDate?: boolean;
};

export const Datepicker: React.FC<DatePickerProps> = ({
  formControl,
  name,
  label,
  description,
  className,
  noNewDate,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col space-y-4 ${className}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(`pl-3 text-left font-normal`, !field.value && "text-muted-foreground")}
                >
                  {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  locale={id}
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={noNewDate ? (date) => date > new Date() || date < new Date("1900-01-01") : undefined}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
