"use client";
import React from "react";
import "./Invoice.css";
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { Flex, HStack, Spacer, Tag } from "@chakra-ui/react";
import { format } from "date-fns";

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

const data = [
  {
    date: "2023-10-25",
    description: "Deposit",
    tax: "",
    price: "200",
    subtotal: "200",
  },
  {
    date: "2023-10-25",
    description: "Rent",
    tax: "5",
    price: "100",
    subtotal: "105",
  },
  {
    date: "2023-10-25",
    description: "Admin fee",
    tax: "",
    price: "10",
    subtotal: "10",
  },
  {
    date: "2021-01-04",
    description: "Cleaning fee",
    tax: "5",
    price: "5.9",
    subtotal: "10.90",
  },
];

export function Invoice() {
  const rerender = React.useReducer(() => ({}), {})[1];

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
          const total = formatter.format(
            data
              .map((row) => Number(row.subtotal))
              .reduce((sum, val) => sum + val, 0),
          );
          return (
            <div className="col">
              <>Total: {total}</>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
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
