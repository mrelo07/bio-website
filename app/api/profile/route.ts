import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth"

export async function PUT(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { display_name, bio, avatar_url, discord_tag } = await request.json()

    const supabase = await createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: display_name || null,
        bio: bio || null,
        avatar_url: avatar_url || null,
        discord_tag: discord_tag || null,
      })
      .eq("id", session.userId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Wystapil blad podczas aktualizacji profilu" },
      { status: 500 }
    )
  }
}
