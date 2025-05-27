"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { EventGallery } from "@/lib/types/event-gallery";
import { usePaginationData } from "@/hooks/usePagination";
import { useEvent } from "@/swr-hooks/eventGallery/useEvent";
import { DatagridActions } from "@/components/dataGridActions";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/confirmDialog";
import { deleteEventGallery } from "@/repositories/eventGallery";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | EventGallery>(undefined);
  const eventGalleryColumns = React.useMemo<ColumnDef<EventGallery>[]>(
    () => [
      {
        accessorKey: "number",
        header: "No.",
        cell: ({ row }) => {
          const val = row.index;
          return <div>{val + 1}.</div>;
        },
        size: 100,
      },
      {
        accessorKey: "titleIDN",
        header: "Nama Event IDN",
        size: 400,
      },
      {
        accessorKey: "titleENG",
        header: "Nama Event EN",
        size: 300,
      },
      {
        accessorKey: "menu",
        header: "#",
        size: 120,
        cell: ({ row }) => {
          return (
            <DatagridActions
              onEditClick={() => router.push(`/dashboard/event-gallery/edit/${row.original.id}`)}
              onDeleteClick={() => setOpenDelete(row.original)}
            />
          );
        },
      },
    ],

    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading, mutate } = useEvent({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });

  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);
  const handleDelete = async (id: number) => {
    try {
      await deleteEventGallery(id);
      toast.success("Event berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Event gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Event Gallery
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/event-gallery/create")}>Buat Event Baru</Button>
      </div>
      <DataGrid
        columns={eventGalleryColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
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
