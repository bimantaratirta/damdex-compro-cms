"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
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
  section3TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3TopLeftImage: z.instanceof(File),
  section3BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3BottomRightImage: z.instanceof(File),
});

export const Section3 = () => {
  //   const router = useRouter();
  //TODO: add data with useEffect
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      section3TopLeftTitle: "",
      section3TopLeftDescription: "",
      section3TopLeftImage: new File([], ""),
      section3BottomRightTitle: "",
      section3BottomRightDescription: "",
      section3BottomRightImage: new File([], ""),
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
          <p>Section 3</p>
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
          <InputField
            formControl={form.control}
            name="section3TopLeftTitle"
            placeholder="Title Top Section 3"
            className="w-full"
            label="Title Top Section 3"
          />
          <InputArea
            formControl={form.control}
            name="section3TopLeftDescription"
            placeholder="Description Top Section 3"
            className="w-full"
            label="Description Top Section 3"
          />
          <InputFile
            name="section3TopLeftImage"
            formControl={form.control}
            label="Gambar Top Section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
          <InputField
            formControl={form.control}
            name="section3BottomRightTitle"
            placeholder="Title Bottom Section 3"
            className="w-full"
            label="Title Bottom Section 3"
          />
          <InputArea
            formControl={form.control}
            name="section3BottomRightDescription"
            placeholder="Description Bottom Section 3"
            className="w-full"
            label="Description Bottom Section 3"
          />
          <InputFile
            name="section3BottomRightImage"
            formControl={form.control}
            label="Gambar Bottom Section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <Button className="mt-10">Edit Section 3</Button>
      </form>
    </Form>
  );
};
