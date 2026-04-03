import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyPassword, createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username i haslo sa wymagane" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Find user by username
    const { data: user } = await supabase
      .from("users")
      .select("id, password_hash")
      .eq("username", username.toLowerCase())
      .single()

    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidlowy username lub haslo" },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return NextResponse.json(
        { error: "Nieprawidlowy username lub haslo" },
        { status: 401 }
      )
    }

    // Create session
    await createSession(user.id)

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Wystapil blad podczas logowania" },
      { status: 500 }
    )
  }
}
