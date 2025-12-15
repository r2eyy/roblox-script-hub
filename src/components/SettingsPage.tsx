import { useState } from "react";
import { toast } from "sonner";
import { Save, RotateCcw, FolderOpen } from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    autoAttach: false,
    alwaysOnTop: false,
    systemTray: false,
    discordRPC: false,
    redirectErrors: false,
    redirectOutput: false,
    debugConsole: false,
    notificationSound: true,
    restoreLastPage: false,
    defaultPage: "Dashboard",
    autoSaveWindowSize: true,
    autoSaveSidebarWidth: true,
    editorFontSize: 14,
  });

  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated",
    });
  };

  const handleReset = () => {
    setSettings({
      autoAttach: false,
      alwaysOnTop: false,
      systemTray: false,
      discordRPC: false,
      redirectErrors: false,
      redirectOutput: false,
      debugConsole: false,
      notificationSound: true,
      restoreLastPage: false,
      defaultPage: "Dashboard",
      autoSaveWindowSize: true,
      autoSaveSidebarWidth: true,
      editorFontSize: 14,
    });
    toast.info("Settings reset to defaults");
  };

  const handleOpenFolder = (folder: string) => {
    toast.info(`Opening ${folder} folder...`);
  };

  const pageOptions = ["Dashboard", "Executor", "Scripthub", "Client Manager", "Settings"];

  return (
    <div className="flex-1 p-6 space-y-4 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your executor preferences</p>
      </div>

      {/* Folders */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Folders</p>
            <p className="text-sm text-muted-foreground">Quickly open important R2Exec folders</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenFolder("Workspace")}
              className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all"
            >
              <FolderOpen className="w-4 h-4" />
              Open Workspace
            </button>
            <button
              onClick={() => handleOpenFolder("Autoexec")}
              className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all"
            >
              <FolderOpen className="w-4 h-4" />
              Open Autoexec
            </button>
          </div>
        </div>
      </div>

      {/* Settings Toggles */}
      <SettingToggle
        label="Always on Top"
        description="Keep R2Exec window above other applications"
        checked={settings.alwaysOnTop}
        onChange={(checked) => setSettings({ ...settings, alwaysOnTop: checked })}
      />

      <SettingToggle
        label="Auto Attach"
        description="Automatically attach to Roblox processes"
        checked={settings.autoAttach}
        onChange={(checked) => setSettings({ ...settings, autoAttach: checked })}
      />

      <SettingToggle
        label="System Tray"
        description="Hide to tray instead of quitting when closing"
        checked={settings.systemTray}
        onChange={(checked) => setSettings({ ...settings, systemTray: checked })}
      />

      <SettingToggle
        label="Discord RPC"
        description="Show R2Exec status in Discord"
        checked={settings.discordRPC}
        onChange={(checked) => setSettings({ ...settings, discordRPC: checked })}
      />

      <SettingToggle
        label="Redirect Errors"
        description="Redirect script errors to console"
        checked={settings.redirectErrors}
        onChange={(checked) => setSettings({ ...settings, redirectErrors: checked })}
      />

      <SettingToggle
        label="Redirect Output"
        description="Redirect script output to console"
        checked={settings.redirectOutput}
        onChange={(checked) => setSettings({ ...settings, redirectOutput: checked })}
      />

      <SettingToggle
        label="Debug Console"
        description="Enable console window for debugging"
        checked={settings.debugConsole}
        onChange={(checked) => setSettings({ ...settings, debugConsole: checked })}
      />

      <SettingToggle
        label="Notification Sound"
        description="Play a sound when in-app notifications appear"
        checked={settings.notificationSound}
        onChange={(checked) => setSettings({ ...settings, notificationSound: checked })}
      />

      <SettingToggle
        label="Restore Last Page"
        description="Automatically open the last viewed page when R2Exec starts"
        checked={settings.restoreLastPage}
        onChange={(checked) => setSettings({ ...settings, restoreLastPage: checked })}
      />

      {/* Default Page */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Default Page on Restart</p>
            <p className="text-sm text-muted-foreground">Choose which page to open when R2Exec starts</p>
          </div>
          <div className="flex gap-2">
            {pageOptions.map((page) => (
              <button
                key={page}
                onClick={() => setSettings({ ...settings, defaultPage: page })}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  settings.defaultPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Window Size */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Window Size</p>
            <p className="text-sm text-muted-foreground">Auto-save enabled - window size will be saved automatically</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Auto-save</span>
              <button
                onClick={() => setSettings({ ...settings, autoSaveWindowSize: !settings.autoSaveWindowSize })}
                className={`w-11 h-6 rounded-full transition-all relative ${
                  settings.autoSaveWindowSize ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${
                    settings.autoSaveWindowSize ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📱</span>
              <span>1179px × 619px</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
                Update Size
              </button>
              <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Width */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Sidebar Width</p>
            <p className="text-sm text-muted-foreground">Auto-save enabled - sidebar width will be saved automatically</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Auto-save</span>
              <button
                onClick={() => setSettings({ ...settings, autoSaveSidebarWidth: !settings.autoSaveSidebarWidth })}
                className={`w-11 h-6 rounded-full transition-all relative ${
                  settings.autoSaveSidebarWidth ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${
                    settings.autoSaveSidebarWidth ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📱</span>
              <span>280px</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
                Update Width
              </button>
              <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm hover:bg-secondary/80 transition-all">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Editor Font Size</p>
            <p className="text-sm text-muted-foreground">Adjust the editor font size</p>
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

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
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
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
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
    </div>
  );
}