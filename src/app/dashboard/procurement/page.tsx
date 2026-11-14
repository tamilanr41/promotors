"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ShoppingCart, Package, CheckCircle2, Clock, AlertTriangle, Truck } from "lucide-react";

const purchaseOrders = [
  { id: "PO-001", item: "Structural Steel Beams", supplier: "SteelCo Ltd", quantity: 500, unit: "tons", total: "$450,000", status: "delivered", date: "2026-06-30", project: "Riverside Tower" },
  { id: "PO-002", item: "Concrete Mix Grade 40", supplier: "ConcretePro Inc", quantity: 2000, unit: "cu yd", total: "$280,000", status: "in-transit", date: "2026-07-10", project: "Riverside Tower" },
  { id: "PO-003", item: "HVAC Units", supplier: "ClimateControl Systems", quantity: 15, unit: "units", total: "$185,000", status: "pending", date: "2026-07-20", project: "Oakwood Estates" },
  { id: "PO-004", item: "Electrical Wiring", supplier: "PowerTech Supplies", quantity: 10000, unit: "ft", total: "$45,000", status: "ordered", date: "2026-07-08", project: "Green Valley School" },
  { id: "PO-005", item: "Windows - Double Glazed", supplier: "GlassWorks Inc", quantity: 200, unit: "units", total: "$120,000", status: "delivered", date: "2026-06-25", project: "City Center Mall" },
  { id: "PO-006", item: "Plumbing Fixtures", supplier: "PipeMaster Supplies", quantity: 100, unit: "sets", total: "$65,000", status: "ordered", date: "2026-07-12", project: "Oakwood Estates" },
  { id: "PO-007", item: "Roofing Materials", supplier: "RoofTech Ltd", quantity: 5000, unit: "sq ft", total: "$95,000", status: "pending", date: "2026-07-25", project: "Sunset Villas" },
];

const metrics = [
  { label: "Total POs", value: "24", color: "from-cos-blue to-cos-blue-light", icon: ShoppingCart },
  { label: "Delivered", value: "8", color: "from-green-500 to-green-600", icon: CheckCircle2 },
  { label: "In Transit", value: "5", color: "from-amber-500 to-amber-600", icon: Truck },
  { label: "Pending", value: "11", color: "from-cos-orange to-cos-orange-dark", icon: Clock },
];

export default function ProcurementPage() {
  const [search, setSearch] = useState("");

  const filtered = purchaseOrders.filter((po) =>
    po.item.toLowerCase().includes(search.toLowerCase()) || po.supplier.toLowerCase().includes(search.toLowerCase()) || po.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Procurement</h1>
          <p className="text-muted-foreground">Manage purchase orders and suppliers</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
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
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search purchase orders..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.id}</TableCell>
                  <TableCell>{po.item}</TableCell>
                  <TableCell>{po.supplier}</TableCell>
                  <TableCell>{po.quantity} {po.unit}</TableCell>
                  <TableCell className="font-medium">{po.total}</TableCell>
                  <TableCell>{po.project}</TableCell>
                  <TableCell>
                    <Badge variant={po.status === "delivered" ? "success" : po.status === "in-transit" ? "warning" : po.status === "ordered" ? "default" : "secondary"}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{po.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
