import { c as createLucideIcon, b as useCurrentUser, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, B as BookMarked, P as Plus, L as LoadingSpinner, a as useQuery, X } from "./index-BWY2Fo0g.js";
import { u as useMutation } from "./useMutation-CUXAg1RN.js";
import { E as EmptyState } from "./Badge-CBC1GBDU.js";
import { V as VideoCard } from "./VideoCard-DZDvti-w.js";
import { T as Trash2, P as Pen } from "./trash-2-UEuOYA5s.js";
import { C as Check } from "./check-BbqLAGz-.js";
import { F as Film } from "./film-DGFsL5Y6.js";
import { G as Globe } from "./globe-OGSLdOk0.js";
import { L as Lock } from "./lock-BIsBLHgl.js";
import "./sparkles-CJZKJvRw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode);
const SEED_COLLECTIONS = [
  {
    id: "c1",
    title: "AI Cinematics",
    description: "Best cinematic sequences generated with Sora and Runway",
    videoIds: ["v1", "v3"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 864e5 * 2,
    updatedAt: Date.now() - 864e5 * 2
  },
  {
    id: "c2",
    title: "Marketing Showcase",
    description: "AI-driven marketing content for campaigns",
    videoIds: ["v2"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 864e5 * 5,
    updatedAt: Date.now() - 864e5 * 5
  },
  {
    id: "c3",
    title: "Collab Experiments",
    description: "Multi-collaborator creative experiments",
    videoIds: ["v4", "v5", "v6"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 864e5 * 7,
    updatedAt: Date.now() - 864e5 * 7
  }
];
const SEED_VIDEOS = [
  {
    id: "v1",
    title: "AI-Enhanced Cinematic Sequence",
    description: "A stunning cinematic sequence generated with Sora.",
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
    id: "v2",
    title: "Data-Driven Marketing Video v3",
    description: "Automated marketing visuals driven by live data feeds.",
    thumbnailUrl: "/assets/generated/thumb-marketing.dim_640x360.jpg",
    duration: 88,
    viewCount: 8900,
    likeCount: 412,
    commentCount: 28,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "Runway",
    status: "published",
    createdAt: Date.now() - 864e5 * 3,
    updatedAt: Date.now() - 864e5 * 3
  },
  {
    id: "v3",
    title: "Synthesized Music Video Teaser",
    description: "Music video concept using AI visuals with generative audio.",
    thumbnailUrl: "/assets/generated/thumb-music.dim_640x360.jpg",
    duration: 94,
    viewCount: 21e3,
    likeCount: 1320,
    commentCount: 92,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "HeyGen",
    status: "published",
    createdAt: Date.now() - 864e5,
    updatedAt: Date.now() - 864e5
  },
  {
    id: "v4",
    title: "Collaborative Narrative Scene",
    description: "A multi-collaborator narrative scene with shared editing.",
    thumbnailUrl: "/assets/generated/thumb-narrative.dim_640x360.jpg",
    duration: 210,
    viewCount: 6300,
    likeCount: 287,
    commentCount: 35,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "Pika",
    status: "published",
    createdAt: Date.now() - 864e5 * 4,
    updatedAt: Date.now() - 864e5 * 4
  },
  {
    id: "v5",
    title: "Neural Style Transfer Test",
    description: "Exploring real-time neural style transfer on motion capture.",
    thumbnailUrl: "/assets/generated/thumb-neural.dim_640x360.jpg",
    duration: 57,
    viewCount: 4100,
    likeCount: 198,
    commentCount: 14,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "Runway",
    status: "published",
    createdAt: Date.now() - 864e5 * 5,
    updatedAt: Date.now() - 864e5 * 5
  },
  {
    id: "v6",
    title: "Real-Time MoCap Workflow",
    description: "End-to-end motion capture to AI character workflow.",
    thumbnailUrl: "/assets/generated/thumb-mocap.dim_640x360.jpg",
    duration: 320,
    viewCount: 15600,
    likeCount: 934,
    commentCount: 61,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "Kling",
    status: "published",
    createdAt: Date.now() - 864e5 * 6,
    updatedAt: Date.now() - 864e5 * 6
  }
];
function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return SEED_COLLECTIONS;
    },
    staleTime: 3e4
  });
}
function useMyVideos() {
  return useQuery({
    queryKey: ["myVideos"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return SEED_VIDEOS;
    },
    staleTime: 6e4
  });
}
function CollectionModal({
  initial,
  onConfirm,
  onClose,
  mode
}) {
  const [form, setForm] = reactExports.useState(
    initial ?? { title: "", description: "", visibility: "private" }
  );
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "collections.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            "aria-label": mode === "create" ? "Create collection" : "Edit collection",
            open: true,
            className: "relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md p-6 space-y-5 z-10 m-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: mode === "create" ? "New Collection" : "Edit Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground",
                    "aria-label": "Close",
                    "data-ocid": "collections.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "col-title",
                      className: "block text-xs font-medium text-muted-foreground mb-1.5",
                      children: "Title *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "col-title",
                      type: "text",
                      value: form.title,
                      onChange: set("title"),
                      placeholder: "My awesome collection",
                      className: "w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                      "data-ocid": "collections.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "col-desc",
                      className: "block text-xs font-medium text-muted-foreground mb-1.5",
                      children: "Description"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "col-desc",
                      value: form.description,
                      onChange: set("description"),
                      placeholder: "What's this collection about?",
                      rows: 3,
                      className: "w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none",
                      "data-ocid": "collections.description_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "col-vis",
                      className: "block text-xs font-medium text-muted-foreground mb-1.5",
                      children: "Visibility"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "col-vis",
                      value: form.visibility,
                      onChange: set("visibility"),
                      className: "w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                      "data-ocid": "collections.visibility_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "private", children: "Private — only you" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "public", children: "Public — anyone can view" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-smooth",
                    "data-ocid": "collections.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onConfirm(form),
                    disabled: !form.title.trim(),
                    className: "flex-1 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-ocid": "collections.confirm_button",
                    children: mode === "create" ? "Create" : "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AddVideoPicker({
  existingVideoIds,
  allVideos,
  onAdd,
  onClose
}) {
  const available = allVideos.filter((v) => !existingVideoIds.includes(v.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "collections.add_video_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            "aria-label": "Add video to collection",
            open: true,
            className: "relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg p-6 space-y-4 z-10 m-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Add Video" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground",
                    "aria-label": "Close",
                    "data-ocid": "collections.add_video_close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              available.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "All your videos are already in this collection." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 max-h-72 overflow-y-auto pr-1", children: available.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary transition-smooth cursor-pointer group text-left",
                  onClick: () => onAdd(video.id),
                  "data-ocid": `collections.add_video_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: video.thumbnailUrl,
                        alt: "",
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-muted-foreground" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: video.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: video.aiTool })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" })
                  ]
                }
              ) }, video.id)) })
            ]
          }
        )
      ]
    }
  );
}
function CollectionCard({
  collection,
  index,
  videos,
  onEdit,
  onDelete,
  onAddVideo,
  onRemoveVideo
}) {
  var _a;
  const [expanded, setExpanded] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const collectionVideos = videos.filter(
    (v) => collection.videoIds.includes(v.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden transition-smooth hover:border-primary/30",
      "data-ocid": `collections.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 flex-shrink-0 flex items-center justify-center", children: ((_a = collectionVideos[0]) == null ? void 0 : _a.thumbnailUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: collectionVideos[0].thumbnailUrl,
                alt: "",
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-7 h-7 text-primary/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight truncate", children: collection.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMenuOpen((v) => !v),
                      className: "p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground",
                      "aria-label": "Collection options",
                      "data-ocid": `collections.options_button.${index}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" })
                    }
                  ),
                  menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "fixed inset-0 z-10",
                        onClick: () => setMenuOpen(false),
                        onKeyDown: (e) => e.key === "Escape" && setMenuOpen(false),
                        role: "presentation"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute right-0 top-8 z-20 bg-popover border border-border rounded-xl shadow-elevated py-1 min-w-[140px]",
                        "data-ocid": `collections.dropdown_menu.${index}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setMenuOpen(false);
                                onEdit();
                              },
                              className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors",
                              "data-ocid": `collections.edit_button.${index}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                                "Edit"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setMenuOpen(false);
                                onDelete();
                              },
                              className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors",
                              "data-ocid": `collections.delete_button.${index}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                                "Delete"
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              collection.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: collection.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }),
                  collection.videoIds.length,
                  " video",
                  collection.videoIds.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                  collection.videoIds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                  "Public"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((v) => !v),
              className: "mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 rounded-lg hover:bg-muted",
              "data-ocid": `collections.expand_button.${index}`,
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }),
                "Hide videos"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
                "Show ",
                collection.videoIds.length,
                " video",
                collection.videoIds.length !== 1 ? "s" : ""
              ] })
            }
          )
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-background/40 p-4 space-y-4", children: [
          collectionVideos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-4", children: "No videos in this collection yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: collectionVideos.map((video, vi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative group",
              "data-ocid": `collections.video_item.${vi + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: vi + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRemoveVideo(video.id),
                    className: "absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive",
                    "aria-label": `Remove "${video.title}" from collection`,
                    "data-ocid": `collections.remove_video_button.${vi + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            video.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onAddVideo,
              className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth",
              "data-ocid": `collections.add_video_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add video"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CollectionsPage() {
  var _a;
  const { isAuthenticated, login } = useCurrentUser();
  const queryClient = useQueryClient();
  const { data: collections = [], isLoading } = useCollections();
  const { data: myVideos = [] } = useMyVideos();
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [editingCollection, setEditingCollection] = reactExports.useState(
    null
  );
  const [addVideoForCollection, setAddVideoForCollection] = reactExports.useState(null);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const createMutation = useMutation({
    mutationFn: async (form) => {
      await new Promise((r) => setTimeout(r, 300));
      return form;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setShowCreateModal(false);
    }
  });
  const updateMutation = useMutation({
    mutationFn: async (_form) => {
      await new Promise((r) => setTimeout(r, 300));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setEditingCollection(null);
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (_id) => {
      await new Promise((r) => setTimeout(r, 200));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setDeleteConfirm(null);
    }
  });
  const handleRemoveVideo = reactExports.useCallback(
    (_collectionId, _videoId) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    [queryClient]
  );
  const handleAddVideo = reactExports.useCallback(
    (_collectionId, _videoId) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setAddVideoForCollection(null);
    },
    [queryClient]
  );
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-12 h-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Your Collections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Sign in to create and manage your video collections." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: login,
          className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth",
          "data-ocid": "collections.login_button",
          children: "Sign in"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "collections.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-6 h-6 text-primary" }),
          "Collections"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Organize your AI videos into curated collections" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowCreateModal(true),
          className: "flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle",
          "data-ocid": "collections.create_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "New Collection"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-16",
        "data-ocid": "collections.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading collections…" })
      }
    ) : collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-7 h-7" }),
        title: "No collections yet",
        description: "Create your first collection to organize your AI-generated videos.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowCreateModal(true),
            className: "px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth",
            "data-ocid": "collections.empty_create_button",
            children: "Create Collection"
          }
        ),
        "data-ocid": "collections.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "collections.list", children: collections.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollectionCard,
      {
        collection: col,
        index: i + 1,
        videos: myVideos,
        onEdit: () => setEditingCollection(col),
        onDelete: () => setDeleteConfirm(col.id),
        onAddVideo: () => setAddVideoForCollection(col.id),
        onRemoveVideo: (videoId) => handleRemoveVideo(col.id, videoId)
      },
      col.id
    )) }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollectionModal,
      {
        mode: "create",
        onConfirm: (form) => createMutation.mutate(form),
        onClose: () => setShowCreateModal(false)
      }
    ),
    editingCollection && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollectionModal,
      {
        mode: "edit",
        initial: {
          title: editingCollection.title,
          description: editingCollection.description ?? "",
          visibility: "public"
        },
        onConfirm: (form) => updateMutation.mutate({ ...form, id: editingCollection.id }),
        onClose: () => setEditingCollection(null)
      }
    ),
    addVideoForCollection && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddVideoPicker,
      {
        existingVideoIds: ((_a = collections.find((c) => c.id === addVideoForCollection)) == null ? void 0 : _a.videoIds) ?? [],
        allVideos: myVideos,
        onAdd: (videoId) => handleAddVideo(addVideoForCollection, videoId),
        onClose: () => setAddVideoForCollection(null)
      }
    ),
    deleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-ocid": "collections.delete_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
              onClick: () => setDeleteConfirm(null),
              onKeyDown: (e) => e.key === "Escape" && setDeleteConfirm(null),
              role: "presentation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm p-6 z-10 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This cannot be undone." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDeleteConfirm(null),
                  className: "flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-smooth",
                  "data-ocid": "collections.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => deleteMutation.mutate(deleteConfirm),
                  disabled: deleteMutation.isPending,
                  className: "flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50",
                  "data-ocid": "collections.confirm_button",
                  children: deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 animate-spin" }),
                    "Deleting…"
                  ] }) : "Delete"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  CollectionsPage as default
};
