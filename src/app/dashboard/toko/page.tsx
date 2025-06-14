"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";
import { DatagridActions } from "@/components/dataGridActions";
import { errorHandling } from "@/lib/utils";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";
import { Store } from "@/lib/types/store";
import { useStore } from "@/swr-hooks/store/useStore";
import { deleteStore } from "@/repositories/store";
import { useProvinceOptions } from "@/swr-hooks/store/useProvinceOptions";
import { useCityOptions } from "@/swr-hooks/store/useCityOptions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | Store>(undefined);
  const usageColumns = React.useMemo<ColumnDef<Store>[]>(
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
        accessorKey: "storeName",
        header: "Nama Toko",
        size: 400,
      },
      {
        accessorKey: "storeAddress",
        header: "Alamat Toko",
        size: 300,
      },
      {
        accessorKey: "province",
        header: "Provinsi",
        size: 300,
      },
      {
        accessorKey: "city",
        header: "Kota",
        size: 300,
      },
      {
        accessorKey: "menu",
        header: "#",
        size: 120,
        cell: ({ row }) => {
          return (
            <DatagridActions
              onEditClick={() => router.push(`/dashboard/toko/edit/${row.original.id}`)}
              onDeleteClick={() => setOpenDelete(row.original)}
            />
          );
        },
      },
    ],
    []
  );

  const [provinsi, setProvinsi] = React.useState<string>("");
  const [kota, setKota] = React.useState<string>("");
  const { data: province } = useProvinceOptions();
  const { data: city } = useCityOptions(provinsi);
  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading, mutate } = useStore({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    province: provinsi,
    city: kota,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);
  const handleDelete = async (id: number) => {
    try {
      await deleteStore(id);
      toast.success("Toko berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Toko gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Toko
      </h1>
      <div className="flex flex-row-reverse mb-2 justify-between">
        <Button onClick={() => router.push("/dashboard/toko/create")}>Tambah Toko</Button>
        <div className="flex flex-row space-x-2.5">
          <Select
            defaultValue={provinsi}
            onValueChange={(value) => {
              setProvinsi(value);
              setKota("");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Provinsi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {province?.data.map((val, idx) => (
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
          <Select
            disabled={provinsi === ""}
            defaultValue={kota}
            onValueChange={(value) => {
              setKota(value);
            }}
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
        </div>
      </div>
      <DataGrid
        columns={usageColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
      <ConfirmDialog
        title={`Apakah anda yakin ingin menghapus "${openDelete?.storeName ?? "data"}"?`}
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
