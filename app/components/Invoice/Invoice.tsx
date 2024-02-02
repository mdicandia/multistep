"use client";
import React from "react";
import "./Invoice.css";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Flex, HStack, Skeleton, Spacer, Tag } from "@chakra-ui/react";
import { format } from "date-fns";
import useSWR from "swr";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type Invoice = {
  date: string;
  description: string;
  tax: string;
  price: string;
  subtotal: string;
};

type InvoiceData = Invoice[];

const fetcher = (...args: Parameters<typeof fetch>): Promise<InvoiceData> =>
  fetch(...args).then((res) => res.json());

export function Invoice() {
  const { data: invoiceData } = useSWR<InvoiceData, any>("/api/table", fetcher);
  const columns = React.useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        cell: (cell) => (
          <div className="col">{cell.getValue() as React.ReactNode}</div>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (cell) => (
          <div className="col">{cell.getValue() as React.ReactNode}</div>
        ),
      },

      {
        header: "Price",
        accessorKey: "price",
        cell: (cell) => (
          <div className="col">
            {formatter.format(cell.getValue() as number)}
          </div>
        ),
      },
      {
        header: "Tax",
        accessorKey: "tax",
        cell: (cell) => (
          <div className="col">
            {cell.getValue() ? formatter.format(cell.getValue() as number) : ""}
          </div>
        ),
      },
      {
        header: "Subtotal",
        accessorKey: "subtotal",
        cell: (cell) => (
          <div className="col">
            {formatter.format(cell.getValue() as number)}
          </div>
        ),
        footer: () => {
          let total = "0";
          if (invoiceData) {
            total = formatter.format(
              invoiceData
                .map((row) => Number(row.subtotal))
                .reduce((sum, val) => sum + val, 0),
            );
          }
          return (
            <div className="col">
              <>Total: {total}</>
            </div>
          );
        },
      },
    ],
    [invoiceData],
  );

  const table = useReactTable({
    data: invoiceData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Flex align="center">
        <HStack>
          <h1>Invoice</h1>
          <Tag variant="solid" colorScheme="red" size="sm">
            Overdue
          </Tag>
        </HStack>
        <Spacer />
        <div className="date">{format(new Date(), "do MMM yyyy")}</div>
      </Flex>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), fontSize: "12px" }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          fontSize: "11px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <td key={footer.id} style={{ fontSize: "11px" }}>
                      {flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tfoot>
        </table>
        <div />
      </div>
    </>
  );
}
