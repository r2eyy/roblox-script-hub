import { useMemo, useState } from "react";
import { ChevronDown, Monitor, Check, Plus, X, RefreshCw, Scan } from "lucide-react";
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
    if (selectedCount === 1) {
      const inst = instances.find(i => selectedInstances.includes(i.id));
      return inst?.name || "1 Instance";
    }
    return `${selectedCount} Instances`;
  }, [selectedCount, instances, selectedInstances]);

  const toggleInstance = (id: string) => {
    if (selectedInstances.includes(id)) setSelectedInstances(selectedInstances.filter((i) => i !== id));
    else setSelectedInstances([...selectedInstances, id]);
  };

  const selectAll = () => setSelectedInstances(instances.map((i) => i.id));
  const deselectAll = () => setSelectedInstances([]);

  const handleAutoDetect = () => {
    // Simulate auto-detection
    const fakePid = Math.floor(Math.random() * 10000) + 5000;
    addInstance({ name: "RobloxPlayerBeta", pid: String(fakePid) });
    toast.success("Instance detected", {
      description: `Found Roblox process with PID ${fakePid}`,
    });
  };

  const handleRefresh = () => {
    toast.info("Scanning...", {
      description: "Looking for Roblox instances",
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
    toast.success("Client added");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 glass rounded-xl transition-all duration-300 min-w-[220px] group",
          isOpen && "glow-red"
        )}
      >
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
          selectedCount > 0 ? "bg-primary/20" : "bg-secondary"
        )}>
          <Monitor className={cn(
            "w-4 h-4 transition-colors",
            selectedCount > 0 ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <div className="flex-1 text-left">
          <div className="text-xs text-muted-foreground">Target</div>
          <div className="text-sm font-medium">{selectedLabel}</div>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 glass rounded-xl shadow-2xl z-50 animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Instances</span>
            <div className="flex items-center gap-2">
              {instances.length > 0 && (
                <>
                  <button onClick={selectAll} className="text-xs text-primary hover:text-primary/80 transition-colors">
                    All
                  </button>
                  <span className="text-border">|</span>
                  <button onClick={deselectAll} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Instance List */}
          <div className="p-2 space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
            {instances.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                <Monitor className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No instances found</p>
                <p className="text-xs mt-1">Use Auto Detect or add manually</p>
              </div>
            ) : (
              instances.map((instance) => (
                <button
                  key={instance.id}
                  onClick={() => toggleInstance(instance.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    selectedInstances.includes(instance.id)
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      selectedInstances.includes(instance.id) ? "bg-primary border-primary" : "border-border"
                    )}
                  >
                    {selectedInstances.includes(instance.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{instance.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">PID: {instance.pid}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-status-online animate-pulse" />
                </button>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="p-2 border-t border-border/50 space-y-2">
            {!showAdd ? (
              <div className="flex gap-2">
                <button
                  onClick={handleAutoDetect}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-medium"
                >
                  <Scan className="w-4 h-4" />
                  Auto Detect
                </button>
                <button
                  onClick={() => setShowAdd(true)}
                  className="px-3 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-all"
                  title="Add manually"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="px-3 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-all"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Add Instance</span>
                  <button onClick={() => setShowAdd(false)} className="p-1 rounded hover:bg-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Process name"
                  />
                  <input
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                    className="w-24 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors font-mono"
                    placeholder="PID"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Instance
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}