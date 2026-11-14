"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Receipt, Wallet, CreditCard, BarChart3, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const invoices = [
  { id: "INV-001", client: "Urban Development Corp", project: "Riverside Tower", amount: "$850,000", status: "paid", issued: "2026-06-01", due: "2026-06-30", paidOn: "2026-06-28" },
  { id: "INV-002", client: "Premier Homes Ltd", project: "Oakwood Estates", amount: "$420,000", status: "pending", issued: "2026-06-15", due: "2026-07-15", paidOn: "-" },
  { id: "INV-003", client: "Education Board", project: "Green Valley School", amount: "$180,000", status: "overdue", issued: "2026-05-01", due: "2026-05-31", paidOn: "-" },
  { id: "INV-004", client: "Retail Ventures Inc", project: "City Center Mall", amount: "$1,200,000", status: "draft", issued: "-", due: "2026-08-01", paidOn: "-" },
  { id: "INV-005", client: "Urban Development Corp", project: "Riverside Tower", amount: "$750,000", status: "paid", issued: "2026-05-01", due: "2026-05-31", paidOn: "2026-05-29" },
];

const budgets = [
  { id: "BDG-001", project: "Riverside Tower", allocated: "$12,000,000", spent: "$7,800,000", remaining: "$4,200,000", percentage: 65, status: "on-track" },
  { id: "BDG-002", project: "Oakwood Estates", allocated: "$8,500,000", spent: "$3,400,000", remaining: "$5,100,000", percentage: 40, status: "on-track" },
  { id: "BDG-003", project: "City Center Mall", allocated: "$25,000,000", spent: "$6,250,000", remaining: "$18,750,000", percentage: 25, status: "on-hold" },
  { id: "BDG-004", project: "Green Valley School", allocated: "$3,200,000", spent: "$2,560,000", remaining: "$640,000", percentage: 80, status: "at-risk" },
];

const payments = [
  { id: "PAY-001", vendor: "SteelCo Ltd", description: "Structural Steel", amount: "$450,000", status: "completed", date: "2026-07-01", method: "Wire Transfer" },
  { id: "PAY-002", vendor: "ConcretePro Inc", description: "Concrete Supply", amount: "$140,000", status: "pending", date: "2026-07-15", method: "Check" },
  { id: "PAY-003", vendor: "ClimateControl", description: "HVAC Units", amount: "$185,000", status: "scheduled", date: "2026-07-25", method: "Wire Transfer" },
  { id: "PAY-004", vendor: "PowerTech Supplies", description: "Electrical Wiring", amount: "$45,000", status: "completed", date: "2026-07-05", method: "Credit Card" },
];

const metrics = [
  { label: "Revenue (YTD)", value: "$18.2M", change: "+15%", up: true, icon: TrendingUp, color: "from-green-500 to-green-600" },
  { label: "Outstanding", value: "$1.2M", change: "-8%", up: true, icon: DollarSign, color: "from-cos-orange to-cos-orange-dark" },
  { label: "Total Budget", value: "$48.7M", change: "+2%", up: true, icon: Wallet, color: "from-cos-blue to-cos-blue-light" },
  { label: "Net Profit", value: "$3.1M", change: "-3%", up: false, icon: BarChart3, color: "from-amber-500 to-amber-600" },
];

export default function FinancePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Finance</h1>
          <p className="text-muted-foreground">Invoices, budgets, and payment management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Create Budget</Button>
          <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="border-0 shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold">{m.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {m.up ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                    <span className={m.up ? "text-green-600" : "text-red-600"}>{m.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">
            <Receipt className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="budgets">
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search invoices..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.filter((inv) => inv.client.toLowerCase().includes(search.toLowerCase())).map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.client}</TableCell>
                      <TableCell>{inv.project}</TableCell>
                      <TableCell className="font-medium">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : inv.status === "overdue" ? "destructive" : "secondary"}>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{inv.issued}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.due}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgets.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.project}</TableCell>
                      <TableCell>{b.allocated}</TableCell>
                      <TableCell>{b.spent}</TableCell>
                      <TableCell>{b.remaining}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-gray-200">
                            <div className={`h-2 rounded-full ${b.percentage > 70 ? "bg-red-500" : b.percentage > 40 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${b.percentage}%` }} />
                          </div>
                          <span className="text-xs">{b.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={b.status === "on-track" ? "success" : b.status === "at-risk" ? "warning" : "secondary"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.vendor}</TableCell>
                      <TableCell>{p.description}</TableCell>
                      <TableCell className="font-medium">{p.amount}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "completed" ? "success" : p.status === "scheduled" ? "default" : "warning"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
