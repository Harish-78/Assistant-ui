import {
  Zap,
  BrainCircuit,
  Cpu,
  Code2,
  Terminal,
  Globe,
  BarChart3,
  Palette,
  FileText
} from "lucide-react"
import type { Message, AIModel, ChatThread, AIAgent } from "../types/assistant.types"

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    role: "assistant",
    content:
      "Hello! I am your AI Assistant. I can help you write code, analyze data, brainstorm architecture, or optimize existing React & Vite components. How can I assist you today?",
    timestamp: "10:42 AM",
    thought:
      "Initialized session with full context. Prepared modern React/Tailwind code schemas and UI design recommendations.",
    thinkingTime: "0.8s",
    sources: [
      { title: "Vite Docs", url: "#" },
      { title: "React 19 Reference", url: "#" },
    ],
  },
  {
    id: "msg-2",
    role: "user",
    content: "Can you show me how to optimize a data table component with virtualized scrolling in React?",
    timestamp: "10:43 AM",
  },
  {
    id: "msg-3",
    role: "assistant",
    content:
      "Certainly! For rendering large datasets in React without dropping frame rates, virtualization is key. Here is a clean pattern using `@tanstack/react-virtual` alongside standard TanStack Table:",
    timestamp: "10:43 AM",
    thought:
      "Analyzing user request for virtualized table component. Selecting optimal TanStack Virtual hook patterns with memoized row rendering.",
    thinkingTime: "2.4s",
    codeSnippet: {
      language: "tsx",
      code: `import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedTable({ rows }: { rows: Array<{ id: string; name: string; value: number }> }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // estimated row height in px
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto border rounded-xl bg-card shadow-sm">
      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, width: '100%', position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={row.id}
              className="absolute top-0 left-0 w-full flex items-center px-4 py-3 border-b text-sm transition-colors hover:bg-muted/50"
              style={{ transform: \`translateY(\${virtualRow.start}px)\` }}
            >
              <span className="font-mono text-muted-foreground w-12">#{virtualRow.index + 1}</span>
              <span className="font-medium flex-1">{row.name}</span>
              <span className="tabular-nums font-semibold">\${row.value.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
    },
    sources: [
      { title: "TanStack Virtual Docs", url: "#" },
      { title: "React Performance Best Practices", url: "#" },
    ],
  },
]

export const PROMPT_SUGGESTIONS = [
  {
    icon: Code2,
    title: "Generate React Component",
    desc: "Create an interactive glassmorphic chart card with filters",
  },
  {
    icon: Terminal,
    title: "Debug & Optimize",
    desc: "Identify memory leaks and re-render bottlenecks in component tree",
  },
  {
    icon: Globe,
    title: "Analyze API Endpoint",
    desc: "Design REST & GraphQL schema for high-throughput messaging",
  },
  {
    icon: BrainCircuit,
    title: "Architect State Management",
    desc: "Compare Zustand vs Context API for global layout state",
  },
]

export const AVAILABLE_MODELS: AIModel[] = [
  { id: "gemini-3.6", name: "Gemini 3.6 Flash", badge: "Fastest", icon: Zap },
  { id: "claude-3.7", name: "Claude 3.7 Sonnet", badge: "Reasoning", icon: BrainCircuit },
  { id: "gpt-4o", name: "GPT-4o Omnimodal", badge: "Multimodal", icon: Cpu },
]

export const RECENT_THREADS: ChatThread[] = [
  { id: "t-1", title: "React Virtualized Data Table", timeGroup: "Today", active: true, model: "Gemini 3.6" },
  { id: "t-2", title: "Vite Tailwind v4 Styling Fix", timeGroup: "Today", model: "Claude 3.7" },
  { id: "t-3", title: "SQL Index & Query Optimizer", timeGroup: "Yesterday", model: "GPT-4o" },
  { id: "t-4", title: "Python FastAPI Async Handlers", timeGroup: "Yesterday", model: "Gemini 3.6" },
  { id: "t-5", title: "Zustand State Architecture", timeGroup: "Previous 7 Days", model: "Claude 3.7" },
  { id: "t-6", title: "OAuth2 Token Refresh Flow", timeGroup: "Previous 7 Days", model: "GPT-4o" },
]

export const SPECIALIZED_AGENTS: AIAgent[] = [
  { id: "ag-1", name: "Code Architect", icon: Code2 },
  { id: "ag-2", name: "Data Analyst", icon: BarChart3 },
  { id: "ag-3", name: "UI/UX Specialist", icon: Palette },
  { id: "ag-4", name: "Doc Writer", icon: FileText },
]
