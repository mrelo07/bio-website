import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(270, 70%, 65%, 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsla(290, 50%, 40%, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Blad autoryzacji
          </h1>
          <p className="mt-4 text-muted-foreground">
            Cos poszlo nie tak podczas autoryzacji. Sprobuj ponownie.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/auth/login">Sprobuj ponownie</Link>
          </Button>
          <Button asChild variant="outline" className="border-border">
            <Link href="/">Strona glowna</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
