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
  section2TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2TopLeftImage: z.instanceof(File),
  section2TopRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2TopRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2TopRightImage: z.instanceof(File),
  section2BottomLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2BottomLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2BottomLeftImage: z.instanceof(File),
  section2BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2BottomRightImage: z.instanceof(File),
});

export const Section2 = () => {
  //   const router = useRouter();
  //TODO: add data with useEffect
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      section2TopLeftTitle: "",
      section2TopLeftDescription: "",
      section2TopLeftImage: new File([], ""),
      section2TopRightTitle: "",
      section2TopRightDescription: "",
      section2TopRightImage: new File([], ""),
      section2BottomLeftTitle: "",
      section2BottomLeftDescription: "",
      section2BottomLeftImage: new File([], ""),
      section2BottomRightTitle: "",
      section2BottomRightDescription: "",
      section2BottomRightImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const section2 = new FormData();
    section2.append("section2TopLeftImage", values.section2TopLeftImage);
    section2.append("section2TopLeftTitle", values.section2TopLeftTitle);
    section2.append("section2TopLeftDescription", values.section2TopLeftDescription);
    section2.append("section2TopRightImage", values.section2TopRightImage);
    section2.append("section2TopRightTitle", values.section2TopRightTitle);
    section2.append("section2TopRightDescription", values.section2TopRightDescription);
    section2.append("section2BottomLeftImage", values.section2BottomLeftImage);
    section2.append("section2BottomLeftTitle", values.section2BottomLeftTitle);
    section2.append("section2BottomLeftDescription", values.section2BottomLeftDescription);
    section2.append("section2BottomRightImage", values.section2BottomRightImage);
    section2.append("section2BottomRightTitle", values.section2BottomRightTitle);
    section2.append("section2BottomRightDescription", values.section2BottomRightDescription);
    section2.append("sectionNumber", "2");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        <div className="flex flex-col space-y-4 my-2">
          <p>Data Section 2</p>
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
            name="section2TopLeftTitle"
            placeholder="Title Top Left Section 2"
            className="w-full"
            label="Title Top Left Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2TopLeftDescription"
            placeholder="Description Top Left Section 2"
            className="w-full"
            label="Description Top Left Section 2"
          />
          <InputFile
            name="section2TopLeftImage"
            formControl={form.control}
            label="Gambar Top Left Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
          <InputField
            formControl={form.control}
            name="section2TopRightTitle"
            placeholder="Title Top Right Section 2"
            className="w-full"
            label="Title Top Right Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2TopRightDescription"
            placeholder="Description Top Right Section 2"
            className="w-full"
            label="Description Top Right Section 2"
          />
          <InputFile
            name="section2TopRightImage"
            formControl={form.control}
            label="Gambar Top Right Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
          <InputField
            formControl={form.control}
            name="section2BottomLeftTitle"
            placeholder="Title Bottom Left Section 2"
            className="w-full"
            label="Title Bottom Left Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2BottomLeftDescription"
            placeholder="Description Bottom Left Section 2"
            className="w-full"
            label="Description Bottom Left Section 2"
          />
          <InputFile
            name="section2BottomLeftImage"
            formControl={form.control}
            label="Gambar Bottom Left Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
          <InputField
            formControl={form.control}
            name="section2BottomRightTitle"
            placeholder="Title Bottom Right Section 2"
            className="w-full"
            label="Title Bottom Right Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2BottomRightDescription"
            placeholder="Description Bottom Right Section 2"
            className="w-full"
            label="Description Bottom Right Section 2"
          />
          <InputFile
            name="section2BottomRightImage"
            formControl={form.control}
            label="Gambar Bottom Right Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <Button className="mt-10">Edit Section 2</Button>
      </form>
    </Form>
  );
};
