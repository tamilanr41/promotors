"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Building2, MapPin, Phone, Users, FolderKanban, Globe } from "lucide-react";

const branches = [
  { id: "BR-001", name: "New York HQ", address: "500 7th Avenue, New York, NY 10018", phone: "+1 (212) 555-0100", manager: "John Smith", employees: 45, projects: 8, status: "active" },
  { id: "BR-002", name: "Los Angeles Office", address: "1000 Wilshire Blvd, Los Angeles, CA 90017", phone: "+1 (213) 555-0200", manager: "Sarah Lee", employees: 28, projects: 5, status: "active" },
  { id: "BR-003", name: "Chicago Office", address: "200 E Randolph St, Chicago, IL 60601", phone: "+1 (312) 555-0300", manager: "Mike Wilson", employees: 22, projects: 4, status: "active" },
  { id: "BR-004", name: "Houston Yard", address: "1500 Main Street, Houston, TX 77002", phone: "+1 (713) 555-0400", manager: "James Brown", employees: 15, projects: 3, status: "active" },
  { id: "BR-005", name: "Miami Office", address: "100 SE 2nd St, Miami, FL 33131", phone: "+1 (305) 555-0500", manager: "Anna Davis", employees: 18, projects: 2, status: "inactive" },
  { id: "BR-006", name: "San Francisco Office", address: "1 Market Plaza, San Francisco, CA 94105", phone: "+1 (415) 555-0600", manager: "—", employees: 0, projects: 0, status: "coming-soon" },
];

export default function BranchesPage() {
  const [search, setSearch] = useState("");

  const filtered = branches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.manager.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Branches</h1>
          <p className="text-muted-foreground">Manage multi-branch operations</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Branch
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Branches", value: "6", color: "from-cos-blue to-cos-blue-light", icon: Building2 },
          { label: "Active", value: "4", color: "from-green-500 to-green-600", icon: Globe },
          { label: "Total Employees", value: "128", color: "from-cos-orange to-cos-orange-dark", icon: Users },
          { label: "Active Projects", value: "22", color: "from-amber-500 to-amber-600", icon: FolderKanban },
        ].map((m) => {
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
            <Input placeholder="Search branches..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Building2 className="h-4 w-4 text-cos-orange" />
                      {b.name}
                    </div>
                    <p className="text-xs text-muted-foreground">{b.id}</p>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{b.address}</TableCell>
                  <TableCell>{b.phone}</TableCell>
                  <TableCell>{b.manager}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{b.employees}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{b.projects}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={b.status === "active" ? "success" : b.status === "inactive" ? "secondary" : "warning"}>
                      {b.status}
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
