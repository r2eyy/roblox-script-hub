import { useState, useRef } from "react";
import { toast } from "sonner";
import { InstanceSelector } from "./InstanceSelector";
import { ScriptTabs } from "./ScriptTabs";
import { CodeEditor } from "./CodeEditor";
import { ActionToolbar } from "./ActionToolbar";

interface Script {
  id: string;
  name: string;
  content: string;
}

export function ExecutorPage() {
  const [selectedInstances, setSelectedInstances] = useState<string[]>([]);
  const [scripts, setScripts] = useState<Script[]>([
    { id: "1", name: "Script 1", content: "" },
  ]);
  const [activeScript, setActiveScript] = useState("1");
  const [isAttached, setIsAttached] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentScript = scripts.find((s) => s.id === activeScript);

  const updateScriptContent = (content: string) => {
    setScripts(scripts.map((s) => (s.id === activeScript ? { ...s, content } : s)));
  };

  const addScript = () => {
    const newId = String(Date.now());
    const newScript = { id: newId, name: `Script ${scripts.length + 1}`, content: "" };
    setScripts([...scripts, newScript]);
    setActiveScript(newId);
  };

  const removeScript = (id: string) => {
    if (scripts.length === 1) return;
    const newScripts = scripts.filter((s) => s.id !== id);
    setScripts(newScripts);
    if (activeScript === id) {
      setActiveScript(newScripts[0].id);
    }
  };

  const handleExecute = () => {
    if (!isAttached) {
      toast.error("Not attached to any instance", {
        description: "Please attach to a Roblox instance first",
      });
      return;
    }
    if (!currentScript?.content.trim()) {
      toast.error("Empty script", {
        description: "Please enter some code to execute",
      });
      return;
    }
    toast.success("Script executed", {
      description: `Executed on ${selectedInstances.length || 1} instance(s)`,
    });
  };

  const handleAttach = () => {
    if (selectedInstances.length === 0) {
      toast.error("No instance selected", {
        description: "Please select at least one instance to attach",
      });
      return;
    }
    setIsAttached(!isAttached);
    if (!isAttached) {
      toast.success("Attached successfully", {
        description: `Attached to ${selectedInstances.length} instance(s)`,
      });
    } else {
      toast.info("Detached from instances");
    }
  };

  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        updateScriptContent(content);
        setScripts(scripts.map((s) => (s.id === activeScript ? { ...s, name: file.name.replace(".lua", "") } : s)));
        toast.success("File loaded", {
          description: file.name,
        });
      };
      reader.readAsText(file);
    }
    e.target.value = "";
  };

  const handleSave = () => {
    if (!currentScript?.content.trim()) {
      toast.error("Nothing to save", {
        description: "The script is empty",
      });
      return;
    }
    const blob = new Blob([currentScript.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentScript.name}.lua`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File saved", {
      description: `${currentScript.name}.lua`,
    });
  };

  const handleClear = () => {
    updateScriptContent("");
    toast.info("Script cleared");
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <InstanceSelector
            selectedInstances={selectedInstances}
            setSelectedInstances={setSelectedInstances}
          />
          <ScriptTabs
            scripts={scripts}
            activeScript={activeScript}
            setActiveScript={setActiveScript}
            addScript={addScript}
            removeScript={removeScript}
          />
        </div>
      </div>

      {/* Toolbar */}
      <ActionToolbar
        onExecute={handleExecute}
        onAttach={handleAttach}
        onOpen={handleOpen}
        onSave={handleSave}
        onClear={handleClear}
        isAttached={isAttached}
      />

      {/* Editor */}
      <CodeEditor value={currentScript?.content || ""} onChange={updateScriptContent} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".lua,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
