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
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Smooth scroll input into view on mobile keyboard open
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 150)
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 border-t border-border/40 bg-background shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSend()
        }}
        className="relative flex flex-col rounded-2xl border border-border/50 bg-muted/20 focus-within:bg-background focus-within:border-border/80 transition-all"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          placeholder="Ask AI Assistant anything, request code snippets, or analyze data..."
          rows={2}
          className="w-full resize-none bg-transparent p-3 text-base sm:text-sm outline-none text-foreground placeholder:text-muted-foreground/60 font-sans"
        />

        {/* Action Row inside Input */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 border-t border-border/30 bg-muted/10 rounded-b-2xl gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button type="button" variant="ghost" size="icon" className="size-7 sm:size-8 text-muted-foreground hover:text-foreground">
              <Paperclip className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="size-7 sm:size-8 text-muted-foreground hover:text-foreground">
              <Code2 className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="size-7 sm:size-8 text-muted-foreground hover:text-foreground">
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
              className="gap-1.5 rounded-xl px-3 sm:px-3.5 h-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs shrink-0 shadow-none"
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
