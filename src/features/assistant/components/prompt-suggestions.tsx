import { Zap } from "lucide-react"

import { PROMPT_SUGGESTIONS } from "../mock/initial-data"

export function PromptSuggestions({
  onSelectPrompt,
}: {
  onSelectPrompt: (promptText: string) => void
}) {
  return (
    <div className="px-4 py-3 border-t border-border bg-muted/20">
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Zap className="size-3.5 text-foreground" /> Suggested Prompts
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PROMPT_SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.title + ": " + item.desc)}
              className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-left transition-all group"
            >
              <div className="p-1.5 rounded-lg border border-border bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground group-hover:underline">
                  {item.title}
                </div>
                <div className="text-[11px] text-muted-foreground line-clamp-1">{item.desc}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
