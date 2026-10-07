import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Activity, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoogleLogoIcon } from "@/features/auth/components/google-logo"
import type { UserProfile } from "@/features/auth/types/auth.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ThemeToggle } from "./theme-toggle"

export function AppHeader({
  currentUser,
  onOpenAuth,
}: {
  currentUser: UserProfile | null
  onOpenAuth: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border transition-[width,height] ease-linear px-4 lg:px-6 bg-background/90 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator orientation="vertical" className="mx-2 h-4 bg-border" />
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold tracking-tight text-foreground">
            Personal Assistant
          </h1>

          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-border bg-muted text-foreground text-[10px] font-bold">
            <Activity className="size-3" /> Live Session
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
          <Search className="size-4" />
        </Button>
        <ThemeToggle />


        {currentUser ? (
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <Avatar className="size-8 border border-border">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-xs font-bold bg-muted text-foreground">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-none">{currentUser.name}</span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">{currentUser.email}</span>
            </div>
          </div>
        ) : (
          <Button
            onClick={onOpenAuth}
            size="sm"
            className="gap-2 rounded-xl h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs shadow-xs"
          >
            <GoogleLogoIcon className="size-3.5" />
            <span>Sign In with Google</span>
          </Button>
        )}
      </div>
    </header>
  )
}
