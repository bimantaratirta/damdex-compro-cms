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
import { patchProductAdvantage } from "@/repositories/product";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  productId: z.string().min(1, { message: "Id Produk harus diisi" }),
  titleIDN: z.string().min(1, { message: "Nama Kelebihan Produk Bahasa Indonesia harus diisi" }),
  contentIDN: z.string().min(1, { message: "Konten Kelebihan Produk Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Kelebihan Produk Bahasa Inggris harus diisi" }),
  contentENG: z.string().min(1, { message: "Konten Kelebihan Produk Bahasa Inggris harus diisi" }),
  heroImage: z.instanceof(File),
});

const data = [
  { id: "id1", name: "Product 1" },
  { id: "id2", name: "Product 2" },
];

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const router = useRouter();
  //TODO: add data with useEffect
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      titleIDN: "",
      contentIDN: "",
      titleENG: "",
      contentENG: "",
      heroImage: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formdata = new FormData();
    formdata.append("productId", values.productId);
    formdata.append("titleIDN", values.titleIDN);
    formdata.append("contentIDN", values.contentIDN);
    formdata.append("titleENG", values.titleENG);
    formdata.append("contentENG", values.contentENG);
    if (values.heroImage !== undefined && values.heroImage.name !== "") formdata.append("heroImage", values.heroImage);
    try {
      await patchProductAdvantage(id, formdata);
      toast.success("Kelebihan Produk berhasil diubah", {
        description: "Anda akan segera dikembalikan ke halaman utama.",
      });
      setInterval(() => router.push("/news"), 3000);
    } catch (error) {
      errorHandling(error, "Kelebihan Produk Gagal diubah");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p>Edit Kelebihan Produk {id}</p>
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
                        {data?.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.id}
                          >
                            {val.name}
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
            name="contentIDN"
            placeholder="Konten Kelebihan Produk Bahasa Indonesia"
            label="Konten Kelebihan Produk Bahasa Indonesia"
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
            name="contentENG"
            placeholder="Konten Kelebihan Produk Bahasa Inggris"
            label="Konten Kelebihan Produk Bahasa Inggris"
          />
          <InputFile
            name="heroImage"
            formControl={form.control}
            label="Gambar Kelebihan Produk"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 5MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Ubah Kelebihan Produk</Button>
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
