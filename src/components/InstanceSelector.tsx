import { useState } from "react";
import { ChevronDown, Monitor, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Instance {
  id: string;
  name: string;
  pid: string;
  attached: boolean;
}

const mockInstances: Instance[] = [
  { id: "1", name: "RobloxPlayerBeta", pid: "12456", attached: false },
  { id: "2", name: "RobloxPlayerBeta", pid: "23891", attached: true },
  { id: "3", name: "RobloxPlayerBeta", pid: "34521", attached: false },
];

interface InstanceSelectorProps {
  selectedInstances: string[];
  setSelectedInstances: (ids: string[]) => void;
}

export function InstanceSelector({ selectedInstances, setSelectedInstances }: InstanceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInstance = (id: string) => {
    if (selectedInstances.includes(id)) {
      setSelectedInstances(selectedInstances.filter((i) => i !== id));
    } else {
      setSelectedInstances([...selectedInstances, id]);
    }
  };

  const selectAll = () => {
    setSelectedInstances(mockInstances.map((i) => i.id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all min-w-[200px]"
      >
        <Monitor className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground flex-1 text-left">
          {selectedInstances.length === 0
            ? "Select Instance"
            : `${selectedInstances.length} Instance${selectedInstances.length > 1 ? "s" : ""}`}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="p-2 border-b border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Available Instances</span>
            <button
              onClick={selectAll}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Select All
            </button>
          </div>
          <div className="p-2 space-y-1 max-h-48 overflow-y-auto editor-scrollbar">
            {mockInstances.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-4">
                No instances found
              </div>
            ) : (
              mockInstances.map((instance) => (
                <button
                  key={instance.id}
                  onClick={() => toggleInstance(instance.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                    selectedInstances.includes(instance.id)
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      selectedInstances.includes(instance.id)
                        ? "bg-primary border-primary"
                        : "border-border"
                    )}
                  >
                    {selectedInstances.includes(instance.id) && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-foreground">{instance.name}</div>
                    <div className="text-xs text-muted-foreground">PID: {instance.pid}</div>
                  </div>
                  {instance.attached && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      Attached
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
          <div className="p-2 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-all">
              <Plus className="w-4 h-4" />
              Refresh Instances
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
