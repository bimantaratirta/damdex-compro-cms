"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { TextEditor } from "@/components/textEditor";
import { postProductAdvantage } from "@/repositories/product";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProductOptions } from "@/swr-hooks/product/useProductOption";

const formSchema = z.object({
  productId: z.string().min(1, { message: "Id Produk harus diisi" }),
  titleIDN: z.string().min(1, { message: "Nama Kelebihan Produk Bahasa Indonesia harus diisi" }),
  descriptionIDN: z.string().min(1, { message: "Deskripsi Kelebihan Produk Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Kelebihan Produk Bahasa Inggris harus diisi" }),
  descriptionENG: z.string().min(1, { message: "Deskripsi Kelebihan Produk Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File),
});

const Page = () => {
  const { data: product, loading: productLoading } = useProductOptions();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
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
      toast.error("Gambar Kelebihan Produk belum ada.");
      return;
    }
    formdata.append("productId", values.productId);
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("descriptionIDN", values.descriptionIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("descriptionENG", values.descriptionENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await postProductAdvantage(formdata);
      toast.success("Kelebihan Produk berhasil diubah", {
        description: "Anda akan segera dikembalikan ke halaman utama.",
      });
      router.push("/dashboard/product-advantage");
    } catch (error) {
      errorHandling(error, "Kelebihan Produk Gagal diubah");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Buat Kelebihan Produk
          </p>
          <FormField
            control={form.control}
            name={"productId"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel>Produk</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {product?.data.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.id.toString()}
                          >
                            {val.titleIDN}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Nama Kelebihan Produk Bahasa Indonesia"
            className="w-full"
            label="Nama Kelebihan Produk Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionIDN"
            placeholder="Deskripsi Kelebihan Produk Bahasa Indonesia"
            label="Deskripsi Kelebihan Produk Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Nama Kelebihan Produk Bahasa Inggris"
            className="w-full"
            label="Nama Kelebihan Produk Bahasa Inggris"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionENG"
            placeholder="Deskripsi Kelebihan Produk Bahasa Inggris"
            label="Deskripsi Kelebihan Produk Bahasa Inggris"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Kelebihan Produk"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Kelebihan Produk</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/product-advantage");
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
