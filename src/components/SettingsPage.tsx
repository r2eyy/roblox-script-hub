import { useState } from "react";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    autoAttach: true,
    autoExecute: false,
    topmost: false,
    closeRoblox: false,
    editorFontSize: 14,
    theme: "dark",
  });

  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated",
    });
  };

  const handleReset = () => {
    setSettings({
      autoAttach: true,
      autoExecute: false,
      topmost: false,
      closeRoblox: false,
      editorFontSize: 14,
      theme: "dark",
    });
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your executor preferences</p>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {/* General */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">General</h2>
          <div className="space-y-4">
            <SettingToggle
              label="Auto Attach"
              description="Automatically attach when Roblox is detected"
              checked={settings.autoAttach}
              onChange={(checked) => setSettings({ ...settings, autoAttach: checked })}
            />
            <SettingToggle
              label="Auto Execute"
              description="Execute saved script on attach"
              checked={settings.autoExecute}
              onChange={(checked) => setSettings({ ...settings, autoExecute: checked })}
            />
            <SettingToggle
              label="Always on Top"
              description="Keep the executor window above other windows"
              checked={settings.topmost}
              onChange={(checked) => setSettings({ ...settings, topmost: checked })}
            />
            <SettingToggle
              label="Close Roblox on Exit"
              description="Terminate Roblox when closing the executor"
              checked={settings.closeRoblox}
              onChange={(checked) => setSettings({ ...settings, closeRoblox: checked })}
            />
          </div>
        </div>

        {/* Editor */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Editor</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Font Size</p>
                <p className="text-xs text-muted-foreground">Adjust the editor font size</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSettings({ ...settings, editorFontSize: Math.max(10, settings.editorFontSize - 1) })}
                  className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-foreground">{settings.editorFontSize}px</span>
                <button
                  onClick={() => setSettings({ ...settings, editorFontSize: Math.min(24, settings.editorFontSize + 1) })}
                  className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-all relative ${
          checked ? "bg-primary" : "bg-secondary"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
