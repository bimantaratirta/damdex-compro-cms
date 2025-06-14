"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TextEditor } from "@/components/textEditor";
import { postProject } from "@/repositories/project";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "judul Projek Bahasa Indonesia harus diisi" }),
  firstDescriptionIDN: z.string().min(1, { message: "Konten Projek Bahasa Indonesia harus diisi" }),
  secondDescriptionIDN: z.string().min(1, { message: "Konten Projek Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "judul Projek Bahasa Inggris harus diisi" }),
  firstDescriptionENG: z.string().min(1, { message: "Konten Projek Bahasa Indonesia harus diisi" }),
  secondDescriptionENG: z.string().min(1, { message: "Konten Projek Bahasa Indonesia harus diisi" }),
  heroImage: z.instanceof(File),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      firstDescriptionIDN: "",
      secondDescriptionIDN: "",
      titleENG: "",
      firstDescriptionENG: "",
      secondDescriptionENG: "",
      heroImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formdata = new FormData();
    if (values.heroImage.name === "") {
      toast.error("Gambar Projek belum ada.");
      return;
    }
    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("firstDescriptionIDN", values.firstDescriptionIDN);
    formdata.append("secondDescriptionIDN", values.secondDescriptionIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("firstDescriptionENG", values.firstDescriptionENG);
    formdata.append("secondDescriptionENG", values.secondDescriptionENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await postProject(formdata);
      toast.success("Projek berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      router.push("/dashboard/project");
    } catch (error) {
      errorHandling(error, "Projek Gagal Dibuat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Buat Projek Baru
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Judul Projek Bahasa Indonesia"
            className="w-full"
            label="Judul Projek Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="firstDescriptionIDN"
            placeholder="Konten Pertama Projek Bahasa Indonesia"
            label="Konten Pertama Projek Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="secondDescriptionIDN"
            placeholder="Konten Kedua Projek Bahasa Indonesia"
            label="Konten Kedua Projek Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Judul Projek Bahasa Inggris"
            className="w-full"
            label="Judul Projek Bahasa Inggris"
          />
          <TextEditor
            formControl={form.control}
            name="firstDescriptionENG"
            placeholder="Konten Pertama Projek Bahasa Indonesia"
            label="Konten Pertama Projek Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="secondDescriptionENG"
            placeholder="Konten Kedua Projek Bahasa Indonesia"
            label="Konten Kedua Projek Bahasa Indonesia"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Projek"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Projek</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/project");
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
