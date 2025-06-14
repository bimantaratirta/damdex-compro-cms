import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "./ui/input";
type InputFileProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl?: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  acceptedFiles?: string;
  sizeLimit?: number;
};

export const InputFile: React.FC<InputFileProps> = ({
  formControl,
  name,
  label,
  placeholder,
  description,
  className,
  acceptedFiles,
  sizeLimit = 10 * 1024 * 1024,
}) => {
  const [filename, setFilename] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              <Input
                id={name}
                name={name}
                placeholder={placeholder}
                type="file"
                className="hidden shadow"
                accept={acceptedFiles ?? "image/*"}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0].size > sizeLimit) {
                    setError(true);
                    return;
                  }
                  field.onChange(e.target.files ? e.target.files[0] : null);
                  setFilename(e.target.files ? e.target.files[0].name : "");
                  setError(false);
                }}
              />
              <div
                id={name}
                className="w-full rounded-lg bg-[#FAFAFA] p-2"
                onDrop={(ev) => ev.preventDefault()}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={(ev) => ev.preventDefault()}
                onDragEnd={(ev) => ev.preventDefault()}
              >
                <label htmlFor={name}>
                  <div className="flex w-full flex-col content-center items-center rounded-lg border border-dashed p-5 text-center hover:cursor-pointer hover:border-lime-500">
                    {filename !== "" && filename}
                    {!filename && "Unggah File"}
                  </div>
                </label>
              </div>
            </div>
          </FormControl>
          <FormDescription className="pl-4 text-xs">{description}</FormDescription>
          <FormMessage className="pl-4 text-xs">
            {error ? "Format file tidak sesuai / ukuran file terlalu besar." : null}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};
