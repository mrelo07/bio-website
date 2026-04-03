"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LogOut,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  User as UserIcon,
} from "lucide-react"
interface User {
  id: string
  username: string
}

interface Profile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  discord_tag: string | null
}

interface SocialLink {
  id: string
  user_id: string
  label: string
  url: string
  icon: string
  sort_order: number
}

const ICON_OPTIONS = [
  { value: "discord", label: "Discord" },
  { value: "github", label: "GitHub" },
  { value: "steam", label: "Steam" },
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitch", label: "Twitch" },
  { value: "website", label: "Website" },
  { value: "email", label: "Email" },
]

interface DashboardClientProps {
  user: User
  profile: Profile | null
  socialLinks: SocialLink[]
}

export function DashboardClient({
  user,
  profile,
  socialLinks: initialLinks,
}: DashboardClientProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialLinks)

  // Profile form state
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")
  const [discordTag, setDiscordTag] = useState(profile?.discord_tag || "")

  // New link form state
  const [newLinkLabel, setNewLinkLabel] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [newLinkIcon, setNewLinkIcon] = useState("website")

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  const handleSaveProfile = async () => {
    setSaving(true)

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: displayName || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
        discord_tag: discordTag || null,
      }),
    })

    setSaving(false)

    if (response.ok) {
      router.refresh()
    }
  }

  const handleAddLink = async () => {
    if (!newLinkLabel || !newLinkUrl) return

    const response = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: newLinkLabel,
        url: newLinkUrl,
        icon: newLinkIcon,
        sort_order: socialLinks.length,
      }),
    })

    const result = await response.json()

    if (response.ok && result.data) {
      setSocialLinks([...socialLinks, result.data])
      setNewLinkLabel("")
      setNewLinkUrl("")
      setNewLinkIcon("website")
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    const response = await fetch(`/api/links?id=${linkId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setSocialLinks(socialLinks.filter((link) => link.id !== linkId))
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(270, 70%, 65%, 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsla(290, 50%, 40%, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Edytuj swoj profil i linki
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border"
            >
              <Link href={`/${profile?.username}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Zobacz profil
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-border text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-[0_0_30px_hsla(270,70%,65%,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Profil
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-secondary shadow-[0_0_20px_hsla(270,70%,65%,0.2)]">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="avatarUrl">URL Avatara</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="border-border bg-secondary/50"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={profile?.username || ""}
                  disabled
                  className="border-border bg-secondary/30 text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Username nie moze byc zmieniony
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Nazwa wyswietlana</Label>
                <Input
                  id="displayName"
                  placeholder="Twoja nazwa"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="border-border bg-secondary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discordTag">Discord Tag</Label>
              <Input
                id="discordTag"
                placeholder="username#0000 lub username"
                value={discordTag}
                onChange={(e) => setDiscordTag(e.target.value)}
                className="border-border bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Krotki opis o sobie..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="border-border bg-secondary/50 resize-none"
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsla(270,70%,65%,0.3)]"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Zapisz profil
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-[0_0_30px_hsla(270,70%,65%,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Linki Spolecznosciowe
          </h2>

          {/* Existing Links */}
          <div className="mb-6 space-y-3">
            {socialLinks.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">
                Nie masz jeszcze zadnych linkow. Dodaj swoj pierwszy link
                ponizej.
              </p>
            ) : (
              socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {link.url}
                    </p>
                  </div>
                  <span className="rounded bg-primary/20 px-2 py-1 text-xs text-primary">
                    {link.icon}
                  </span>
                  <Button
                    onClick={() => handleDeleteLink(link.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Add New Link */}
          <div className="space-y-4 border-t border-border pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Dodaj nowy link
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newLinkLabel">Etykieta</Label>
                <Input
                  id="newLinkLabel"
                  placeholder="np. Discord Server"
                  value={newLinkLabel}
                  onChange={(e) => setNewLinkLabel(e.target.value)}
                  className="border-border bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newLinkIcon">Ikona</Label>
                <Select value={newLinkIcon} onValueChange={setNewLinkIcon}>
                  <SelectTrigger className="border-border bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newLinkUrl">URL</Label>
              <Input
                id="newLinkUrl"
                type="url"
                placeholder="https://..."
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="border-border bg-secondary/50"
              />
            </div>

            <Button
              onClick={handleAddLink}
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary/10"
              disabled={!newLinkLabel || !newLinkUrl}
            >
              <Plus className="mr-2 h-4 w-4" />
              Dodaj link
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
