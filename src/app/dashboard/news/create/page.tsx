"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { postNews } from "@/repositories/news";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TextEditor } from "@/components/textEditor";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "judul Berita Bahasa Indonesia harus diisi" }),
  contentIDN: z.string().min(1, { message: "Konten Berita Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "judul Berita Bahasa Inggris harus diisi" }),
  contentENG: z.string().min(1, { message: "Konten Berita Bahasa Inggris harus diisi" }),
  titleImage: z.instanceof(File),
});

const Page = () => {
  const router = useRouter();
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
    const formdata = new FormData();
    if (values.titleImage.name === "") {
      toast.error("Gambar berita belum ada.");
      return;
    }
    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("contentIDN", values.contentIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("contentENG", values.contentENG);
    if (values.titleImage !== undefined && values.titleImage.name !== "")
      formdata.append("titleImage", values.titleImage);
    try {
      await postNews(formdata);
      toast.success("Berita berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      router.push("/dashboard/news");
    } catch (error) {
      errorHandling(error, "Berita Gagal Dibuat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Buat Berita Baru
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Judul Berita Bahasa Indonesia"
            className="w-full"
            label="Judul Berita Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="contentIDN"
            placeholder="Konten Berita Bahasa Indonesia"
            label="Konten Berita Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Judul Berita Bahasa Inggris"
            className="w-full"
            label="Judul Berita Bahasa Inggris"
          />
          <TextEditor
            formControl={form.control}
            name="contentENG"
            placeholder="Konten Berita Bahasa Inggris"
            label="Konten Berita Bahasa Inggris"
          />
          <InputFile
            name="titleImage"
            formControl={form.control}
            label="Gambar Berita"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Berita</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/news");
            }}
          >
            Kembali
          </Button>
        </div>
        <div></div>
        {form.control._defaultValues.contentENG}
      </form>
    </Form>
  );
};

export default Page;
