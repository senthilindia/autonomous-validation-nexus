
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

// Dummy data
const tests = [
  {
    id: "TST-1234",
    name: "Lane Keeping Assist - Highway",
    status: "completed",
    success: true,
    runtime: "2m 12s",
    timestamp: "10:23 AM",
  },
  {
    id: "TST-1235",
    name: "Adaptive Cruise Control - Traffic",
    status: "completed",
    success: false,
    runtime: "3m 45s",
    timestamp: "10:15 AM",
  },
  {
    id: "TST-1236",
    name: "Emergency Braking - Pedestrian",
    status: "in_progress",
    success: null,
    runtime: "0m 58s",
    timestamp: "10:30 AM",
  },
  {
    id: "TST-1237",
    name: "Park Assist - Parallel",
    status: "completed",
    success: true,
    runtime: "4m 03s",
    timestamp: "09:58 AM",
  },
  {
    id: "TST-1238",
    name: "Traffic Sign Recognition",
    status: "warning",
    success: null,
    runtime: "1m 47s",
    timestamp: "09:45 AM",
  },
];

export function TestsTable() {
  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[120px]">Runtime</TableHead>
            <TableHead className="text-right w-[100px]">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.id}</TableCell>
              <TableCell>{test.name}</TableCell>
              <TableCell>
                {test.status === "completed" && test.success && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Pass
                  </Badge>
                )}
                {test.status === "completed" && !test.success && (
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Fail
                  </Badge>
                )}
                {test.status === "in_progress" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100">
                    <Clock className="h-3 w-3 mr-1 animate-pulse" />
                    Running
                  </Badge>
                )}
                {test.status === "warning" && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Warning
                  </Badge>
                )}
              </TableCell>
              <TableCell>{test.runtime}</TableCell>
              <TableCell className="text-right">{test.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
