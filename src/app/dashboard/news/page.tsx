"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { News } from "@/lib/types/news";
import { usePaginationData } from "@/hooks/usePagination";
import { useNews } from "@/swr-hooks/news/useNews";

const Page = () => {
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
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading } = useNews({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);

  return (
    <div>
      <p className="mb-10">News</p>
      <DataGrid
        columns={NewsColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
    </div>
  );
};

export default Page;
