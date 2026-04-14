import { c as createLucideIcon, p as useParams, b as useCurrentUser, r as reactExports, q as useProfile, j as jsxRuntimeExports, L as LoadingSpinner, f as Link, A as Avatar, g as Users, X } from "./index-BWY2Fo0g.js";
import { E as EmptyState } from "./Badge-CBC1GBDU.js";
import { V as VideoCard } from "./VideoCard-DZDvti-w.js";
import { u as useUpdateProfile } from "./useDashboard-DY5h3ezZ.js";
import { A as ArrowLeft } from "./arrow-left-qu1d3muw.js";
import { F as Film } from "./film-DGFsL5Y6.js";
import { C as Check } from "./check-BbqLAGz-.js";
import "./sparkles-CJZKJvRw.js";
import "./backend-C7xtEXGZ.js";
import "./useMutation-CUXAg1RN.js";
import "./index-JwsgApHh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
const SEED_USER_VIDEOS = {
  u1: [
    {
      id: "v1",
      title: "AI-Enhanced Cinematic Sequence",
      description: "A stunning cinematic sequence generated with Sora's latest model.",
      thumbnailUrl: "/assets/generated/thumb-cinematic.dim_640x360.jpg",
      duration: 165,
      viewCount: 12400,
      likeCount: 843,
      commentCount: 47,
      uploaderName: "Aria K.",
      uploaderId: "u1",
      aiTool: "Sora",
      status: "published",
      createdAt: Date.now() - 864e5 * 2,
      updatedAt: Date.now() - 864e5 * 2
    },
    {
      id: "v4",
      title: "Collaborative Narrative Scene",
      description: "A multi-collaborator narrative scene with shared editing workflow.",
      thumbnailUrl: "/assets/generated/thumb-narrative.dim_640x360.jpg",
      duration: 234,
      viewCount: 6300,
      likeCount: 287,
      commentCount: 35,
      uploaderName: "Aria K.",
      uploaderId: "u1",
      aiTool: "Pika",
      status: "published",
      createdAt: Date.now() - 864e5 * 4,
      updatedAt: Date.now() - 864e5 * 4
    }
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
      createdAt: Date.now() - 864e5 * 3,
      updatedAt: Date.now() - 864e5 * 3
    }
  ]
};
function formatCount(n) {
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
  return n.toString();
}
function EditProfileForm({
  displayName,
  bio,
  onSave,
  onCancel,
  isSaving
}) {
  const [name, setName] = reactExports.useState(displayName);
  const [bioText, setBioText] = reactExports.useState(bio);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name, bioText);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4 mt-4 p-4 bg-muted/30 rounded-xl border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              htmlFor: "display-name",
              children: "Display Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "display-name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "w-full bg-card border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth",
              placeholder: "Your display name",
              maxLength: 60,
              required: true,
              "data-ocid": "profile.edit_name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              htmlFor: "bio",
              children: "Bio"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "bio",
              value: bioText,
              onChange: (e) => setBioText(e.target.value),
              className: "w-full bg-card border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none",
              placeholder: "Tell the world about your AI video work…",
              rows: 3,
              maxLength: 300,
              "data-ocid": "profile.edit_bio_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
            bioText.length,
            "/300"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: isSaving || !name.trim(),
              className: "flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth",
              "data-ocid": "profile.save_button",
              children: [
                isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                "Save changes"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-smooth",
              "data-ocid": "profile.cancel_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                "Cancel"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ProfilePage() {
  const { userId } = useParams({ from: "/profile/$userId" });
  const { principalText, isAuthenticated } = useCurrentUser();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const resolvedId = userId === "me" ? "u1" : userId;
  const { data: profile, isLoading } = useProfile(resolvedId);
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();
  const isOwnProfile = isAuthenticated && !!principalText && !!(profile == null ? void 0 : profile.id) && principalText === profile.id.toString();
  const videos = SEED_USER_VIDEOS[resolvedId] ?? [];
  const handleSave = async (displayName, bio) => {
    await updateProfile({ displayName, bio });
    setIsEditing(false);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading profile…" }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Profile not found",
        description: "This creator's profile doesn't exist or has been removed.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            search: { q: void 0 },
            className: "text-primary hover:underline text-sm",
            "data-ocid": "profile.back_link",
            children: "Back to feed"
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-40 bg-gradient-to-r from-primary/25 via-primary/10 to-accent/25 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/10 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          search: { q: void 0 },
          className: "absolute top-4 left-4 inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1 transition-colors",
          "data-ocid": "profile.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to feed"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 pb-6 bg-card border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 -mt-10 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Avatar,
            {
              name: profile.displayName,
              src: profile.avatarUrl,
              size: "xl",
              className: "ring-4 ring-card w-20 h-20 text-2xl"
            }
          ),
          isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-smooth shadow-subtle",
              "aria-label": "Change profile picture",
              "data-ocid": "profile.avatar_upload_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3 h-3" })
            }
          )
        ] }),
        isOwnProfile && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsEditing(true),
            className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-smooth",
            "data-ocid": "profile.edit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
              "Edit profile"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: profile.displayName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: profile.handle })
      ] }),
      profile.bio && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 max-w-xl mb-4 leading-relaxed", children: profile.bio }),
      isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditProfileForm,
        {
          displayName: profile.displayName,
          bio: profile.bio ?? "",
          onSave: handleSave,
          onCancel: () => setIsEditing(false),
          isSaving
        }
      ),
      !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg leading-none", children: formatCount(profile.videoCount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }),
            "Videos"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg leading-none", children: formatCount(profile.subscriberCount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
            "Subscribers"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 sm:p-6 bg-background",
        "data-ocid": "profile.videos_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-primary" }),
            "Videos"
          ] }),
          videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "profile.videos_empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-7 h-7" }),
              title: "No videos yet",
              description: "This creator hasn't published any public videos yet."
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: i + 1 }, video.id)) })
        ]
      }
    )
  ] });
}
export {
  ProfilePage as default
};
