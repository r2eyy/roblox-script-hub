import { useState, useEffect } from "react";
import { Search, Eye, Star, Download, Code, Copy, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Script {
  _id: string;
  title: string;
  game: {
    name: string;
    imageUrl?: string;
  };
  script: string;
  views: number;
  verified: boolean;
  key: boolean;
  createdAt: string;
  scriptType: string;
}

interface ScriptBloxResponse {
  result: {
    scripts: Script[];
    totalPages: number;
  };
}

export function ScriptHubPage() {
  const [search, setSearch] = useState("");
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchScripts = async (query: string = "", pageNum: number = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://scriptblox.com/api/script/search?q=${encodeURIComponent(query)}&page=${pageNum}`
        : `https://scriptblox.com/api/script/fetch?page=${pageNum}`;
      
      const response = await fetch(endpoint);
      const data: ScriptBloxResponse = await response.json();
      
      if (data.result && data.result.scripts) {
        setScripts(data.result.scripts);
        setTotalPages(data.result.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch scripts:", error);
      toast.error("Failed to fetch scripts from ScriptBlox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScripts();
    setHasSearched(true);
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchScripts(search, 1);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCopy = (script: string, title: string) => {
    navigator.clipboard.writeText(script);
    toast.success(`Copied ${title} to clipboard`);
  };

  const handleExecute = (title: string) => {
    toast.success(`Executing ${title}...`, {
      description: "Script sent to executor",
    });
  };

  const handleOpenInTab = (script: Script) => {
    // Store in localStorage for the executor to pick up
    localStorage.setItem("loadedScript", JSON.stringify({
      name: script.title,
      content: script.script
    }));
    toast.success(`${script.title} loaded into executor tab`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Script Hub</h1>
        <p className="text-muted-foreground">Browse scripts from ScriptBlox</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full text-foreground hover:bg-secondary transition-all"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Scripts Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scripts.map((script) => (
            <div
              key={script._id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
            >
              {/* Script Image */}
              <div className="relative h-40 bg-secondary">
                {script.game.imageUrl ? (
                  <img
                    src={script.game.imageUrl}
                    alt={script.game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                {script.key && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded-lg flex items-center gap-1">
                    🔑 KEY
                  </span>
                )}
              </div>

              {/* Script Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{script.title}</h3>
                <div className="inline-block px-3 py-1 bg-secondary rounded-lg text-xs text-muted-foreground mb-3">
                  {script.game.name}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatViews(script.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    0
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    free
                  </span>
                </div>

                {/* Date and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatDate(script.createdAt)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(script.script, script.title)}
                      className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Script"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenInTab(script)}
                      className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-all"
                    >
                      Open in Tab
                    </button>
                    <button
                      onClick={() => handleExecute(script.title)}
                      className="px-3 py-1.5 bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary transition-all"
                    >
                      Execute Script
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && hasSearched && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              const newPage = Math.max(1, page - 1);
              setPage(newPage);
              fetchScripts(search, newPage);
            }}
            disabled={page === 1}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => {
              const newPage = Math.min(totalPages, page + 1);
              setPage(newPage);
              fetchScripts(search, newPage);
            }}
            disabled={page === totalPages}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && scripts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Code className="w-12 h-12 mb-4" />
          <p>No scripts found</p>
        </div>
      )}
    </div>
  );
}