"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { Product } from "@/lib/types/product";
import { useProduct } from "@/swr-hooks/product/useProduct";

const Page = () => {
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
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading } = useProduct({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);

  return (
    <div>
      <p className="mb-10">Produk</p>
      <DataGrid
        columns={productColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
    </div>
  );
};

export default Page;
