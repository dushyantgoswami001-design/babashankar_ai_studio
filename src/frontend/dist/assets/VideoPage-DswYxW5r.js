const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-B7J2iqaB.js","assets/backend-C7xtEXGZ.js","assets/index-BWY2Fo0g.js","assets/index-DMZOajWp.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, p as useParams, d as useNavigate, b as useCurrentUser, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, f as Link, A as Avatar, _ as __vitePreload, g as Users, X, P as Plus } from "./index-BWY2Fo0g.js";
import { u as useActor, V as VideoVisibility, c as createActor } from "./backend-C7xtEXGZ.js";
import { p as patchActorVisibility } from "./actorPatch-DtSQKDCY.js";
import { u as ue } from "./index-JwsgApHh.js";
import { E as EmptyState, R as RoleBadge, B as Badge } from "./Badge-CBC1GBDU.js";
import { a as useVideoById } from "./index-B7J2iqaB.js";
import { A as ArrowLeft } from "./arrow-left-qu1d3muw.js";
import { P as Pen, T as Trash2 } from "./trash-2-UEuOYA5s.js";
import { C as Clock } from "./clock-CEGmJBdo.js";
import { E as Eye, S as Sparkles, M as MessageCircle } from "./sparkles-CJZKJvRw.js";
import { L as Lock } from "./lock-BIsBLHgl.js";
import { C as CircleAlert } from "./circle-alert-UMMsptV2.js";
import { G as Globe } from "./globe-OGSLdOk0.js";
import { C as Check } from "./check-BbqLAGz-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function formatCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
  return n.toString();
}
function formatRelativeDate(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
function formatVideoTimestamp(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function getErrorMessage(err) {
  return err instanceof Error ? err.message : String(err);
}
const SEED_COMMENTS = [
  {
    id: "c1",
    videoId: "v1",
    authorId: "u2",
    authorName: "Chloe L.",
    content: "The lighting at 0:23 is unreal. What parameters did you use for the depth pass?",
    createdAt: Date.now() - 36e5 * 5
  },
  {
    id: "c2",
    videoId: "v1",
    authorId: "u3",
    authorName: "AI Lab",
    content: "Incredible work. The motion blur at 1:07 is super convincing — Sora keeps improving!",
    createdAt: Date.now() - 36e5 * 3
  },
  {
    id: "c3",
    videoId: "v1",
    authorId: "u4",
    authorName: "Ben W.",
    content: "This is a great reference for my upcoming project at 0:45. Bookmarking!",
    createdAt: Date.now() - 36e5
  }
];
const SEED_COLLABORATORS = [
  {
    userId: "u5",
    principal: {},
    role: "editor",
    displayName: "Mike S.",
    avatarUrl: void 0
  },
  {
    userId: "u7",
    principal: {},
    role: "viewer",
    displayName: "Priya N.",
    avatarUrl: void 0
  }
];
function CommentText({ text }) {
  const parts = text.split(/(\d+:\d{2})/g);
  let counter = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parts.map((part) => {
    counter += 1;
    const uid = `${part}-${counter}`;
    return /^\d+:\d{2}$/.test(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-primary font-medium cursor-pointer hover:underline",
        children: part
      },
      uid
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, uid);
  }) });
}
function DeleteConfirmDialog({
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
      "data-ocid": "video.delete_confirm.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-elevated space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This action is permanent and cannot be undone. The video will be removed for all collaborators." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
              "data-ocid": "video.delete_confirm.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onConfirm,
              className: "px-4 py-2 text-sm font-medium rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors",
              "data-ocid": "video.delete_confirm.confirm_button",
              children: "Delete Video"
            }
          )
        ] })
      ] })
    }
  );
}
function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title,
  onPlay
}) {
  const videoRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden bg-black border border-border shadow-elevated aspect-video relative group", children: videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "video",
    {
      ref: videoRef,
      src: videoUrl,
      poster: thumbnailUrl,
      controls: true,
      className: "w-full h-full object-contain",
      onPlay: () => {
        setPlaying(true);
        onPlay == null ? void 0 : onPlay();
      },
      onPause: () => setPlaying(false),
      "data-ocid": "video.player",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }),
        "Your browser does not support the video tag."
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: thumbnailUrl,
        alt: `Thumbnail for ${title}`,
        className: "w-full h-full object-cover"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handlePlay,
        "aria-label": "Play video",
        className: "w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-elevated hover:scale-110 transition-smooth",
        "data-ocid": "video.play_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            viewBox: "0 0 24 24",
            className: "w-9 h-9 text-primary-foreground fill-current ml-1",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" })
          }
        )
      }
    ) })
  ] }) });
}
function visibilityLabel(v) {
  if (v === VideoVisibility.public_) return "Public";
  if (v === VideoVisibility.collaboratorsOnly) return "Collaborators Only";
  return "Private";
}
function VisibilityIcon({ v }) {
  if (v === VideoVisibility.public_) return /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" });
  if (v === VideoVisibility.collaboratorsOnly)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" });
}
function EditForm({
  title,
  description,
  visibility,
  onSave,
  onCancel
}) {
  const [editTitle, setEditTitle] = reactExports.useState(title);
  const [editDesc, setEditDesc] = reactExports.useState(description);
  const [editVisibility, setEditVisibility] = reactExports.useState(visibility);
  const visibilityOptions = [
    {
      value: VideoVisibility.public_,
      label: "Public",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
      ocid: "video.edit.visibility_public"
    },
    {
      value: VideoVisibility.collaboratorsOnly,
      label: "Collaborators Only",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
      ocid: "video.edit.visibility_collaborators"
    },
    {
      value: VideoVisibility.private_,
      label: "Private",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
      ocid: "video.edit.visibility_private"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-primary/30 rounded-xl p-4 space-y-4",
      "data-ocid": "video.edit.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Edit Video Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-xs font-medium text-muted-foreground mb-1 block",
                htmlFor: "edit-title",
                children: "Title"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-title",
                type: "text",
                value: editTitle,
                onChange: (e) => setEditTitle(e.target.value),
                className: "w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                "data-ocid": "video.edit.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-xs font-medium text-muted-foreground mb-1 block",
                htmlFor: "edit-desc",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "edit-desc",
                value: editDesc,
                onChange: (e) => setEditDesc(e.target.value),
                rows: 3,
                className: "w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none",
                "data-ocid": "video.edit.description_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mb-2 block", children: "Visibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: visibilityOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setEditVisibility(opt.value),
                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${editVisibility === opt.value ? "bg-primary/20 border-primary/50 text-primary" : "bg-secondary border-border text-muted-foreground hover:bg-secondary/70"}`,
                "data-ocid": opt.ocid,
                children: [
                  opt.icon,
                  " ",
                  opt.label
                ]
              },
              opt.ocid
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
              "data-ocid": "video.edit.cancel_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                " Cancel"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onSave({
                title: editTitle,
                description: editDesc,
                visibility: editVisibility
              }),
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
              "data-ocid": "video.edit.save_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                " Save Changes"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CollabPanel({
  collaborators,
  isOwner,
  onRevoke,
  onInvite
}) {
  const [showInvite, setShowInvite] = reactExports.useState(false);
  const [invitePrincipal, setInvitePrincipal] = reactExports.useState("");
  const [inviteRole, setInviteRole] = reactExports.useState("editor");
  const [inviteError, setInviteError] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border p-4 space-y-4",
      "data-ocid": "video.collab.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
            "Collaborators",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
              "(",
              collaborators.length,
              ")"
            ] })
          ] }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowInvite(!showInvite),
              className: "flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors",
              "data-ocid": "video.collab.invite_toggle_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                "Invite"
              ]
            }
          )
        ] }),
        isOwner && showInvite && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-background rounded-lg p-3 border border-border space-y-3",
            "data-ocid": "video.collab.invite_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Invite by Principal ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. aaaaa-aa or rdmx6-jaaaa-…",
                  value: invitePrincipal,
                  onChange: (e) => {
                    setInvitePrincipal(e.target.value);
                    setInviteError("");
                  },
                  className: "w-full bg-card border border-input rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors font-mono",
                  "data-ocid": "video.collab.invite_principal_input"
                }
              ),
              inviteError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "video.collab.invite.field_error",
                  children: inviteError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: inviteRole,
                    onChange: (e) => setInviteRole(e.target.value),
                    className: "flex-1 bg-card border border-input rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "video.collab.invite_role_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "Editor" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "Viewer" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleInvite,
                    className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                    "data-ocid": "video.collab.invite_submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                      " Add"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        collaborators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-muted-foreground py-2",
            "data-ocid": "video.collab.empty_state",
            children: "No collaborators yet. Invite someone to get started."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: collaborators.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-2 py-1.5",
            "data-ocid": `video.collab.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: c.displayName, src: c.avatarUrl, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: c.displayName }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: c.role }),
                isOwner && c.role !== "owner" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRevoke(c.userId),
                    "aria-label": `Remove ${c.displayName}`,
                    className: "w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                    "data-ocid": `video.collab.revoke_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ]
          },
          c.userId
        )) })
      ]
    }
  );
}
function CommentsSection({
  comments,
  currentUserId,
  isOwner,
  onAddComment,
  onDeleteComment
}) {
  const [text, setText] = reactExports.useState("");
  const [activeMenu, setActiveMenu] = reactExports.useState(null);
  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "video.comments.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-primary" }),
      "Comments",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
        "(",
        comments.length,
        ")"
      ] })
    ] }),
    currentUserId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 items-start",
        "data-ocid": "video.comment.add_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: "Me", size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: text,
                onChange: (e) => setText(e.target.value),
                placeholder: "Add a comment…",
                rows: 2,
                className: "flex-1 bg-card border border-input rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none",
                onKeyDown: (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                },
                "data-ocid": "video.comment.textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSubmit,
                disabled: !text.trim(),
                "aria-label": "Send comment",
                className: "w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0",
                "data-ocid": "video.comment.submit_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ]
      }
    ),
    comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-sm text-muted-foreground py-4 text-center",
        "data-ocid": "video.comments.empty_state",
        children: "No comments yet. Be the first to share your thoughts!"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: comments.map((comment, idx) => {
      const canDelete = isOwner || comment.authorId === currentUserId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-3 items-start group",
          "data-ocid": `video.comment.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                name: comment.authorName,
                src: comment.authorAvatarUrl,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: comment.authorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  formatRelativeDate(comment.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed break-words", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentText, { text: comment.content }) })
            ] }),
            canDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveMenu(
                    activeMenu === comment.id ? null : comment.id
                  ),
                  "aria-label": "Comment options",
                  className: "w-7 h-7 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted transition-all",
                  "data-ocid": `video.comment.menu_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" })
                }
              ),
              activeMenu === comment.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute right-0 top-8 z-10 bg-popover border border-border rounded-lg shadow-elevated py-1 min-w-[120px]",
                  "data-ocid": `video.comment.dropdown_menu.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        onDeleteComment(comment.id);
                        setActiveMenu(null);
                      },
                      className: "flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors",
                      "data-ocid": `video.comment.delete_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                        "Delete"
                      ]
                    }
                  )
                }
              )
            ] })
          ]
        },
        comment.id
      );
    }) })
  ] });
}
function AccessDenied() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[60vh] p-6 text-center",
      "data-ocid": "video.access_denied.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Access Denied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: "This video is private. Only the owner and invited collaborators can view it." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            search: { q: void 0 },
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors",
            "data-ocid": "video.access_denied.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Feed"
            ]
          }
        )
      ]
    }
  );
}
function VideoPage() {
  const { id } = useParams({ from: "/video/$id" });
  const navigate = useNavigate();
  const {
    data: video,
    isLoading,
    isError,
    error: videoError,
    refetch
  } = useVideoById(id);
  const { principalText, isAuthenticated } = useCurrentUser();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor ? patchActorVisibility(rawActor) : null;
  const [title, setTitle] = reactExports.useState(null);
  const [description, setDescription] = reactExports.useState(null);
  const [visibility, setVisibility] = reactExports.useState(null);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [viewCounted, setViewCounted] = reactExports.useState(false);
  const [comments, setComments] = reactExports.useState(SEED_COMMENTS);
  const [collaborators, setCollaborators] = reactExports.useState(SEED_COLLABORATORS);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "video.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading video…" })
      }
    );
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", "data-ocid": "video.error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Failed to load video",
        description: videoError instanceof Error ? videoError.message : "Something went wrong. Please try again.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            search: { q: void 0 },
            className: "text-primary hover:underline text-sm",
            "data-ocid": "video.back_link",
            children: "Back to feed"
          }
        )
      }
    ) });
  }
  if (!video) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Video not found",
        description: "This video may have been removed or you don't have permission to view it.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            search: { q: void 0 },
            className: "text-primary hover:underline text-sm",
            "data-ocid": "video.back_link",
            children: "Back to feed"
          }
        )
      }
    ) });
  }
  const currentTitle = title ?? video.title;
  const currentDescription = description ?? video.description;
  const rawVisibility = video.visibility;
  const currentVisibility = visibility ?? rawVisibility ?? VideoVisibility.public_;
  const myRole = video.myRole ?? null;
  const isOwner = myRole === "owner";
  const canEdit = isOwner || myRole === "editor";
  const isCollaborator = !!myRole;
  const isPrivate = currentVisibility === VideoVisibility.private_;
  const isCollaboratorsOnly = currentVisibility === VideoVisibility.collaboratorsOnly;
  if ((isPrivate || isCollaboratorsOnly) && !canEdit && !isCollaborator) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, {});
  }
  const handlePlay = () => {
    if (viewCounted) return;
    setViewCounted(true);
    if (actor) {
      const numericId = Number(id);
      if (!Number.isNaN(numericId)) {
        actor.getVideo(BigInt(numericId)).catch(() => {
        });
      }
    }
    refetch();
  };
  const handleSave = async (data) => {
    const prevTitle = title;
    const prevDescription = description;
    const prevVisibility = visibility;
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
            visibility: data.visibility
          });
          refetch();
        } catch (err) {
          setTitle(prevTitle);
          setDescription(prevDescription);
          setVisibility(prevVisibility);
          setIsEditing(true);
          ue.error(`Failed to save changes: ${getErrorMessage(err)}`);
        }
      }
    }
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    setShowDeleteConfirm(false);
    if (!actor) {
      setIsDeleting(false);
      ue.error("Not connected to the backend. Please try again.");
      return;
    }
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      setIsDeleting(false);
      ue.error("Invalid video ID. Cannot delete.");
      return;
    }
    try {
      await actor.deleteVideo(BigInt(numericId));
      ue.success("Video deleted successfully.");
      navigate({ to: "/", search: { q: void 0 } });
    } catch (err) {
      setIsDeleting(false);
      ue.error(`Failed to delete video: ${getErrorMessage(err)}`);
    }
  };
  const handleAddComment = async (text) => {
    const optimisticComment = {
      id: `c${Date.now()}`,
      videoId: video.id,
      authorId: principalText ?? "anon",
      authorName: "You",
      content: text,
      createdAt: Date.now()
    };
    setComments((prev) => [...prev, optimisticComment]);
    if (actor) {
      const numericId = Number(id);
      if (!Number.isNaN(numericId)) {
        try {
          await actor.addComment({
            text,
            timestampSeconds: BigInt(0),
            videoId: BigInt(numericId)
          });
        } catch (err) {
          setComments(
            (prev) => prev.filter((c) => c.id !== optimisticComment.id)
          );
          ue.error(`Failed to post comment: ${getErrorMessage(err)}`);
        }
      }
    }
  };
  const handleDeleteComment = async (commentId) => {
    const prevComments = comments;
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    if (actor) {
      const numericCommentId = Number(commentId.replace(/^c/, ""));
      if (!Number.isNaN(numericCommentId)) {
        try {
          await actor.deleteComment(BigInt(numericCommentId));
        } catch (err) {
          setComments(prevComments);
          ue.error(`Failed to delete comment: ${getErrorMessage(err)}`);
        }
      }
    }
  };
  const handleRevokeCollaborator = async (userId) => {
    const prevCollaborators = collaborators;
    setCollaborators((prev) => prev.filter((c) => c.userId !== userId));
    if (actor) {
      const numericVideoId = Number(id);
      if (!Number.isNaN(numericVideoId)) {
        try {
          const collab = collaborators.find((c) => c.userId === userId);
          if (collab == null ? void 0 : collab.principal) {
            await actor.revokeCollaborator(
              BigInt(numericVideoId),
              collab.principal
            );
          }
        } catch (err) {
          setCollaborators(prevCollaborators);
          ue.error(`Failed to remove collaborator: ${getErrorMessage(err)}`);
        }
      }
    }
  };
  const handleInviteCollaborator = async (principalId, role) => {
    const newCollab = {
      userId: `u_${principalId.slice(0, 6)}`,
      principal: {},
      role,
      displayName: `${principalId.slice(0, 8)}…`
    };
    setCollaborators((prev) => [...prev, newCollab]);
    if (actor) {
      const numericVideoId = Number(id);
      if (!Number.isNaN(numericVideoId)) {
        try {
          const { Principal } = await __vitePreload(async () => {
            const { Principal: Principal2 } = await import("./index-B7J2iqaB.js").then((n) => n.i);
            return { Principal: Principal2 };
          }, true ? __vite__mapDeps([0,1,2,3]) : void 0);
          const inviteePrincipal = Principal.fromText(principalId);
          const { CollaboratorRole: BackendRole } = await __vitePreload(async () => {
            const { CollaboratorRole: BackendRole2 } = await import("./backend-C7xtEXGZ.js").then((n) => n.b);
            return { CollaboratorRole: BackendRole2 };
          }, true ? __vite__mapDeps([1,2,3]) : void 0);
          const backendRole = role === "editor" ? BackendRole.editor : BackendRole.viewer;
          await actor.inviteCollaborator(
            BigInt(numericVideoId),
            inviteePrincipal,
            backendRole
          );
        } catch (err) {
          setCollaborators(
            (prev) => prev.filter((c) => c.userId !== newCollab.userId)
          );
          ue.error(`Failed to invite collaborator: ${getErrorMessage(err)}`);
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        onConfirm: handleDelete,
        onCancel: () => setShowDeleteConfirm(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 lg:px-6 py-6 max-w-6xl mx-auto",
        "data-ocid": "video.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              search: { q: void 0 },
              className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5",
              "data-ocid": "video.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to feed"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoPlayer,
                {
                  videoUrl: video.videoUrl ?? "",
                  thumbnailUrl: video.thumbnailUrl,
                  title: currentTitle,
                  onPlay: handlePlay
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl lg:text-2xl font-bold text-foreground flex-1 min-w-0 leading-tight", children: currentTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0 mt-0.5", children: [
                    canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setIsEditing(true),
                        "aria-label": "Edit video",
                        className: "w-8 h-8 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center",
                        "data-ocid": "video.edit_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                      }
                    ),
                    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowDeleteConfirm(true),
                        "aria-label": "Delete video",
                        disabled: isDeleting,
                        className: "w-8 h-8 rounded-lg bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center disabled:opacity-50",
                        "data-ocid": "video.delete_button",
                        children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EditForm,
                  {
                    title: currentTitle,
                    description: currentDescription,
                    visibility: currentVisibility,
                    onSave: handleSave,
                    onCancel: () => setIsEditing(false)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Avatar,
                      {
                        name: video.uploaderName,
                        src: video.uploaderAvatarUrl,
                        size: "md"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/profile/$userId",
                          params: { userId: video.uploaderId },
                          className: "font-medium text-foreground hover:text-primary transition-colors text-sm",
                          "data-ocid": "video.uploader_link",
                          children: video.uploaderName
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        formatRelativeDate(video.createdAt)
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${currentVisibility === VideoVisibility.public_ ? "bg-primary/10 text-primary border-primary/30" : currentVisibility === VideoVisibility.collaboratorsOnly ? "bg-accent/20 text-accent-foreground border-accent/30" : "bg-muted text-muted-foreground border-border"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(VisibilityIcon, { v: currentVisibility }),
                          visibilityLabel(currentVisibility)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                      formatCount(video.viewCount)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center gap-1.5 hover:text-primary transition-colors",
                        "data-ocid": "video.share_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                          "Share"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  myRole && /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: myRole }),
                  video.aiTool && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "ai-tool", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                    video.aiTool
                  ] }),
                  formatVideoTimestamp(video.duration) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    formatVideoTimestamp(video.duration)
                  ] })
                ] }),
                !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl p-4 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-line", children: currentDescription }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CommentsSection,
                {
                  comments,
                  currentUserId: isAuthenticated ? principalText ?? null : null,
                  isOwner,
                  onAddComment: handleAddComment,
                  onDeleteComment: handleDeleteComment
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CollabPanel,
                {
                  collaborators,
                  isOwner,
                  onRevoke: handleRevokeCollaborator,
                  onInvite: handleInviteCollaborator
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Video Info" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Uploaded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium text-right", children: formatRelativeDate(video.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Views" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium", children: formatCount(video.viewCount) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Duration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium", children: formatVideoTimestamp(video.duration) })
                  ] }),
                  video.aiTool && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "AI Tool" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium", children: video.aiTool })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Visibility" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium", children: visibilityLabel(currentVisibility) })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  VideoPage as default
};
