import { ColumnDef, flexRender, getCoreRowModel, useReactTable, PaginationState } from "@tanstack/react-table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { HoverTip } from "./hoverTip";
import React from "react";
import { Loading } from "./loading";

interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handlePaginationChange: (data: PaginationState) => void;
  rowCount?: number;
  loading?: boolean;
  withTooltip?: boolean;
}

export const DataGrid = <TData, TValue>({
  columns,
  data,
  handlePaginationChange,
  rowCount,
  loading,
  withTooltip = false,
}: DataGridProps<TData, TValue>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    rowCount: rowCount,
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;
      const currentPageInfo = table.getState().pagination;
      const newPageInfo = updater({
        pageIndex: currentPageInfo.pageIndex,
        pageSize: currentPageInfo.pageSize,
      });
      setPagination(newPageInfo);
      handlePaginationChange(newPageInfo);
    },
  });

  return (
    <div className={`relative overflow-y-hidden rounded-md border w-full`}>
      <Table className="w-full">
        <TableHeader className="grid">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      minWidth: `${header.getSize()}px`,
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="grid h-[49vh] overflow-y-auto overflow-x-hidden">
          {loading ? (
            <TableRow>
              <TableCell className="w-[2500px]">
                <Loading />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      minWidth: `${cell.column.getSize()}px`,
                      maxWidth: `${cell.column.getSize()}px`,
                    }}
                  >
                    {withTooltip && (
                      <HoverTip content={cell.getValue() as string}>
                        <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                      </HoverTip>
                    )}
                    {!withTooltip && (
                      <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Belum ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationControls table={table} />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationControls = ({ table }: { table: any }) => {
  const pageSizes = ["10", "20", "30", "40", "50", "100"];
  return (
    <div className="flex flex-row-reverse justify-between border-t p-1">
      <div className="flex flex-row-reverse">
        <HoverTip content="Ke halaman terakhir">
          <Button
            variant={"ghost"}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </HoverTip>
        <HoverTip content="Halaman selanjutnya">
          <Button
            variant={"ghost"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </HoverTip>
        <HoverTip content="Halaman sebelumnya">
          <Button
            variant={"ghost"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
        </HoverTip>
        <HoverTip content="Ke halaman pertama">
          <Button
            variant={"ghost"}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
        </HoverTip>
        <span className="flex items-center gap-1 text-xs">
          <div>Halaman </div>
          <strong>
            {table.getState().pagination.pageIndex + 1} dari {table.getPageCount().toLocaleString()}
          </strong>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4 pl-2 text-xs">
        Baris per halaman{" "}
        <Select
          onValueChange={(val) => table.setPageSize(Number(val))}
          defaultValue={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className="w-[80px] border-0">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem
                key={size}
                value={size}
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
