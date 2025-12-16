import { Plus, X, FileCode } from "lucide-react";
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
    <div className="flex items-center gap-1 p-1 glass rounded-xl overflow-x-auto custom-scrollbar">
      {scripts.map((script) => {
        const isActive = script.id === activeScript;
        return (
          <div
            key={script.id}
            className={cn(
              "group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer min-w-0",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
            onClick={() => setActiveScript(script.id)}
          >
            <FileCode className={cn(
              "w-4 h-4 flex-shrink-0 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="text-sm font-medium truncate max-w-[100px]">{script.name}</span>
            {scripts.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeScript(script.id);
                }}
                className={cn(
                  "p-0.5 rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20",
                  isActive && "opacity-100"
                )}
              >
                <X className="w-3 h-3 hover:text-destructive" />
              </button>
            )}
          </div>
        );
      })}
      
      {/* Add Tab Button */}
      <button
        onClick={addScript}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 flex-shrink-0"
        title="New Script"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}