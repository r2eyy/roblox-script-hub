import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value.split("\n");
  const lineCount = Math.max(lines.length, 20);

  useEffect(() => {
    const syncScroll = () => {
      if (textareaRef.current && lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };
    
    const textarea = textareaRef.current;
    textarea?.addEventListener("scroll", syncScroll);
    return () => textarea?.removeEventListener("scroll", syncScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + "    " + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex-1 relative glass rounded-xl overflow-hidden corner-accent">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="flex h-full">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="w-14 bg-editor-bg/50 border-r border-border/30 py-4 overflow-hidden select-none flex-shrink-0"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-6 text-right pr-4 font-mono text-xs leading-6 transition-colors",
                i < lines.length ? "text-editor-line-number" : "text-border"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 w-full h-full resize-none bg-transparent text-foreground font-mono text-sm leading-6 py-4 px-4 focus:outline-none custom-scrollbar placeholder:text-muted-foreground/50"
            placeholder="-- Enter your Lua script here..."
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-7 bg-card/80 backdrop-blur border-t border-border/30 flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Lua</span>
          <span>{lines.length} lines</span>
          <span>{value.length} chars</span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          UTF-8
        </div>
      </div>
    </div>
  );
}