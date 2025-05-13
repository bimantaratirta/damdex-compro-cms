"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { Project } from "@/lib/types/project";
import { useProject } from "@/swr-hooks/project/useProject";
import { useRouter } from "next/navigation";
import { DatagridActions } from "@/components/dataGridActions";
import { deleteProject } from "@/repositories/project";
import { toast } from "sonner";
import { errorHandling } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirmDialog";

const Page = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState<undefined | Project>(undefined);
  const projectColumns = React.useMemo<ColumnDef<Project>[]>(
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
        header: "Nama Projek IDN",
        size: 400,
      },
      {
        accessorKey: "titleENG",
        header: "Nama Projek EN",
        size: 300,
      },
      {
        accessorKey: "menu",
        header: "#",
        size: 120,
        cell: ({ row }) => {
          return (
            <DatagridActions
              onEditClick={() => router.push(`/dashboard/project/edit/${row.original.id}`)}
              onDeleteClick={() => setOpenDelete(row.original)}
            />
          );
        },
      },
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading, mutate } = useProject({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);
  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project berhasil dihapus");
      await mutate();
      setOpenDelete(undefined);
    } catch (error) {
      errorHandling(error, "Project gagal dihapus");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Project
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/project/create")}>Buat Projek Baru</Button>
      </div>
      <DataGrid
        columns={projectColumns}
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
