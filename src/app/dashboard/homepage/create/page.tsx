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
  section1Background: z.instanceof(File),
  section1GifImage: z.instanceof(File),
  section1Description: z.string().min(1, { message: "Deskripsi harus diisi" }),
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
  section3TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3TopLeftImage: z.instanceof(File),
  section3BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3BottomRightImage: z.instanceof(File),
});

const Page = () => {
  //   const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      section1Background: new File([], ""),
      section1GifImage: new File([], ""),
      section1Description: "",
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
    <>
      <p>Create Homepage Data</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="flex flex-col space-y-4 my-2">
            <p>Data Section 1</p>
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
            <p>Data Section 2</p>
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
            <p>Section 3</p>
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
          <Button className="mt-10">Input data Home Page</Button>
        </form>
      </Form>
    </>
  );
};

export default Page;
