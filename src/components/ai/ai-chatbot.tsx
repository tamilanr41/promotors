"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Send, X, HardHat, FileText, Calendar, BarChart3 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { icon: HardHat, label: "What permits do I need?" },
  { icon: FileText, label: "BOQ template?" },
  { icon: Calendar, label: "Typical timeline?" },
  { icon: BarChart3, label: "Cost saving tips?" },
];

const responses: Record<string, string> = {
  "what permits do i need": "For construction in India, you typically need: 1) Building Permit from local municipal corporation, 2) Environmental Clearance (for large projects), 3) Fire NOC, 4) Lift clearance (if applicable), 5) Pollution Board consent, 6) Labor license. The exact list varies by state and project type. Our compliance team can help you navigate this process.",
  "boq template": "A standard BOQ template includes: 1) Project info header, 2) Itemized list with item code, description, unit, quantity, rate, and amount, 3) Substructure work (excavation, PCC, RCC), 4) Superstructure work (columns, beams, slabs), 5) Finishing works (flooring, plaster, painting), 6) MEP works, 7) External development. Use our AI Document Assistant to generate a draft BOQ automatically!",
  "typical timeline": "A typical residential project timeline: 1) Site preparation: 1-2 months, 2) Foundation: 2-3 months, 3) Structural framework: 4-8 months (depends on floors), 4) MEP works: 3-5 months (can overlap with structure), 5) Finishing: 3-6 months, 6) Handover: 1 month. Total: 12-24 months for a mid-rise building. Use our AI Schedule Optimizer for a detailed analysis!",
  "cost saving tips": "Top cost-saving strategies: 1) Bulk procurement of materials during off-season, 2) Use of precast/prefab elements to reduce labor cost, 3) Value engineering - choose cost-effective alternatives without compromising quality, 4) Optimize foundation design based on soil test results, 5) Implement just-in-time material delivery to reduce storage costs, 6) Use energy-efficient equipment to reduce operational costs.",
  "hello": "Hello! I'm your COS AI Assistant. I can help with construction-related questions about permits, BOQ, timelines, cost optimization, safety, quality standards, and more. What would you like to know?",
  "hi": "Hi there! Welcome to the Construction OS. I'm here to help you with any construction-related queries. Try asking me about permits, budgets, material quantities, or project planning!",
  default: "I understand you're asking about construction. Let me provide some insights. For detailed project-specific advice, please consult with your project manager or use our AI Estimator tool for accurate cost calculations. Is there something specific about construction management I can help with?",
};

function simulateResponse(input: string): string {
  const lowercase = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(responses)) {
    if (lowercase.includes(key)) return response;
  }
  return responses.default;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: "Hello! I'm your AI construction assistant. How can I help you today?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = simulateResponse(messageText);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cos-orange to-cos-orange-dark text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-80 flex-col rounded-2xl border bg-white shadow-2xl sm:w-96">
          <div className="flex items-center gap-3 rounded-t-2xl bg-gradient-to-r from-cos-orange to-cos-orange-dark p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">AI Assistant</p>
              <p className="flex items-center gap-1 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-300" /> Online
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto rounded-full p-1 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-80 flex-col gap-2 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.role === "user" ? "bg-cos-orange text-white" : "bg-gray-100 text-gray-800"
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className="mt-1 text-right text-[10px] opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(q.label)}
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-colors hover:border-cos-orange hover:text-cos-orange"
                  >
                    <Icon className="h-3 w-3" />
                    {q.label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about construction..."
                className="flex-1 text-sm"
              />
              <Button size="sm" onClick={() => handleSend()} className="shrink-0 bg-cos-orange hover:bg-cos-orange-dark">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
