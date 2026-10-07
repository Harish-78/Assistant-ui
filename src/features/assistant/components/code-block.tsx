import * as React from "react"
import { FileCode, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CodeSnippet } from "../types/assistant.types"

export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-3 rounded-xl border border-border bg-zinc-950 text-zinc-100 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900 text-zinc-400">
        <div className="flex items-center gap-2">
          <FileCode className="size-3.5 text-zinc-300" />
          <span className="uppercase text-[11px] font-bold tracking-wider text-zinc-200">
            {snippet.language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="size-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          {copied ? (
            <Check className="size-3 text-zinc-100" />
          ) : (
            <Copy className="size-3" />
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-zinc-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}
