"use client";
import React from "react";
import { DataGrid } from "@/components/datagrid";
import { ColumnDef } from "@tanstack/react-table";
import { EventGallery } from "@/lib/types/event-gallery";
import { usePaginationData } from "@/hooks/usePagination";
import { useEvent } from "@/swr-hooks/eventGallery/useEvent";

const Page = () => {
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
    ],
    []
  );

  const { handlePaginationModelChange, pagination } = usePaginationData();
  const { data, loading } = useEvent({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });
  const defaultData = React.useMemo(() => data?.data.payload ?? [], [data]);

  return (
    <div>
      <p className="mb-10">Event Gallery</p>
      <DataGrid
        columns={eventGalleryColumns}
        data={defaultData}
        rowCount={data?.data.totalAllData}
        handlePaginationChange={handlePaginationModelChange}
        loading={loading}
      />
    </div>
  );
};

export default Page;
