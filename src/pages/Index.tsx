import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardPage } from "@/components/DashboardPage";
import { ExecutorPage } from "@/components/ExecutorPage";
import { ScriptHubPage } from "@/components/ScriptHubPage";
import { ClientManagerPage } from "@/components/ClientManagerPage";
import { SettingsPage } from "@/components/SettingsPage";
import { CreditsPage } from "@/components/CreditsPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("executor");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;