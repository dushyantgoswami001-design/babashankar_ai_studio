import type {
  VideoSummary as BackendVideoSummary,
  CollaborationInvitation,
} from "@/backend";
import { CollaboratorRole } from "@/backend";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Film,
  Globe,
  LockKeyhole,
  MailOpen,
  Play,
  Plus,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { VideoCard } from "../components/VideoCard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  useAcceptInvitation,
  useDeclineInvitation,
  useMyVideos,
  usePendingInvitations,
} from "../hooks/useDashboard";
import type { VideoSummary } from "../types";

// ─── Backend VideoSummary → frontend VideoSummary adapter ─────────────────────

function adaptBackendVideo(
  v: BackendVideoSummary,
  myName: string,
): VideoSummary {
  return {
    id: v.id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailBlob?.getDirectURL() ?? "",
    duration: Number(v.durationSeconds),
    viewCount: Number(v.viewCount),
    likeCount: 0,
    commentCount: 0,
    uploaderName: myName,
    uploaderId: v.uploaderId.toString(),
    status: "published",
    myRole: "owner",
    createdAt: Number(v.createdAt),
    updatedAt: Number(v.createdAt),
  };
}

// ─── Seed data for My Videos (when backend isn't connected) ───────────────────

const SEED_MY_VIDEOS: VideoSummary[] = [
  {
    id: "v1",
    title: "AI-Enhanced Cinematic Sequence",
    description: "Photorealistic AI-generated environments with Sora.",
    thumbnailUrl: "/assets/generated/thumb-cinematic.dim_640x360.jpg",
    duration: 165,
    viewCount: 12400,
    likeCount: 843,
    commentCount: 47,
    uploaderName: "You",
    uploaderId: "me",
    aiTool: "Sora",
    status: "published",
    myRole: "owner",
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "v4",
    title: "Collaborative Narrative Scene",
    description: "Multi-collaborator AI narrative — draft in progress.",
    thumbnailUrl: "/assets/generated/thumb-narrative.dim_640x360.jpg",
    duration: 234,
    viewCount: 6300,
    likeCount: 287,
    commentCount: 35,
    uploaderName: "You",
    uploaderId: "me",
    aiTool: "Pika",
    status: "draft",
    myRole: "owner",
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: "v7",
    title: "Neural Texture Experiment #2",
    description: "Private experiment using Kling for texture synthesis.",
    thumbnailUrl: "/assets/generated/thumb-neural.dim_640x360.jpg",
    duration: 90,
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    uploaderName: "You",
    uploaderId: "me",
    aiTool: "Kling",
    status: "draft",
    myRole: "owner",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
];

// Seed invitations (when backend isn't connected)
interface SeedInvitation {
  id: string;
  videoTitle: string;
  inviterName: string;
  role: "editor" | "viewer";
  rawId: bigint | null;
}

const SEED_INVITATIONS: SeedInvitation[] = [
  {
    id: "inv1",
    videoTitle: "Generative Landscape Series — Episode 4",
    inviterName: "Chloe L.",
    role: "editor",
    rawId: null,
  },
  {
    id: "inv2",
    videoTitle: "Real-Time MoCap Workflow v2",
    inviterName: "Team Beta",
    role: "viewer",
    rawId: null,
  },
];

// ─── My Video Card (with status badge) ────────────────────────────────────────

interface MyVideoCardProps {
  video: VideoSummary;
  index: number;
}

function MyVideoCard({ video, index }: MyVideoCardProps) {
  const isDraft = video.status === "draft";
  const statusBadge = isDraft ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
      <LockKeyhole className="w-2.5 h-2.5" />
      Draft
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
      <Globe className="w-2.5 h-2.5" />
      Published
    </span>
  );

  return (
    <div className="relative" data-ocid={`dashboard.my_videos.item.${index}`}>
      <VideoCard video={video} index={index} />
      <div className="absolute top-[10px] left-2 z-10 pointer-events-none">
        {statusBadge}
      </div>
    </div>
  );
}

// ─── Invitation Row ───────────────────────────────────────────────────────────

interface InvitationRowProps {
  title: string;
  inviterName: string;
  role: "editor" | "viewer";
  index: number;
  onAccept: () => void;
  onDecline: () => void;
  isAccepting: boolean;
  isDeclining: boolean;
}

