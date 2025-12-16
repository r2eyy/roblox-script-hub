import { Play, Link, Link2Off, FolderOpen, Save, Trash2, Skull } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ActionToolbarProps {
  onExecute: () => void;
  onAttach: () => void;
  onDetach: () => void;
  onOpen: () => void;
  onSave: () => void;
  onClear: () => void;
  onKillRoblox: () => void;
  isAttached: boolean;
}

export function ActionToolbar({
  onExecute,
  onAttach,
  onDetach,
  onOpen,
  onSave,
  onClear,
  onKillRoblox,
  isAttached,
}: ActionToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Primary Actions */}
      <div className="flex items-center gap-2 p-1.5 glass rounded-xl">
        {/* Execute */}
        <button
          onClick={onExecute}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          <Play className="w-4 h-4" />
          <span>Execute</span>
        </button>

        {/* Attach/Detach */}
        {!isAttached ? (
          <button
            onClick={onAttach}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-secondary/80 active:scale-95"
          >
            <Link className="w-4 h-4" />
            <span>Attach</span>
          </button>
        ) : (
          <button
            onClick={onDetach}
            className="flex items-center gap-2 px-4 py-2.5 bg-status-online/20 text-status-online rounded-lg font-medium transition-all duration-300 hover:bg-status-online/30 active:scale-95 glow-green"
          >
            <Link2Off className="w-4 h-4" />
            <span>Detach</span>
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-border" />

      {/* File Actions */}
      <div className="flex items-center gap-1 p-1.5 glass rounded-xl">
        <button
          onClick={onOpen}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 active:scale-95 group"
          title="Open File"
        >
          <FolderOpen className="w-4 h-4 group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={onSave}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 active:scale-95 group"
          title="Save File"
        >
          <Save className="w-4 h-4 group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={onClear}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 active:scale-95 group"
          title="Clear"
        >
          <Trash2 className="w-4 h-4 group-hover:text-destructive transition-colors" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Kill Roblox */}
      <button
        onClick={onKillRoblox}
        className="flex items-center gap-2 px-4 py-2.5 bg-destructive/10 text-destructive rounded-lg font-medium transition-all duration-300 hover:bg-destructive/20 active:scale-95 border border-destructive/20"
        title="Kill all Roblox instances"
      >
        <Skull className="w-4 h-4" />
        <span>Kill Roblox</span>
      </button>
    </div>
  );
}