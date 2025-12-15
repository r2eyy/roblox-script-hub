import { useState, useEffect } from "react";
import { Activity, Code, Cpu, Clock, TrendingUp, Zap, Monitor, Download, Users, Unplug, XCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const recentScripts = [
  { name: "InfiniteJump.lua", time: "2 min ago", status: "success" },
  { name: "SpeedHack.lua", time: "15 min ago", status: "success" },
  { name: "WalkSpeed.lua", time: "1 hour ago", status: "error" },
  { name: "ESP.lua", time: "2 hours ago", status: "success" },
];

const updates = [
  "Fixed any exception causing R2Exec to crash",
  "Added crash handler for RBXClient",
  "Added RBXClient data retrieval from endpoint",
  "Proper multiple versions support with better adaptation",
  "Fixed not attaching in-game for many users",
  "Fixed requests library OpenSSL issue",
];

export function DashboardPage() {
  const [isAttached, setIsAttached] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(23);

  // Simulate live CPU usage
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const change = (Math.random() - 0.5) * 10;
        const newValue = prev + change;
        return Math.max(5, Math.min(95, Math.round(newValue)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Scripts Executed", value: "1,247", icon: Code, trend: "+12%" },
    { label: "Active Sessions", value: isAttached ? "1" : "0", icon: Activity, trend: isAttached ? "Active" : "Idle" },
    { label: "CPU Usage", value: `${cpuUsage}%`, icon: Cpu, trend: cpuUsage < 30 ? "Low" : cpuUsage < 60 ? "Normal" : "High" },
    { label: "Uptime", value: "99.9%", icon: Clock, trend: "Stable" },
  ];

  const handleDetach = () => {
    setIsAttached(false);
    toast.success("Detached from Roblox");
  };

  const handleKillRoblox = () => {
    setIsAttached(false);
    toast.success("Roblox process terminated");
  };

  const handleAttach = () => {
    setIsAttached(true);
    toast.success("Attached to Roblox");
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to R2Exec</p>
        </div>
        <div className="flex items-center gap-2">
          {isAttached ? (
            <button
              onClick={handleDetach}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium hover:bg-yellow-500/30 transition-all"
            >
              <Unplug className="w-4 h-4" />
              Detach
            </button>
          ) : (
            <button
              onClick={handleAttach}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg font-medium hover:bg-primary/30 transition-all"
            >
              <Zap className="w-4 h-4" />
              Attach
            </button>
          )}
          <button
            onClick={handleKillRoblox}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg font-medium hover:bg-destructive/30 transition-all"
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
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all group cursor-pointer"
        >
          <div className="flex flex-col items-center text-center">
            <Monitor className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Visit Our Website</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
              <ExternalLink className="w-4 h-4" />
              Open Website
            </button>
          </div>
        </a>
        <a
          href="https://xeno.onl"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all group cursor-pointer"
        >
          <div className="flex flex-col items-center text-center">
            <Download className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Version: v1.0.0</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
              <ExternalLink className="w-4 h-4" />
              Download Latest
            </button>
          </div>
        </a>
        <a
          href="https://discord.gg/UScaGnBAxs"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all group cursor-pointer"
        >
          <div className="flex flex-col items-center text-center">
            <Users className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-foreground mb-2">Join Our Community</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
              <ExternalLink className="w-4 h-4" />
              Join Discord
            </button>
          </div>
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-green-400">{stat.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest Updates */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Latest Updates</h2>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-4">Stay updated with the latest features and improvements</p>
        <div className="space-y-2">
          {updates.map((update, i) => (
            <div key={i} className="py-2 border-b border-border last:border-0 text-sm text-foreground">
              {update}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Scripts</h2>
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-3">
          {recentScripts.map((script, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Code className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{script.name}</p>
                  <p className="text-xs text-muted-foreground">{script.time}</p>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  script.status === "success"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {script.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary/10 to-red-500/10 border border-primary/20 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-2">Quick Start</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Go to the Executor tab to start writing and executing Lua scripts.
        </p>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Zap className="w-4 h-4" />
          <span>Pro tip: Use Tab for auto-indent in the editor</span>
        </div>
      </div>
    </div>
  );
}