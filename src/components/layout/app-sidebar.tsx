import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Plus,
  MessageSquare,
  Bot,
  Trash2,
  Share2,
  Edit3,
  MoreHorizontal,
  Brain,
  Sliders,
  Key,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,

  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserNav } from "./user-nav"
import { GoogleLogoIcon } from "@/features/auth/components/google-logo"
import type { UserProfile } from "@/features/auth/types/auth.types"
import type { ChatThread } from "@/features/assistant/types/assistant.types"
import { RECENT_THREADS, SPECIALIZED_AGENTS } from "@/features/assistant/mock/initial-data"

const DEFAULT_USER: UserProfile = {
  name: "Alex Developer",
  email: "alex@antigravity.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
}

export function AppSidebar({
  currentUser,
  onOpenAuth,
  onSelectThread,
  onNewChat,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentUser?: UserProfile | null
  onOpenAuth?: () => void
  onSelectThread?: (threadId: string) => void
  onNewChat?: () => void
}) {
  const [threads, setThreads] = React.useState<ChatThread[]>(RECENT_THREADS)
  const { isMobile } = useSidebar()

  const handleThreadClick = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => ({
        ...t,
        active: t.id === id,
      }))
    )
    if (onSelectThread) onSelectThread(id)
  }

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setThreads((prev) => prev.filter((t) => t.id !== id))
  }

  const activeUser = currentUser === undefined ? DEFAULT_USER : currentUser

  const todayThreads = threads.filter((t) => t.timeGroup === "Today")
  const yesterdayThreads = threads.filter((t) => t.timeGroup === "Yesterday")
  const pastThreads = threads.filter((t) => t.timeGroup === "Previous 7 Days")

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border bg-sidebar" {...props}>
      {/* Sidebar Header with Branding & New Chat */}
      <SidebarHeader className="p-3 border-b border-border">
        <div className="flex items-center justify-between px-2 py-1.5 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-xs">
              <Bot className="size-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
                Personal Assistant
              </span>
              <span className="text-[11px] text-muted-foreground">Smart Productivity Workspace</span>
            </div>
          </div>
        </div>


        {/* Primary Action Button */}
        <Button
          onClick={() => {
            if (onNewChat) onNewChat()
          }}
          className="w-full justify-between gap-2 shadow-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-9 px-3 font-semibold text-xs transition-all border border-border"
        >
          <div className="flex items-center gap-2">
            <Plus className="size-4" />
            <span>New Chat</span>
          </div>
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-primary-foreground/30 bg-primary-foreground/10 px-1.5 font-mono text-[10px] font-medium text-primary-foreground">
            ⌘K
          </kbd>
        </Button>
      </SidebarHeader>

      {/* Main Content Area */}
      <SidebarContent className="p-2 space-y-4">
        {/* Chat History Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Today Section */}
              {todayThreads.length > 0 && (
                <div className="mb-2">
                  <div className="text-[11px] font-semibold text-muted-foreground/70 px-2 py-1">Today</div>
                  {todayThreads.map((thread) => (
                    <SidebarMenuItem key={thread.id}>
                      <SidebarMenuButton
                        onClick={() => handleThreadClick(thread.id)}
                        isActive={thread.active}
                        className={`group flex items-center justify-between text-xs py-2 px-2.5 rounded-lg transition-colors font-medium ${
                          thread.active ? "bg-accent text-accent-foreground font-semibold" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MessageSquare className="size-3.5 text-muted-foreground" />
                          <span className="truncate">{thread.title}</span>
                        </div>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <SidebarMenuAction className="aria-expanded:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="size-3.5" />
                            </SidebarMenuAction>
                          }
                        />
                        <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="start" className="w-40">
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Edit3 className="size-3.5" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Share2 className="size-3.5" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteThread(thread.id, e)}
                            className="gap-2 text-xs text-destructive focus:text-destructive"
                          >
                            <Trash2 className="size-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}

              {/* Yesterday Section */}
              {yesterdayThreads.length > 0 && (
                <div className="mb-2">
                  <div className="text-[11px] font-semibold text-muted-foreground/70 px-2 py-1">Yesterday</div>
                  {yesterdayThreads.map((thread) => (
                    <SidebarMenuItem key={thread.id}>
                      <SidebarMenuButton
                        onClick={() => handleThreadClick(thread.id)}
                        isActive={thread.active}
                        className={`group flex items-center justify-between text-xs py-2 px-2.5 rounded-lg transition-colors font-medium ${
                          thread.active ? "bg-accent text-accent-foreground font-semibold" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MessageSquare className="size-3.5 text-muted-foreground" />
                          <span className="truncate">{thread.title}</span>
                        </div>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <SidebarMenuAction className="aria-expanded:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="size-3.5" />
                            </SidebarMenuAction>
                          }
                        />
                        <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="start" className="w-40">
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Edit3 className="size-3.5" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs text-destructive focus:text-destructive">
                            <Trash2 className="size-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}

              {/* Previous 7 Days Section */}
              {pastThreads.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground/70 px-2 py-1">Previous 7 Days</div>
                  {pastThreads.map((thread) => (
                    <SidebarMenuItem key={thread.id}>
                      <SidebarMenuButton
                        onClick={() => handleThreadClick(thread.id)}
                        isActive={thread.active}
                        className={`group flex items-center justify-between text-xs py-2 px-2.5 rounded-lg transition-colors font-medium ${
                          thread.active ? "bg-accent text-accent-foreground font-semibold" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MessageSquare className="size-3.5 text-muted-foreground" />
                          <span className="truncate">{thread.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Specialized AI Personas / Agents */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1 flex items-center justify-between">
            <span>Specialized Agents</span>
            <Bot className="size-3 text-muted-foreground" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SPECIALIZED_AGENTS.map((agent) => {
                const Icon = agent.icon
                return (
                  <SidebarMenuItem key={agent.id}>
                    <SidebarMenuButton className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-lg text-xs hover:bg-muted font-medium text-foreground">
                      <Icon className="size-4 text-foreground" />
                      <span>{agent.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Custom Memory & Workspace Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1">
            Workspace Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 text-xs py-2 px-2.5 text-foreground hover:bg-muted">
                  <Brain className="size-3.5 text-muted-foreground" />
                  <span>Custom Memory</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 text-xs py-2 px-2.5 text-foreground hover:bg-muted">
                  <Key className="size-3.5 text-muted-foreground" />
                  <span>API Keys & Tokens</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 text-xs py-2 px-2.5 text-foreground hover:bg-muted">
                  <Sliders className="size-3.5 text-muted-foreground" />
                  <span>Model Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Profile */}
      <SidebarFooter className="p-3 border-t border-border">
        {activeUser ? (
          <UserNav user={activeUser} />
        ) : (
          <Button
            onClick={onOpenAuth}
            variant="outline"
            className="w-full justify-center gap-2 rounded-xl h-10 border-border bg-card hover:bg-accent text-foreground font-bold text-xs"
          >
            <GoogleLogoIcon className="size-4" />
            <span>Sign In with Google</span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
