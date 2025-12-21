import { useEffect, useMemo, useState } from "react";
import { Activity, Code, Cpu, Clock, TrendingUp, Zap, Monitor, Download, Users, ExternalLink } from "lucide-react";
import { useExecutor } from "@/context/executor-context";

const recentScripts = [
  { name: "InfiniteJump.lua", time: "2 min ago", status: "success" },
  { name: "SpeedHack.lua", time: "15 min ago", status: "success" },
  { name: "WalkSpeed.lua", time: "1 hour ago", status: "error" },
  { name: "ESP.lua", time: "2 hours ago", status: "success" },
];

export function DashboardPage() {
  const { isAttached, instances } = useExecutor();
  const [cpuUsage, setCpuUsage] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => Math.max(5, Math.min(95, Math.round(prev + (Math.random() - 0.5) * 10))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cpuTrend = useMemo(() => (cpuUsage < 30 ? "Low" : cpuUsage < 60 ? "Normal" : "High"), [cpuUsage]);

  const stats = [
    { label: "Scripts Executed", value: "1,247", icon: Code, trend: "+12%" },
    { label: "Active Sessions", value: isAttached ? "1" : "0", icon: Activity, trend: isAttached ? "Active" : "Idle" },
    { label: "CPU Usage", value: `${cpuUsage}%`, icon: Cpu, trend: cpuTrend },
    { label: "Uptime", value: "99.9%", icon: Clock, trend: "Stable" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to R2Exec</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.usa.gov" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
          <Monitor className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
          <h3 className="font-medium">Visit Website</h3>
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"><ExternalLink className="w-3 h-3" />Open</div>
        </a>
        <a href="https://xeno.onl" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
          <Download className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
          <h3 className="font-medium">Version: v1.0.0</h3>
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"><ExternalLink className="w-3 h-3" />Download</div>
        </a>
        <a href="https://discord.gg/UScaGnBAxs" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
          <Users className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
          <h3 className="font-medium">Community</h3>
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground"><ExternalLink className="w-3 h-3" />Discord</div>
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-2.5 bg-primary/10 rounded-lg"><Icon className="w-5 h-5 text-primary" /></div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-status-online"><TrendingUp className="w-3 h-3" />{stat.trend}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Connection Status</h2>
            <p className="text-sm text-muted-foreground mt-1">{isAttached ? `Connected to ${instances.length} instance(s)` : "Not connected"}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isAttached ? "bg-status-online/15 text-status-online" : "bg-secondary text-muted-foreground"}`}>
            <span className={`w-2 h-2 rounded-full ${isAttached ? "bg-status-online animate-pulse" : "bg-muted-foreground"}`} />
            {isAttached ? "Connected" : "Disconnected"}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4"><h2 className="font-semibold">Recent Scripts</h2><Zap className="w-5 h-5 text-primary" /></div>
        <div className="space-y-2">
          {recentScripts.map((script, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><Code className="w-4 h-4 text-muted-foreground" /></div>
                <div><p className="text-sm font-medium">{script.name}</p><p className="text-xs text-muted-foreground">{script.time}</p></div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${script.status === "success" ? "bg-status-online/15 text-status-online" : "bg-destructive/15 text-destructive"}`}>{script.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}