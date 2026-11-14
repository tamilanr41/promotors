"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Megaphone, TrendingUp, Users, MousePointerClick, Eye, Mail, BarChart3 } from "lucide-react";

const campaigns = [
  { id: "CMP-001", name: "Q3 Construction Summit", channel: "Email", budget: "$15,000", spent: "$8,500", leads: 45, conversions: 8, roi: "180%", status: "active" },
  { id: "CMP-002", name: "LinkedIn Targeting - Developers", channel: "Social", budget: "$10,000", spent: "$10,000", leads: 32, conversions: 5, roi: "150%", status: "completed" },
  { id: "CMP-003", name: "Google Ads - Commercial", channel: "PPC", budget: "$8,000", spent: "$3,200", leads: 28, conversions: 3, roi: "210%", status: "active" },
  { id: "CMP-004", name: "Industry Blog Campaign", channel: "Content", budget: "$5,000", spent: "$1,000", leads: 12, conversions: 2, roi: "90%", status: "draft" },
  { id: "CMP-005", name: "Trade Show - BuildExpo", channel: "Event", budget: "$25,000", spent: "$18,000", leads: 68, conversions: 12, roi: "320%", status: "completed" },
];

const metrics = [
  { label: "Active Campaigns", value: "3", change: "+1", icon: Megaphone, color: "from-cos-orange to-cos-orange-dark" },
  { label: "Total Leads", value: "185", change: "+28%", icon: Users, color: "from-cos-blue to-cos-blue-light" },
  { label: "Conversion Rate", value: "8.2%", change: "+1.5%", icon: TrendingUp, color: "from-green-500 to-green-600" },
  { label: "ROI", value: "245%", change: "+35%", icon: BarChart3, color: "from-amber-500 to-amber-600" },
];

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Marketing</h1>
          <p className="text-muted-foreground">Campaign management and performance tracking</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
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
                  <p className="text-xs text-green-600">{m.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-cos-blue">Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{c.channel}</Badge>
                  </TableCell>
                  <TableCell>{c.budget}</TableCell>
                  <TableCell>{c.spent}</TableCell>
                  <TableCell>{c.leads}</TableCell>
                  <TableCell>{c.conversions}</TableCell>
                  <TableCell className="font-medium text-green-600">{c.roi}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "active" ? "success" : c.status === "draft" ? "secondary" : "default"}>
                      {c.status}
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
