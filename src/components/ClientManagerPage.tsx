import { useMemo, useState } from "react";
import { Monitor, Power, RefreshCw, Plus, Scan } from "lucide-react";
import { toast } from "sonner";
import { useExecutor } from "@/context/executor-context";

export function ClientManagerPage() {
  const { instances, addInstance, removeInstance, selectedInstanceIds, setSelectedInstanceIds } = useExecutor();
  const [name, setName] = useState("RobloxPlayerBeta");
  const [pid, setPid] = useState("");

  const selectedCount = selectedInstanceIds.length;

  const handleKill = (id: string) => {
    removeInstance(id);
    toast.success("Process terminated");
  };

  const handleAutoDetect = () => {
    const fakePid = Math.floor(Math.random() * 10000) + 5000;
    addInstance({ name: "RobloxPlayerBeta", pid: String(fakePid) });
    toast.success("Instance detected", { description: `Found PID ${fakePid}` });
  };

  const handleAdd = () => {
    if (!pid.trim()) {
      toast.error("PID required");
      return;
    }
    addInstance({ name: name.trim() || "RobloxPlayerBeta", pid: pid.trim() });
    setPid("");
    toast.success("Client added");
  };

  const toggleSelect = (id: string) => {
    if (selectedInstanceIds.includes(id)) setSelectedInstanceIds(selectedInstanceIds.filter((x) => x !== id));
    else setSelectedInstanceIds([...selectedInstanceIds, id]);
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground text-glow">Client Manager</h1>
          <p className="text-muted-foreground">Manage Roblox instances</p>
        </div>
        <button onClick={handleAutoDetect} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-primary hover:glow-red transition-all">
          <Scan className="w-4 h-4" />
          Auto Detect
        </button>
      </div>

      <div className="glass rounded-xl p-5 corner-accent">
        <p className="font-semibold text-foreground mb-3">Add Client Manually</p>
        <div className="flex gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50" placeholder="Process name" />
          <input value={pid} onChange={(e) => setPid(e.target.value)} className="w-32 px-4 py-2.5 bg-input border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-primary/50" placeholder="PID" />
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">{selectedCount} of {instances.length} selected</div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Select</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Process</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">PID</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-muted-foreground">No clients found. Use Auto Detect or add manually.</td></tr>
            ) : (
              instances.map((client) => (
                <tr key={client.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="p-4">
                    <button onClick={() => toggleSelect(client.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedInstanceIds.includes(client.id) ? "bg-primary border-primary" : "border-border"}`}>
                      {selectedInstanceIds.includes(client.id) && <span className="text-primary-foreground text-xs">✓</span>}
                    </button>
                  </td>
                  <td className="p-4"><div className="flex items-center gap-3"><Monitor className="w-4 h-4 text-primary" /><span className="font-medium">{client.name}</span></div></td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{client.pid}</td>
                  <td className="p-4 text-right"><button onClick={() => handleKill(client.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Power className="w-4 h-4" /></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}