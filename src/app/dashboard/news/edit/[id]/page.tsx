"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { patchNews } from "@/repositories/news";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { TextEditor } from "@/components/textEditor";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Judul Berita Bahasa Indonesia harus diisi" }),
  contentIDN: z.string().min(1, { message: "Konten Berita Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Judul Berita Bahasa Inggris harus diisi" }),
  contentENG: z.string().min(1, { message: "Konten Berita Bahasa Inggris harus diisi" }),
  titleImage: z.instanceof(File).optional(),
});

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = React.use(params);
  //TODO: add data with useEffect
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
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("contentIDN", values.contentIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("contentENG", values.contentENG);
    if (values.titleImage !== undefined && values.titleImage.name !== "")
      formdata.append("titleImage", values.titleImage);
    try {
      await patchNews(id, formdata);
      console.log(values);
      toast.success("Berita berhasil diubah", { description: "Anda akan segera dikembalikan ke halaman utama." });
      setInterval(() => router.push("/news"), 3000);
    } catch (error) {
      errorHandling(error, "Berita Gagal diubah");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p>Edit Berita {id}</p>
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
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <Button className="mt-10">Edit Berita</Button>
      </form>
    </Form>
  );
};

export default Page;
