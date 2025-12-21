import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { DashboardPage } from "@/components/DashboardPage";
import { ExecutorPage } from "@/components/ExecutorPage";
import { ScriptHubPage } from "@/components/ScriptHubPage";
import { ClientManagerPage } from "@/components/ClientManagerPage";
import { SettingsPage } from "@/components/SettingsPage";
import { CreditsPage } from "@/components/CreditsPage";
import { ExecutorProvider } from "@/context/executor-context";
import { SettingsProvider, useSettings } from "@/context/settings-context";

function AppContent() {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState(() => {
    if (settings.restoreLastPage) {
      return localStorage.getItem("r2exec-lastPage") || settings.defaultPage;
    }
    return settings.defaultPage;
  });

  // Save last page
  useEffect(() => {
    localStorage.setItem("r2exec-lastPage", activeTab);
  }, [activeTab]);

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage />;
      case "executor":
        return <ExecutorPage />;
      case "scripthub":
        return <ScriptHubPage />;
      case "clients":
        return <ClientManagerPage />;
      case "settings":
        return <SettingsPage />;
      case "credits":
        return <CreditsPage />;
      default:
        return <ExecutorPage />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Top Navigation */}
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto custom-scrollbar relative">
        {renderPage()}
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <SettingsProvider>
      <ExecutorProvider>
        <AppContent />
      </ExecutorProvider>
    </SettingsProvider>
  );
};

export default Index;
