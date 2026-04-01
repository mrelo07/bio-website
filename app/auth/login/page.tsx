"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
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
          <h1 className="text-3xl font-bold text-foreground">Zaloguj sie</h1>
          <p className="mt-2 text-muted-foreground">
            Wpisz swoje dane aby sie zalogowac
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4 rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-[0_0_30px_hsla(270,70%,65%,0.08)]">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="twoj@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-secondary/50 focus:border-primary focus:ring-primary"
              />
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
                  Logowanie...
                </>
              ) : (
                "Zaloguj sie"
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Nie masz konta?{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary hover:underline"
            >
              Zarejestruj sie
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
