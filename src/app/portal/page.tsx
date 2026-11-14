"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  DollarSign,
  Calendar,
  Download,
  Eye,
  ChevronRight,
  HardHat,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { downloadFile, generatePortalReport, generateDocumentContent } from "@/lib/download";

const myProjects = [
  { id: "PRJ-001", name: "Riverside Tower", status: "active", progress: 65, budget: "$12M", endDate: "2026-12-15", manager: "John Smith" },
  { id: "PRJ-005", name: "Green Valley School", status: "active", progress: 80, budget: "$3.2M", endDate: "2026-09-15", manager: "Sarah Lee" },
];

const recentDocuments = [
  { name: "Weekly Progress Report - W27", type: "PDF", project: "Riverside Tower", date: "2026-07-08", size: "2.4 MB" },
  { name: "Structural Drawings - Floor 10", type: "DWG", project: "Riverside Tower", date: "2026-07-07", size: "8.1 MB" },
  { name: "Safety Inspection Report", type: "PDF", project: "Green Valley School", date: "2026-07-06", size: "1.2 MB" },
  { name: "Invoice - June 2026", type: "PDF", project: "Riverside Tower", date: "2026-07-01", size: "0.5 MB" },
];

const paymentHistory = [
  { invoice: "INV-005", project: "Riverside Tower", amount: "$750,000", status: "paid", date: "2026-05-29", method: "Wire Transfer" },
  { invoice: "INV-001", project: "Riverside Tower", amount: "$850,000", status: "paid", date: "2026-06-28", method: "Wire Transfer" },
  { invoice: "INV-003", project: "Green Valley School", amount: "$180,000", status: "overdue", date: "2026-05-31", method: "Check" },
];

const messages = [
  { from: "John Smith", project: "Riverside Tower", message: "Floor 11 concrete pour scheduled for Friday.", date: "2026-07-08", unread: true },
  { from: "Sarah Lee", project: "Green Valley School", message: "Interior finishing materials have arrived.", date: "2026-07-07", unread: false },
  { from: "John Smith", project: "Riverside Tower", message: "Updated timeline for next 2 weeks.", date: "2026-07-06", unread: false },
];

export default function PortalDashboard() {
  const handleDownloadReport = () => {
    const report = generatePortalReport();
    downloadFile(report, `portal-report-${new Date().toISOString().slice(0, 10)}.txt`);
  };

  const handleDownloadDoc = (doc: typeof recentDocuments[number]) => {
    const content = generateDocumentContent(doc);
    downloadFile(content, `${doc.name.replace(/\s+/g, "-").toLowerCase()}.${doc.type.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Welcome to Your Portal</h1>
          <p className="text-muted-foreground">Track your projects, payments, and documents</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark" onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Projects", value: "2", icon: FolderKanban, color: "from-cos-orange to-cos-orange-dark" },
          { label: "Upcoming Payments", value: "$180K", icon: DollarSign, color: "from-green-500 to-green-600" },
          { label: "New Documents", value: "4", icon: FileText, color: "from-cos-blue to-cos-blue-light" },
          { label: "Unread Messages", value: "1", icon: MessageSquare, color: "from-amber-500 to-amber-600" },
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-cos-blue">My Projects</CardTitle>
            <Link href="/portal/projects">
              <Button variant="ghost" size="sm" className="text-cos-orange">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {myProjects.map((p) => (
              <div key={p.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cos-orange/10">
                      <Building2 className="h-5 w-5 text-cos-orange" />
                    </div>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.id} • Manager: {p.manager}</p>
                    </div>
                  </div>
                  <Badge variant="success">{p.status}</Badge>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} variant="success" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget: {p.budget}</span>
                  <span className="text-muted-foreground">Target: {p.endDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-cos-blue">Recent Messages</CardTitle>
            <Link href="/portal/messages">
              <Button variant="ghost" size="sm" className="text-cos-orange">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`rounded-lg border p-3 ${msg.unread ? "border-cos-orange/30 bg-cos-orange/5" : ""}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{msg.from}</p>
                      {msg.unread && <span className="h-2 w-2 rounded-full bg-cos-orange" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.project}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{msg.date}</span>
                </div>
                <p className="mt-1 text-sm">{msg.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-cos-blue">Recent Documents</CardTitle>
            <Link href="/portal/documents">
              <Button variant="ghost" size="sm" className="text-cos-orange">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDocuments.map((doc, i) => (
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
                    <TableCell>{doc.project}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadDoc(doc)}><Download className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-cos-blue">Payment History</CardTitle>
            <Link href="/portal/invoices">
              <Button variant="ghost" size="sm" className="text-cos-orange">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((ph, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{ph.invoice}</TableCell>
                    <TableCell>{ph.project}</TableCell>
                    <TableCell className="font-medium">{ph.amount}</TableCell>
                    <TableCell>
                      <Badge variant={ph.status === "paid" ? "success" : "destructive"}>{ph.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ph.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "View All Projects", icon: FolderKanban, href: "/portal/projects", color: "from-cos-orange to-cos-orange-dark" },
          { label: "Download Documents", icon: FileText, href: "/portal/documents", color: "from-cos-blue to-cos-blue-light" },
          { label: "View Invoices", icon: DollarSign, href: "/portal/invoices", color: "from-green-500 to-green-600" },
          { label: "Send Message", icon: MessageSquare, href: "/portal/messages", color: "from-amber-500 to-amber-600" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="group cursor-pointer border-0 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-md transition-all group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{action.label}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-cos-orange" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
