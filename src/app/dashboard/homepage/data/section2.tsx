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
  section2TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2TopLeftImageBackground: z.instanceof(File).optional(),
  section2TopRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2TopRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2TopRightImageBackground: z.instanceof(File).optional(),
  section2BottomLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2BottomLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2BottomLeftImageBackground: z.instanceof(File).optional(),
  section2BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section2BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  section2BottomRightImageBackground: z.instanceof(File).optional(),
});

export const Section2 = () => {
  const router = useRouter();
  const [lang, setLang] = React.useState<string>("id");
  const { data, loading } = useHome({ section: 2, lang: lang });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: lang,
      section2TopLeftTitle: "",
      section2TopLeftDescription: "",
      section2TopLeftImageBackground: new File([], ""),
      section2TopRightTitle: "",
      section2TopRightDescription: "",
      section2TopRightImageBackground: new File([], ""),
      section2BottomLeftTitle: "",
      section2BottomLeftDescription: "",
      section2BottomLeftImageBackground: new File([], ""),
      section2BottomRightTitle: "",
      section2BottomRightDescription: "",
      section2BottomRightImageBackground: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (
      data?.data.length === 0 &&
      (values.section2TopLeftImageBackground!.name === "" ||
        values.section2TopRightImageBackground!.name === "" ||
        values.section2BottomLeftImageBackground!.name === "" ||
        values.section2BottomRightImageBackground!.name === "")
    ) {
      toast.error(
        `file gambar harus diupload karena section 2 bahasa ${
          dataBahasa.find((d) => d.value === lang)?.name
        } belum memiliki gambar`
      );
      return;
    }

    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    const section2 = new FormData();
    if (values.section2TopLeftImageBackground !== undefined && values.section2TopLeftImageBackground.name !== "")
      section2.append("section2TopLeftImageBackground", values.section2TopLeftImageBackground);
    section2.append("section2TopLeftTitle", values.section2TopLeftTitle);
    section2.append("section2TopLeftDescription", values.section2TopLeftDescription);
    if (values.section2TopRightImageBackground !== undefined && values.section2TopRightImageBackground.name !== "")
      section2.append("section2TopRightImageBackground", values.section2TopRightImageBackground);
    section2.append("section2TopRightTitle", values.section2TopRightTitle);
    section2.append("section2TopRightDescription", values.section2TopRightDescription);
    if (values.section2BottomLeftImageBackground !== undefined && values.section2BottomLeftImageBackground.name !== "")
      section2.append("section2BottomLeftImageBackground", values.section2BottomLeftImageBackground);
    section2.append("section2BottomLeftTitle", values.section2BottomLeftTitle);
    section2.append("section2BottomLeftDescription", values.section2BottomLeftDescription);
    if (
      values.section2BottomRightImageBackground !== undefined &&
      values.section2BottomRightImageBackground.name !== ""
    )
      section2.append("section2BottomRightImageBackground", values.section2BottomRightImageBackground);
    section2.append("section2BottomRightTitle", values.section2BottomRightTitle);
    section2.append("section2BottomRightDescription", values.section2BottomRightDescription);
    section2.append("sectionNumber", "2");
    section2.append("language", values.language);

    try {
      await postHome(section2);
      toast.success("Data homepage section 2 berhasil ditambahkan.", {
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
      section2TopLeftTitle: data?.data.find((data) => data.key === "section-2-top-left-title")?.content ?? "",
      section2TopLeftDescription:
        data?.data.find((data) => data.key === "section-2-top-left-description")?.content ?? "",
      section2TopLeftImageBackground: new File([], ""),
      section2TopRightTitle: data?.data.find((data) => data.key === "section-2-top-right-title")?.content ?? "",
      section2TopRightDescription:
        data?.data.find((data) => data.key === "section-2-top-right-description")?.content ?? "",
      section2TopRightImageBackground: new File([], ""),
      section2BottomLeftTitle: data?.data.find((data) => data.key === "section-2-bottom-left-title")?.content ?? "",
      section2BottomLeftDescription:
        data?.data.find((data) => data.key === "section-2-bottom-left-description")?.content ?? "",
      section2BottomLeftImageBackground: new File([], ""),
      section2BottomRightTitle: data?.data.find((data) => data.key === "section-2-bottom-right-title")?.content ?? "",
      section2BottomRightDescription:
        data?.data.find((data) => data.key === "section-2-bottom-right-description")?.content ?? "",
      section2BottomRightImageBackground: new File([], ""),
    });
  }, [loading, lang]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        <div className="flex flex-col space-y-4 my-2">
          <p>Data Section 2</p>
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
            name="section2TopLeftTitle"
            placeholder="Title Top Left Section 2"
            className="w-full"
            label="Title Top Left Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2TopLeftDescription"
            placeholder="Description Top Left Section 2"
            className="w-full"
            label="Description Top Left Section 2"
          />
          <InputFile
            name="section2TopLeftImageBackground"
            formControl={form.control}
            label="Gambar Top Left Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
          <InputField
            formControl={form.control}
            name="section2TopRightTitle"
            placeholder="Title Top Right Section 2"
            className="w-full"
            label="Title Top Right Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2TopRightDescription"
            placeholder="Description Top Right Section 2"
            className="w-full"
            label="Description Top Right Section 2"
          />
          <InputFile
            name="section2TopRightImageBackground"
            formControl={form.control}
            label="Gambar Top Right Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
          <InputField
            formControl={form.control}
            name="section2BottomLeftTitle"
            placeholder="Title Bottom Left Section 2"
            className="w-full"
            label="Title Bottom Left Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2BottomLeftDescription"
            placeholder="Description Bottom Left Section 2"
            className="w-full"
            label="Description Bottom Left Section 2"
          />
          <InputFile
            name="section2BottomLeftImageBackground"
            formControl={form.control}
            label="Gambar Bottom Left Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
          <InputField
            formControl={form.control}
            name="section2BottomRightTitle"
            placeholder="Title Bottom Right Section 2"
            className="w-full"
            label="Title Bottom Right Section 2"
          />
          <InputArea
            formControl={form.control}
            name="section2BottomRightDescription"
            placeholder="Description Bottom Right Section 2"
            className="w-full"
            label="Description Bottom Right Section 2"
          />
          <InputFile
            name="section2BottomRightImageBackground"
            formControl={form.control}
            label="Gambar Bottom Right Section 2"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Tambah / Ubah Section 2</Button>
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
