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
import { patchProduct } from "@/repositories/product";
import { useProductDetail } from "@/swr-hooks/product/useProductDetail";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Nama Produk Bahasa Indonesia harus diisi" }),
  descriptionIDN: z.string().min(1, { message: "Deskripsi Produk Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Produk Bahasa Inggris harus diisi" }),
  descriptionENG: z.string().min(1, { message: "Konten Produk Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File).optional(),
});

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const { id } = React.use(params);
  const { data, loading, mutate } = useProductDetail(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: data?.data.titleIDN ?? "",
      descriptionIDN: data?.data.descriptionIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      descriptionENG: data?.data.descriptionENG ?? "",
      heroImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    const formdata = new FormData();
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("descriptionIDN", values.descriptionIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("descriptionENG", values.descriptionENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await patchProduct(id, formdata);
      toast.success("Produk berhasil diubah", { description: "Anda akan segera dikembalikan ke halaman utama." });
      await mutate();
      router.push("/dashboard/product");
    } catch (error) {
      errorHandling(error, "Produk Gagal diubah");
    }
  };

  React.useEffect(() => {
    form.reset({
      titleIDN: data?.data.titleIDN ?? "",
      descriptionIDN: data?.data.descriptionIDN ?? "",
      titleENG: data?.data.titleENG ?? "",
      descriptionENG: data?.data.descriptionENG ?? "",
      heroImage: new File([], ""),
    });
  }, [loading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Ubah Produk {data?.data.titleIDN}
          </p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Nama Produk Bahasa Indonesia"
            className="w-full"
            label="Nama Produk Bahasa Indonesia"
          />
          <TextEditor
            value={data?.data.descriptionIDN}
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
            value={data?.data.descriptionENG}
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
          <Button>Ubah Produk</Button>
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
