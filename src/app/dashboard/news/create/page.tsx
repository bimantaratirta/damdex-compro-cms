"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { InputArea } from "@/components/inputArea";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "judul Berita Bahasa Indonesia harus diisi" }),
  contentIDN: z.string().min(1, { message: "Konten Berita Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "judul Berita Bahasa Inggris harus diisi" }),
  contentENG: z.string().min(1, { message: "Konten Berita Bahasa Inggris harus diisi" }),
  titleImage: z.instanceof(File),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      contentIDN: "",
      titleENG: "",
      contentENG: "",
      titleImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p>Buat Berita Baru</p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Judul Berita Bahasa Indonesia"
            className="w-full"
            label="Judul Berita Bahasa Indonesia"
          />
          <InputArea
            formControl={form.control}
            name="contentIDN"
            placeholder="Konten Berita Bahasa Indonesia"
            className="w-full"
            label="Konten Berita Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Judul Berita Bahasa Inggris"
            className="w-full"
            label="Judul Berita Bahasa Inggris"
          />
          <InputArea
            formControl={form.control}
            name="contentENG"
            placeholder="Konten Berita Bahasa Inggris"
            className="w-full"
            label="Konten Berita Bahasa Inggris"
          />
          <InputFile
            name="titleImage"
            formControl={form.control}
            label="Gambar Berita"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <Button className="mt-10">Buat Berita</Button>
      </form>
    </Form>
  );
};

export default Page;
