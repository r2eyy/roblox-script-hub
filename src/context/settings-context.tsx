import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Settings {
  autoAttach: boolean;
  alwaysOnTop: boolean;
  systemTray: boolean;
  discordRPC: boolean;
  redirectErrors: boolean;
  redirectOutput: boolean;
  debugConsole: boolean;
  notificationSound: boolean;
  restoreLastPage: boolean;
  defaultPage: string;
  autoSaveWindowSize: boolean;
  autoSaveSidebarWidth: boolean;
  editorFontSize: number;
}

const defaultSettings: Settings = {
  autoAttach: false,
  alwaysOnTop: false,
  systemTray: false,
  discordRPC: false,
  redirectErrors: false,
  redirectOutput: false,
  debugConsole: false,
  notificationSound: true,
  restoreLastPage: false,
  defaultPage: "executor",
  autoSaveWindowSize: true,
  autoSaveSidebarWidth: true,
  editorFontSize: 14,
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("r2exec-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("r2exec-settings", JSON.stringify(defaultSettings));
  };

  const saveSettings = () => {
    localStorage.setItem("r2exec-settings", JSON.stringify(settings));
  };

  // Auto-save on change
  useEffect(() => {
    localStorage.setItem("r2exec-settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
