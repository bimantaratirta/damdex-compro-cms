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
import { Datepicker } from "@/components/datePicker";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Judul Bahasa Indonesia harus diisi" }),
  eventDescriptionIDN: z.string().min(1, { message: "Deskripsi Bahasa Indonesia harus diisi" }),
  eventVenueIDN: z.string().min(1, { message: "Venue Bahasa Indonesia harus diisi" }),
  eventThemeIDN: z.string().min(1, { message: "Tema Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Judul Bahasa Inggris harus diisi" }),
  eventDescriptionENG: z.string().min(1, { message: "Deskripsi Bahasa Inggris harus diisi" }),
  eventVenueENG: z.string().min(1, { message: "Venue Bahasa Inggris harus diisi" }),
  eventThemeENG: z.string().min(1, { message: "Tema Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File),
  eventDate: z.date({ required_error: "Tanggal event harus diisi" }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      eventDescriptionIDN: "",
      eventVenueIDN: "",
      eventThemeIDN: "",
      titleENG: "",
      eventDescriptionENG: "",
      eventVenueENG: "",
      eventThemeENG: "",
      heroImage: new File([], ""),
      eventDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p>Buat Event Baru</p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Judul Event Bahasa Indonesia"
            className="w-full"
            label="Judul Event Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="eventVenueIDN"
            placeholder="Venue Event Bahasa Indonesia"
            className="w-full"
            label="Venue Event Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="eventThemeIDN"
            placeholder="Tema Event Bahasa Indonesia"
            className="w-full"
            label="Tema Event Bahasa Indonesia"
          />
          <InputArea
            formControl={form.control}
            name="eventDescriptionIDN"
            placeholder="Deskripsi Event Bahasa Indonesia"
            className="w-full"
            label="Deskripsi Event Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Judul Event Bahasa Inggris"
            className="w-full"
            label="Judul Event Bahasa Inggris"
          />
          <InputField
            formControl={form.control}
            name="eventVenueENG"
            placeholder="Venue Event Bahasa Inggris"
            className="w-full"
            label="Venue Event Bahasa Inggris"
          />
          <InputField
            formControl={form.control}
            name="eventThemeENG"
            placeholder="Tema Event Bahasa Inggris"
            className="w-full"
            label="Tema Event Bahasa Inggris"
          />
          <InputArea
            formControl={form.control}
            name="eventDescriptionENG"
            placeholder="Deskripsi Event Bahasa Inggris"
            className="w-full"
            label="Deskripsi Event Bahasa Inggris"
          />
          <Datepicker
            noNewDate
            formControl={form.control}
            name="eventDate"
            label="Tanggal Event"
            className="w-full"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Event"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <Button className="mt-10">Buat Event</Button>
      </form>
    </Form>
  );
};

export default Page;
