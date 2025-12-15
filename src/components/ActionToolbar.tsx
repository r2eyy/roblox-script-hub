import { Play, Link, FolderOpen, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionToolbarProps {
  onExecute: () => void;
  onAttach: () => void;
  onOpen: () => void;
  onSave: () => void;
  onClear: () => void;
  isAttached: boolean;
}

const actions = [
  { id: "execute", label: "Execute", icon: Play, variant: "primary" },
  { id: "attach", label: "Attach", icon: Link, variant: "default" },
  { id: "open", label: "Open", icon: FolderOpen, variant: "default" },
  { id: "save", label: "Save", icon: Save, variant: "default" },
  { id: "clear", label: "Clear", icon: Trash2, variant: "destructive" },
] as const;

export function ActionToolbar({
  onExecute,
  onAttach,
  onOpen,
  onSave,
  onClear,
  isAttached,
}: ActionToolbarProps) {
  const handleAction = (id: string) => {
    switch (id) {
      case "execute":
        onExecute();
        break;
      case "attach":
        onAttach();
        break;
      case "open":
        onOpen();
        break;
      case "save":
        onSave();
        break;
      case "clear":
        onClear();
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const isPrimary = action.variant === "primary";
        const isDestructive = action.variant === "destructive";
        const isAttachBtn = action.id === "attach";

        return (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 glow-button",
              isPrimary && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
              isDestructive && "bg-secondary text-destructive hover:bg-destructive/10 border border-border",
              !isPrimary && !isDestructive && "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
              isAttachBtn && isAttached && "bg-green-500/20 text-green-400 border-green-500/30"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{isAttachBtn && isAttached ? "Attached" : action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
