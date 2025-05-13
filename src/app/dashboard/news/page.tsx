"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { News } from "@/lib/types/news";
import { usePaginationData } from "@/hooks/usePagination";
import { useNews } from "@/swr-hooks/news/useNews";
import { useRouter } from "next/navigation";
import { DatagridActions } from "@/components/dataGridActions";
import { deleteNews } from "@/repositories/news";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { ConfirmDialog } from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | News>(undefined);
  const NewsColumns = React.useMemo<ColumnDef<News>[]>(
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
        header: "Judul Berita IDN",
        size: 400,
      },
      {
        accessorKey: "titleENG",
        header: "Judul Berita EN",
        size: 300,
      },
      {
        accessorKey: "menu",
        header: "#",
        size: 120,
        cell: ({ row }) => {
          return (
            <DatagridActions
              onEditClick={() => router.push(`/dashboard/news/edit/${row.original.id}`)}
              onDeleteClick={() => setOpenDelete(row.original)}
            />
          );
        },
      },
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading, mutate } = useNews({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);
  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id);
      toast.success("Berita berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Berita gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        News
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/news/create")}>Buat Berita Baru</Button>
      </div>
      <DataGrid
        columns={NewsColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
      <ConfirmDialog
        title={`Apakah anda yakin ingin menghapus "${openDelete?.titleIDN ?? "data"}"?`}
        onConfirmClick={() => handleDelete(openDelete?.id ?? "")}
        cancelLabel="Batal"
        confirmLabel="Hapus"
        open={Boolean(openDelete)}
        setOpen={() => setOpenDelete(undefined)}
      />
    </div>
  );
};

export default Page;
