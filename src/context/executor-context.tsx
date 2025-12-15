import React, { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

export interface RobloxInstance {
  id: string;
  name: string;
  pid: string;
}

interface ExecutorState {
  instances: RobloxInstance[];
  selectedInstanceIds: string[];
  setSelectedInstanceIds: (ids: string[]) => void;
  isAttached: boolean;
  attach: () => void;
  detach: () => void;
  killRoblox: () => void;
  addInstance: (instance: Omit<RobloxInstance, "id">) => void;
  removeInstance: (id: string) => void;
}

const ExecutorContext = createContext<ExecutorState | null>(null);

export function ExecutorProvider({ children }: { children: React.ReactNode }) {
  const [instances, setInstances] = useState<RobloxInstance[]>([]);
  const [selectedInstanceIds, setSelectedInstanceIds] = useState<string[]>([]);
  const [isAttached, setIsAttached] = useState(false);

  const addInstance: ExecutorState["addInstance"] = (instance) => {
    const id = `${Date.now()}`;
    setInstances((prev) => [...prev, { id, ...instance }]);
  };

  const removeInstance: ExecutorState["removeInstance"] = (id) => {
    setInstances((prev) => prev.filter((i) => i.id !== id));
    setSelectedInstanceIds((prev) => prev.filter((sid) => sid !== id));
  };

  const attach = () => {
    if (instances.length === 0) {
      toast.error("No clients found", {
        description: "Add a Roblox client in Client Manager or Instance Selector.",
      });
      return;
    }
    if (selectedInstanceIds.length === 0) {
      toast.error("No instance selected", {
        description: "Select at least one instance to attach.",
      });
      return;
    }
    setIsAttached(true);
    toast.success("Attached", {
      description: `Attached to ${selectedInstanceIds.length} instance(s).`,
    });
  };

  const detach = () => {
    setIsAttached(false);
    toast.info("Detached", {
      description: "Detached from Roblox instances.",
    });
  };

  const killRoblox = () => {
    setIsAttached(false);
    setInstances([]);
    setSelectedInstanceIds([]);
    toast.success("Roblox closed", {
      description: "All clients cleared.",
    });
  };

  const value = useMemo<ExecutorState>(
    () => ({
      instances,
      selectedInstanceIds,
      setSelectedInstanceIds,
      isAttached,
      attach,
      detach,
      killRoblox,
      addInstance,
      removeInstance,
    }),
    [instances, selectedInstanceIds, isAttached]
  );

  return <ExecutorContext.Provider value={value}>{children}</ExecutorContext.Provider>;
}

export function useExecutor() {
  const ctx = useContext(ExecutorContext);
  if (!ctx) throw new Error("useExecutor must be used within ExecutorProvider");
  return ctx;
}
