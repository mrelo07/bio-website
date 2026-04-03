import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { label, url, icon, sort_order } = await request.json()

    if (!label || !url) {
      return NextResponse.json(
        { error: "Label i URL sa wymagane" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("social_links")
      .insert({
        user_id: session.userId,
        label,
        url,
        icon: icon || "website",
        sort_order: sort_order || 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Link creation error:", error)
    return NextResponse.json(
      { error: "Wystapil blad podczas dodawania linku" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get("id")

    if (!linkId) {
      return NextResponse.json({ error: "ID linku jest wymagane" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify the link belongs to the user
    const { data: link } = await supabase
      .from("social_links")
      .select("user_id")
      .eq("id", linkId)
      .single()

    if (!link || link.user_id !== session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", linkId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Link deletion error:", error)
    return NextResponse.json(
      { error: "Wystapil blad podczas usuwania linku" },
      { status: 500 }
    )
  }
}
