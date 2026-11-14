"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { GanttChartSquare, Lightbulb, Zap } from "lucide-react";

const optimizationSuggestions = [
  { id: 1, title: "Parallelize MEP & Structural works", impact: "high", description: "Start MEP rough-ins for lower floors while upper floors are still being structured. Can save 2-3 months.", saved: "2-3 months" },
  { id: 2, title: "Procure long-lead items early", impact: "high", description: "Order elevators, HVAC units, and generators at project start. Average lead time is 8-12 weeks.", saved: "6-8 weeks" },
  { id: 3, title: "Optimize concreting cycle", impact: "medium", description: "Reduce slab cycle from 14 to 10 days using accelerated curing compounds and additional formwork sets.", saved: "3-4 weeks per 10 floors" },
  { id: 4, title: "Prefabrication strategy", impact: "medium", description: "Use prefab bathroom pods and precast staircases. Reduces on-site labor requirement by 30%.", saved: "4-6 weeks" },
  { id: 5, title: "Double-shift for critical path", impact: "low", description: "Implement double-shift for excavation and concreting on critical path activities.", saved: "2 weeks" },
];

interface Phase {
  name: string;
  duration: number;
}

export function AIScheduleOptimizer() {
  const [phases, setPhases] = useState<Phase[]>([
    { name: "Site Prep", duration: 2 },
    { name: "Foundation", duration: 3 },
    { name: "Structure", duration: 6 },
    { name: "MEP", duration: 4 },
    { name: "Finishing", duration: 3 },
  ]);
  const [optimizing, setOptimizing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const totalDuration = phases.reduce((sum, p) => sum + p.duration, 0);
  const maxDuration = Math.max(...phases.map((p) => p.duration), 1);

  const handleDurationChange = (index: number, value: string) => {
    const updated = [...phases];
    updated[index] = { ...updated[index], duration: parseInt(value) || 1 };
    setPhases(updated);
  };

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setShowSuggestions(true);
    }, 1500);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cos-blue">
          <GanttChartSquare className="h-5 w-5 text-cos-orange" />
          AI Schedule Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {phases.map((phase, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{phase.name}</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={24}
                    value={phase.duration}
                    onChange={(e) => handleDurationChange(i, e.target.value)}
                    className="h-7 w-16 text-center text-xs"
                  />
                  <span className="text-xs text-muted-foreground">mo</span>
                </div>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cos-orange to-cos-orange-light transition-all"
                  style={{ width: `${(phase.duration / maxDuration) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-sm text-muted-foreground">Total Duration</p>
          <p className="text-2xl font-bold text-cos-blue">{totalDuration} months</p>
        </div>

        <Button onClick={handleOptimize} disabled={optimizing} className="w-full bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          {optimizing ? <><Skeleton className="mr-2 h-4 w-4" /> Optimizing...</> : <><Zap className="mr-2 h-4 w-4" /> Optimize Schedule</>}
        </Button>

        {showSuggestions && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-cos-blue">Optimization Suggestions</span>
            </div>
            {optimizationSuggestions.map((s) => (
              <div key={s.id} className="rounded-lg border p-3 transition-all hover:border-cos-orange/30 hover:bg-cos-orange/5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{s.title}</p>
                      <Badge variant={s.impact === "high" ? "destructive" : s.impact === "medium" ? "warning" : "secondary"} className="text-[10px]">
                        {s.impact}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
                  </div>
                  <Badge variant="success" className="shrink-0 text-[10px]">
                    Save {s.saved}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
