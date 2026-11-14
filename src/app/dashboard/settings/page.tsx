"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, Plus, User, Shield, Bell, Palette, Link2, Database } from "lucide-react";

const users = [
  { id: "USR-001", name: "John Smith", email: "john@cos.com", role: "Admin", status: "active", lastLogin: "2026-07-08" },
  { id: "USR-002", name: "Sarah Lee", email: "sarah@cos.com", role: "Project Manager", status: "active", lastLogin: "2026-07-08" },
  { id: "USR-003", name: "Mike Wilson", email: "mike@cos.com", role: "Site Supervisor", status: "active", lastLogin: "2026-07-07" },
  { id: "USR-004", name: "Anna Davis", email: "anna@cos.com", role: "Architect", status: "inactive", lastLogin: "2026-06-20" },
  { id: "USR-005", name: "James Brown", email: "james@cos.com", role: "Engineer", status: "active", lastLogin: "2026-07-08" },
];

const integrations = [
  { name: "Procore", status: "connected", lastSync: "2026-07-08 14:30", type: "Project Management" },
  { name: "QuickBooks", status: "connected", lastSync: "2026-07-08 12:00", type: "Accounting" },
  { name: "Slack", status: "connected", lastSync: "2026-07-08 15:45", type: "Communication" },
  { name: "Google Drive", status: "connected", lastSync: "2026-07-08 13:20", type: "Storage" },
  { name: "Salesforce", status: "disconnected", lastSync: "2026-06-30", type: "CRM" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cos-blue">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-cos-blue">Company Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="COS Construction Inc." />
                </div>
                <div className="space-y-2">
                  <Label>Company Email</Label>
                  <Input defaultValue="info@cosconstruction.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="https://cosconstruction.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="123 Construction Ave, Building City, ST 12345" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-cos-blue">User Management</CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        <Badge variant={u.status === "active" ? "success" : "secondary"}>{u.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-cos-blue">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Select options={[{ value: "30m", label: "30 minutes" }, { value: "1h", label: "1 hour" }, { value: "4h", label: "4 hours" }]} className="w-32" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Password Policy</p>
                  <p className="text-sm text-muted-foreground">Minimum 8 characters, 1 uppercase, 1 number</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-cos-blue">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Email notifications", "Push notifications", "SMS alerts", "Weekly digest", "Project updates", "Milestone reminders"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border p-4">
                  <p className="font-medium">{item}</p>
                  <div className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-200 data-[state=checked]:bg-cos-orange" tabIndex={0} role="switch" aria-checked="true">
                    <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-[22px]" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-cos-blue">Integrations</CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Integration
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((i) => (
                    <TableRow key={i.name}>
                      <TableCell className="font-medium">{i.name}</TableCell>
                      <TableCell>{i.type}</TableCell>
                      <TableCell>
                        <Badge variant={i.status === "connected" ? "success" : "secondary"}>{i.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{i.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Configure</Button>
                      </TableCell>
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
