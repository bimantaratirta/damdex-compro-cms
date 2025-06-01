"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { TextEditor } from "@/components/textEditor";
import { postProduct } from "@/repositories/product";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Nama Produk Bahasa Indonesia harus diisi" }),
  descriptionIDN: z.string().min(1, { message: "Konten Produk Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Produk Bahasa Inggris harus diisi" }),
  descriptionENG: z.string().min(1, { message: "Konten Produk Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      descriptionIDN: "",
      titleENG: "",
      descriptionENG: "",
      heroImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formdata = new FormData();
    if (values.heroImage.name === "") {
      toast.error("Gambar Produk belum ada.");
      return;
    }
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("descriptionIDN", values.descriptionIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("descriptionENG", values.descriptionENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await postProduct(formdata);
      toast.success("Produk berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      router.push("/dashboard/product");
    } catch (error) {
      errorHandling(error, "Produk Gagal dibuat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Buat Produk
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Nama Produk Bahasa Indonesia"
            className="w-full"
            label="Nama Produk Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionIDN"
            placeholder="Konten Produk Bahasa Indonesia"
            label="Konten Produk Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Nama Produk Bahasa Inggris"
            className="w-full"
            label="Nama Produk Bahasa Inggris"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionENG"
            placeholder="Konten Produk Bahasa Inggris"
            label="Konten Produk Bahasa Inggris"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Produk"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Produk</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/product");
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
