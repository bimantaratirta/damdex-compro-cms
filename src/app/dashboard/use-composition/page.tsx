"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/repositories/product";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";
import { UseComposition } from "@/lib/types/use";
import { useUsageCompositionOptions } from "@/swr-hooks/usageComposition/useUsageCompositionOptions";
import { ContentCard } from "@/components/contentCard";
import { useUsage } from "@/swr-hooks/usage/useUsage";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | UseComposition>(undefined);

  const { data, mutate, loading } = useUsageCompositionOptions();
  const { data: dataUse, loading: loadingUse } = useUsage();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success("Komposisi berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Komposisi gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Komposisi
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/use-composition/create")}>Buat Komposisi Baru</Button>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-2">
        {data &&
          !loading &&
          data.data &&
          data.data.length !== 0 &&
          data.data.map((item, idx) => {
            return (
              <ContentCard
                key={idx}
                title={item.titleIDN}
                withActions
                onEditClick={() => router.push(`/dashboard/use-composition/edit/${item.id}`)}
                onDeleteClick={() => setOpenDelete(item)}
              />
            );
          })}
        {data && !loading && data.data && data.data.length === 0 && <p>Belum ada data</p>}
      </div>
      <ConfirmDialog
        title={`Apakah anda yakin ingin menghapus "${openDelete?.titleIDN ?? "data"}"?`}
        onConfirmClick={() => handleDelete(openDelete?.id ?? 0)}
        cancelLabel="Batal"
        confirmLabel="Hapus"
        open={Boolean(openDelete)}
        setOpen={() => setOpenDelete(undefined)}
      />
    </div>
  );
};

export default Page;
