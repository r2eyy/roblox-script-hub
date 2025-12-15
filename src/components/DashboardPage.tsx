import { Activity, Code, Cpu, Clock, TrendingUp, Zap } from "lucide-react";

const stats = [
  { label: "Scripts Executed", value: "1,247", icon: Code, trend: "+12%" },
  { label: "Active Sessions", value: "3", icon: Activity, trend: "+2" },
  { label: "CPU Usage", value: "23%", icon: Cpu, trend: "-5%" },
  { label: "Uptime", value: "99.9%", icon: Clock, trend: "Stable" },
];

const recentScripts = [
  { name: "InfiniteJump.lua", time: "2 min ago", status: "success" },
  { name: "SpeedHack.lua", time: "15 min ago", status: "success" },
  { name: "WalkSpeed.lua", time: "1 hour ago", status: "error" },
  { name: "ESP.lua", time: "2 hours ago", status: "success" },
];

export function DashboardPage() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to Nova Executor</p>
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
      <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-xl p-5">
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
