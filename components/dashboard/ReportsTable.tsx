// components/dashboard/ReportsTable.tsx
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMetrics } from '@/hooks/useMetrics';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricData } from '@/lib/types/metric';
import { ArrowUpDown } from 'lucide-react'; // <-- Import icon

// 1. [แก้ไข] ปรับปรุงการกำหนด Columns
export const columns: ColumnDef<MetricData>[] = [
  {
    accessorKey: 'date',
    // [แก้ไข] เพิ่ม UI สำหรับ Sorting
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'mrr',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          MRR ($)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-left">${row.original.mrr.toLocaleString()}</div>,
  },
  {
    accessorKey: 'activeUsers',
    header: 'Active Users',
  },
  {
    accessorKey: 'churnRate',
    header: 'Churn Rate (%)',
  },
  {
    accessorKey: 'ltv',
    header: 'LTV ($)',
  },
];

export function ReportsTable() {
  const { data, isLoading } = useMetrics();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" data-testid="skeleton-row" />
        <Skeleton className="h-10 w-full" data-testid="skeleton-row" />
        <Skeleton className="h-10 w-full" data-testid="skeleton-row" />
      </div>
    );
  }

 return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    // [แก้ไข] เอา onClick ออกจากที่นี่ เพราะเราย้ายไปไว้ใน Button แล้ว
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}