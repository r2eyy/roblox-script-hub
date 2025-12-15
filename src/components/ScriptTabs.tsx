import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Script {
  id: string;
  name: string;
  content: string;
}

interface ScriptTabsProps {
  scripts: Script[];
  activeScript: string;
  setActiveScript: (id: string) => void;
  addScript: () => void;
  removeScript: (id: string) => void;
}

export function ScriptTabs({
  scripts,
  activeScript,
  setActiveScript,
  addScript,
  removeScript,
}: ScriptTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
      {scripts.map((script) => (
        <div
          key={script.id}
          className={cn(
            "group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all",
            activeScript === script.id
              ? "bg-card border border-border text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          )}
          onClick={() => setActiveScript(script.id)}
        >
          <span className="text-sm font-medium">{script.name}</span>
          {scripts.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeScript(script.id);
              }}
              className={cn(
                "p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-all",
                activeScript === script.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addScript}
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
