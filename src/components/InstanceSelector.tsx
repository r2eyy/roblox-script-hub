import { useMemo, useState } from "react";
import { ChevronDown, Monitor, Check, Plus, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExecutor } from "@/context/executor-context";
import { toast } from "sonner";

interface InstanceSelectorProps {
  selectedInstances: string[];
  setSelectedInstances: (ids: string[]) => void;
}

export function InstanceSelector({ selectedInstances, setSelectedInstances }: InstanceSelectorProps) {
  const { instances, addInstance } = useExecutor();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("RobloxPlayerBeta");
  const [pid, setPid] = useState("");

  const selectedCount = selectedInstances.length;

  const selectedLabel = useMemo(() => {
    if (selectedCount === 0) return "Select Instance";
    return `${selectedCount} Instance${selectedCount > 1 ? "s" : ""}`;
  }, [selectedCount]);

  const toggleInstance = (id: string) => {
    if (selectedInstances.includes(id)) setSelectedInstances(selectedInstances.filter((i) => i !== id));
    else setSelectedInstances([...selectedInstances, id]);
  };

  const selectAll = () => setSelectedInstances(instances.map((i) => i.id));
  const deselectAll = () => setSelectedInstances([]);

  const handleRefresh = () => {
    toast.info("Refreshed", {
      description: instances.length ? "Clients list updated." : "No clients found.",
    });
  };

  const handleAdd = () => {
    if (!pid.trim()) {
      toast.error("PID required", { description: "Enter a PID to add a client." });
      return;
    }
    addInstance({ name: name.trim() || "RobloxPlayerBeta", pid: pid.trim() });
    setPid("");
    setShowAdd(false);
    toast.success("Client added", { description: "You can now select it to attach." });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all min-w-[200px]"
      >
        <Monitor className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground flex-1 text-left">{selectedLabel}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="p-2 border-b border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Clients</span>
            <div className="flex items-center gap-3">
              {instances.length > 0 && (
                <>
                  <button onClick={selectAll} className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Select All
                  </button>
                  <button onClick={deselectAll} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-2 space-y-1 max-h-56 overflow-y-auto editor-scrollbar">
            {instances.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">No clients found.</div>
            ) : (
              instances.map((instance) => (
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
                      selectedInstances.includes(instance.id) ? "bg-primary border-primary" : "border-border"
                    )}
                  >
                    {selectedInstances.includes(instance.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-foreground">{instance.name}</div>
                    <div className="text-xs text-muted-foreground">PID: {instance.pid}</div>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="p-2 border-t border-border space-y-2">
            {!showAdd ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAdd(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-secondary border border-border rounded-md hover:bg-secondary/80 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Client
                </button>
                <button
                  onClick={handleRefresh}
                  className="px-3 py-2 text-sm bg-secondary border border-border rounded-md hover:bg-secondary/80 transition-all"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Add a client</span>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="Process name"
                  />
                  <input
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                    className="px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="PID"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
