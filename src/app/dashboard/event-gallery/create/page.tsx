"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { Datepicker } from "@/components/datePicker";
import { toast } from "sonner";
import { postEventGallery } from "@/repositories/eventGallery";
import { errorHandling } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TextEditor } from "@/components/textEditor";

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
  const router = useRouter();
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
    if (values.heroImage.name === "") toast.error("Gambar event belum ada.");
    const formdata = new FormData();
    formdata.append("eventDate", values.eventDate.toISOString());
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("eventDescriptionIDN", values.eventDescriptionIDN);
    formdata.append("eventVenueIDN", values.eventVenueIDN);
    formdata.append("eventThemeIDN", values.eventThemeIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("eventDescriptionENG", values.eventDescriptionENG);
    formdata.append("eventVenueENG", values.eventVenueENG);
    formdata.append("eventThemeENG", values.eventThemeENG);
    if (values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await postEventGallery(formdata);
      toast.success("Event berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      setInterval(() => router.push("/event-gallery"), 3000);
    } catch (error) {
      errorHandling(error, "Event gagal dibuat");
    }
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
          <TextEditor
            formControl={form.control}
            name="eventDescriptionIDN"
            placeholder="Deskripsi Event Bahasa Indonesia"
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
          <TextEditor
            formControl={form.control}
            name="eventDescriptionENG"
            placeholder="Deskripsi Event Bahasa Inggris"
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
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Event</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/event-gallery");
            }}
          >
            Kembali
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Page;
