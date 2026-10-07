import * as React from "react"
import { Code2, Globe, BrainCircuit, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { Message, AIModel } from "./types/assistant.types"
import { INITIAL_MESSAGES, AVAILABLE_MODELS } from "./mock/initial-data"
import { ModelSelector } from "./components/model-selector"
import { AssistantMessageItem } from "./components/assistant-message-item"
import { PromptSuggestions } from "./components/prompt-suggestions"
import { AssistantInputBar } from "./components/assistant-input-bar"

export function AssistantWorkspace({
  activeThreadId,
}: {
  activeThreadId?: string
}) {
  const [messages, setMessages] = React.useState<Message[]>(() => {
    if (activeThreadId?.startsWith("new")) {
      return [
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: "Started new conversation session. How can I help you write, build, or analyze today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          thought: "New thread state initialized with standard AI Assistant persona.",
          thinkingTime: "0.4s",
        },
      ]
    }
    return INITIAL_MESSAGES
  })
  const [input, setInput] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<AIModel>(AVAILABLE_MODELS[0])
  const [webSearchEnabled, setWebSearchEnabled] = React.useState(true)
  const [codeModeEnabled, setCodeModeEnabled] = React.useState(true)
  const [deepReasoningEnabled, setDeepReasoningEnabled] = React.useState(false)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [expandedThoughts, setExpandedThoughts] = React.useState<Record<string, boolean>>({
    "msg-1": false,
    "msg-3": true,
  })




  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isGenerating])

  const toggleThought = (id: string) => {
    setExpandedThoughts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSend = (overrideInput?: string) => {
    const textToSend = overrideInput || input
    if (!textToSend.trim() || isGenerating) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!overrideInput) setInput("")
    setIsGenerating(true)

    // Simulate AI response stream
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `I've processed your prompt: "${textToSend}". Here is the recommended implementation pattern with clean separation of concerns, complete error boundaries, and full TypeScript typing.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        thought: deepReasoningEnabled
          ? `[Deep Reasoning Mode] Analyzed constraints, verified type signatures across modules, checked performance metrics.`
          : `Synthesized request and formatted responsive code solution.`,
        thinkingTime: deepReasoningEnabled ? "3.8s" : "1.2s",
        codeSnippet: codeModeEnabled
          ? {
              language: "tsx",
              code: `// Generated snippet based on user prompt\nexport function CustomAssistantWidget() {\n  return (\n    <div className="p-4 rounded-xl bg-background border border-border text-foreground">\n      <h3 className="font-semibold text-foreground">AI Power Feature Active</h3>\n      <p className="text-sm text-muted-foreground mt-1">Ready to execute real-time state sync and live updates.</p>\n    </div>\n  );\n}`,
            }
          : undefined,
        sources: webSearchEnabled ? [{ title: "Latest React Documentation", url: "#" }] : undefined,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="flex flex-1 flex-col h-[calc(100dvh-3.5rem)] sm:h-[calc(100vh-4rem)] max-h-[900px] overflow-hidden rounded-none sm:rounded-2xl border-x-0 sm:border border-border bg-background shadow-lg">
      {/* Top Bar / Model & Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4 sm:py-3 bg-muted/40 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          <Button
            variant={codeModeEnabled ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setCodeModeEnabled(!codeModeEnabled)}
            className={`h-7 sm:h-8 px-2 sm:px-3 gap-1 sm:gap-1.5 text-xs font-semibold shrink-0 ${
              codeModeEnabled ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
            }`}
          >
            <Code2 className="size-3.5" />
            <span className="hidden xs:inline">Code</span>
            <span className="hidden md:inline">Mode</span>
          </Button>

          <Button
            variant={webSearchEnabled ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setWebSearchEnabled(!webSearchEnabled)}
            className={`h-7 sm:h-8 px-2 sm:px-3 gap-1 sm:gap-1.5 text-xs font-semibold shrink-0 ${
              webSearchEnabled ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
            }`}
          >
            <Globe className="size-3.5" />
            <span className="hidden xs:inline">Web</span>
            <span className="hidden md:inline">Search</span>
          </Button>

          <Button
            variant={deepReasoningEnabled ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDeepReasoningEnabled(!deepReasoningEnabled)}
            className={`h-7 sm:h-8 px-2 sm:px-3 gap-1 sm:gap-1.5 text-xs font-semibold shrink-0 ${
              deepReasoningEnabled ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
            }`}
          >
            <BrainCircuit className="size-3.5" />
            <span className="hidden sm:inline">Reasoning</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMessages([INITIAL_MESSAGES[0]])}
            className="h-7 sm:h-8 px-2 sm:px-2.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Main Chat Scroll Region */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-background">
        {messages.map((msg) => (
          <AssistantMessageItem
            key={msg.id}
            message={msg}
            selectedModelName={selectedModel.name}
            isThoughtExpanded={!!expandedThoughts[msg.id]}
            onToggleThought={toggleThought}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        ))}

        {/* Streaming / Generating State Indicator */}
        {isGenerating && (
          <div className="flex gap-3.5 justify-start">
            <Avatar className="size-9 border border-border bg-primary text-primary-foreground">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                <Bot className="size-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-xs">
              <Loader2 className="size-4 animate-spin text-foreground" />
              <span>Generating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts Grid */}
      {messages.length <= 2 && (
        <PromptSuggestions onSelectPrompt={(prompt) => handleSend(prompt)} />
      )}

      {/* Input Box Area */}
      <AssistantInputBar
        input={input}
        setInput={setInput}
        isGenerating={isGenerating}
        onSend={handleSend}
      />
    </div>
  )
}
