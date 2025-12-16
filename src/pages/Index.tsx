import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardPage } from "@/components/DashboardPage";
import { ExecutorPage } from "@/components/ExecutorPage";
import { ScriptHubPage } from "@/components/ScriptHubPage";
import { ClientManagerPage } from "@/components/ClientManagerPage";
import { SettingsPage } from "@/components/SettingsPage";
import { CreditsPage } from "@/components/CreditsPage";
import { ExecutorProvider } from "@/context/executor-context";

const Index = () => {
  const [activeTab, setActiveTab] = useState("executor");

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
    <ExecutorProvider>
      <div className="min-h-screen w-full bg-background grid-bg relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Scanlines overlay */}
        <div className="fixed inset-0 scanlines pointer-events-none z-50" />
        
        {/* Layout */}
        <div className="flex min-h-screen w-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 ml-20 overflow-auto custom-scrollbar">
            {renderPage()}
          </main>
        </div>
      </div>
    </ExecutorProvider>
  );
};

export default Index;