import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const supabase = await createClient()

  // Fetch user
  const { data: user } = await supabase
    .from("users")
    .select("id, username")
    .eq("id", session.userId)
    .single()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch user social links
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true })

  return (
    <DashboardClient
      user={user}
      profile={profile}
      socialLinks={socialLinks || []}
    />
  )
}
