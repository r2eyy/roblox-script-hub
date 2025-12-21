import { LayoutDashboard, Code, BookOpen, Users, Settings, Heart, Zap, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExecutor } from "@/context/executor-context";

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "executor", label: "Executor", icon: Code },
  { id: "scripthub", label: "Script Hub", icon: BookOpen },
  { id: "clients", label: "Clients", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "credits", label: "Credits", icon: Heart },
];

export function TopNav({ activeTab, setActiveTab }: TopNavProps) {
  const { isAttached, instances } = useExecutor();

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center px-4 gap-6 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 pr-6 border-r border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg tracking-wider">R2</span>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
          isAttached 
            ? "bg-status-online/15 text-status-online" 
            : "bg-secondary text-muted-foreground"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            isAttached ? "bg-status-online animate-pulse" : "bg-muted-foreground"
          )} />
          {isAttached ? `${instances.length} Connected` : "Disconnected"}
        </div>

        {/* Version Badge */}
        <div className="px-2 py-1 rounded bg-secondary text-[10px] font-mono text-muted-foreground">
          v1.0.0
        </div>
      </div>
    </header>
  );
}
