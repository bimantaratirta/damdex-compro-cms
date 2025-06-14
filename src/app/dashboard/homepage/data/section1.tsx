"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputArea } from "@/components/inputArea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { postHome } from "@/repositories/home";
import { errorHandling } from "@/lib/utils";
import { useHome } from "@/swr-hooks/home/useHome";
const dataBahasa = [
  { value: "id", name: "Indonesia" },
  { value: "eng", name: "Inggris" },
];

const formSchema = z.object({
  language: z.string().min(1, { message: "Bahasa harus diisi" }),
  section1Background: z.instanceof(File).optional(),
  section1GifImage: z.instanceof(File).optional(),
  section1Description: z.string().min(1, { message: "Deskripsi harus diisi" }),
});

export const Section1 = () => {
  const router = useRouter();
  const [lang, setLang] = React.useState<string>("id");
  const { data, loading } = useHome({ section: 1, lang: lang });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: lang,
      section1Background: new File([], ""),
      section1GifImage: new File([], ""),
      section1Description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (data?.data.length === 0 && (values.section1Background!.name === "" || values.section1GifImage!.name === "")) {
      toast.error(
        `file gambar harus diupload karena section 1 bahasa ${
          dataBahasa.find((d) => d.value === lang)?.name
        } belum memiliki gambar`
      );
      return;
    }

    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });

    const section1 = new FormData();
    if (values.section1Background !== undefined && values.section1Background.name !== "")
      section1.append("section1Background", values.section1Background);
    if (values.section1GifImage !== undefined && values.section1GifImage.name !== "")
      section1.append("section1GifImage", values.section1GifImage);
    section1.append("section1Description", values.section1Description);
    section1.append("sectionNumber", "1");
    section1.append("language", values.language);

    try {
      await postHome(section1);
      toast.success("Data homepage section 1 berhasil ditambahkan.", {
        description: "Anda akan segera diarahkan ke halaman utama",
      });
      router.push("/dashboard/homepage");
    } catch (error) {
      errorHandling(error, "Data homepage gagal ditambahkan.");
    }
  };

  React.useEffect(() => {
    form.reset({
      language: lang,
      section1Background: new File([], ""),
      section1GifImage: new File([], ""),
      section1Description: data?.data.find((data) => data.key === "section-1-description")?.content ?? "",
    });
  }, [loading, lang]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        <div className="flex flex-col space-y-4 my-2">
          <p>Data Section 1</p>
          <FormField
            control={form.control}
            name={"language"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel>Bahasa</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setLang(value);
                    }}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dataBahasa?.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.value}
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
          <InputFile
            name="section1Background"
            formControl={form.control}
            label="Background Section 1"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
          <InputFile
            name="section1GifImage"
            formControl={form.control}
            label="GIF Section 1"
            className="w-full"
            description="File yang diterima dalam format gif dengan ukuran file tidak lebih dari 10MB."
            acceptedFiles=".gif"
          />
          <InputArea
            formControl={form.control}
            label="Deskripsi Section 1"
            name="section1Description"
            placeholder="Deskripsi Section 1"
            className="w-full"
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Tambah / Ubah Section 1</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/homepage");
            }}
          >
            Kembali
          </Button>
        </div>
      </form>
    </Form>
  );
};
