"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate username (only lowercase letters, numbers, underscores)
    const usernameRegex = /^[a-z0-9_]+$/
    if (!usernameRegex.test(username)) {
      setError("Username moze zawierac tylko male litery, cyfry i podkreslniki")
      setLoading(false)
      return
    }

    if (username.length < 3 || username.length > 20) {
      setError("Username musi miec od 3 do 20 znakow")
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Check if username is already taken
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single()

    if (existingUser) {
      setError("Ten username jest juz zajety")
      setLoading(false)
      return
    }

    // Generate a fake email from username (Supabase requires email)
    const fakeEmail = `${username}@biolink.local`

    const { error: signUpError } = await supabase.auth.signUp({
      email: fakeEmail,
      password,
      options: {
        data: {
          username,
          display_name: username,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Auto-login after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(270, 70%, 65%, 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsla(290, 50%, 40%, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Stworz konto</h1>
          <p className="mt-2 text-muted-foreground">
            Zarejestruj sie aby stworzyc swoj profil
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-4 rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-[0_0_30px_hsla(270,70%,65%,0.08)]">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="twoj_username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
                className="border-border bg-secondary/50 focus:border-primary focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">
                Twoj profil bedzie dostepny pod /{username || "username"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Haslo</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-border bg-secondary/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsla(270,70%,65%,0.3)]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejestracja...
                </>
              ) : (
                "Zarejestruj sie"
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Masz juz konto?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline"
            >
              Zaloguj sie
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
