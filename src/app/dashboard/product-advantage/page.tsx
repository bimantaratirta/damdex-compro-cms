"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginationData } from "@/hooks/usePagination";
import { ProductAdvantage } from "@/lib/types/product";
import { useProductAdvantage } from "@/swr-hooks/product/useProductAdvantage";

const Page = () => {
  const productAdvantageColumns = React.useMemo<ColumnDef<ProductAdvantage>[]>(
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
        header: "Kelebihan Produk IDN",
        size: 400,
      },
      {
        accessorKey: "titleENG",
        header: "Kelebihan Produk EN",
        size: 300,
      },
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading } = useProductAdvantage({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);

  return (
    <div>
      <p className="mb-10">Event Gallery</p>
      <DataGrid
        columns={productAdvantageColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
    </div>
  );
};

export default Page;
