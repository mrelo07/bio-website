import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ParticlesBackground } from "@/components/particles-background"
import { DynamicProfile } from "@/components/dynamic-profile"

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio")
    .eq("username", username)
    .single()

  if (!profile) {
    return {
      title: "Profil nie znaleziony",
    }
  }

  return {
    title: `${profile.display_name || username} | Links`,
    description: profile.bio || `Sprawdz profil ${username}`,
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single()

  if (!profile) {
    notFound()
  }

  // Fetch user social links
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order", { ascending: true })

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Animated gradient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(270, 70%, 65%, 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsla(290, 50%, 40%, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, hsla(270, 70%, 65%, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Particle canvas */}
      <ParticlesBackground />

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        <DynamicProfile profile={profile} socialLinks={socialLinks || []} />
      </div>
    </main>
  )
}
