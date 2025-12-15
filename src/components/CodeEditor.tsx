import { useRef, useEffect } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value.split("\n");
  const lineCount = Math.max(lines.length, 20);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

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
    <div className="flex-1 flex bg-editor-bg rounded-lg border border-border overflow-hidden">
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="w-12 bg-editor-line py-3 overflow-hidden select-none flex-shrink-0"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div
            key={i + 1}
            className="h-6 flex items-center justify-end pr-3 text-xs font-mono text-editor-line-number"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="absolute inset-0 w-full h-full bg-transparent text-foreground font-mono text-sm p-3 resize-none outline-none leading-6 editor-scrollbar"
          placeholder="-- Enter your Lua script here..."
        />
      </div>
    </div>
  );
}
