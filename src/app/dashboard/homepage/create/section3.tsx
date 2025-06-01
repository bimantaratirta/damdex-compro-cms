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

const dataBahasa = [
  { value: "id", name: "Indonesia" },
  { value: "eng", name: "Inggris" },
];

const formSchema = z.object({
  language: z.string().min(1, { message: "Bahasa harus diisi" }),
  section3TopLeftTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3TopLeftDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  // section3TopLeftImage: z.instanceof(File),
  section3CenterTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightTitle: z.string().min(1, { message: "Judul harus diisi" }),
  section3BottomRightDescription: z.string().min(1, { message: "Deskripsi harus diisi" }),
  // section3BottomRightImage: z.instanceof(File),
  section3ImageBackground: z.instanceof(File),
});

export const Section3 = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      section3TopLeftTitle: "",
      section3TopLeftDescription: "",
      // section3TopLeftImage: new File([], ""),
      section3CenterTitle: "",
      section3BottomRightTitle: "",
      section3BottomRightDescription: "",
      // section3BottomRightImage: new File([], ""),
      section3ImageBackground: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // if (values.section3TopLeftImage.name === "" || values.section3BottomRightImage.name === "")
    if (values.section3ImageBackground.name === "") {
      toast.error("Semua file gambar harus diupload.");
      return;
    }

    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    const section3 = new FormData();
    // section3.append("section3TopLeftImage", values.section3TopLeftImage);
    section3.append("section3TopLeftTitle", values.section3TopLeftTitle);
    section3.append("section3TopLeftDescription", values.section3TopLeftDescription);
    section3.append("section3CenterTitle", values.section3CenterTitle);
    // section3.append("section3BottomRightImage", values.section3BottomRightImage);
    section3.append("section3BottomRightTitle", values.section3BottomRightTitle);
    section3.append("section3BottomRightDescription", values.section3BottomRightDescription);
    section3.append("sectionNumber", "3");
    section3.append("section3ImageBackground", values.section3ImageBackground);
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
                    onValueChange={field.onChange}
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
          {/* <InputFile
            name="section3TopLeftImage"
            formControl={form.control}
            label="Gambar Top Section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          /> */}
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
          {/* <InputFile
            name="section3BottomRightImage"
            formControl={form.control}
            label="Gambar Bottom Section 3"
            className="w-full"
            description="File yang diterima dalam format gambar dengan ukuran file tidak lebih dari 10MB."
          /> */}
          <InputFile
            name="section3ImageBackground"
            formControl={form.control}
            label="Gambar section 3"
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
