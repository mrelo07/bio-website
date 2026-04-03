import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { hashPassword, createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validate username
    const usernameRegex = /^[a-z0-9_]+$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username moze zawierac tylko male litery, cyfry i podkreslniki" },
        { status: 400 }
      )
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "Username musi miec od 3 do 20 znakow" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Haslo musi miec minimum 6 znakow" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: "Ten username jest juz zajety" },
        { status: 400 }
      )
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)

    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert({ username, password_hash: passwordHash })
      .select("id")
      .single()

    if (userError || !newUser) {
      console.error("User creation error:", userError)
      return NextResponse.json(
        { error: "Nie udalo sie utworzyc konta" },
        { status: 500 }
      )
    }

    // Create profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: newUser.id,
        username,
        display_name: username,
      })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Clean up user if profile creation fails
      await supabase.from("users").delete().eq("id", newUser.id)
      return NextResponse.json(
        { error: "Nie udalo sie utworzyc profilu" },
        { status: 500 }
      )
    }

    // Create session
    await createSession(newUser.id)

    return NextResponse.json({ success: true, userId: newUser.id })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Wystapil blad podczas rejestracji" },
      { status: 500 }
    )
  }
}
