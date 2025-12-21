import { useState } from "react";
import { Monitor, Power, Plus, Scan, Check } from "lucide-react";
import { toast } from "sonner";
import { useExecutor } from "@/context/executor-context";
import { cn } from "@/lib/utils";

export function ClientManagerPage() {
  const { instances, addInstance, removeInstance, selectedInstanceIds, setSelectedInstanceIds } = useExecutor();
  const [name, setName] = useState("RobloxPlayerBeta");
  const [pid, setPid] = useState("");

  const handleAutoDetect = () => {
    const fakePid = Math.floor(Math.random() * 10000) + 5000;
    addInstance({ name: "RobloxPlayerBeta", pid: String(fakePid) });
    toast.success("Detected", { description: `PID ${fakePid}` });
  };

  const handleAdd = () => {
    if (!pid.trim()) { toast.error("PID required"); return; }
    addInstance({ name: name.trim() || "RobloxPlayerBeta", pid: pid.trim() });
    setPid("");
    toast.success("Added");
  };

  const toggleSelect = (id: string) => {
    if (selectedInstanceIds.includes(id)) setSelectedInstanceIds(selectedInstanceIds.filter((x) => x !== id));
    else setSelectedInstanceIds([...selectedInstanceIds, id]);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Client Manager</h1><p className="text-muted-foreground">Manage Roblox instances</p></div>
        <button onClick={handleAutoDetect} className="btn-primary"><Scan className="w-4 h-4" /> Auto Detect</button>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3">Add Client Manually</h3>
        <div className="flex gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50" placeholder="Process name" />
          <input value={pid} onChange={(e) => setPid(e.target.value)} className="w-32 px-4 py-2.5 bg-input border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-primary/50" placeholder="PID" />
          <button onClick={handleAdd} className="btn-primary"><Plus className="w-4 h-4" /> Add</button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-secondary/30"><th className="text-left p-4 text-sm font-medium text-muted-foreground w-12"></th><th className="text-left p-4 text-sm font-medium text-muted-foreground">Process</th><th className="text-left p-4 text-sm font-medium text-muted-foreground">PID</th><th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th></tr></thead>
          <tbody>
            {instances.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No clients found.</td></tr> : instances.map((client) => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                <td className="p-4"><button onClick={() => toggleSelect(client.id)} className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-colors", selectedInstanceIds.includes(client.id) ? "bg-primary border-primary" : "border-border")}>{selectedInstanceIds.includes(client.id) && <Check className="w-3 h-3 text-primary-foreground" />}</button></td>
                <td className="p-4"><div className="flex items-center gap-3"><Monitor className="w-4 h-4 text-primary" /><span className="font-medium">{client.name}</span></div></td>
                <td className="p-4 text-sm text-muted-foreground font-mono">{client.pid}</td>
                <td className="p-4 text-right"><button onClick={() => { removeInstance(client.id); toast.success("Terminated"); }} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Power className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {instances.length > 0 && <p className="text-sm text-muted-foreground">{selectedInstanceIds.length} of {instances.length} selected</p>}
    </div>
  );
}