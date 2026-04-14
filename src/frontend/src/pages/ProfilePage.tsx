import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Camera, Check, Edit3, Film, Users, X } from "lucide-react";
import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { VideoCard } from "../components/VideoCard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUpdateProfile } from "../hooks/useDashboard";
import { useProfile } from "../hooks/useProfile";
import type { VideoSummary } from "../types";

// Seed videos for the profile page
const SEED_USER_VIDEOS: Record<string, VideoSummary[]> = {
  u1: [
    {
      id: "v1",
      title: "AI-Enhanced Cinematic Sequence",
      description:
        "A stunning cinematic sequence generated with Sora's latest model.",
      thumbnailUrl: "/assets/generated/thumb-cinematic.dim_640x360.jpg",
      duration: 165,
      viewCount: 12400,
      likeCount: 843,
      commentCount: 47,
      uploaderName: "Aria K.",
      uploaderId: "u1",
      aiTool: "Sora",
      status: "published",
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000 * 2,
    },
    {
      id: "v4",
      title: "Collaborative Narrative Scene",
      description:
        "A multi-collaborator narrative scene with shared editing workflow.",
      thumbnailUrl: "/assets/generated/thumb-narrative.dim_640x360.jpg",
      duration: 234,
      viewCount: 6300,
      likeCount: 287,
      commentCount: 35,
      uploaderName: "Aria K.",
      uploaderId: "u1",
      aiTool: "Pika",
      status: "published",
      createdAt: Date.now() - 86400000 * 4,
      updatedAt: Date.now() - 86400000 * 4,
    },
  ],
  u2: [
    {
      id: "v2",
      title: "Data-Driven Marketing Video v3",
      description: "Automated marketing visuals driven by live data feeds.",
      thumbnailUrl: "/assets/generated/thumb-marketing.dim_640x360.jpg",
      duration: 120,
      viewCount: 8900,
      likeCount: 412,
      commentCount: 28,
      uploaderName: "Chloe L.",
      uploaderId: "u2",
      aiTool: "Runway",
      status: "published",
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now() - 86400000 * 3,
    },
  ],
};

function formatCount(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

interface EditFormProps {
  displayName: string;
  bio: string;
  onSave: (name: string, bio: string) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function EditProfileForm({
  displayName,
  bio,
  onSave,
  onCancel,
  isSaving,
}: EditFormProps) {
  const [name, setName] = useState(displayName);
  const [bioText, setBioText] = useState(bio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, bioText);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 p-4 bg-muted/30 rounded-xl border border-border"
    >
      <div className="space-y-1.5">
        <label
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
          htmlFor="display-name"
        >
          Display Name
        </label>
        <input
          id="display-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-card border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
          placeholder="Your display name"
          maxLength={60}
          required
          data-ocid="profile.edit_name_input"
        />
      </div>
      <div className="space-y-1.5">
        <label
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
          htmlFor="bio"
        >
          Bio
        </label>
        <textarea
          id="bio"
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
          className="w-full bg-card border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
          placeholder="Tell the world about your AI video work…"
          rows={3}
          maxLength={300}
          data-ocid="profile.edit_bio_input"
        />
        <p className="text-xs text-muted-foreground text-right">
          {bioText.length}/300
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSaving || !name.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth"
          data-ocid="profile.save_button"
        >
          {isSaving ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
          data-ocid="profile.cancel_button"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProfilePage() {
  const { userId } = useParams({ from: "/profile/$userId" });
  const { principalText, isAuthenticated } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  const resolvedId = userId === "me" ? "u1" : userId;
  const { data: profile, isLoading } = useProfile(resolvedId);
  const { mutateAsync: updateProfile, isPending: isSaving } =
    useUpdateProfile();

  // Determine if viewing own profile — compare principal IDs to avoid false
  // positives when two users share a display name
  const isOwnProfile =
    isAuthenticated &&
    !!principalText &&
    !!profile?.id &&
    principalText === profile.id.toString();

  const videos = SEED_USER_VIDEOS[resolvedId] ?? [];

  const handleSave = async (displayName: string, bio: string) => {
    await updateProfile({ displayName, bio });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" label="Loading profile…" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <EmptyState
          title="Profile not found"
          description="This creator's profile doesn't exist or has been removed."
          action={
            <Link
              to="/"
              search={{ q: undefined }}
              className="text-primary hover:underline text-sm"
              data-ocid="profile.back_link"
            >
              Back to feed
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div data-ocid="profile.page">
      {/* Hero banner */}
      <div className="h-40 bg-gradient-to-r from-primary/25 via-primary/10 to-accent/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 opacity-20" />
        <Link
          to="/"
          search={{ q: undefined }}
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1 transition-colors"
          data-ocid="profile.back_link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to feed
        </Link>
      </div>

      {/* Profile header */}
      <div className="px-4 sm:px-6 pb-6 bg-card border-b border-border">
        <div className="flex items-end justify-between gap-4 -mt-10 mb-4">
          {/* Avatar with optional upload indicator */}
          <div className="relative">
            <Avatar
              name={profile.displayName}
              src={profile.avatarUrl}
              size="xl"
              className="ring-4 ring-card w-20 h-20 text-2xl"
            />
            {isOwnProfile && (
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-smooth shadow-subtle"
                aria-label="Change profile picture"
                data-ocid="profile.avatar_upload_button"
              >
                <Camera className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Edit button */}
          {isOwnProfile && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-smooth"
              data-ocid="profile.edit_button"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit profile
            </button>
          )}
        </div>

        <div className="space-y-1 mb-3">
          <h1 className="font-display text-xl font-bold text-foreground">
            {profile.displayName}
          </h1>
          <p className="text-sm text-muted-foreground">{profile.handle}</p>
        </div>

        {profile.bio && !isEditing && (
          <p className="text-sm text-foreground/80 max-w-xl mb-4 leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* Edit form */}
        {isEditing && (
          <EditProfileForm
            displayName={profile.displayName}
            bio={profile.bio ?? ""}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            isSaving={isSaving}
          />
        )}

        {/* Stats */}
        {!isEditing && (
          <div className="flex items-center gap-6 pt-1">
            <div className="text-center">
              <p className="font-display font-bold text-foreground text-lg leading-none">
                {formatCount(profile.videoCount)}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Film className="w-3 h-3" />
                Videos
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="font-display font-bold text-foreground text-lg leading-none">
                {formatCount(profile.subscriberCount)}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Subscribers
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Videos section */}
      <div
        className="p-4 sm:p-6 bg-background"
        data-ocid="profile.videos_section"
      >
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Film className="w-4 h-4 text-primary" />
          Videos
        </h2>

        {videos.length === 0 ? (
          <div data-ocid="profile.videos_empty_state">
            <EmptyState
              icon={<Film className="w-7 h-7" />}
              title="No videos yet"
              description="This creator hasn't published any public videos yet."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
