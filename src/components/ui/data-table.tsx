
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
  }[];
  searchable?: boolean;
  searchKeys?: string[];
  className?: string;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchKeys = [],
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<T[]>(data);

  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });

    setFilteredData(filtered);
  }, [searchTerm, data, searchKeys]);

  // Update filtered data whenever the data prop changes
  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="space-y-4">
      {searchable && (
        <div>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table className={className}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.render ? column.render(row) : row[column.key]}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { DataTable };
