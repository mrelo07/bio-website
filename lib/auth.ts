import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

const SESSION_COOKIE_NAME = "session_token"
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomUUID()
  const cookieStore = await cookies()
  
  cookieStore.set(SESSION_COOKIE_NAME, `${userId}:${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })
  
  return token
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) {
    return null
  }
  
  const [userId] = sessionCookie.value.split(":")
  if (!userId) {
    return null
  }
  
  return { userId }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) {
    return null
  }
  
  const supabase = await createClient()
  const { data: user } = await supabase
    .from("users")
    .select("id, username")
    .eq("id", session.userId)
    .single()
  
  return user
}

export async function getCurrentProfile() {
  const session = await getSession()
  if (!session) {
    return null
  }
  
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.userId)
    .single()
  
  return profile
}
