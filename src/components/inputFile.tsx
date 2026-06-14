import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Control } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
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
  imgUrl?: string;
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
  imgUrl,
}) => {
  const [filename, setFilename] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [img, setImg] = React.useState<string | undefined>(undefined);
  return (
    <>
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
                    setImg(e.target.files ? URL.createObjectURL(e.target.files[0]) : undefined);
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={img === undefined && imgUrl === undefined}
          >
            Preview Gambar
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[30vw]">
          <DialogHeader>
            <DialogTitle>Preview Gambar</DialogTitle>
            <DialogDescription>Preview dari gambar {label}</DialogDescription>
          </DialogHeader>
          {(img !== undefined || imgUrl !== undefined) && (
            <div className="relative w-full h-[400px]">
              <Image
                unoptimized
                fill
                alt="Preview"
                src={img ? img : imgUrl ? imgUrl : ""}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
