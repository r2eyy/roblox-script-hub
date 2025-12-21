import { toast } from "sonner";
import { Save, RotateCcw, FolderOpen, Check } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import { cn } from "@/lib/utils";

const pageOptions = [
  { id: "dashboard", label: "Dashboard" },
  { id: "executor", label: "Executor" },
  { id: "scripthub", label: "Script Hub" },
  { id: "clients", label: "Clients" },
];

export function SettingsPage() {
  const { settings, updateSetting, resetSettings, saveSettings } = useSettings();

  const handleSave = () => {
    saveSettings();
    toast.success("Settings saved");
  };

  const handleReset = () => {
    resetSettings();
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your preferences</p>
      </div>

      {/* Folders */}
      <Section title="Folders" description="Quick access to important folders">
        <div className="flex gap-2">
          <button onClick={() => toast.info("Opening Workspace...")} className="btn-secondary">
            <FolderOpen className="w-4 h-4" /> Open Workspace
          </button>
          <button onClick={() => toast.info("Opening Autoexec...")} className="btn-secondary">
            <FolderOpen className="w-4 h-4" /> Open Autoexec
          </button>
        </div>
      </Section>

      {/* Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Toggle
          label="Auto Attach"
          description="Automatically attach when Roblox is detected"
          checked={settings.autoAttach}
          onChange={(v) => updateSetting("autoAttach", v)}
        />
        <Toggle
          label="Always on Top"
          description="Keep window above other applications"
          checked={settings.alwaysOnTop}
          onChange={(v) => updateSetting("alwaysOnTop", v)}
        />
        <Toggle
          label="System Tray"
          description="Minimize to tray instead of closing"
          checked={settings.systemTray}
          onChange={(v) => updateSetting("systemTray", v)}
        />
        <Toggle
          label="Discord RPC"
          description="Show status in Discord"
          checked={settings.discordRPC}
          onChange={(v) => updateSetting("discordRPC", v)}
        />
        <Toggle
          label="Redirect Errors"
          description="Redirect script errors to console"
          checked={settings.redirectErrors}
          onChange={(v) => updateSetting("redirectErrors", v)}
        />
        <Toggle
          label="Redirect Output"
          description="Redirect print output to console"
          checked={settings.redirectOutput}
          onChange={(v) => updateSetting("redirectOutput", v)}
        />
        <Toggle
          label="Debug Console"
          description="Enable debug console window"
          checked={settings.debugConsole}
          onChange={(v) => updateSetting("debugConsole", v)}
        />
        <Toggle
          label="Notification Sound"
          description="Play sound for notifications"
          checked={settings.notificationSound}
          onChange={(v) => updateSetting("notificationSound", v)}
        />
        <Toggle
          label="Restore Last Page"
          description="Open last page on restart"
          checked={settings.restoreLastPage}
          onChange={(v) => updateSetting("restoreLastPage", v)}
        />
      </div>

      {/* Default Page */}
      <Section title="Default Page" description="Page to open on startup (when not restoring last page)">
        <div className="flex flex-wrap gap-2">
          {pageOptions.map((page) => (
            <button
              key={page.id}
              onClick={() => updateSetting("defaultPage", page.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                settings.defaultPage === page.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {page.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Editor Font Size */}
      <Section title="Editor Font Size" description="Adjust the code editor font size">
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateSetting("editorFontSize", Math.max(10, settings.editorFontSize - 1))}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-lg font-medium"
          >
            −
          </button>
          <div className="w-20 text-center">
            <span className="text-2xl font-mono font-bold">{settings.editorFontSize}</span>
            <span className="text-muted-foreground text-sm ml-1">px</span>
          </div>
          <button
            onClick={() => updateSetting("editorFontSize", Math.min(24, settings.editorFontSize + 1))}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-lg font-medium"
          >
            +
          </button>
        </div>
      </Section>

      {/* Auto-save Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Toggle
          label="Auto-save Window Size"
          description="Remember window dimensions"
          checked={settings.autoSaveWindowSize}
          onChange={(v) => updateSetting("autoSaveWindowSize", v)}
        />
        <Toggle
          label="Auto-save Sidebar Width"
          description="Remember sidebar width"
          checked={settings.autoSaveSidebarWidth}
          onChange={(v) => updateSetting("autoSaveSidebarWidth", v)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" /> Save Settings
        </button>
        <button onClick={handleReset} className="btn-secondary">
          <RotateCcw className="w-4 h-4" /> Reset to Defaults
        </button>
      </div>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-medium truncate">{label}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "w-12 h-7 rounded-full transition-colors relative shrink-0",
          checked ? "bg-primary" : "bg-secondary"
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-5 h-5 rounded-full bg-foreground transition-all",
            checked ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  );
}
