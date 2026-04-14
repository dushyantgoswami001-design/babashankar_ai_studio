import { c as createLucideIcon, b as useCurrentUser, j as jsxRuntimeExports, f as Link, P as Plus, L as LoadingSpinner, g as Users } from "./index-BWY2Fo0g.js";
import { C as CollaboratorRole } from "./backend-C7xtEXGZ.js";
import { E as EmptyState } from "./Badge-CBC1GBDU.js";
import { V as VideoCard, P as Play } from "./VideoCard-DZDvti-w.js";
import { a as useMyVideos, b as usePendingInvitations, c as useAcceptInvitation, d as useDeclineInvitation } from "./useDashboard-DY5h3ezZ.js";
import { T as TrendingUp } from "./trending-up-DuHH9yGM.js";
import { F as Film } from "./film-DGFsL5Y6.js";
import { C as CircleCheck } from "./circle-check-DwaqEsQv.js";
import { G as Globe } from "./globe-OGSLdOk0.js";
import "./sparkles-CJZKJvRw.js";
import "./useMutation-CUXAg1RN.js";
import "./index-JwsgApHh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }]
];
const LockKeyhole = createLucideIcon("lock-keyhole", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
];
const MailOpen = createLucideIcon("mail-open", __iconNode);
function adaptBackendVideo(v, myName) {
  var _a;
  return {
    id: v.id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: ((_a = v.thumbnailBlob) == null ? void 0 : _a.getDirectURL()) ?? "",
    duration: Number(v.durationSeconds),
    viewCount: Number(v.viewCount),
    likeCount: 0,
    commentCount: 0,
    uploaderName: myName,
    uploaderId: v.uploaderId.toString(),
    status: "published",
    myRole: "owner",
    createdAt: Number(v.createdAt),
    updatedAt: Number(v.createdAt)
  };
}
const SEED_MY_VIDEOS = [
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
    createdAt: Date.now() - 864e5 * 2,
    updatedAt: Date.now() - 864e5 * 2
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
    createdAt: Date.now() - 864e5 * 4,
    updatedAt: Date.now() - 864e5 * 4
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
    createdAt: Date.now() - 864e5,
    updatedAt: Date.now() - 864e5
  }
];
const SEED_INVITATIONS = [
  {
    id: "inv1",
    videoTitle: "Generative Landscape Series — Episode 4",
    inviterName: "Chloe L.",
    role: "editor",
    rawId: null
  },
  {
    id: "inv2",
    videoTitle: "Real-Time MoCap Workflow v2",
    inviterName: "Team Beta",
    role: "viewer",
    rawId: null
  }
];
function MyVideoCard({ video, index }) {
  const isDraft = video.status === "draft";
  const statusBadge = isDraft ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "w-2.5 h-2.5" }),
    "Draft"
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-2.5 h-2.5" }),
    "Published"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": `dashboard.my_videos.item.${index}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[10px] left-2 z-10 pointer-events-none", children: statusBadge })
  ] });
}
function InvitationRow({
  title,
  inviterName,
  role,
  index,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining
}) {
  const roleColor = role === "editor" ? "bg-accent/10 text-accent border-accent/30" : "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/20 transition-smooth",
      "data-ocid": `dashboard.invitations.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-primary fill-primary/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "from",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 font-medium", children: inviterName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${roleColor}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-2.5 h-2.5" }),
                  role === "editor" ? "Editor" : "Viewer"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onAccept,
              disabled: isAccepting || isDeclining,
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth",
              "data-ocid": `dashboard.invitations.accept_button.${index}`,
              children: [
                isAccepting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                "Accept"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onDecline,
              disabled: isAccepting || isDeclining,
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth",
              "data-ocid": `dashboard.invitations.decline_button.${index}`,
              children: [
                isDeclining ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                "Decline"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DashboardPage() {
  const { isAuthenticated, login, principalText } = useCurrentUser();
  const { data: backendVideos, isLoading: videosLoading } = useMyVideos(isAuthenticated);
  const { data: backendInvitations, isLoading: invitationsLoading } = usePendingInvitations(isAuthenticated);
  const { mutateAsync: accept, isPending: isAccepting } = useAcceptInvitation();
  const { mutateAsync: decline, isPending: isDeclining } = useDeclineInvitation();
  const videos = backendVideos && backendVideos.length > 0 ? backendVideos.map((v) => adaptBackendVideo(v, "You")) : SEED_MY_VIDEOS;
  const invitations = backendInvitations && backendInvitations.length > 0 ? backendInvitations.map((inv) => ({
    id: inv.id.toString(),
    videoTitle: `Video #${inv.videoId}`,
    inviterName: `${inv.inviterId.toString().slice(0, 8)}…`,
    role: inv.role === CollaboratorRole.editor ? "editor" : "viewer",
    rawId: inv.id
  })) : SEED_INVITATIONS;
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Your Creator Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm", children: "Sign in to manage your AI videos, track performance, and collaborate with others." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: login,
          className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth",
          "data-ocid": "dashboard.login_button",
          children: "Sign in with Internet Identity"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-10 max-w-7xl mx-auto",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-primary" }),
              "My Studio"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage your AI videos and collaborations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/upload",
              className: "flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle",
              "data-ocid": "dashboard.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "New Video"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.my_videos_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-primary" }),
              "My Videos",
              videos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-primary/10 text-primary", children: videos.length })
            ] }),
            principalText && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/profile/$userId",
                params: { userId: "me" },
                className: "text-xs text-primary hover:underline transition-colors",
                "data-ocid": "dashboard.view_profile_link",
                children: "View public profile →"
              }
            )
          ] }),
          videosLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-16",
              "data-ocid": "dashboard.my_videos.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading your videos…" })
            }
          ) : videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.my_videos.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-7 h-7" }),
              title: "No videos yet",
              description: "Upload your first AI-generated video and start building your portfolio.",
              action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/upload",
                  className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth",
                  "data-ocid": "dashboard.upload_cta_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Upload a video"
                  ]
                }
              )
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MyVideoCard, { video, index: i + 1 }, video.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.invitations_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "w-4 h-4 text-accent" }),
              "Pending Invitations",
              invitations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-accent/10 text-accent", children: invitations.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Collaboration requests from other creators" })
          ] }),
          invitationsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-12",
              "data-ocid": "dashboard.invitations.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading invitations…" })
            }
          ) : invitations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.invitations.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "w-7 h-7" }),
              title: "No pending invitations",
              description: "When someone invites you to collaborate on their video, it will appear here."
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: invitations.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvitationRow,
            {
              title: inv.videoTitle,
              inviterName: inv.inviterName,
              role: inv.role,
              index: i + 1,
              isAccepting,
              isDeclining,
              onAccept: async () => {
                if (inv.rawId != null) await accept(inv.rawId);
              },
              onDecline: async () => {
                if (inv.rawId != null) await decline(inv.rawId);
              }
            },
            inv.id
          )) })
        ] })
      ]
    }
  );
}
export {
  DashboardPage as default
};
