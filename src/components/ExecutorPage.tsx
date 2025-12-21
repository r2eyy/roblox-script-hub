import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useExecutor } from "@/context/executor-context";
import { useSettings } from "@/context/settings-context";
import { 
  Play, Link, Link2Off, FolderOpen, Save, Trash2, Skull, 
  Plus, X, FileCode, Monitor, ChevronDown, Scan, RefreshCw, Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Script {
  id: string;
  name: string;
  content: string;
}

export function ExecutorPage() {
  const {
    instances,
    addInstance,
    selectedInstanceIds,
    setSelectedInstanceIds,
    isAttached,
    attach,
    detach,
    killRoblox,
  } = useExecutor();
  const { settings } = useSettings();

  const [scripts, setScripts] = useState<Script[]>([{ id: "1", name: "Untitled", content: "" }]);
  const [activeScript, setActiveScript] = useState("1");
  const [showInstanceDropdown, setShowInstanceDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentScript = scripts.find((s) => s.id === activeScript);

  const updateScriptContent = (content: string) => {
    setScripts((prev) => prev.map((s) => (s.id === activeScript ? { ...s, content } : s)));
  };

  const addScript = () => {
    const newId = String(Date.now());
    setScripts((prev) => [...prev, { id: newId, name: `Script ${scripts.length + 1}`, content: "" }]);
    setActiveScript(newId);
  };

  const removeScript = (id: string) => {
    if (scripts.length === 1) return;
    const newScripts = scripts.filter((s) => s.id !== id);
    setScripts(newScripts);
    if (activeScript === id) setActiveScript(newScripts[0].id);
  };

  // Load from Script Hub
  useEffect(() => {
    const raw = localStorage.getItem("loadedScript");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.content) {
        setScripts((prev) =>
          prev.map((s) => (s.id === activeScript ? { ...s, name: parsed.name || s.name, content: parsed.content } : s))
        );
        toast.success("Script loaded", { description: parsed.name });
      }
    } catch {}
    localStorage.removeItem("loadedScript");
  }, []);

  // Auto attach
  useEffect(() => {
    if (settings.autoAttach && instances.length > 0 && !isAttached) {
      setSelectedInstanceIds([instances[0].id]);
      attach();
    }
  }, [settings.autoAttach, instances, isAttached]);

  const handleExecute = () => {
    if (!isAttached) {
      toast.error("Not attached", { description: "Attach to a Roblox instance first" });
      return;
    }
    if (!currentScript?.content.trim()) {
      toast.error("Empty script");
      return;
    }
    toast.success("Executed", { description: `Ran on ${selectedInstanceIds.length} instance(s)` });
  };

  const handleAttach = () => {
    if (selectedInstanceIds.length === 0) {
      toast.error("No instance selected");
      return;
    }
    attach();
  };

  const handleOpen = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        updateScriptContent(content);
        setScripts((prev) => prev.map((s) => (s.id === activeScript ? { ...s, name: file.name.replace(".lua", "") } : s)));
        toast.success("Loaded", { description: file.name });
      };
      reader.readAsText(file);
    }
    e.target.value = "";
  };

  const handleSave = () => {
    if (!currentScript?.content.trim()) {
      toast.error("Nothing to save");
      return;
    }
    const blob = new Blob([currentScript.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentScript.name}.lua`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Saved", { description: `${currentScript.name}.lua` });
  };

  const handleAutoDetect = () => {
    const fakePid = Math.floor(Math.random() * 10000) + 5000;
    addInstance({ name: "RobloxPlayerBeta", pid: String(fakePid) });
    toast.success("Detected", { description: `PID ${fakePid}` });
  };

  const toggleInstance = (id: string) => {
    if (selectedInstanceIds.includes(id)) {
      setSelectedInstanceIds(selectedInstanceIds.filter((x) => x !== id));
    } else {
      setSelectedInstanceIds([...selectedInstanceIds, id]);
    }
  };

  const lines = (currentScript?.content || "").split("\n");

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Control Bar */}
      <div className="h-12 border-b border-border bg-card/50 flex items-center px-4 gap-3">
        {/* Instance Selector */}
        <div className="relative">
          <button
            onClick={() => setShowInstanceDropdown(!showInstanceDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors"
          >
            <Monitor className="w-4 h-4 text-primary" />
            <span>{selectedInstanceIds.length > 0 ? `${selectedInstanceIds.length} selected` : "Select Instance"}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showInstanceDropdown && "rotate-180")} />
          </button>
          
          {showInstanceDropdown && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-2 border-b border-border flex gap-2">
                <button onClick={handleAutoDetect} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20">
                  <Scan className="w-4 h-4" /> Auto Detect
                </button>
                <button onClick={() => setShowInstanceDropdown(false)} className="px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                {instances.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No instances found</div>
                ) : (
                  instances.map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => toggleInstance(inst.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50 transition-colors"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        selectedInstanceIds.includes(inst.id) ? "bg-primary border-primary" : "border-border"
                      )}>
                        {selectedInstanceIds.includes(inst.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{inst.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">PID: {inst.pid}</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-status-online" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Primary Actions */}
        <button onClick={handleExecute} className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" /> Execute
        </button>
        
        {!isAttached ? (
          <button onClick={handleAttach} className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors">
            <Link className="w-4 h-4" /> Attach
          </button>
        ) : (
          <button onClick={detach} className="flex items-center gap-2 px-3 py-1.5 bg-status-online/15 text-status-online rounded-lg text-sm hover:bg-status-online/25 transition-colors">
            <Link2Off className="w-4 h-4" /> Detach
          </button>
        )}

        <div className="w-px h-6 bg-border" />

        {/* File Actions */}
        <button onClick={handleOpen} className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Open">
          <FolderOpen className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={handleSave} className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Save">
          <Save className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={() => { updateScriptContent(""); toast.info("Cleared"); }} className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Clear">
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex-1" />

        {/* Kill Roblox */}
        <button onClick={killRoblox} className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-sm hover:bg-destructive/20 transition-colors">
          <Skull className="w-4 h-4" /> Kill Roblox
        </button>
      </div>

      {/* Script Tabs */}
      <div className="h-10 border-b border-border bg-card/30 flex items-center px-2 gap-1 overflow-x-auto custom-scrollbar">
        {scripts.map((script) => (
          <div
            key={script.id}
            onClick={() => setActiveScript(script.id)}
            className={cn(
              "group flex items-center gap-2 px-3 py-1.5 rounded-t-lg cursor-pointer transition-colors min-w-0 shrink-0",
              script.id === activeScript
                ? "bg-background border-t border-x border-border -mb-px"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            )}
          >
            <FileCode className="w-3.5 h-3.5 shrink-0" />
            <span className="text-sm truncate max-w-24">{script.name}</span>
            {scripts.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); removeScript(script.id); }}
                className="p-0.5 rounded hover:bg-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        <button onClick={addScript} className="p-1.5 hover:bg-secondary rounded-lg transition-colors shrink-0" title="New Script">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden bg-background">
        {/* Line Numbers */}
        <div className="w-12 bg-card/30 border-r border-border py-3 overflow-hidden select-none shrink-0">
          {Array.from({ length: Math.max(lines.length, 30) }, (_, i) => (
            <div key={i} className="h-6 text-right pr-3 font-mono text-xs leading-6 text-muted-foreground/50">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            value={currentScript?.content || ""}
            onChange={(e) => updateScriptContent(e.target.value)}
            className="absolute inset-0 w-full h-full resize-none bg-transparent text-foreground font-mono leading-6 py-3 px-4 focus:outline-none custom-scrollbar"
            style={{ fontSize: settings.editorFontSize }}
            placeholder="-- Write your Lua script here..."
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const val = currentScript?.content || "";
                updateScriptContent(val.substring(0, start) + "  " + val.substring(end));
                setTimeout(() => {
                  e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                }, 0);
              }
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-border bg-card/30 flex items-center px-4 text-xs text-muted-foreground gap-4">
        <span>Lua</span>
        <span>{lines.length} lines</span>
        <span>{(currentScript?.content || "").length} chars</span>
        <div className="flex-1" />
        <span className="font-mono">{settings.editorFontSize}px</span>
        <span>UTF-8</span>
      </div>

      <input ref={fileInputRef} type="file" accept=".lua,.txt" onChange={handleFileChange} className="hidden" />
    </div>
  );
}
