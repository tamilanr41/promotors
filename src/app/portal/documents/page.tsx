"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, FileText, FolderKanban, Search } from "lucide-react";
import { useState } from "react";
import { downloadFile, generateDocumentContent } from "@/lib/download";

const allDocuments = [
  { name: "Weekly Progress Report - W27", type: "PDF", category: "Reports", project: "Riverside Tower", date: "2026-07-08", size: "2.4 MB" },
  { name: "Structural Drawings - Floor 10", type: "DWG", category: "Drawings", project: "Riverside Tower", date: "2026-07-07", size: "8.1 MB" },
  { name: "Safety Inspection Report", type: "PDF", category: "Reports", project: "Green Valley School", date: "2026-07-06", size: "1.2 MB" },
  { name: "Invoice - June 2026", type: "PDF", category: "Financial", project: "Riverside Tower", date: "2026-07-01", size: "0.5 MB" },
  { name: "Architectural Plans - Approved", type: "DWG", category: "Drawings", project: "Green Valley School", date: "2026-06-28", size: "12.3 MB" },
  { name: "Material Test Reports", type: "PDF", category: "Quality", project: "Riverside Tower", date: "2026-06-25", size: "3.7 MB" },
  { name: "Progress Photos - June", type: "JPG", category: "Photos", project: "Riverside Tower", date: "2026-06-30", size: "45 MB" },
  { name: "Meeting Minutes - W26", type: "PDF", category: "Reports", project: "Green Valley School", date: "2026-06-29", size: "1.1 MB" },
];

const typeColors: Record<string, "default" | "secondary" | "outline"> = { PDF: "default", DWG: "secondary", JPG: "outline" };

export default function PortalDocuments() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = allDocuments.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(allDocuments.map((d) => d.category)));

  const handleDownload = (doc: typeof allDocuments[number]) => {
    const content = generateDocumentContent(doc);
    downloadFile(content, `${doc.name.replace(/\s+/g, "-").toLowerCase()}.${doc.type.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cos-blue">Documents</h1>
        <p className="text-muted-foreground">Access project documents, drawings, and reports</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg text-cos-blue">All Documents</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-48 pl-9 text-sm" />
              </div>
              <Select options={[{ value: "", label: "All Categories" }, ...categories.map((c) => ({ value: c, label: c }))]} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 w-40" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-cos-orange" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={typeColors[doc.type] || "outline"}>{doc.category}</Badge></TableCell>
                  <TableCell>{doc.project}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}><Download className="h-4 w-4" /></Button>
                    </div>
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
