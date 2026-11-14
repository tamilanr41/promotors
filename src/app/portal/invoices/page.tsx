"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, DollarSign, Eye, FileText, TrendingDown, TrendingUp } from "lucide-react";
import { downloadFile, generateInvoiceReceipt } from "@/lib/download";

const invoices = [
  { id: "INV-001", project: "Riverside Tower", description: "Foundation phase - Milestone 1", amount: 850000, status: "paid", issued: "2026-06-01", due: "2026-06-30", paid: "2026-06-28", method: "Wire Transfer" },
  { id: "INV-002", project: "Riverside Tower", description: "Structural phase - Floor 1-5", amount: 1200000, status: "pending", issued: "2026-07-01", due: "2026-07-31", paid: "", method: "" },
  { id: "INV-003", project: "Green Valley School", description: "Academic block - Phase 1", amount: 180000, status: "overdue", issued: "2026-05-01", due: "2026-05-31", paid: "", method: "Check" },
  { id: "INV-004", project: "Riverside Tower", description: "Advance payment - Materials", amount: 500000, status: "paid", issued: "2026-05-15", due: "2026-06-15", paid: "2026-06-10", method: "Wire Transfer" },
  { id: "INV-005", project: "Riverside Tower", description: "Foundation phase - Milestone 2", amount: 750000, status: "paid", issued: "2026-05-01", due: "2026-05-29", paid: "2026-05-29", method: "Wire Transfer" },
];

const paymentSummary = {
  totalBilled: 3480000,
  totalPaid: 2100000,
  totalPending: 1200000,
  totalOverdue: 180000,
};

export default function PortalInvoices() {
  const formatCurrency = (amount: number) => `$${(amount / 1000).toFixed(0)}K`;

  const handleDownloadInvoice = (inv: typeof invoices[number]) => {
    const receipt = generateInvoiceReceipt(inv);
    downloadFile(receipt, `${inv.id}-receipt.txt`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cos-blue">Invoices & Payments</h1>
        <p className="text-muted-foreground">View your invoices, track payments, and download receipts</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Billed</p>
                <p className="text-xl font-bold">{formatCurrency(paymentSummary.totalBilled)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(paymentSummary.totalPaid)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(paymentSummary.totalPending)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(paymentSummary.totalOverdue)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <TrendingDown className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <Tabs defaultValue="all">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-cos-blue">Invoices</CardTitle>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            {["all", "paid", "pending", "overdue"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.filter((inv) => tab === "all" || inv.status === tab).map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.id}</TableCell>
                        <TableCell>{inv.project}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{inv.description}</TableCell>
                        <TableCell className="font-medium">${(inv.amount / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-muted-foreground">{inv.due}</TableCell>
                        <TableCell>
                          <Badge variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : "destructive"}>
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(inv)}><Download className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
