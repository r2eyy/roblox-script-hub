import { LayoutDashboard, Code, BookOpen, Users, Settings, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "executor", label: "Executor", icon: Code },
  { id: "scripthub", label: "Scripts", icon: BookOpen },
  { id: "clients", label: "Clients", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "credits", label: "Credits", icon: Heart },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-20 flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-8 relative group">
        <div className="w-12 h-12 rounded-xl glass flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:glow-red">
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          <span className="font-display text-sm text-glow">R2Exec</span>
        </div>
      </div>

      {/* Navigation Dock */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "dock-item w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "glass glow-red active"
                    : "hover:glass hover:bg-card/40"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
              </button>
              {/* Tooltip */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 glass rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0">
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Version */}
      <div className="mt-auto">
        <div className="text-[10px] text-muted-foreground font-mono rotate-180 writing-mode-vertical">
          v1.0.0
        </div>
      </div>
    </div>
  );
}