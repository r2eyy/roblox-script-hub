import { useEffect, useMemo, useState } from "react";
import { Search, Eye, Star, Download, Code, Copy, Loader2, SlidersHorizontal, ShieldCheck, KeyRound, Globe, Ban } from "lucide-react";
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
  isUniversal?: boolean;
  isPatched?: boolean;
}

interface ScriptBloxResponse {
  result: {
    scripts: Script[];
    totalPages: number;
  };
}

type SortMode = "relevance" | "newest" | "views";

export function ScriptHubPage() {
  const [search, setSearch] = useState("");
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Filters (client-side, ScriptBlox-like)
  const [showFilters, setShowFilters] = useState(false);
  const [strictSearch, setStrictSearch] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [keylessOnly, setKeylessOnly] = useState(false);
  const [universalOnly, setUniversalOnly] = useState(false);
  const [notPatchedOnly, setNotPatchedOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("relevance");

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
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchScripts(search, 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCopy = async (script: string, title: string) => {
    await navigator.clipboard.writeText(script);
    toast.success(`Copied ${title} to clipboard`);
  };

  const handleOpenInTab = (script: Script) => {
    localStorage.setItem(
      "loadedScript",
      JSON.stringify({
        name: script.title,
        content: script.script,
      })
    );
    toast.success(`${script.title} loaded into executor tab`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}m`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  const filtered = useMemo(() => {
    let list = scripts;

    // Strict search (ScriptBlox-like): every term must match title or game name
    const q = search.trim().toLowerCase();
    if (q && strictSearch) {
      const terms = q.split(/\s+/).filter(Boolean);
      list = list.filter((s) => {
        const hay = `${s.title} ${s.game?.name || ""}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      });
    }

    if (verifiedOnly) list = list.filter((s) => !!s.verified);
    if (keylessOnly) list = list.filter((s) => !s.key);
    if (universalOnly) list = list.filter((s) => !!s.isUniversal);
    if (notPatchedOnly) list = list.filter((s) => s.isPatched === false);

    // Sort
    if (sortMode === "newest") {
      list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    if (sortMode === "views") {
      list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return list;
  }, [scripts, strictSearch, verifiedOnly, keylessOnly, universalOnly, notPatchedOnly, sortMode, search]);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">Script Hub</h1>
        <p className="text-muted-foreground">Browse scripts from ScriptBlox</p>
      </header>

      {/* Search + Filters */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search scripts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full text-foreground hover:bg-secondary transition-all"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border transition-all ${
                showFilters ? "bg-primary/15 border-primary/30 text-primary" : "bg-card border-border text-foreground hover:bg-secondary"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FilterToggle
                icon={Search}
                label="Strict search"
                description="All search terms must match"
                checked={strictSearch}
                onChange={setStrictSearch}
              />
              <FilterToggle
                icon={ShieldCheck}
                label="Verified only"
                description="Show only verified scripts"
                checked={verifiedOnly}
                onChange={setVerifiedOnly}
              />
              <FilterToggle
                icon={KeyRound}
                label="Keyless only"
                description="Hide scripts requiring a key"
                checked={keylessOnly}
                onChange={setKeylessOnly}
              />
              <FilterToggle
                icon={Globe}
                label="Universal only"
                description="Show universal scripts"
                checked={universalOnly}
                onChange={setUniversalOnly}
              />
              <FilterToggle
                icon={Ban}
                label="Not patched"
                description="Hide patched scripts"
                checked={notPatchedOnly}
                onChange={setNotPatchedOnly}
              />
              <div className="bg-secondary/30 border border-border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Sort</p>
                  <p className="text-xs text-muted-foreground">Order results</p>
                </div>
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="views">Most viewed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Scripts Grid */}
      {!loading && (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((script) => (
            <article key={script._id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all">
              <div className="relative h-40 bg-secondary">
                {script.game.imageUrl ? (
                  <img
                    src={script.game.imageUrl.startsWith("/") ? `https://scriptblox.com${script.game.imageUrl}` : script.game.imageUrl}
                    alt={`${script.title} script for ${script.game.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                {script.key && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded-lg">
                    KEY
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{script.title}</h3>
                <div className="inline-block px-3 py-1 bg-secondary rounded-lg text-xs text-muted-foreground mb-3">
                  {script.game.name}
                </div>

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
                    {script.scriptType || "free"}
                  </span>
                </div>

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
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      )}

      {/* Pagination */}
      {!loading && hasLoaded && totalPages > 1 && (
        <footer className="flex items-center justify-center gap-2">
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
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
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
        </footer>
      )}

      {!loading && hasLoaded && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Code className="w-12 h-12 mb-4" />
          <p>No scripts found</p>
        </div>
      )}
    </div>
  );
}

function FilterToggle({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`text-left bg-secondary/30 border rounded-lg p-3 transition-all ${
        checked ? "border-primary/40" : "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-md ${checked ? "bg-primary/15" : "bg-secondary"}`}>
            <Icon className={`w-4 h-4 ${checked ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <span
          className={`w-11 h-6 rounded-full transition-all relative ${checked ? "bg-primary" : "bg-secondary"}`}
          aria-hidden
        >
          <span
            className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-all ${checked ? "left-5" : "left-0.5"}`}
          />
        </span>
      </div>
    </button>
  );
}
