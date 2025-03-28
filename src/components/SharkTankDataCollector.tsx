
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Database, Filter, PieChart, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

interface SharkTankData {
  id: string;
  season: number;
  episode: number;
  companyName: string;
  industry: string;
  askAmount: number;
  valuation: number;
  deal: boolean;
  investmentAmount: number;
  equity: number;
  outcome: string;
}

interface SharkTankDataCollectorProps {
  onDataCollected: (data: SharkTankData[]) => void;
  initialData?: SharkTankData[];
}

export default function SharkTankDataCollector({ 
  onDataCollected,
  initialData = [] 
}: SharkTankDataCollectorProps) {
  const [data, setData] = useState<SharkTankData[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? 5 : 10;
  
  // Filter and paginate data
  const filteredData = data.filter(item => 
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  
  // Call onDataCollected when data changes
  useEffect(() => {
    if (data.length > 0) {
      onDataCollected(data);
    }
  }, [data, onDataCollected]);
  
  // Initialize with data if empty
  useEffect(() => {
    if (initialData.length > 0 && data.length === 0) {
      setData(initialData);
    }
  }, [initialData, data]);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> Shark Tank Dataset
            </CardTitle>
            <CardDescription>
              View and filter Shark Tank pitch data
            </CardDescription>
          </div>
          <Badge variant="success">{data.length} Records</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search by company or industry"
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setSearchTerm("")} className="shrink-0">
            Clear
          </Button>
        </div>
        
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Valuation</TableHead>
                <TableHead>Ask</TableHead>
                <TableHead>Deal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.companyName}</TableCell>
                    <TableCell>{item.industry}</TableCell>
                    <TableCell>${(item.valuation).toLocaleString()}</TableCell>
                    <TableCell>${(item.askAmount).toLocaleString()}</TableCell>
                    <TableCell>
                      {item.deal ? (
                        <Badge variant="success">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    {loading ? "Loading data..." : "No results found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button 
          className="w-full" 
          onClick={() => onDataCollected(data)}
        >
          Use {data.length} Records for Training
        </Button>
      </CardFooter>
    </Card>
  );
}
