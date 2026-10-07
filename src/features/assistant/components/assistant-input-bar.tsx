import { Send, Paperclip, Code2, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AssistantInputBar({
  input,
  setInput,
  isGenerating,
  onSend,
}: {
  input: string
  setInput: (value: string) => void
  isGenerating: boolean
  onSend: (overrideInput?: string) => void
}) {
  return (
    <div className="p-3 md:p-4 border-t border-border bg-card">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSend()
        }}
        className="relative flex flex-col rounded-xl border border-border bg-background shadow-2xs focus-within:ring-2 focus-within:ring-ring transition-all"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          placeholder="Ask AI Assistant anything, request code snippets, or analyze data..."
          rows={2}
          className="w-full resize-none bg-transparent p-3 text-sm outline-none text-foreground placeholder:text-muted-foreground/70 font-sans"
        />

        {/* Action Row inside Input */}
        <div className="flex items-center justify-between p-2 border-t border-border bg-muted/30 rounded-b-xl">
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
              <Paperclip className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
              <Code2 className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
              <Globe className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] text-muted-foreground font-mono">
              Shift + Enter for newline
            </span>
            <Button
              type="submit"
              disabled={!input.trim() || isGenerating}
              size="sm"
              className="gap-1.5 rounded-lg px-3.5 h-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs"
            >
              <span>Send</span>
              <Send className="size-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
