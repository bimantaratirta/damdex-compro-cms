"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputArea } from "@/components/inputArea";
// import { useRouter } from "next/navigation";

const dataBahasa = [
  { value: "id", name: "Indonesia" },
  { value: "eng", name: "Inggris" },
];

const formSchema = z.object({
  language: z.string().min(1, { message: "Bahasa harus diisi" }),
  section1Background: z.instanceof(File),
  section1GifImage: z.instanceof(File),
  section1Description: z.string().min(1, { message: "Deskripsi harus diisi" }),
});

export const Section1 = () => {
  //   const router = useRouter();
  //TODO: add data with useEffect
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      section1Background: new File([], ""),
      section1GifImage: new File([], ""),
      section1Description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        <div className="flex flex-col space-y-4 my-2">
          <p>Data Section 1</p>
          <FormField
            control={form.control}
            name={"language"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel>Bahasa</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dataBahasa?.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.value}
                          >
                            {val.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputFile
            name="section1Background"
            formControl={form.control}
            label="Background Section 1"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
          <InputFile
            name="section1GifImage"
            formControl={form.control}
            label="Background Section 1"
            className="w-full"
            description="File yang diterima dalam format gif dengan ukuran file tidak lebih dari 5MB."
            acceptedFiles=".gif"
          />
          <InputArea
            formControl={form.control}
            label="Deskripsi Section 1"
            name="section1Description"
            placeholder="Deskripsi Section 1"
            className="w-full"
          />
        </div>
        <Button className="mt-10">Edit Section 1</Button>
      </form>
    </Form>
  );
};
