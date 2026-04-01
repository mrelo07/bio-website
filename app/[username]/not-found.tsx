import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserX } from "lucide-react"

export default function NotFound() {
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
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted shadow-[0_0_30px_hsla(270,70%,65%,0.15)]">
          <UserX className="h-10 w-10 text-muted-foreground" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Profil nie znaleziony
          </h1>
          <p className="mt-4 text-muted-foreground">
            Ten uzytkownik nie istnieje lub zostal usuniety.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">Strona glowna</Link>
          </Button>
          <Button asChild variant="outline" className="border-border">
            <Link href="/auth/sign-up">Stworz swoj profil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
