"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, UserCheck, Phone, Mail, Building2, Calendar, TrendingUp, Users } from "lucide-react";

const contacts = [
  { id: "CNT-001", name: "Robert Williams", company: "Urban Development Corp", email: "robert@urbandev.com", phone: "+1 (555) 0101", stage: "client", value: "$12M", lastContact: "2026-07-08" },
  { id: "CNT-002", name: "Sarah Johnson", company: "TechPark Solutions", email: "sarah@techpark.com", phone: "+1 (555) 0201", stage: "lead", value: "$2.5M", lastContact: "2026-07-08" },
  { id: "CNT-003", name: "Michael Chen", company: "Chen Holdings", email: "michael@chenholdings.com", phone: "+1 (555) 0202", stage: "lead", value: "$8M", lastContact: "2026-07-07" },
  { id: "CNT-004", name: "Patricia Davis", company: "Premier Homes Ltd", email: "patricia@premierhomes.com", phone: "+1 (555) 0102", stage: "client", value: "$8.5M", lastContact: "2026-07-06" },
  { id: "CNT-005", name: "Emily Rodriguez", company: "Coastal Dev Group", email: "emily@coastaldev.com", phone: "+1 (555) 0203", stage: "prospect", value: "$1.2M", lastContact: "2026-07-06" },
  { id: "CNT-006", name: "David Kim", company: "Skyline Properties", email: "david@skylineprop.com", phone: "+1 (555) 0204", stage: "lead", value: "$5M", lastContact: "2026-07-05" },
  { id: "CNT-007", name: "Lisa Thompson", company: "Thompson & Co", email: "lisa@thompsonco.com", phone: "+1 (555) 0205", stage: "prospect", value: "$3.8M", lastContact: "2026-07-04" },
  { id: "CNT-008", name: "James Miller", company: "Retail Ventures Inc", email: "james@retailventures.com", phone: "+1 (555) 0103", stage: "client", value: "$25M", lastContact: "2026-07-03" },
];

const pipeline = [
  { stage: "Prospecting", count: 12, value: "$8.5M", color: "bg-blue-500" },
  { stage: "Qualification", count: 8, value: "$12.2M", color: "bg-indigo-500" },
  { stage: "Proposal", count: 5, value: "$18.5M", color: "bg-cos-orange" },
  { stage: "Negotiation", count: 3, value: "$15.8M", color: "bg-amber-500" },
  { stage: "Closed Won", count: 2, value: "$33M", color: "bg-green-500" },
];

const maxPipelineValue = Math.max(...pipeline.map((p) => parseInt(p.value.replace(/[^0-9.]/g, ""))));

export default function CRMPage() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">CRM</h1>
          <p className="text-muted-foreground">Manage contacts, leads, and relationships</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-cos-blue">Sales Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {pipeline.map((stage) => {
              const val = parseFloat(stage.value.replace(/[^0-9.]/g, ""));
              const height = (val / maxPipelineValue) * 100;
              return (
                <div key={stage.stage} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-medium">{stage.value}</span>
                  <div className={`w-full rounded-t-md ${stage.color} transition-all hover:opacity-80`} style={{ height: `${height}%` }} />
                  <span className="text-xs text-muted-foreground">{stage.stage}</span>
                  <Badge variant="secondary" className="text-[10px]">{stage.count}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-cos-blue">Contacts</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" /> {c.email}
                      <Phone className="h-3 w-3 ml-1" /> {c.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.stage === "client" ? "success" : c.stage === "lead" ? "warning" : "secondary"}>
                      {c.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{c.value}</TableCell>
                  <TableCell className="text-muted-foreground">{c.lastContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
