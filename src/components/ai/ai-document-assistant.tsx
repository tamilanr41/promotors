"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Download, FileText, Sparkles } from "lucide-react";

const docTypes = [
  { value: "boq", label: "Bill of Quantities (BOQ)" },
  { value: "rfi", label: "Request for Information (RFI)" },
  { value: "minutes", label: "Meeting Minutes" },
  { value: "site-report", label: "Site Report" },
  { value: "daily-progress", label: "Daily Progress Report" },
  { value: "handover", label: "Handover Certificate" },
];

const projects = [
  { value: "PRJ-001", label: "Riverside Tower" },
  { value: "PRJ-002", label: "Oakwood Estates" },
  { value: "PRJ-005", label: "Green Valley School" },
];

const templates: Record<string, (project: string) => string> = {
  boq: (p) => `BILL OF QUANTITIES\nProject: ${p}\nDate: ${new Date().toLocaleDateString()}\n\n| Item | Description | Qty | Unit | Rate | Amount |\n|------|-------------|-----|------|------|--------|\n| 1 | Excavation | 500 | cu.m | ₹850 | ₹425,000 |\n| 2 | Concrete M25 | 250 | cu.m | ₹6,500 | ₹1,625,000 |\n| 3 | Steel Reinforcement | 45 | MT | ₹72,000 | ₹3,240,000 |\n| 4 | Brickwork | 350 | cu.m | ₹5,200 | ₹1,820,000 |\n| 5 | Plastering | 1200 | sq.m | ₹380 | ₹456,000 |\n\nTotal: ₹7,566,000\n\n*This is an AI-generated draft. Verify all quantities with site measurements.*`,
  rfi: (p) => `REQUEST FOR INFORMATION\nProject: ${p}\nRFI No: RFI-${Math.floor(Math.random() * 1000)}\nDate: ${new Date().toLocaleDateString()}\n\nSubject: Clarification on structural drawings for Floor ${Math.floor(Math.random() * 15 + 1)}\n\nDescription:\nDuring review of the structural drawings, the following clarification is required:\n1. Beam reinforcement details at grid B-5 intersection\n2. Slab depth variation at the service core area\n3. Expansion joint spacing as per seismic zone requirements\n\nRequested By: AI Document Assistant\nResponse Required By: ${new Date(Date.now() + 7 * 86400000).toLocaleDateString()}`,
  minutes: (p) => `MEETING MINUTES\nProject: ${p}\nDate: ${new Date().toLocaleDateString()}\nLocation: Site Office / Virtual\n\nAttendees:\n- Project Manager\n- Site Engineer\n- Client Representative\n- Consultant\n\nAgenda:\n1. Progress review - ${Math.floor(Math.random() * 30 + 50)}% complete\n2. Material delivery status\n3. Quality concerns\n4. Safety observations\n\nDecisions:\n1. Proceed with Floor ${Math.floor(Math.random() * 10 + 5)} concreting on ${new Date(Date.now() + 5 * 86400000).toLocaleDateString()}\n2. Alternate tile supplier approved\n3. Additional QA checks for MEP works\n\nNext Meeting: ${new Date(Date.now() + 14 * 86400000).toLocaleDateString()}`,
  "site-report": (p) => `SITE REPORT\nProject: ${p}\nDate: ${new Date().toLocaleDateString()}\nReported By: AI Assistant\n\nWeather: ${["Clear", "Cloudy", "Light Rain"][Math.floor(Math.random() * 3)]}, ${Math.floor(Math.random() * 10 + 25)}°C\n\nWork Done Today:\n- ${Math.floor(Math.random() * 20 + 10)} workers deployed\n- Concrete pouring: ${Math.floor(Math.random() * 50 + 20)} cu.m completed\n- Steel fixing: ${Math.floor(Math.random() * 5 + 2)} MT placed\n- Shuttering works in progress\n\nIssues:\n- Material shortage: NIL\n- Safety observations: 2 minor (corrected on spot)\n- Quality issues: None reported\n\nEquipment on Site:\n- Tower Crane: Operational\n- Concrete Mixer: Operational\n- Vibrators: 4 units operational`,
  "daily-progress": (p) => `DAILY PROGRESS REPORT\nProject: ${p}\nDate: ${new Date().toLocaleDateString()}\nReport No: DPR-${Math.floor(Math.random() * 200 + 100)}\n\n| Activity | Planned | Actual | Variance |\n|----------|---------|--------|----------|\n| Excavation | 100 cu.m | 95 cu.m | -5% |\n| Concrete | 40 cu.m | 42 cu.m | +5% |\n| Steel Fixing | 3 MT | 3.2 MT | +6.7% |\n| Brickwork | 50 cu.m | 45 cu.m | -10% |\n\nOverall Progress: ${Math.floor(Math.random() * 20 + 60)}%\n\nRemarks: Satisfactory progress. Minor delays in brickwork due to material handling.`,
  handover: (p) => `HANDOVER CERTIFICATE\nProject: ${p}\nDate: ${new Date().toLocaleDateString()}\n\nThis is to certify that the construction work for ${p} has been completed as per the approved drawings and specifications.\n\nScope Completed:\n- Structural works\n- Architectural finishing\n- MEP installations\n- External development\n\nDefects Liability Period: 12 months from handover\n\nHanded Over By: Contractor\nReceived By: Client\n\n*This is a draft certificate. Final handover requires physical inspection and sign-off.*`,
};

export function AIDocumentAssistant() {
  const [docType, setDocType] = useState("");
  const [project, setProject] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!docType || !project) return;
    setLoading(true);
    setTimeout(() => {
      const template = templates[docType];
      if (template) {
        setGeneratedDoc(template(projects.find((p) => p.value === project)?.label || project));
      }
      setLoading(false);
    }, 1200);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDoc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType}-${project}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cos-blue">
          <Sparkles className="h-5 w-5 text-cos-orange" />
          AI Document Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select options={docTypes} placeholder="Select document type" value={docType} onChange={(e) => setDocType(e.target.value)} />
          <Select options={projects} placeholder="Select project" value={project} onChange={(e) => setProject(e.target.value)} />
        </div>
        <Button onClick={handleGenerate} disabled={!docType || !project || loading} className="w-full bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          {loading ? <><Skeleton className="mr-2 h-4 w-4" /> Generating...</> : <><FileText className="mr-2 h-4 w-4" /> Generate Document</>}
        </Button>
        {generatedDoc && (
          <div className="space-y-3">
            <textarea
              className="h-64 w-full rounded-lg border bg-gray-50 p-4 font-mono text-xs leading-relaxed focus:outline-none"
              value={generatedDoc}
              readOnly
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
