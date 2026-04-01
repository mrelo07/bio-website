import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 shadow-[0_0_30px_hsla(270,70%,65%,0.3)]">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Sprawdz swoj email
          </h1>
          <p className="mt-4 text-muted-foreground">
            Wyslalismy Ci link aktywacyjny na Twoj adres email. Kliknij w link
            aby aktywowac swoje konto.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-[0_0_30px_hsla(270,70%,65%,0.08)]">
          <p className="text-sm text-muted-foreground">
            Nie otrzymales emaila? Sprawdz folder spam lub{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              sprobuj ponownie
            </Link>
          </p>
        </div>

        <Button asChild variant="outline" className="border-border">
          <Link href="/auth/login">Wrocz do logowania</Link>
        </Button>
      </div>
    </div>
  )
}
