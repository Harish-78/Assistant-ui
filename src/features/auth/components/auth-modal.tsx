import * as React from "react"
import { Bot, X, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleLogoIcon } from "./google-logo"
import type { UserProfile } from "../types/auth.types"

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: UserProfile) => void
}) {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin")
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false)
  const [isLoadingForm, setIsLoadingForm] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")

  if (!isOpen) return null

  const handleGoogleOAuth = () => {
    setIsLoadingGoogle(true)
    setTimeout(() => {
      setIsLoadingGoogle(false)
      const googleUser: UserProfile = {
        name: "Alex Dev (Google)",
        email: "alex.dev@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        provider: "google",
      }
      onLoginSuccess(googleUser)
      onClose()
    }, 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoadingForm(true)
    setTimeout(() => {
      setIsLoadingForm(false)
      const emailUser: UserProfile = {
        name: name || email.split("@")[0] || "User",
        email: email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        provider: "email",
      }
      onLoginSuccess(emailUser)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl text-foreground">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Branding Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-xs mb-3">
            <Bot className="size-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {tab === "signin" ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {tab === "signin"
              ? "Sign in to access your AI Assistant workspace & history"
              : "Sign up to start building with state-of-the-art AI agents"}
          </p>
        </div>

        {/* Primary Google OAuth Button */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            disabled={isLoadingGoogle || isLoadingForm}
            onClick={handleGoogleOAuth}
            className="w-full h-11 justify-center gap-3 border-border bg-card hover:bg-accent text-foreground font-semibold text-sm rounded-xl transition-all shadow-xs"
          >
            {isLoadingGoogle ? (
              <span className="flex items-center gap-2 text-xs font-mono">
                <Loader2 className="size-4 animate-spin text-foreground" /> Authenticating with Google...
              </span>
            ) : (
              <>
                <GoogleLogoIcon className="size-4" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-border" />
            <span className="absolute bg-background px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Or continue with email
            </span>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === "signup" && (
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Alex Developer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 text-xs rounded-xl"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold">Password</Label>
                {tab === "signin" && (
                  <a href="#" className="text-[11px] text-muted-foreground hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoadingForm || isLoadingGoogle}
              className="w-full h-10 mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-xs gap-2"
            >
              {isLoadingForm ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{tab === "signin" ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle between Sign In / Sign Up */}
          <div className="pt-2 text-center text-xs text-muted-foreground">
            {tab === "signin" ? (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className="font-bold text-foreground hover:underline"
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signin")}
                  className="font-bold text-foreground hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
