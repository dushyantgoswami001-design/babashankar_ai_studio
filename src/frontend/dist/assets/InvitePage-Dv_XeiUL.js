import { c as createLucideIcon, b as useCurrentUser, u as useQueryClient, e as useSearch, r as reactExports, j as jsxRuntimeExports, g as Users, L as LoadingSpinner, a as useQuery, A as Avatar, X } from "./index-BWY2Fo0g.js";
import { u as useMutation } from "./useMutation-CUXAg1RN.js";
import { u as ue } from "./index-JwsgApHh.js";
import { E as EmptyState, R as RoleBadge } from "./Badge-CBC1GBDU.js";
import { C as Check } from "./check-BbqLAGz-.js";
import { C as CircleAlert } from "./circle-alert-UMMsptV2.js";
import { C as Clock } from "./clock-CEGmJBdo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode);
const SEED_INVITATIONS = [
  {
    id: "i1",
    from: "Chloe L.",
    videoTitle: "Data-Driven Marketing Video v4",
    role: "editor",
    sentAt: Date.now() - 36e5 * 2,
    message: "Would love your creative input on the color grading section!"
  },
  {
    id: "i2",
    from: "Ben W.",
    videoTitle: "Neural Style Transfer — Season 2",
    role: "viewer",
    sentAt: Date.now() - 864e5
  },
  {
    id: "i3",
    from: "Team Alpha",
    videoTitle: "Generative Landscape Series",
    role: "editor",
    sentAt: Date.now() - 864e5 * 2,
    message: "Bringing you in to help finalize the last 3 scenes."
  }
];
function timeAgo(ts) {
  const diff = Date.now() - ts;
  if (diff < 36e5) return `${Math.round(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.round(diff / 36e5)}h ago`;
  return `${Math.round(diff / 864e5)}d ago`;
}
function usePendingInvitations() {
  return useQuery({
    queryKey: ["pendingInvitations"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return SEED_INVITATIONS;
    },
    staleTime: 3e4
  });
}
function useInvitationById(id) {
  return useQuery({
    queryKey: ["invitation", id],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return SEED_INVITATIONS.find((inv) => inv.id === id) ?? null;
    },
    enabled: !!id
  });
}
function InvitationCard({
  invitation,
  index,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-2xl p-5 space-y-4 transition-smooth ${highlight ? "border-primary/50 shadow-elevated ring-1 ring-primary/20" : "border-border hover:border-primary/30"}`,
      "data-ocid": `invite.pending_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: invitation.from, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: invitation.from }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: invitation.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "invited you to collaborate on" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-1 line-clamp-1", children: invitation.videoTitle }),
            invitation.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 p-2.5 rounded-lg bg-muted/60 italic border-l-2 border-primary/30", children: [
              '"',
              invitation.message,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: timeAgo(invitation.sentAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onDecline(invitation.id),
              disabled: isDeclining || isAccepting,
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-smooth disabled:opacity-50",
              "data-ocid": `invite.decline_button.${index}`,
              children: [
                isDeclining ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                "Decline"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onAccept(invitation.id),
              disabled: isAccepting || isDeclining,
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50",
              "data-ocid": `invite.accept_button.${index}`,
              children: [
                isAccepting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                "Accept"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function InvitePage() {
  const { isAuthenticated, login } = useCurrentUser();
  const queryClient = useQueryClient();
  const search = useSearch({ strict: false });
  const invitationId = typeof search.invitation === "string" ? search.invitation : void 0;
  const { data: allInvitations = [], isLoading } = usePendingInvitations();
  const { data: spotlightInvitation, isLoading: isLoadingSpotlight } = useInvitationById(invitationId);
  const [actionState, setActionState] = reactExports.useState(null);
  const [resolvedIds, setResolvedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      setActionState({ id, action: "accept" });
      await new Promise((r) => setTimeout(r, 600));
      return id;
    },
    onSuccess: (id) => {
      setResolvedIds((prev) => /* @__PURE__ */ new Set([...prev, id]));
      setActionState(null);
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      ue.error(
        err instanceof Error ? `Failed to accept invitation: ${err.message}` : "Failed to accept invitation. Please try again."
      );
      setActionState(null);
    }
  });
  const declineMutation = useMutation({
    mutationFn: async (id) => {
      setActionState({ id, action: "decline" });
      await new Promise((r) => setTimeout(r, 600));
      return id;
    },
    onSuccess: (id) => {
      setResolvedIds((prev) => /* @__PURE__ */ new Set([...prev, id]));
      setActionState(null);
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      ue.error(
        err instanceof Error ? `Failed to decline invitation: ${err.message}` : "Failed to decline invitation. Please try again."
      );
      setActionState(null);
    }
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Collaboration Invitations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Sign in to view and respond to your collaboration invitations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: login,
          className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth",
          "data-ocid": "invite.login_button",
          children: "Sign in"
        }
      )
    ] });
  }
  const visibleInvitations = allInvitations.filter(
    (inv) => !resolvedIds.has(inv.id)
  );
  const listInvitations = invitationId ? visibleInvitations.filter((inv) => inv.id !== invitationId) : visibleInvitations;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8 max-w-2xl mx-auto", "data-ocid": "invite.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }),
        "Invitations",
        visibleInvitations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-sm font-bold", children: visibleInvitations.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Respond to collaboration invitations for AI video projects" })
    ] }),
    invitationId && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "invite.spotlight_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Invitation via Link" })
      ] }),
      isLoadingSpotlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-10 bg-card border border-border rounded-2xl",
          "data-ocid": "invite.spotlight_loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading invitation…" })
        }
      ) : spotlightInvitation && !resolvedIds.has(spotlightInvitation.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvitationCard,
        {
          invitation: spotlightInvitation,
          index: 0,
          onAccept: (id) => acceptMutation.mutate(id),
          onDecline: (id) => declineMutation.mutate(id),
          isAccepting: (actionState == null ? void 0 : actionState.id) === spotlightInvitation.id && actionState.action === "accept",
          isDeclining: (actionState == null ? void 0 : actionState.id) === spotlightInvitation.id && actionState.action === "decline",
          highlight: true
        }
      ) : resolvedIds.has(invitationId) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-6 flex items-center gap-3 text-sm",
          "data-ocid": "invite.spotlight_success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "You've already responded to this invitation." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-6 flex items-center gap-3 text-sm",
          "data-ocid": "invite.spotlight_error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "This invitation was not found or has already expired." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "invite.pending_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: invitationId ? "Other Pending Invitations" : "Pending Invitations" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-12 bg-card border border-border rounded-2xl",
          "data-ocid": "invite.pending_loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading invitations…" })
        }
      ) : listInvitations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No pending invitations",
          description: "You'll see collaboration invitations here when someone invites you to their AI video project."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "invite.pending_list", children: listInvitations.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvitationCard,
        {
          invitation: inv,
          index: i + 1,
          onAccept: (id) => acceptMutation.mutate(id),
          onDecline: (id) => declineMutation.mutate(id),
          isAccepting: (actionState == null ? void 0 : actionState.id) === inv.id && actionState.action === "accept",
          isDeclining: (actionState == null ? void 0 : actionState.id) === inv.id && actionState.action === "decline"
        },
        inv.id
      )) })
    ] })
  ] });
}
export {
  InvitePage as default
};
