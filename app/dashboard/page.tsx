import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