function InvitationRow({
  title,
  inviterName,
  role,
  index,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
}: InvitationRowProps) {
  const roleColor =
    role === "editor"
      ? "bg-accent/10 text-accent border-accent/30"
      : "bg-muted text-muted-foreground border-border";

  return (
    <div
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/20 transition-smooth"
      data-ocid={`dashboard.invitations.item.${index}`}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Play className="w-4 h-4 text-primary fill-primary/50" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-semibold text-foreground truncate">
          {title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">
            from{" "}
            <span className="text-foreground/80 font-medium">
              {inviterName}
            </span>
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${roleColor}`}
          >
            <Users className="w-2.5 h-2.5" />
            {role === "editor" ? "Editor" : "Viewer"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onAccept}
          disabled={isAccepting || isDeclining}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth"
          data-ocid={`dashboard.invitations.accept_button.${index}`}
        >
          {isAccepting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          Accept
        </button>
        <button
          type="button"
          onClick={onDecline}
          disabled={isAccepting || isDeclining}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth"
          data-ocid={`dashboard.invitations.decline_button.${index}`}
        >
          {isDeclining ? (
            <LoadingSpinner size="sm" />
          ) : (
            <XCircle className="w-3.5 h-3.5" />
          )}
          Decline
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { isAuthenticated, login, principalText } = useCurrentUser();
  const { data: backendVideos, isLoading: videosLoading } =
    useMyVideos(isAuthenticated);
  const { data: backendInvitations, isLoading: invitationsLoading } =
    usePendingInvitations(isAuthenticated);
  const { mutateAsync: accept, isPending: isAccepting } = useAcceptInvitation();
  const { mutateAsync: decline, isPending: isDeclining } =
    useDeclineInvitation();

  // Fall back to seed data if backend returns empty
  const videos: VideoSummary[] =
    backendVideos && backendVideos.length > 0
      ? backendVideos.map((v) => adaptBackendVideo(v, "You"))
      : SEED_MY_VIDEOS;

  // Normalise invitations for rendering
  const invitations: SeedInvitation[] =
    backendInvitations && backendInvitations.length > 0
      ? backendInvitations.map((inv: CollaborationInvitation) => ({
          id: inv.id.toString(),
          videoTitle: `Video #${inv.videoId}`,
          inviterName: `${inv.inviterId.toString().slice(0, 8)}…`,
          role:
            inv.role === CollaboratorRole.editor
              ? ("editor" as const)
              : ("viewer" as const),
          rawId: inv.id,
        }))
      : SEED_INVITATIONS;

  // Unauthenticated gate
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Your Creator Studio
          </h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            Sign in to manage your AI videos, track performance, and collaborate
            with others.
          </p>
        </div>
        <button
          type="button"
          onClick={login}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
          data-ocid="dashboard.login_button"
        >
          Sign in with Internet Identity
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6 space-y-10 max-w-7xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            My Studio
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your AI videos and collaborations
          </p>
        </div>
        <Link
          to="/upload"
          className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle"
          data-ocid="dashboard.upload_button"
        >
          <Plus className="w-4 h-4" />
          New Video
        </Link>
      </div>

      {/* My Videos */}
      <section data-ocid="dashboard.my_videos_section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Film className="w-4 h-4 text-primary" />
            My Videos
            {videos.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-primary/10 text-primary">
                {videos.length}
              </span>
            )}
          </h2>
          {principalText && (
            <Link
              to="/profile/$userId"
              params={{ userId: "me" }}
              className="text-xs text-primary hover:underline transition-colors"
              data-ocid="dashboard.view_profile_link"
            >
              View public profile →
            </Link>
          )}
        </div>

        {videosLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="dashboard.my_videos.loading_state"
          >
            <LoadingSpinner size="md" label="Loading your videos…" />
          </div>
        ) : videos.length === 0 ? (
          <div data-ocid="dashboard.my_videos.empty_state">
            <EmptyState
              icon={<Film className="w-7 h-7" />}
              title="No videos yet"
              description="Upload your first AI-generated video and start building your portfolio."
              action={
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
                  data-ocid="dashboard.upload_cta_button"
                >
                  <Plus className="w-4 h-4" />
                  Upload a video
                </Link>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, i) => (
              <MyVideoCard key={video.id} video={video} index={i + 1} />
            ))}
          </div>
        )}
      </section>

      {/* Pending Invitations */}
      <section data-ocid="dashboard.invitations_section">
        <div className="mb-4">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <MailOpen className="w-4 h-4 text-accent" />
            Pending Invitations
            {invitations.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-accent/10 text-accent">
                {invitations.length}
              </span>
            )}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Collaboration requests from other creators
          </p>
        </div>

        {invitationsLoading ? (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="dashboard.invitations.loading_state"
          >
            <LoadingSpinner size="md" label="Loading invitations…" />
          </div>
        ) : invitations.length === 0 ? (
          <div data-ocid="dashboard.invitations.empty_state">
            <EmptyState
              icon={<MailOpen className="w-7 h-7" />}
              title="No pending invitations"
              description="When someone invites you to collaborate on their video, it will appear here."
            />
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.map((inv, i) => (
              <InvitationRow
                key={inv.id}
                title={inv.videoTitle}
                inviterName={inv.inviterName}
                role={inv.role}
                index={i + 1}
                isAccepting={isAccepting}
                isDeclining={isDeclining}
                onAccept={async () => {
                  if (inv.rawId != null) await accept(inv.rawId);
                }}
                onDecline={async () => {
                  if (inv.rawId != null) await decline(inv.rawId);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
