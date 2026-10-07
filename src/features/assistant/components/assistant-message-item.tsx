import {

  Bot,
  User,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  Globe,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CodeBlock } from "./code-block"
import type { Message } from "../types/assistant.types"

export function AssistantMessageItem({
  message,
  selectedModelName,
  isThoughtExpanded,
  onToggleThought,
  onCopy,
  copiedId,
}: {
  message: Message
  selectedModelName: string
  isThoughtExpanded: boolean
  onToggleThought: (id: string) => void
  onCopy: (text: string, id: string) => void
  copiedId: string | null
}) {
  return (
    <div
      className={`flex gap-3.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {message.role === "assistant" && (
        <Avatar className="size-9 border border-border bg-primary text-primary-foreground">
          <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
            <Bot className="size-5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col max-w-[85%] md:max-w-[75%] space-y-2">
        {/* Message Header */}
        <div
          className={`flex items-center gap-2 text-xs text-muted-foreground ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <span className="font-semibold text-foreground">
            {message.role === "user" ? "You" : selectedModelName}
          </span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Thought Box for Assistant */}
        {message.role === "assistant" && message.thought && (
          <div className="rounded-xl border border-border bg-muted/50 overflow-hidden transition-all duration-200">
            <button
              onClick={() => onToggleThought(message.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-3.5 text-foreground" />
                <span>Thought for {message.thinkingTime || "1.5s"}</span>
              </div>
              {isThoughtExpanded ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </button>
            {isThoughtExpanded && (
              <div className="px-3 pb-2.5 pt-1 text-xs text-muted-foreground font-mono border-t border-border leading-relaxed bg-background/50">
                {message.thought}
              </div>
            )}
          </div>
        )}

        {/* Content Bubble */}
        <div
          className={`rounded-2xl p-4 text-sm leading-relaxed border ${
            message.role === "user"
              ? "bg-primary text-primary-foreground border-primary font-normal rounded-tr-xs"
              : "bg-card text-card-foreground border-border rounded-tl-xs"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Code Snippet Block */}
          {message.codeSnippet && <CodeBlock snippet={message.codeSnippet} />}

          {/* Sources Section */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2 items-center text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <Globe className="size-3" /> Sources:
              </span>
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  className="px-2 py-0.5 rounded-md bg-muted text-foreground hover:bg-accent transition-colors text-[11px] font-semibold border border-border"
                >
                  {source.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Action Toolbar for Assistant Message */}
        {message.role === "assistant" && (
          <div className="flex items-center gap-1 text-muted-foreground pt-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCopy(message.content, message.id)}
              className="size-7 hover:text-foreground"
              title="Copy message"
            >
              {copiedId === message.id ? (
                <Check className="size-3.5 text-foreground" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="size-7 hover:text-foreground">
              <ThumbsUp className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-7 hover:text-foreground">
              <ThumbsDown className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-7 hover:text-foreground">
              <RefreshCw className="size-3.5" />
            </Button>
          </div>
        )}
      </div>

      {message.role === "user" && (
        <Avatar className="size-9 border border-border bg-muted">
          <AvatarFallback className="bg-muted text-foreground font-bold text-xs">
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
