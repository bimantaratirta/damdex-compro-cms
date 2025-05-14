"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { TextEditor } from "@/components/textEditor";
import { postUseComposition } from "@/repositories/useComposition";
import { useUsageOptions } from "@/swr-hooks/usage/useUsageOptions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  titleIDN: z.string().min(1, { message: "Nama Komposisi Bahasa Indonesia harus diisi" }),
  descriptionIDN: z.string().min(1, { message: "Konten Komposisi Bahasa Indonesia harus diisi" }),
  titleENG: z.string().min(1, { message: "Nama Komposisi Bahasa Inggris harus diisi" }),
  descriptionENG: z.string().min(1, { message: "Konten Komposisi Bahasa Inggris harus diisi" }),
  useId: z.string().min(1, { message: "Nama Komposisi Bahasa Indonesia harus diisi" }),
});

const Page = () => {
  const { data } = useUsageOptions();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleIDN: "",
      descriptionIDN: "",
      titleENG: "",
      descriptionENG: "",
      useId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await postUseComposition({
        useId: Number(values.useId),
        titleENG: values.titleENG,
        titleIDN: values.titleIDN,
        descriptionENG: values.descriptionENG,
        descriptionIDN: values.descriptionIDN,
      });
      toast.success("Komposisi berhasil dibuat", { description: "Anda akan segera dikembalikan ke halaman utama." });
      setInterval(() => router.push("/dashboard/use-composition"), 3000);
    } catch (error) {
      errorHandling(error, "Komposisi Gagal dibuat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"useId"}
          render={({ field }) => (
            <FormItem className={"flex flex-col"}>
              <FormLabel>ID kegunaan</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value.toString()}
                  onValueChange={(value) => field.onChange(value)}
                  {...field}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ID kegunaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {data?.data.map((val, idx) => (
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
        <div className="flex flex-col space-y-4 my-2">
          <p>Buat Komposisi</p>
          <InputField
            formControl={form.control}
            name="titleIDN"
            placeholder="Nama Komposisi Bahasa Indonesia"
            className="w-full"
            label="Nama Komposisi Bahasa Indonesia"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionIDN"
            placeholder="Konten Komposisi Bahasa Indonesia"
            label="Konten Komposisi Bahasa Indonesia"
          />
          <InputField
            formControl={form.control}
            name="titleENG"
            placeholder="Nama Komposisi Bahasa Inggris"
            className="w-full"
            label="Nama Komposisi Bahasa Inggris"
          />
          <TextEditor
            formControl={form.control}
            name="descriptionENG"
            placeholder="Konten Komposisi Bahasa Inggris"
            label="Konten Komposisi Bahasa Inggris"
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Buat Komposisi</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/use-composition");
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
