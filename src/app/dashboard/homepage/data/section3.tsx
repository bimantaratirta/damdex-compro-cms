"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/inputFile";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputArea } from "@/components/inputArea";
import { useRouter } from "next/navigation";
import { postHome } from "@/repositories/home";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { useHome } from "@/swr-hooks/home/useHome";

const dataBahasa = [
  { value: "id", name: "Indonesia" },
  { value: "eng", name: "Inggris" },
];

const formSchema = z.object({
  language: z.string().min(1, { message: "Bahasa harus diisi" }),
  section3TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3CenterTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section3ImageBackground: z.instanceof(File).optional(),
  section3ImageBackground2: z.instanceof(File).optional(),
});

export const Section3 = () => {
  const router = useRouter();
  const [lang, setLang] = React.useState<string>("id");
  const { data, loading } = useHome({ section: 3, lang: lang });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: lang,
      section3TopLeftTitle: "",
      section3TopLeftDescription: "",
      section3CenterTitle: "",
      section3BottomRightTitle: "",
      section3BottomRightDescription: "",
      section3ImageBackground: new File([], ""),
      section3ImageBackground2: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (
      data?.data.length === 0 &&
      (values.section3ImageBackground!.name === "" || values.section3ImageBackground2!.name === "")
    ) {
      toast.error(
        `file gambar harus diupload karena section 3 bahasa ${
          dataBahasa.find((d) => d.value === lang)?.name
        } belum memiliki gambar`
      );
      return;
    }

    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    const section3 = new FormData();
    section3.append("section3TopLeftTitle", values.section3TopLeftTitle);
    section3.append("section3TopLeftDescription", values.section3TopLeftDescription);
    section3.append("section3CenterTitle", values.section3CenterTitle);
    section3.append("section3BottomRightTitle", values.section3BottomRightTitle);
    section3.append("section3BottomRightDescription", values.section3BottomRightDescription);
    section3.append("sectionNumber", "3");
    if (values.section3ImageBackground !== undefined && values.section3ImageBackground.name !== "")
      section3.append("section3ImageBackground", values.section3ImageBackground);
    if (values.section3ImageBackground2 !== undefined && values.section3ImageBackground2.name !== "")
      section3.append("section3ImageBackground2", values.section3ImageBackground2);
    section3.append("language", values.language);

    try {
      await postHome(section3);
      toast.success("Data homepage berhasil ditambahkan.", {
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
      section3TopLeftTitle: data?.data.find((data) => data.key === "section-3-top-left-title")?.content ?? "",
      section3TopLeftDescription:
        data?.data.find((data) => data.key === "section-3-top-left-description")?.content ?? "",
      section3CenterTitle: data?.data.find((data) => data.key === "section-3-bottom-right-title")?.content ?? "",
      section3BottomRightTitle:
        data?.data.find((data) => data.key === "section-3-bottom-right-description")?.content ?? "",
      section3BottomRightDescription: data?.data.find((data) => data.key === "section-3-center-title")?.content ?? "",
      section3ImageBackground: new File([], ""),
      section3ImageBackground2: new File([], ""),
    });
  }, [loading, lang]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        <div className="flex flex-col space-y-4 my-2">
          <p>Section 3</p>
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
          <InputField
            formControl={form.control}
            name="section3TopLeftTitle"
            placeholder="Title Top Section 3"
            className="w-full"
            label="Title Top Section 3"
          />
          <InputArea
            formControl={form.control}
            name="section3TopLeftDescription"
            placeholder="Description Top Section 3"
            className="w-full"
            label="Description Top Section 3"
          />
          <InputField
            formControl={form.control}
            name="section3CenterTitle"
            placeholder="Center Title Section 3"
            className="w-full"
            label="Center Title Section 3"
          />
          <InputField
            formControl={form.control}
            name="section3BottomRightTitle"
            placeholder="Title Bottom Section 3"
            className="w-full"
            label="Title Bottom Section 3"
          />
          <InputArea
            formControl={form.control}
            name="section3BottomRightDescription"
            placeholder="Description Bottom Section 3"
            className="w-full"
            label="Description Bottom Section 3"
          />
          <InputFile
            name="section3ImageBackground"
            formControl={form.control}
            label="Gambar Atas section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
          <InputFile
            name="section3ImageBackground"
            formControl={form.control}
            label="Gambar Bawah section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Tambah / Ubah Section 3</Button>
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
