"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { Project } from "@/lib/types/project";
import { useProject } from "@/swr-hooks/project/useProject";

const Page = () => {
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
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading } = useProject({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);

  return (
    <div>
      <p className="mb-10">Event Gallery</p>
      <DataGrid
        columns={projectColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
    </div>
  );
};

export default Page;
