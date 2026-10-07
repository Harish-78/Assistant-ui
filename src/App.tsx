import * as React from "react"
import './App.css'
import { AppSidebar } from './components/layout/app-sidebar'
import { AppHeader } from './components/layout/app-header'
import { SidebarInset } from './components/ui/sidebar'
import { AssistantWorkspace } from './features/assistant/assistant-workspace'
import { AuthModal } from './features/auth/components/auth-modal'
import type { UserProfile } from './features/auth/types/auth.types'
import { ThemeProvider } from './components/theme-provider'

function App() {
  const [activeThreadId, setActiveThreadId] = React.useState<string>("t-1")
  const [currentUser, setCurrentUser] = React.useState<UserProfile | null>(null)
  const [isAuthOpen, setIsAuthOpen] = React.useState<boolean>(false)

  const handleNewChat = () => {
    setActiveThreadId("new-" + Date.now())
  }

  const handleSelectThread = (id: string) => {
    setActiveThreadId(id)
  }

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppSidebar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onNewChat={handleNewChat}
        onSelectThread={handleSelectThread}
      />
      <SidebarInset>
        <AppHeader
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <AssistantWorkspace key={activeThreadId} activeThreadId={activeThreadId} />
        </div>
      </SidebarInset>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </ThemeProvider>
  )
}

export default App
