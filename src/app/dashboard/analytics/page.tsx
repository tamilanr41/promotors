"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign, FolderKanban, Users, Clock } from "lucide-react";

const kpiMetrics = [
  { label: "Project Profitability", value: "18.5%", change: "+2.3%", up: true },
  { label: "Avg. Project Duration", value: "8.2 months", change: "-0.5", up: true },
  { label: "Client Satisfaction", value: "4.8/5.0", change: "+0.2", up: true },
  { label: "On-Time Delivery", value: "92%", change: "+5%", up: true },
  { label: "Budget Variance", value: "3.2%", change: "-0.8%", up: true },
  { label: "Resource Utilization", value: "78%", change: "+6%", up: true },
];

const monthlyData = [
  { month: "Jan", revenue: 1.8, costs: 1.2, profit: 0.6, projects: 8 },
  { month: "Feb", revenue: 1.2, costs: 0.9, profit: 0.3, projects: 7 },
  { month: "Mar", revenue: 1.8, costs: 1.3, profit: 0.5, projects: 9 },
  { month: "Apr", revenue: 1.5, costs: 1.1, profit: 0.4, projects: 10 },
  { month: "May", revenue: 2.1, costs: 1.5, profit: 0.6, projects: 11 },
  { month: "Jun", revenue: 2.4, costs: 1.7, profit: 0.7, projects: 12 },
  { month: "Jul", revenue: 1.9, costs: 1.4, profit: 0.5, projects: 12 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const periodOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last Quarter" },
  { value: "1y", label: "This Year" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("1y");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Analytics</h1>
          <p className="text-muted-foreground">Business intelligence and key metrics</p>
        </div>
        <Select options={periodOptions} value={period} onChange={(e) => setPeriod(e.target.value)} className="w-40" />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiMetrics.map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                {kpi.up ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
              </div>
              <p className="mt-1 text-2xl font-bold">{kpi.value}</p>
              <p className={kpi.up ? "text-sm text-green-600" : "text-sm text-red-600"}>{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-cos-blue">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">${d.revenue}M</span>
                <div className="flex w-full gap-0.5">
                  <div className="flex-1 rounded-t-md bg-gradient-to-t from-cos-orange to-cos-orange-light" style={{ height: `${(d.revenue / maxRevenue) * 160}px` }} />
                </div>
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-gradient-to-t from-cos-orange to-cos-orange-light" />
              <span>Revenue</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-cos-blue">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Costs</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((d) => (
                <TableRow key={d.month}>
                  <TableCell className="font-medium">{d.month}</TableCell>
                  <TableCell>${d.revenue}M</TableCell>
                  <TableCell>${d.costs}M</TableCell>
                  <TableCell className="text-green-600 font-medium">${d.profit}M</TableCell>
                  <TableCell>{d.projects}</TableCell>
                  <TableCell>
                    <Badge variant={d.profit / d.revenue > 0.3 ? "success" : "warning"}>
                      {Math.round((d.profit / d.revenue) * 100)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
