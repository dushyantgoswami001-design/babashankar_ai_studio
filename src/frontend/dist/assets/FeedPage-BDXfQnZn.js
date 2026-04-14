import { c as createLucideIcon, b as useCurrentUser, d as useNavigate, e as useSearch, r as reactExports, j as jsxRuntimeExports, S as Search, X, U as Upload, L as LoadingSpinner } from "./index-BWY2Fo0g.js";
import { I as Input, B as Button, A as AnimatePresence, m as motion, a as Badge } from "./proxy-Bb0FoSGH.js";
import { E as EmptyState } from "./Badge-CBC1GBDU.js";
import { V as VideoCard } from "./VideoCard-DZDvti-w.js";
import { u as useVideoFeed } from "./index-B7J2iqaB.js";
import { S as Sparkles } from "./sparkles-CJZKJvRw.js";
import { T as TrendingUp } from "./trending-up-DuHH9yGM.js";
import "./backend-C7xtEXGZ.js";
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const AI_TOOLS = [
  "Sora",
  "Runway",
  "Pika",
  "Kling",
  "HeyGen",
  "Synthesia"
];
function filterByTool(videos, tool) {
  if (!tool) return videos;
  return videos.filter((v) => v.aiTool === tool);
}
function sortTrending(videos) {
  return [...videos].sort((a, b) => b.viewCount - a.viewCount);
}
function sortRecent(videos) {
  return [...videos].sort((a, b) => b.createdAt - a.createdAt);
}
function SectionHeader({ icon, title, count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
    count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs ml-1", children: count })
  ] });
}
function VideoGrid({
  videos,
  startIndex = 1,
  emptyMessage,
  emptyCta,
  ocid
}) {
  if (videos.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-7 h-7" }),
        title: emptyMessage,
        description: "Try adjusting filters or check back later.",
        action: emptyCta,
        className: "py-10"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
      "data-ocid": ocid,
      children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: startIndex + i })
        },
        video.id
      ))
    }
  );
}
function FeedPage() {
  const { isAuthenticated } = useCurrentUser();
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });
  const routeQuery = search.q ?? "";
  const [inputValue, setInputValue] = reactExports.useState(routeQuery);
  const [activeQuery, setActiveQuery] = reactExports.useState(routeQuery);
  const [activeTool, setActiveTool] = reactExports.useState(null);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setInputValue(routeQuery);
    setActiveQuery(routeQuery);
  }, [routeQuery]);
  const handleSearchChange = reactExports.useCallback(
    (value) => {
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setActiveQuery(value);
        navigate({ search: { q: value || void 0 } });
      }, 350);
    },
    [navigate]
  );
  const clearSearch = () => {
    setInputValue("");
    setActiveQuery("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    navigate({ search: { q: void 0 } });
  };
  const {
    data: videos = [],
    isLoading,
    isError,
    error: feedError,
    refetch: refetchFeed
  } = useVideoFeed(activeQuery || void 0);
  const filteredVideos = reactExports.useMemo(
    () => filterByTool(videos, activeTool),
    [videos, activeTool]
  );
  const trendingVideos = reactExports.useMemo(
    () => sortTrending(filteredVideos),
    [filteredVideos]
  );
  const recentVideos = reactExports.useMemo(
    () => sortRecent(filteredVideos),
    [filteredVideos]
  );
  const isSearching = !!activeQuery;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "feed.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "feed.search_input",
              type: "text",
              placeholder: "Search AI-generated videos, creators, tools…",
              value: inputValue,
              onChange: (e) => handleSearchChange(e.target.value),
              className: "pl-10 pr-10 h-11 bg-background border-border focus-visible:ring-primary/50 text-sm"
            }
          ),
          inputValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "feed.search_clear_button",
              onClick: clearSearch,
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "feed.upload_button",
            onClick: () => navigate({ to: "/upload" }),
            className: "shrink-0 gap-2 h-11",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              "Upload Video"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium flex items-center gap-1 mr-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "Filter by AI tool:"
        ] }),
        AI_TOOLS.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `feed.filter.${tool.toLowerCase()}`,
            onClick: () => setActiveTool(activeTool === tool ? null : tool),
            className: `px-2.5 py-1 rounded-full text-xs font-medium border transition-smooth ${activeTool === tool ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
            children: tool
          },
          tool
        )),
        activeTool && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "feed.filter.clear_button",
            onClick: () => setActiveTool(null),
            className: "px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-border text-muted-foreground hover:text-foreground transition-smooth",
            children: "Clear filter"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-24",
        "data-ocid": "feed.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading videos…" })
      }
    ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-24",
        "data-ocid": "feed.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-7 h-7" }),
            title: "Failed to load videos",
            description: feedError instanceof Error ? feedError.message : "Something went wrong. Please try refreshing the page.",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => refetchFeed(),
                "data-ocid": "feed.retry_button",
                children: "Try Again"
              }
            )
          }
        )
      }
    ) : isSearching ? (
      /* ── Search results view ── */
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          "data-ocid": "feed.search_results",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                title: `Results for "${activeQuery}"`,
                count: filteredVideos.length
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoGrid,
              {
                videos: filteredVideos,
                ocid: "feed.search_results.list",
                emptyMessage: "No videos match your search",
                emptyCta: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: clearSearch,
                    "data-ocid": "feed.clear_search_button",
                    children: "Clear search"
                  }
                )
              }
            )
          ]
        },
        "search-results"
      ) })
    ) : (
      /* ── Default feed: Trending + Recent ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            "data-ocid": "feed.trending_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionHeader,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                  title: "Trending Now",
                  count: trendingVideos.length
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoGrid,
                {
                  videos: trendingVideos.slice(0, 8),
                  startIndex: 1,
                  ocid: "feed.trending_section.list",
                  emptyMessage: "No trending videos yet"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.12 },
            "data-ocid": "feed.recent_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionHeader,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                  title: "Recently Uploaded",
                  count: recentVideos.length
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoGrid,
                {
                  videos: recentVideos,
                  startIndex: 9,
                  ocid: "feed.recent_section.list",
                  emptyMessage: "No recent videos",
                  emptyCta: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => navigate({ to: "/upload" }),
                      "data-ocid": "feed.upload_first_button",
                      className: "gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                        "Upload the first video"
                      ]
                    }
                  ) : void 0
                }
              )
            ]
          }
        )
      ] })
    ) })
  ] });
}
export {
  FeedPage as default
};
