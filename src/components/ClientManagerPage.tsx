import { useMemo, useState } from "react";
import { Monitor, Power, RefreshCw, Plus } from "lucide-react";
import { toast } from "sonner";
import { useExecutor } from "@/context/executor-context";

export function ClientManagerPage() {
  const { instances, addInstance, removeInstance, selectedInstanceIds, setSelectedInstanceIds } = useExecutor();
  const [name, setName] = useState("RobloxPlayerBeta");
  const [pid, setPid] = useState("");

  const selectedCount = selectedInstanceIds.length;

  const handleKill = (id: string) => {
    removeInstance(id);
    toast.success("Process terminated", {
      description: "Client removed from list",
    });
  };

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
    toast.success("Client added", { description: "Select it in Executor to attach." });
  };

  const toggleSelect = (id: string) => {
    if (selectedInstanceIds.includes(id)) setSelectedInstanceIds(selectedInstanceIds.filter((x) => x !== id));
    else setSelectedInstanceIds([...selectedInstanceIds, id]);
  };

  const headerText = useMemo(() => {
    if (!instances.length) return "No clients found.";
    return `${selectedCount} of ${instances.length} selected`;
  }, [instances.length, selectedCount]);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Client Manager</h1>
          <p className="text-muted-foreground">Manage running Roblox instances</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-secondary-foreground hover:bg-secondary/80 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Quick Add */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <p className="font-semibold text-foreground">Add Client</p>
            <p className="text-sm text-muted-foreground">Enter a PID to add a Roblox client (no random instances).</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="Process name"
            />
            <input
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="PID"
            />
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Selection Info */}
      <div className="bg-secondary/30 border border-border rounded-xl p-4 text-sm text-muted-foreground">{headerText}</div>

      {/* Clients Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Select</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Process</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">PID</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-muted-foreground">
                  No clients found.
                </td>
              </tr>
            ) : (
              instances.map((client) => (
                <tr key={client.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => toggleSelect(client.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        selectedInstanceIds.includes(client.id) ? "bg-primary border-primary" : "border-border"
                      }`}
                      aria-label="Select client"
                    >
                      {selectedInstanceIds.includes(client.id) && <span className="text-primary-foreground text-xs">✓</span>}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Monitor className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{client.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{client.pid}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleKill(client.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                        aria-label="Kill client"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
