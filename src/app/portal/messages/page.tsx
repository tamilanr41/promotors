"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Plus, Send } from "lucide-react";

interface Message {
  id: string;
  from: string;
  role: string;
  project: string;
  subject: string;
  content: string;
  date: string;
  unread: boolean;
}

const initialMessages: Message[] = [
  { id: "M1", from: "John Smith", role: "Project Manager", project: "Riverside Tower", subject: "Floor 11 Concrete Pour", content: "Floor 11 concrete pour has been scheduled for this Friday at 7 AM. Please ensure site access is available. Expected duration is 8 hours.", date: "2026-07-08 09:30", unread: true },
  { id: "M2", from: "Sarah Lee", role: "Project Manager", project: "Green Valley School", subject: "Interior Materials Arrival", content: "The interior finishing materials for the academic block have arrived. We will begin installation next week. Please review the sample boards in the site office.", date: "2026-07-07 14:15", unread: false },
  { id: "M3", from: "John Smith", role: "Project Manager", project: "Riverside Tower", subject: "Updated Timeline", content: "Please find attached the updated project timeline for the next 2 weeks. We've adjusted the schedule to accommodate the delayed steel delivery.", date: "2026-07-06 11:00", unread: false },
  { id: "M4", from: "Sarah Lee", role: "Project Manager", project: "Green Valley School", subject: "Safety Drill Reminder", content: "Monthly safety drill is scheduled for July 15th at 10 AM. All site personnel must participate.", date: "2026-07-05 16:45", unread: false },
];

const conversations: { name: string; role: string; project: string }[] = [
  { name: "John Smith", role: "Project Manager", project: "Riverside Tower" },
  { name: "Sarah Lee", role: "Project Manager", project: "Green Valley School" },
  { name: "Ravi Kumar", role: "Site Engineer", project: "Riverside Tower" },
  { name: "Priya Sharma", role: "Accounts", project: "All Projects" },
];

export default function PortalMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const unreadCount = messages.filter((m) => m.unread).length;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      from: "You",
      role: "Client",
      project: selectedChat.project,
      subject: "Re: Latest update",
      content: newMessage,
      date: new Date().toLocaleString(),
      unread: false,
    };
    setMessages((prev) => [userMsg, ...prev]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Messages</h1>
          <p className="text-muted-foreground">Communicate with your project team</p>
        </div>
        <Dialog>
          <DialogTrigger className="bg-gradient-to-r from-cos-orange to-cos-orange-dark inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 text-primary-foreground shadow hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> New Message
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  {conversations.map((c) => (
                    <option key={c.name} value={c.name}>{c.name} - {c.project}</option>
                  ))}
                </select>
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Type your message..." className="min-h-[120px]" />
              <Button className="w-full bg-gradient-to-r from-cos-orange to-cos-orange-dark">Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-md lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cos-blue">
              Conversations {unreadCount > 0 && <Badge className="ml-2">{unreadCount} new</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {conversations.map((conv) => {
              const convMessages = messages.filter((m) => m.from === conv.name || m.project === conv.project);
              const hasUnread = convMessages.some((m) => m.unread);
              return (
                <button
                  key={conv.name}
                  onClick={() => setSelectedChat(conv)}
                  className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                    selectedChat.name === conv.name ? "bg-cos-orange/10 border border-cos-orange/30" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cos-orange to-cos-orange-dark text-white text-sm font-bold">
                    {conv.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      {hasUnread && <span className="h-2 w-2 shrink-0 rounded-full bg-cos-orange" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.role}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.project}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cos-orange to-cos-orange-dark text-white text-sm font-bold">
                {selectedChat.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <CardTitle className="text-base">{selectedChat.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{selectedChat.role} • {selectedChat.project}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4 max-h-[400px] space-y-3 overflow-y-auto">
              {messages.filter((m) => m.from === selectedChat.name || m.project === selectedChat.project).map((msg) => (
                <div key={msg.id} className={`rounded-lg p-3 ${msg.unread ? "bg-cos-orange/5 border border-cos-orange/20" : "bg-gray-50"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{msg.from}</span>
                      <Badge variant="secondary" className="text-[10px]">{msg.role}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{msg.date}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-cos-blue">{msg.subject}</p>
                  <p className="mt-1 text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-cos-orange hover:bg-cos-orange-dark">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
