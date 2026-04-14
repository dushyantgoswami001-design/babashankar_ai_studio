import { VideoVisibility } from "@/backend";
import { createActor } from "@/backend";
import { patchActorVisibility } from "@/lib/actorPatch";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Clock,
  Edit2,
  Eye,
  Globe,
  Lock,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  Share2,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar } from "../components/Avatar";
import { Badge, RoleBadge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useVideoById } from "../hooks/useVideoFeed";
import type { Collaborator, CollaboratorRole, Comment } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

function formatRelativeDate(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function formatVideoTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// ─── Seed comments & collaborators ───────────────────────────────────────────

const SEED_COMMENTS: Comment[] = [
  {
    id: "c1",
    videoId: "v1",
    authorId: "u2",
    authorName: "Chloe L.",
    content:
      "The lighting at 0:23 is unreal. What parameters did you use for the depth pass?",
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: "c2",
    videoId: "v1",
    authorId: "u3",
    authorName: "AI Lab",
    content:
      "Incredible work. The motion blur at 1:07 is super convincing — Sora keeps improving!",
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: "c3",
    videoId: "v1",
    authorId: "u4",
    authorName: "Ben W.",
    content:
      "This is a great reference for my upcoming project at 0:45. Bookmarking!",
    createdAt: Date.now() - 3600000,
  },
];

const SEED_COLLABORATORS: Collaborator[] = [
  {
    userId: "u5",
    principal: {} as never,
    role: "editor",
    displayName: "Mike S.",
    avatarUrl: undefined,
  },
  {
    userId: "u7",
    principal: {} as never,
    role: "viewer",
    displayName: "Priya N.",
    avatarUrl: undefined,
  },
];

// ─── Comment timestamp mention ───────────────────────────────────────────────

function CommentText({ text }: { text: string }) {
  const parts = text.split(/(\d+:\d{2})/g);
  let counter = 0;
  return (
    <span>
      {parts.map((part) => {
        counter += 1;
        const uid = `${part}-${counter}`;
        return /^\d+:\d{2}$/.test(part) ? (
          <span
            key={uid}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            {part}
          </span>
        ) : (
          <span key={uid}>{part}</span>
        );
      })}
    </span>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      data-ocid="video.delete_confirm.dialog"
    >
      <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-elevated space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Delete Video
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              This action is permanent and cannot be undone. The video will be
              removed for all collaborators.
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            data-ocid="video.delete_confirm.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors"
            data-ocid="video.delete_confirm.confirm_button"
          >
            Delete Video
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Player ─────────────────────────────────────────────────────────────

function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title,
  onPlay,
}: {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  onPlay?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
      }
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-black border border-border shadow-elevated aspect-video relative group">
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          controls
          className="w-full h-full object-contain"
          onPlay={() => {
            setPlaying(true);
            onPlay?.();
          }}
          onPause={() => setPlaying(false)}
          data-ocid="video.player"
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-elevated hover:scale-110 transition-smooth"
              data-ocid="video.play_button"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 text-primary-foreground fill-current ml-1"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Visibility helpers ───────────────────────────────────────────────────────

function visibilityLabel(v: VideoVisibility): string {
  if (v === VideoVisibility.public_) return "Public";
  if (v === VideoVisibility.collaboratorsOnly) return "Collaborators Only";
  return "Private";
}

function VisibilityIcon({ v }: { v: VideoVisibility }) {
  if (v === VideoVisibility.public_) return <Globe className="w-3 h-3" />;
  if (v === VideoVisibility.collaboratorsOnly)
    return <Users className="w-3 h-3" />;
  return <Lock className="w-3 h-3" />;
}

// ─── Edit Form ────────────────────────────────────────────────────────────────

function EditForm({
  title,
  description,
  visibility,
  onSave,
  onCancel,
}: {
  title: string;
  description: string;
  visibility: VideoVisibility;
  onSave: (data: {
    title: string;
    description: string;
    visibility: VideoVisibility;
  }) => void;
  onCancel: () => void;
}) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editVisibility, setEditVisibility] =
    useState<VideoVisibility>(visibility);

  const visibilityOptions: {
    value: VideoVisibility;
    label: string;
    icon: React.ReactNode;
    ocid: string;
  }[] = [
    {
      value: VideoVisibility.public_,
      label: "Public",
      icon: <Globe className="w-3 h-3" />,
      ocid: "video.edit.visibility_public",
    },
    {
      value: VideoVisibility.collaboratorsOnly,
      label: "Collaborators Only",
      icon: <Users className="w-3 h-3" />,
      ocid: "video.edit.visibility_collaborators",
    },
    {
      value: VideoVisibility.private_,
      label: "Private",
      icon: <Lock className="w-3 h-3" />,
      ocid: "video.edit.visibility_private",
    },
  ];

  return (
    <div
      className="bg-card border border-primary/30 rounded-xl p-4 space-y-4"
      data-ocid="video.edit.panel"
    >
      <h3 className="font-display font-semibold text-sm text-foreground">
        Edit Video Details
      </h3>
      <div className="space-y-3">
        <div>
          <label
            className="text-xs font-medium text-muted-foreground mb-1 block"
            htmlFor="edit-title"
          >
            Title
          </label>
          <input
            id="edit-title"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            data-ocid="video.edit.title_input"
          />
        </div>
        <div>
          <label
            className="text-xs font-medium text-muted-foreground mb-1 block"
            htmlFor="edit-desc"
          >
            Description
          </label>
          <textarea
            id="edit-desc"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            rows={3}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
            data-ocid="video.edit.description_textarea"
          />
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground mb-2 block">
            Visibility
          </span>
          <div className="flex flex-wrap gap-2">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.ocid}
                type="button"
                onClick={() => setEditVisibility(opt.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  editVisibility === opt.value
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "bg-secondary border-border text-muted-foreground hover:bg-secondary/70"
                }`}
                data-ocid={opt.ocid}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          data-ocid="video.edit.cancel_button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button
          type="button"
          onClick={() =>
            onSave({
              title: editTitle,
              description: editDesc,
              visibility: editVisibility,
            })
          }
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          data-ocid="video.edit.save_button"
        >
          <Check className="w-3.5 h-3.5" /> Save Changes
        </button>
      </div>
    </div>
  );
}

// ─── Collaboration Panel ──────────────────────────────────────────────────────

function CollabPanel({
  collaborators,
  isOwner,
  onRevoke,
  onInvite,
}: {
  collaborators: Collaborator[];
  isOwner: boolean;
  onRevoke: (userId: string) => void;
  onInvite: (principalId: string, role: CollaboratorRole) => void;
}) {
  const [showInvite, setShowInvite] = useState(false);
  const [invitePrincipal, setInvitePrincipal] = useState("");
  const [inviteRole, setInviteRole] = useState<CollaboratorRole>("editor");
  const [inviteError, setInviteError] = useState("");

  const handleInvite = () => {
    if (!invitePrincipal.trim()) {
      setInviteError("Please enter a principal ID.");
      return;
    }
    onInvite(invitePrincipal.trim(), inviteRole);
    setInvitePrincipal("");
    setInviteRole("editor");
    setInviteError("");
    setShowInvite(false);
  };

  return (
    <div
      className="bg-card rounded-xl border border-border p-4 space-y-4"
      data-ocid="video.collab.panel"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Collaborators
          <span className="text-xs text-muted-foreground font-normal">
            ({collaborators.length})
          </span>
        </h3>
        {isOwner && (
          <button
            type="button"
            onClick={() => setShowInvite(!showInvite)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            data-ocid="video.collab.invite_toggle_button"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Invite
          </button>
        )}
      </div>

      {/* Invite Form */}
      {isOwner && showInvite && (
        <div
          className="bg-background rounded-lg p-3 border border-border space-y-3"
          data-ocid="video.collab.invite_form"
        >
          <p className="text-xs font-medium text-muted-foreground">
            Invite by Principal ID
          </p>
          <input
            type="text"
            placeholder="e.g. aaaaa-aa or rdmx6-jaaaa-…"
            value={invitePrincipal}
            onChange={(e) => {
              setInvitePrincipal(e.target.value);
              setInviteError("");
            }}
            className="w-full bg-card border border-input rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors font-mono"
            data-ocid="video.collab.invite_principal_input"
          />
          {inviteError && (
            <p
              className="text-xs text-destructive"
              data-ocid="video.collab.invite.field_error"
            >
              {inviteError}
            </p>
          )}
          <div className="flex gap-2 items-center">
            <select
              value={inviteRole}
              onChange={(e) =>
                setInviteRole(e.target.value as CollaboratorRole)
              }
              className="flex-1 bg-card border border-input rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="video.collab.invite_role_select"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <button
              type="button"
              onClick={handleInvite}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-ocid="video.collab.invite_submit_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>
      )}

      {/* Collaborator List */}
      {collaborators.length === 0 ? (
        <p
          className="text-xs text-muted-foreground py-2"
          data-ocid="video.collab.empty_state"
        >
          No collaborators yet. Invite someone to get started.
        </p>
      ) : (
        <div className="space-y-2">
          {collaborators.map((c, idx) => (
            <div
              key={c.userId}
              className="flex items-center justify-between gap-2 py-1.5"
              data-ocid={`video.collab.item.${idx + 1}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Avatar name={c.displayName} src={c.avatarUrl} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {c.displayName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <RoleBadge role={c.role} />
                {isOwner && c.role !== "owner" && (
                  <button
                    type="button"
                    onClick={() => onRevoke(c.userId)}
                    aria-label={`Remove ${c.displayName}`}
                    className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    data-ocid={`video.collab.revoke_button.${idx + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Comments Section ─────────────────────────────────────────────────────────

function CommentsSection({
  comments,
  currentUserId,
  isOwner,
  onAddComment,
  onDeleteComment,
}: {
  comments: Comment[];
  currentUserId: string | null;
  isOwner: boolean;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: string) => void;
}) {
  const [text, setText] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <div className="space-y-4" data-ocid="video.comments.section">
      <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-primary" />
        Comments
        <span className="text-xs text-muted-foreground font-normal">
          ({comments.length})
        </span>
      </h3>

      {/* Add comment */}
      {currentUserId && (
        <div
          className="flex gap-3 items-start"
          data-ocid="video.comment.add_form"
        >
          <Avatar name="Me" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 items-end">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment…"
                rows={2}
                className="flex-1 bg-card border border-input rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                data-ocid="video.comment.textarea"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!text.trim()}
                aria-label="Send comment"
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                data-ocid="video.comment.submit_button"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment list */}
      {comments.length === 0 ? (
        <div
          className="text-sm text-muted-foreground py-4 text-center"
          data-ocid="video.comments.empty_state"
        >
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, idx) => {
            const canDelete = isOwner || comment.authorId === currentUserId;
            return (
              <div
                key={comment.id}
                className="flex gap-3 items-start group"
                data-ocid={`video.comment.item.${idx + 1}`}
              >
                <Avatar
                  name={comment.authorName}
                  src={comment.authorAvatarUrl}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {comment.authorName}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed break-words">
                    <CommentText text={comment.content} />
                  </p>
                </div>
                {canDelete && (
                  <div className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === comment.id ? null : comment.id,
                        )
                      }
                      aria-label="Comment options"
                      className="w-7 h-7 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                      data-ocid={`video.comment.menu_button.${idx + 1}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenu === comment.id && (
                      <div
                        className="absolute right-0 top-8 z-10 bg-popover border border-border rounded-lg shadow-elevated py-1 min-w-[120px]"
                        data-ocid={`video.comment.dropdown_menu.${idx + 1}`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteComment(comment.id);
                            setActiveMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                          data-ocid={`video.comment.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Access Denied ────────────────────────────────────────────────────────────

function AccessDenied() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center"
      data-ocid="video.access_denied.page"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        Access Denied
      </h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        This video is private. Only the owner and invited collaborators can view
        it.
      </p>
      <Link
        to="/"
        search={{ q: undefined }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        data-ocid="video.access_denied.back_link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VideoPage() {
  const { id } = useParams({ from: "/video/$id" });
  const navigate = useNavigate();
  const {
    data: video,
    isLoading,
    isError,
    error: videoError,
    refetch,
  } = useVideoById(id);
  const { principalText, isAuthenticated } = useCurrentUser();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor ? patchActorVisibility(rawActor) : null;

  // Local state for editable fields
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<VideoVisibility | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);

  // Comments (local for now, wired to actor once backend is live)
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);

  // Collaborators (local for now)
  const [collaborators, setCollaborators] =
    useState<Collaborator[]>(SEED_COLLABORATORS);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="video.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading video…" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6" data-ocid="video.error_state">
        <EmptyState
          title="Failed to load video"
          description={
            videoError instanceof Error
              ? videoError.message
              : "Something went wrong. Please try again."
          }
          action={
            <Link
              to="/"
              search={{ q: undefined }}
              className="text-primary hover:underline text-sm"
              data-ocid="video.back_link"
            >
              Back to feed
            </Link>
          }
        />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="p-6">
        <EmptyState
          title="Video not found"
          description="This video may have been removed or you don't have permission to view it."
          action={
            <Link
              to="/"
              search={{ q: undefined }}
              className="text-primary hover:underline text-sm"
              data-ocid="video.back_link"
            >
              Back to feed
            </Link>
          }
        />
      </div>
    );
  }

  const currentTitle = title ?? video.title;
  const currentDescription = description ?? video.description;

  // Resolve visibility from local override or video data (fallback to public)
  const rawVisibility = (video as { visibility?: VideoVisibility }).visibility;
  const currentVisibility =
    visibility ?? rawVisibility ?? VideoVisibility.public_;

  // Resolve role
  const myRole = video.myRole ?? null;
  const isOwner = myRole === "owner";
  const canEdit = isOwner || myRole === "editor";
  const isCollaborator = !!myRole;

  // Access control: private — only owner/collaborator; collaboratorsOnly — same
  const isPrivate = currentVisibility === VideoVisibility.private_;
  const isCollaboratorsOnly =
    currentVisibility === VideoVisibility.collaboratorsOnly;

  if ((isPrivate || isCollaboratorsOnly) && !canEdit && !isCollaborator) {
    return <AccessDenied />;
  }

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handlePlay = () => {
    if (viewCounted) return;
    setViewCounted(true);
    // Calling getVideo increments the view count server-side
    if (actor) {
      const numericId = Number(id);
      if (!Number.isNaN(numericId)) {
        actor.getVideo(BigInt(numericId)).catch(() => {
          // Silently ignore — view count increment is best-effort/cosmetic
        });
      }
    }
    // Also refresh so viewCount updates
    refetch();
  };

  const handleSave = async (data: {
    title: string;
    description: string;
    visibility: VideoVisibility;
  }) => {
    // Save original values for rollback
    const prevTitle = title;
    const prevDescription = description;
    const prevVisibility = visibility;

    // Optimistic update
    setTitle(data.title);
    setDescription(data.description);
    setVisibility(data.visibility);
    setIsEditing(false);

    if (actor) {
      const numericId = Number(id);
      if (!Number.isNaN(numericId)) {
        try {
          await actor.updateVideo(BigInt(numericId), {
            title: data.title,
            description: data.description,
            visibility: data.visibility,
          });
          refetch();
        } catch (err) {
          // Roll back optimistic update on failure
          setTitle(prevTitle);
          setDescription(prevDescription);
          setVisibility(prevVisibility);
          setIsEditing(true);
          toast.error(`Failed to save changes: ${getErrorMessage(err)}`);
        }
      }
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setShowDeleteConfirm(false);

    if (!actor) {
      setIsDeleting(false);
      toast.error("Not connected to the backend. Please try again.");
      return;
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      setIsDeleting(false);
      toast.error("Invalid video ID. Cannot delete.");
      return;
    }

    try {
      await actor.deleteVideo(BigInt(numericId));
      toast.success("Video deleted successfully.");
      navigate({ to: "/", search: { q: undefined } });
    } catch (err) {
      setIsDeleting(false);
      toast.error(`Failed to delete video: ${getErrorMessage(err)}`);
    }
  };

  const handleAddComment = async (text: string) => {
    const optimisticComment: Comment = {
      id: `c${Date.now()}`,
      videoId: video.id,
      authorId: principalText ?? "anon",
      authorName: "You",
      content: text,
      createdAt: Date.now(),
    };
    setComments((prev) => [...prev, optimisticComment]);

    if (actor) {
      const numericId = Number(id);
      if (!Number.isNaN(numericId)) {
        try {
          await actor.addComment({
            text,
            timestampSeconds: BigInt(0),
            videoId: BigInt(numericId),
          });
        } catch (err) {
          // Roll back optimistic comment
          setComments((prev) =>
            prev.filter((c) => c.id !== optimisticComment.id),
          );
          toast.error(`Failed to post comment: ${getErrorMessage(err)}`);
        }
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    // Save for rollback
    const prevComments = comments;
    setComments((prev) => prev.filter((c) => c.id !== commentId));

    if (actor) {
      const numericCommentId = Number(commentId.replace(/^c/, ""));
      if (!Number.isNaN(numericCommentId)) {
        try {
          await actor.deleteComment(BigInt(numericCommentId));
        } catch (err) {
          // Roll back comment removal
          setComments(prevComments);
          toast.error(`Failed to delete comment: ${getErrorMessage(err)}`);
        }
      }
    }
  };

  const handleRevokeCollaborator = async (userId: string) => {
    // Save for rollback
    const prevCollaborators = collaborators;
    setCollaborators((prev) => prev.filter((c) => c.userId !== userId));

    if (actor) {
      const numericVideoId = Number(id);
      if (!Number.isNaN(numericVideoId)) {
        try {
          const collab = collaborators.find((c) => c.userId === userId);
          if (collab?.principal) {
            await actor.revokeCollaborator(
              BigInt(numericVideoId),
              collab.principal,
            );
          }
        } catch (err) {
          // Roll back collaborator removal
          setCollaborators(prevCollaborators);
          toast.error(`Failed to remove collaborator: ${getErrorMessage(err)}`);
        }
      }
    }
  };

  const handleInviteCollaborator = async (
    principalId: string,
    role: CollaboratorRole,
  ) => {
    const newCollab: Collaborator = {
      userId: `u_${principalId.slice(0, 6)}`,
      principal: {} as never,
      role,
      displayName: `${principalId.slice(0, 8)}…`,
    };
    setCollaborators((prev) => [...prev, newCollab]);

    if (actor) {
      const numericVideoId = Number(id);
      if (!Number.isNaN(numericVideoId)) {
        try {
          const { Principal } = await import("@icp-sdk/core/principal");
          const inviteePrincipal = Principal.fromText(principalId);
          // Map local role to backend CollaboratorRole enum
          const { CollaboratorRole: BackendRole } = await import("@/backend");
          const backendRole =
            role === "editor" ? BackendRole.editor : BackendRole.viewer;
          await actor.inviteCollaborator(
            BigInt(numericVideoId),
            inviteePrincipal,
            backendRole,
          );
        } catch (err) {
          // Roll back optimistic collaborator add
          setCollaborators((prev) =>
            prev.filter((c) => c.userId !== newCollab.userId),
          );
          toast.error(`Failed to invite collaborator: ${getErrorMessage(err)}`);
        }
      }
    }
  };

  return (
    <>
      {showDeleteConfirm && (
        <DeleteConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      <div
        className="px-4 lg:px-6 py-6 max-w-6xl mx-auto"
        data-ocid="video.page"
      >
        {/* Back */}
        <Link
          to="/"
          search={{ q: undefined }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          data-ocid="video.back_link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to feed
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          {/* ─── Left Column ─────────────────────────────────────── */}
          <div className="space-y-5 min-w-0">
            {/* Video Player */}
            <VideoPlayer
              videoUrl={(video as { videoUrl?: string }).videoUrl ?? ""}
              thumbnailUrl={video.thumbnailUrl}
              title={currentTitle}
              onPlay={handlePlay}
            />

            {/* Title + Actions */}
            <div className="space-y-3">
              {!isEditing ? (
                <div className="flex items-start gap-3">
                  <h1 className="font-display text-xl lg:text-2xl font-bold text-foreground flex-1 min-w-0 leading-tight">
                    {currentTitle}
                  </h1>
                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit video"
                        className="w-8 h-8 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                        data-ocid="video.edit_button"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        aria-label="Delete video"
                        disabled={isDeleting}
                        className="w-8 h-8 rounded-lg bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center disabled:opacity-50"
                        data-ocid="video.delete_button"
                      >
                        {isDeleting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <EditForm
                  title={currentTitle}
                  description={currentDescription}
                  visibility={currentVisibility}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              )}

              {/* Meta row */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={video.uploaderName}
                    src={video.uploaderAvatarUrl}
                    size="md"
                  />
                  <div>
                    <Link
                      to="/profile/$userId"
                      params={{ userId: video.uploaderId }}
                      className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                      data-ocid="video.uploader_link"
                    >
                      {video.uploaderName}
                    </Link>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeDate(video.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {/* Visibility badge */}
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
                      currentVisibility === VideoVisibility.public_
                        ? "bg-primary/10 text-primary border-primary/30"
                        : currentVisibility ===
                            VideoVisibility.collaboratorsOnly
                          ? "bg-accent/20 text-accent-foreground border-accent/30"
                          : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    <VisibilityIcon v={currentVisibility} />
                    {visibilityLabel(currentVisibility)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {formatCount(video.viewCount)}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    data-ocid="video.share_button"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Badges row */}
              <div className="flex items-center gap-2 flex-wrap">
                {myRole && <RoleBadge role={myRole} />}
                {video.aiTool && (
                  <Badge variant="ai-tool">
                    <Sparkles className="w-3 h-3" />
                    {video.aiTool}
                  </Badge>
                )}
                {formatVideoTimestamp(video.duration) && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    <Clock className="w-3 h-3" />
                    {formatVideoTimestamp(video.duration)}
                  </span>
                )}
              </div>

              {/* Description (not in edit mode) */}
              {!isEditing && (
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {currentDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Comments */}
            <div className="bg-card rounded-xl border border-border p-4">
              <CommentsSection
                comments={comments}
                currentUserId={isAuthenticated ? (principalText ?? null) : null}
                isOwner={isOwner}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>

          {/* ─── Right Column ─────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Collaboration Panel */}
            <CollabPanel
              collaborators={collaborators}
              isOwner={isOwner}
              onRevoke={handleRevokeCollaborator}
              onInvite={handleInviteCollaborator}
            />

            {/* Video info card */}
            <div className="bg-card rounded-xl border border-border p-4 space-y-3">
              <h3 className="font-display font-semibold text-sm text-foreground">
                Video Info
              </h3>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Uploaded</dt>
                  <dd className="text-foreground font-medium text-right">
                    {formatRelativeDate(video.createdAt)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Views</dt>
                  <dd className="text-foreground font-medium">
                    {formatCount(video.viewCount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="text-foreground font-medium">
                    {formatVideoTimestamp(video.duration)}
                  </dd>
                </div>
                {video.aiTool && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">AI Tool</dt>
                    <dd className="text-foreground font-medium">
                      {video.aiTool}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Visibility</dt>
                  <dd className="text-foreground font-medium">
                    {visibilityLabel(currentVisibility)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
