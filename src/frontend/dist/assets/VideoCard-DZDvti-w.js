import { c as createLucideIcon, j as jsxRuntimeExports, f as Link, A as Avatar } from "./index-BWY2Fo0g.js";
import { R as RoleBadge, B as Badge } from "./Badge-CBC1GBDU.js";
import { E as Eye, M as MessageCircle, S as Sparkles } from "./sparkles-CJZKJvRw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function formatCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
  return n.toString();
}
function VideoCard({ video, index = 1 }) {
  const hasCollaborators = video.collaborators && video.collaborators.length > 0;
  const ocid = `video.item.${index}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/video/$id",
      params: { id: video.id },
      className: "group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-smooth shadow-subtle hover:shadow-elevated",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden bg-muted", children: [
          video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: video.thumbnailUrl,
              alt: video.title,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-black/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-mono font-medium", children: formatDuration(video.duration) }),
          video.myRole && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: video.myRole }) }),
          hasCollaborators && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 flex -space-x-1.5", children: video.collaborators.slice(0, 3).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Avatar,
            {
              name: c.displayName,
              src: c.avatarUrl,
              size: "xs",
              className: "ring-1 ring-card"
            },
            c.userId
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                name: video.uploaderName,
                src: video.uploaderAvatarUrl,
                size: "sm",
                className: "flex-shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors", children: video.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: video.uploaderName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                formatCount(video.viewCount)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                video.commentCount
              ] })
            ] }),
            video.aiTool && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "ai-tool", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-2.5 h-2.5" }),
              video.aiTool
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Play as P,
  VideoCard as V
};
