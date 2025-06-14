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
import { useNewsDetail } from "@/swr-hooks/news/useNewsDetail";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Judul Berita Bahasa Indonesia harus diisi" }),
  contentIDN: z.string().min(1, { message: "Konten Berita Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Judul Berita Bahasa Inggris harus diisi" }),
  contentENG: z.string().min(1, { message: "Konten Berita Bahasa Inggris harus diisi" }),
  titleImage: z.instanceof(File).optional(),
});

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const { id } = React.use(params);
  const { data, loading, mutate } = useNewsDetail(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: data?.data.titleIDN ?? "",
      contentIDN: data?.data.contentIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      contentENG: data?.data.contentENG ?? "",
      titleImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    const formdata = new FormData();
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("contentIDN", values.contentIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("contentENG", values.contentENG);
    if (values.titleImage !== undefined && values.titleImage.name !== "")
      formdata.append("titleImage", values.titleImage);
    try {
      await patchNews(id, formdata);
      toast.success("Berita berhasil diubah", { description: "Anda akan segera dikembalikan ke halaman utama." });
      await mutate();
      router.push("/dashboard/news");
    } catch (error) {
      errorHandling(error, "Berita Gagal diubah");
    }
  };

  React.useEffect(() => {
    form.reset({
      titleIDN: data?.data.titleIDN ?? "",
      contentIDN: data?.data.contentIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      contentENG: data?.data.contentENG ?? "",
      titleImage: new File([], ""),
    });
  }, [loading]);

  if (loading) return <p>loading</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Edit Berita {id}
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Judul Berita Bahasa Indonesia"
            className="w-full"
            label="Judul Berita Bahasa Indonesia"
          />
          <TextEditor
            value={data?.data.contentIDN}
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
            value={data?.data.contentENG}
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
          <Button>Ubah Berita</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/news");
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
