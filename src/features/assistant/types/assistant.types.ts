import type * as React from "react"

export interface CodeSnippet {
  language: string
  code: string
}

export interface MessageSource {
  title: string
  url: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  thought?: string
  thinkingTime?: string
  codeSnippet?: CodeSnippet
  sources?: MessageSource[]
}

export interface AIModel {
  id: string
  name: string
  badge: string
  icon: React.ComponentType<{ className?: string }>
}

export interface ChatThread {
  id: string
  title: string
  timeGroup: "Today" | "Yesterday" | "Previous 7 Days"
  active?: boolean
  model?: string
}

export interface AIAgent {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}
