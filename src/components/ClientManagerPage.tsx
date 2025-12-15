import { Monitor, Power, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const clients = [
  { id: 1, name: "RobloxPlayerBeta", pid: "12456", status: "running", memory: "1.2 GB", cpu: "12%" },
  { id: 2, name: "RobloxPlayerBeta", pid: "23891", status: "running", memory: "1.4 GB", cpu: "18%" },
  { id: 3, name: "RobloxPlayerBeta", pid: "34521", status: "idle", memory: "0.8 GB", cpu: "2%" },
];

export function ClientManagerPage() {
  const handleKill = (pid: string) => {
    toast.success("Process terminated", {
      description: `PID ${pid} has been killed`,
    });
  };

  const handleRestart = (pid: string) => {
    toast.info("Restarting process", {
      description: `PID ${pid} is restarting...`,
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Client Manager</h1>
          <p className="text-muted-foreground">Manage running Roblox instances</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-secondary-foreground hover:bg-secondary/80 transition-all">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Clients Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Process</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">PID</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Memory</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">CPU</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
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
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      client.status === "running"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{client.memory}</td>
                <td className="p-4 text-sm text-muted-foreground">{client.cpu}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleRestart(client.pid)}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleKill(client.pid)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-2">Multi-Instance Support</h2>
        <p className="text-sm text-muted-foreground">
          You can attach to multiple Roblox instances simultaneously. Select instances in the Executor tab
          to execute scripts across all of them at once.
        </p>
      </div>
    </div>
  );
}
