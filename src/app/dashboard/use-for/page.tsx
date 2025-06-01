"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";
import { useUsageCompositionOptions } from "@/swr-hooks/usageComposition/useUsageCompositionOptions";
import { ContentCard } from "@/components/contentCard";
import { UseFor } from "@/lib/types/use";
import { deleteUseFor } from "@/repositories/useFor";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | UseFor>(undefined);

  const { data, mutate, loading } = useUsageCompositionOptions();

  const handleDelete = async (id: number) => {
    try {
      await deleteUseFor(id);
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
        Kegunaan Komposisi
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/use-for/create")}>Buat Kegunaan Komposisi Baru</Button>
      </div>
      {data &&
        !loading &&
        data.data &&
        data.data.length !== 0 &&
        data.data.map((item, idx) => {
          return (
            <div key={idx}>
              <p className="mb-5 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                {`${item.titleIDN} - ${item.useId === 1 ? "Untuk Rumah Anda" : "Untuk Profesional"}`}
              </p>
              <div className="grid grid-flow-row grid-cols-4 gap-2 mb-5">
                {item.useCompositionUseFor &&
                  item.useCompositionUseFor.length !== 0 &&
                  item.useCompositionUseFor.map((i, idx) => (
                    <ContentCard
                      key={idx}
                      title={i.titleIDN}
                      withActions
                      onEditClick={() => router.push(`/dashboard/use-for/edit/${i.id}`)}
                      onDeleteClick={() => setOpenDelete(i)}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      {data && !loading && data.data && data.data.length === 0 && <p>Belum ada data</p>}
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
