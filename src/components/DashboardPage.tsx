import { useEffect, useMemo, useState } from "react";
import { Activity, Code, Cpu, Clock, TrendingUp, Zap, Monitor, Download, Users, Link2Off, XCircle, ExternalLink } from "lucide-react";
import { useExecutor } from "@/context/executor-context";

const recentScripts = [
  { name: "InfiniteJump.lua", time: "2 min ago", status: "success" },
  { name: "SpeedHack.lua", time: "15 min ago", status: "success" },
  { name: "WalkSpeed.lua", time: "1 hour ago", status: "error" },
  { name: "ESP.lua", time: "2 hours ago", status: "success" },
];

export function DashboardPage() {
  const { isAttached, attach, detach, killRoblox, selectedInstanceIds } = useExecutor();
  const [cpuUsage, setCpuUsage] = useState(23);

  // Simulate live CPU usage
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const change = (Math.random() - 0.5) * 10;
        const next = prev + change;
        return Math.max(5, Math.min(95, Math.round(next)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cpuTrend = useMemo(() => {
    if (cpuUsage < 30) return "Low";
    if (cpuUsage < 60) return "Normal";
    return "High";
  }, [cpuUsage]);

  const stats = [
    { label: "Scripts Executed", value: "1,247", icon: Code, trend: "+12%" },
    { label: "Active Sessions", value: isAttached ? "1" : "0", icon: Activity, trend: isAttached ? "Active" : "Idle" },
    { label: "CPU Usage", value: `${cpuUsage}%`, icon: Cpu, trend: cpuTrend },
    { label: "Uptime", value: "99.9%", icon: Clock, trend: "Stable" },
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground text-glow">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to R2Exec</p>
        </div>
        <div className="flex items-center gap-3">
          {isAttached ? (
            <button
              onClick={detach}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-status-online font-medium hover:glow-green transition-all"
            >
              <Link2Off className="w-4 h-4" />
              Detach
            </button>
          ) : (
            <button
              onClick={attach}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-primary font-medium hover:glow-red transition-all"
            >
              <Zap className="w-4 h-4" />
              Attach
            </button>
          )}
          <button
            onClick={killRoblox}
            className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-destructive font-medium hover:bg-destructive/10 transition-all"
          >
            <XCircle className="w-4 h-4" />
            Kill Roblox
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://www.usa.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl p-5 hover:glow-red transition-all duration-300 group cursor-pointer corner-accent"
        >
          <div className="flex flex-col items-center text-center">
            <Monitor className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Visit Our Website</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg text-sm">
              <ExternalLink className="w-4 h-4" />
              Open Website
            </div>
          </div>
        </a>
        <a
          href="https://xeno.onl"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl p-5 hover:glow-red transition-all duration-300 group cursor-pointer corner-accent"
        >
          <div className="flex flex-col items-center text-center">
            <Download className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Version: v1.0.0</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg text-sm">
              <ExternalLink className="w-4 h-4" />
              Download Latest
            </div>
          </div>
        </a>
        <a
          href="https://discord.gg/UScaGnBAxs"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl p-5 hover:glow-red transition-all duration-300 group cursor-pointer corner-accent"
        >
          <div className="flex flex-col items-center text-center">
            <Users className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Join Our Community</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg text-sm">
              <ExternalLink className="w-4 h-4" />
              Join Discord
            </div>
          </div>
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="glass rounded-xl p-5 hover:glow-red transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs">
                <TrendingUp className="w-3 h-3 text-status-online" />
                <span className="text-status-online">{stat.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attach Status */}
      <div className="glass rounded-xl p-5 corner-accent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Attachment Status</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isAttached
                ? `Connected to ${selectedInstanceIds.length} instance(s)`
                : "Not attached. Select an instance and click Attach."}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isAttached ? "bg-status-online/20 text-status-online" : "bg-secondary text-muted-foreground"}`}>
            <div className={`w-2 h-2 rounded-full ${isAttached ? "bg-status-online animate-pulse" : "bg-muted-foreground"}`} />
            <span className="text-sm font-medium">{isAttached ? "Attached" : "Detached"}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-5 corner-accent">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-foreground">Recent Scripts</h2>
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-2">
          {recentScripts.map((script, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <Code className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{script.name}</p>
                  <p className="text-xs text-muted-foreground">{script.time}</p>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  script.status === "success" ? "bg-status-online/20 text-status-online" : "bg-destructive/20 text-destructive"
                }`}
              >
                {script.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}