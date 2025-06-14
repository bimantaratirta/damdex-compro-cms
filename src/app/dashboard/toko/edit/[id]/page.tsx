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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProvinceOptions } from "@/swr-hooks/store/useProvinceOptions";
import { useCityOptions } from "@/swr-hooks/store/useCityOptions";
import { patchStore } from "@/repositories/store";
import { useStoreDetail } from "@/swr-hooks/store/useStoreDetail";

const formSchema = z.object({
  storeName: z.string().min(1, { message: "Nama Toko harus diisi" }),
  storeAddress: z.string().min(1, { message: "Alamat toko harus diisi" }),
  storeAddressGoogleMap: z.string().min(1, { message: "Koordinat alamat toko harus diisi" }),
  storePhone: z.string().min(1, { message: "Nomor telpon toko harus diisi" }),
  province: z.string().min(1, { message: "Provinsi harus diisi" }),
  city: z.string().min(1, { message: "Kota harus diisi" }),
});

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = React.use(params);
  const { data: store, loading } = useStoreDetail(id);
  const { data } = useProvinceOptions();
  const [provinsi, setProvinsi] = React.useState<string>("");
  const { data: city } = useCityOptions(provinsi);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeAddress: "",
      storeName: "",
      storeAddressGoogleMap: "",
      storePhone: "",
      province: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success("Pengiriman data sedang diproses.", {
      description: "Mohon Tunggu.",
    });
    try {
      await patchStore(id, values);
      toast.success("Toko berhasil diubah", { description: "Anda akan segera dikembalikan ke halaman utama." });
      router.push("/dashboard/toko");
    } catch (error) {
      errorHandling(error, "Toko Gagal diubah");
    }
  };

  React.useEffect(() => {
    form.reset({
      storeName: store?.data.storeName ?? "",
      storeAddress: store?.data.storeAddress ?? "",
      storeAddressGoogleMap: store?.data.storeAddressGoogleMap ?? "",
      storePhone: store?.data.storePhone ?? "",
      province: store?.data.province ?? "",
      city: store?.data.city ?? "",
    });
    setProvinsi(store?.data.province ?? "");
  }, [loading, provinsi]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 my-2">
          <p className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Edit Toko
          </p>
          <FormField
            control={form.control}
            name={"province"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value.toString()}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setProvinsi(value);
                    }}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.data.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.value}
                          >
                            {val.label}
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
          <FormField
            control={form.control}
            name={"city"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Select
                    disabled={provinsi === ""}
                    defaultValue={field.value.toString()}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Kota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {city?.data.map((val, idx) => (
                          <SelectItem
                            key={idx}
                            value={val.value}
                          >
                            {val.label}
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
            name="storeName"
            placeholder="Nama Toko"
            className="w-full"
            label="Nama Toko"
          />
          <InputField
            formControl={form.control}
            name="storeAddress"
            placeholder="Alamat Toko"
            className="w-full"
            label="Alamat Toko"
          />
          <InputField
            formControl={form.control}
            name="storeAddressGoogleMap"
            placeholder="Koordinat Toko"
            className="w-full"
            label="Koordinat Toko"
            description="Data koordinat diambil dari google maps"
          />
          <InputField
            formControl={form.control}
            name="storePhone"
            placeholder="Kontak / No Telp. Toko"
            className="w-full"
            label="Kontak / No Telp. Toko"
          />
        </div>
        <div className="flex flex-row-reverse mb-2 space-x-2 space-x-reverse">
          <Button>Edit Toko</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard/toko");
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
