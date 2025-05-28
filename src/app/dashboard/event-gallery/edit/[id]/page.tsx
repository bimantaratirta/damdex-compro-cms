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
import { patchEventGallery } from "@/repositories/eventGallery";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TextEditor } from "@/components/textEditor";
import { useEventDetail } from "@/swr-hooks/eventGallery/useEventDetail";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Judul Bahasa Indonesia harus diisi" }),
  eventDescriptionIDN: z.string().min(1, { message: "Deskripsi Bahasa Indonesia harus diisi" }),
  eventVenueIDN: z.string().min(1, { message: "Venue Bahasa Indonesia harus diisi" }),
  eventThemeIDN: z.string().min(1, { message: "Tema Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Judul Bahasa Inggris harus diisi" }),
  eventDescriptionENG: z.string().min(1, { message: "Deskripsi Bahasa Inggris harus diisi" }),
  eventVenueENG: z.string().min(1, { message: "Venue Bahasa Inggris harus diisi" }),
  eventThemeENG: z.string().min(1, { message: "Tema Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File).optional(),
  eventDate: z.date({ required_error: "Tanggal event harus diisi" }),
});

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const { id } = React.use(params);
  const { data, loading, mutate } = useEventDetail(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: data?.data.titleIDN ?? "",
      eventDescriptionIDN: data?.data.eventDescriptionIDN ?? "",
      eventVenueIDN: data?.data.eventVenueIDN ?? "",
      eventThemeIDN: data?.data.eventThemeIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      eventDescriptionENG: data?.data.eventDescriptionENG ?? "",
      eventVenueENG: data?.data.eventVenueENG ?? "",
      eventThemeENG: data?.data.eventThemeENG ?? "",
      heroImage: new File([], ""),
      eventDate: data && data.data.eventDate ? new Date(data.data.eventDate) : new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await patchEventGallery(id, formdata);
      toast.success("Event berhasil diubah", { description: "Anda akan segera dikembalikan ke halaman utama." });
      await mutate();
      router.push("/dashboard/event-gallery");
    } catch (error) {
      errorHandling(error, "Event gagal diubah");
    }
  };

  const { reset } = form;

  React.useEffect(() => {
    reset({
      titleIDN: data?.data.titleIDN ?? "",
      eventDescriptionIDN: data?.data.eventDescriptionIDN ?? "",
      eventVenueIDN: data?.data.eventVenueIDN ?? "",
      eventThemeIDN: data?.data.eventThemeIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      eventDescriptionENG: data?.data.eventDescriptionENG ?? "",
      eventVenueENG: data?.data.eventVenueENG ?? "",
      eventThemeENG: data?.data.eventThemeENG ?? "",
      eventDate: data && data.data.eventDate ? new Date(data.data.eventDate) : new Date(),
    });
  }, [loading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Ubah Event {data?.data.titleIDN}
          </p>
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
          <Button>Ubah Event</Button>
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
