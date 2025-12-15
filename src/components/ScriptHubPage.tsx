import { useState } from "react";
import { Search, Download, Star, Clock, Code } from "lucide-react";
import { toast } from "sonner";

const scripts = [
  { id: 1, name: "Infinite Jump", desc: "Jump infinitely in any game", downloads: "12.4k", rating: 4.8, category: "Movement" },
  { id: 2, name: "Speed Modifier", desc: "Adjust your walk speed", downloads: "8.2k", rating: 4.5, category: "Movement" },
  { id: 3, name: "ESP Highlight", desc: "See players through walls", downloads: "15.1k", rating: 4.9, category: "Visual" },
  { id: 4, name: "Fly Script", desc: "Fly around the map", downloads: "9.7k", rating: 4.6, category: "Movement" },
  { id: 5, name: "NoClip", desc: "Walk through walls", downloads: "7.3k", rating: 4.4, category: "Movement" },
  { id: 6, name: "Admin Commands", desc: "Basic admin commands", downloads: "11.2k", rating: 4.7, category: "Utility" },
];

const categories = ["All", "Movement", "Visual", "Utility", "Combat"];

export function ScriptHubPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch = script.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || script.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (name: string) => {
    toast.success("Script loaded", {
      description: `${name} has been loaded into the executor`,
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Script Hub</h1>
        <p className="text-muted-foreground">Browse and load popular scripts</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                {script.category}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{script.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{script.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {script.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {script.rating}
                </span>
              </div>
              <button
                onClick={() => handleDownload(script.name)}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Load
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
