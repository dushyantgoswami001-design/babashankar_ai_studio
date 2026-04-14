import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  Clock,
  Link as LinkIcon,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar } from "../components/Avatar";
import { RoleBadge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { CollaboratorRole } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PendingInvitation {
  id: string;
  from: string;
  videoTitle: string;
  role: CollaboratorRole;
  sentAt: number;
  message?: string;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_INVITATIONS: PendingInvitation[] = [
  {
    id: "i1",
    from: "Chloe L.",
    videoTitle: "Data-Driven Marketing Video v4",
    role: "editor",
    sentAt: Date.now() - 3600000 * 2,
    message: "Would love your creative input on the color grading section!",
  },
  {
    id: "i2",
    from: "Ben W.",
    videoTitle: "Neural Style Transfer — Season 2",
    role: "viewer",
    sentAt: Date.now() - 86400000,
  },
  {
    id: "i3",
    from: "Team Alpha",
    videoTitle: "Generative Landscape Series",
    role: "editor",
    sentAt: Date.now() - 86400000 * 2,
    message: "Bringing you in to help finalize the last 3 scenes.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 3600000) return `${Math.round(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.round(diff / 3600000)}h ago`;
  return `${Math.round(diff / 86400000)}d ago`;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function usePendingInvitations() {
  return useQuery<PendingInvitation[]>({
    queryKey: ["pendingInvitations"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return SEED_INVITATIONS;
    },
    staleTime: 30_000,
  });
}

function useInvitationById(id: string | undefined) {
  return useQuery<PendingInvitation | null>({
    queryKey: ["invitation", id],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return SEED_INVITATIONS.find((inv) => inv.id === id) ?? null;
    },
    enabled: !!id,
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InvitationCardProps {
  invitation: PendingInvitation;
  index: number;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isAccepting: boolean;
  isDeclining: boolean;
  highlight?: boolean;
}

function InvitationCard({
  invitation,
  index,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
  highlight = false,
}: InvitationCardProps) {
  return (
    <div
      className={`bg-card border rounded-2xl p-5 space-y-4 transition-smooth ${
        highlight
          ? "border-primary/50 shadow-elevated ring-1 ring-primary/20"
          : "border-border hover:border-primary/30"
      }`}
      data-ocid={`invite.pending_item.${index}`}
    >
      <div className="flex items-start gap-3">
        <Avatar name={invitation.from} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">
              {invitation.from}
            </p>
            <RoleBadge role={invitation.role} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            invited you to collaborate on
          </p>
          <p className="text-sm font-medium text-foreground mt-1 line-clamp-1">
            {invitation.videoTitle}
          </p>
          {invitation.message && (
            <p className="text-xs text-muted-foreground mt-2 p-2.5 rounded-lg bg-muted/60 italic border-l-2 border-primary/30">
              "{invitation.message}"
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {timeAgo(invitation.sentAt)}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onDecline(invitation.id)}
          disabled={isDeclining || isAccepting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-smooth disabled:opacity-50"
          data-ocid={`invite.decline_button.${index}`}
        >
          {isDeclining ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
          Decline
        </button>
        <button
          type="button"
          onClick={() => onAccept(invitation.id)}
          disabled={isAccepting || isDeclining}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50"
          data-ocid={`invite.accept_button.${index}`}
        >
          {isAccepting ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          Accept
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function InvitePage() {
  const { isAuthenticated, login } = useCurrentUser();
  const queryClient = useQueryClient();

  // Parse ?invitation= query param
  const search = useSearch({ strict: false }) as Record<string, unknown>;
  const invitationId =
    typeof search.invitation === "string" ? search.invitation : undefined;

  const { data: allInvitations = [], isLoading } = usePendingInvitations();
  const { data: spotlightInvitation, isLoading: isLoadingSpotlight } =
    useInvitationById(invitationId);

  const [actionState, setActionState] = useState<{
    id: string;
    action: "accept" | "decline";
  } | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const acceptMutation = useMutation({
    mutationFn: async (id: string) => {
      setActionState({ id, action: "accept" });
      await new Promise((r) => setTimeout(r, 600));
      return id;
    },
    onSuccess: (id) => {
      setResolvedIds((prev) => new Set([...prev, id]));
      setActionState(null);
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error
          ? `Failed to accept invitation: ${err.message}`
          : "Failed to accept invitation. Please try again.",
      );
      setActionState(null);
    },
  });

  const declineMutation = useMutation({
    mutationFn: async (id: string) => {
      setActionState({ id, action: "decline" });
      await new Promise((r) => setTimeout(r, 600));
      return id;
    },
    onSuccess: (id) => {
      setResolvedIds((prev) => new Set([...prev, id]));
      setActionState(null);
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error
          ? `Failed to decline invitation: ${err.message}`
          : "Failed to decline invitation. Please try again.",
      );
      setActionState(null);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
        <Users className="w-12 h-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Collaboration Invitations
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Sign in to view and respond to your collaboration invitations.
          </p>
        </div>
        <button
          type="button"
          onClick={login}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
          data-ocid="invite.login_button"
        >
          Sign in
        </button>
      </div>
    );
  }

  const visibleInvitations = allInvitations.filter(
    (inv) => !resolvedIds.has(inv.id),
  );

  // If we have a spotlight invitation from the URL param, filter it out from the list to avoid duplication
  const listInvitations = invitationId
    ? visibleInvitations.filter((inv) => inv.id !== invitationId)
    : visibleInvitations;

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto" data-ocid="invite.page">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Invitations
          {visibleInvitations.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-sm font-bold">
              {visibleInvitations.length}
            </span>
          )}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Respond to collaboration invitations for AI video projects
        </p>
      </div>

      {/* Spotlight invitation (from URL ?invitation=) */}
      {invitationId && (
        <section data-ocid="invite.spotlight_section">
          <div className="flex items-center gap-2 mb-3">
            <LinkIcon className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Invitation via Link
            </h2>
          </div>

          {isLoadingSpotlight ? (
            <div
              className="flex items-center justify-center py-10 bg-card border border-border rounded-2xl"
              data-ocid="invite.spotlight_loading_state"
            >
              <LoadingSpinner size="md" label="Loading invitation…" />
            </div>
          ) : spotlightInvitation &&
            !resolvedIds.has(spotlightInvitation.id) ? (
            <InvitationCard
              invitation={spotlightInvitation}
              index={0}
              onAccept={(id) => acceptMutation.mutate(id)}
              onDecline={(id) => declineMutation.mutate(id)}
              isAccepting={
                actionState?.id === spotlightInvitation.id &&
                actionState.action === "accept"
              }
              isDeclining={
                actionState?.id === spotlightInvitation.id &&
                actionState.action === "decline"
              }
              highlight
            />
          ) : resolvedIds.has(invitationId) ? (
            <div
              className="bg-card border border-border rounded-2xl p-6 flex items-center gap-3 text-sm"
              data-ocid="invite.spotlight_success_state"
            >
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground">
                You've already responded to this invitation.
              </span>
            </div>
          ) : (
            <div
              className="bg-card border border-border rounded-2xl p-6 flex items-center gap-3 text-sm"
              data-ocid="invite.spotlight_error_state"
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <span className="text-muted-foreground">
                This invitation was not found or has already expired.
              </span>
            </div>
          )}
        </section>
      )}

      {/* All pending invitations */}
      <section data-ocid="invite.pending_section">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-accent" />
          <h2 className="font-display font-semibold text-foreground">
            {invitationId ? "Other Pending Invitations" : "Pending Invitations"}
          </h2>
        </div>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-12 bg-card border border-border rounded-2xl"
            data-ocid="invite.pending_loading_state"
          >
            <LoadingSpinner size="md" label="Loading invitations…" />
          </div>
        ) : listInvitations.length === 0 ? (
          <EmptyState
            title="No pending invitations"
            description="You'll see collaboration invitations here when someone invites you to their AI video project."
          />
        ) : (
          <div className="space-y-3" data-ocid="invite.pending_list">
            {listInvitations.map((inv, i) => (
              <InvitationCard
                key={inv.id}
                invitation={inv}
                index={i + 1}
                onAccept={(id) => acceptMutation.mutate(id)}
                onDecline={(id) => declineMutation.mutate(id)}
                isAccepting={
                  actionState?.id === inv.id && actionState.action === "accept"
                }
                isDeclining={
                  actionState?.id === inv.id && actionState.action === "decline"
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
