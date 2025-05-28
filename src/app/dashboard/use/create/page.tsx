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
import { postUse } from "@/repositories/use";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Nama Kegunaan Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Kegunaan Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      titleENG: "",
      heroImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formdata = new FormData();
    if (values.heroImage.name === "") {
      toast.error("Gambar Kegunaan belum ada.");
      return;
    }
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("titleENG", values.titleENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await postUse(formdata);
      toast.success("Kegunaan berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      router.push("/dashboard/use");
    } catch (error) {
      errorHandling(error, "Kegunaan Gagal dibuat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Buat Kegunaan
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Nama Kegunaan Bahasa Indonesia"
            className="w-full"
            label="Nama Kegunaan Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Nama Kegunaan Bahasa Inggris"
            className="w-full"
            label="Nama Kegunaan Bahasa Inggris"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Kegunaan"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Kegunaan</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/use");
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
