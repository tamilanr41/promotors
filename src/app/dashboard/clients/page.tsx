"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, Phone, Mail, Building2, MapPin } from "lucide-react";

const clients = [
  { id: "CL-001", name: "Urban Development Corp", contact: "Robert Williams", email: "robert@urbandev.com", phone: "+1 (555) 0101", projects: 3, status: "active", location: "New York, NY" },
  { id: "CL-002", name: "Premier Homes Ltd", contact: "Patricia Davis", email: "patricia@premierhomes.com", phone: "+1 (555) 0102", projects: 2, status: "active", location: "Los Angeles, CA" },
  { id: "CL-003", name: "Retail Ventures Inc", contact: "James Miller", email: "james@retailventures.com", phone: "+1 (555) 0103", projects: 1, status: "active", location: "Chicago, IL" },
  { id: "CL-004", name: "Metro Infrastructure", contact: "Jennifer Wilson", email: "jennifer@metroinfra.com", phone: "+1 (555) 0104", projects: 2, status: "inactive", location: "Houston, TX" },
  { id: "CL-005", name: "Education Board", contact: "Thomas Anderson", email: "thomas@edboard.org", phone: "+1 (555) 0105", projects: 1, status: "active", location: "Phoenix, AZ" },
  { id: "CL-006", name: "Luxury Living Inc", contact: "Maria Garcia", email: "maria@luxuryliving.com", phone: "+1 (555) 0106", projects: 1, status: "active", location: "Miami, FL" },
  { id: "CL-007", name: "Manufacturing Corp", contact: "David Thompson", email: "david@manufacturingcorp.com", phone: "+1 (555) 0107", projects: 1, status: "inactive", location: "Detroit, MI" },
  { id: "CL-008", name: "City Transit Authority", contact: "Susan Clark", email: "susan@citytransit.gov", phone: "+1 (555) 0108", projects: 2, status: "active", location: "San Francisco, CA" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Building2 className="h-4 w-4 text-cos-orange" />
                      {client.name}
                    </div>
                    <p className="text-xs text-muted-foreground">{client.id}</p>
                  </TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{client.projects}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "success" : "secondary"}>{client.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{client.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
