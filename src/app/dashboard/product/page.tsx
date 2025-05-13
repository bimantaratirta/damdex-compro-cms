"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { Product } from "@/lib/types/product";
import { useProduct } from "@/swr-hooks/product/useProduct";
import { useRouter } from "next/navigation";
import { DatagridActions } from "@/components/dataGridActions";
import { deleteProduct } from "@/repositories/product";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | Product>(undefined);
  const productColumns = React.useMemo<ColumnDef<Product>[]>(
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
        header: "Nama Produk IDN",
        size: 400,
      },
      {
        accessorKey: "titleENG",
        header: "Nama Produk EN",
        size: 300,
      },
      {
        accessorKey: "menu",
        header: "#",
        size: 120,
        cell: ({ row }) => {
          return (
            <DatagridActions
              onEditClick={() => router.push(`/dashboard/product/edit/${row.original.id}`)}
              onDeleteClick={() => setOpenDelete(row.original)}
            />
          );
        },
      },
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading, mutate } = useProduct({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Produk berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Produk gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Product
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/product/create")}>Buat Produk Baru</Button>
      </div>
      <DataGrid
        columns={productColumns}
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
