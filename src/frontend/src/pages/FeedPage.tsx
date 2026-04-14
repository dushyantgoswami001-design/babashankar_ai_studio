import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, Sparkles, TrendingUp, Upload, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { VideoCard } from "../components/VideoCard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useVideoFeed } from "../hooks/useVideoFeed";
import type { AITool, VideoSummary } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const AI_TOOLS: AITool[] = [
  "Sora",
  "Runway",
  "Pika",
  "Kling",
  "HeyGen",
  "Synthesia",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function filterByTool(
  videos: VideoSummary[],
  tool: AITool | null,
): VideoSummary[] {
  if (!tool) return videos;
  return videos.filter((v) => v.aiTool === tool);
}

function sortTrending(videos: VideoSummary[]): VideoSummary[] {
  return [...videos].sort((a, b) => b.viewCount - a.viewCount);
}

function sortRecent(videos: VideoSummary[]): VideoSummary[] {
  return [...videos].sort((a, b) => b.createdAt - a.createdAt);
}

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  count?: number;
}

function SectionHeader({ icon, title, count }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
        {icon}
      </span>
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>
      {count !== undefined && (
        <Badge variant="secondary" className="text-xs ml-1">
          {count}
        </Badge>
      )}
    </div>
  );
}

// ─── Video Grid ───────────────────────────────────────────────────────────────

interface VideoGridProps {
  videos: VideoSummary[];
  startIndex?: number;
  emptyMessage: string;
  emptyCta?: React.ReactNode;
  ocid?: string;
}

function VideoGrid({
  videos,
  startIndex = 1,
  emptyMessage,
  emptyCta,
  ocid,
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <EmptyState
        icon={<Video className="w-7 h-7" />}
        title={emptyMessage}
        description="Try adjusting filters or check back later."
        action={emptyCta}
        className="py-10"
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      data-ocid={ocid}
    >
      {videos.map((video, i) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <VideoCard video={video} index={startIndex + i} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const { isAuthenticated } = useCurrentUser();
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });
  const routeQuery = (search as { q?: string }).q ?? "";

  const [inputValue, setInputValue] = useState(routeQuery);
  const [activeQuery, setActiveQuery] = useState(routeQuery);
  const [activeTool, setActiveTool] = useState<AITool | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(routeQuery);
    setActiveQuery(routeQuery);
  }, [routeQuery]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setActiveQuery(value);
        navigate({ search: { q: value || undefined } });
      }, 350);
    },
    [navigate],
  );

  const clearSearch = () => {
    setInputValue("");
    setActiveQuery("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    navigate({ search: { q: undefined } });
  };

  const {
    data: videos = [],
    isLoading,
    isError,
    error: feedError,
    refetch: refetchFeed,
  } = useVideoFeed(activeQuery || undefined);

  const filteredVideos = useMemo(
    () => filterByTool(videos, activeTool),
    [videos, activeTool],
  );
  const trendingVideos = useMemo(
    () => sortTrending(filteredVideos),
    [filteredVideos],
  );
  const recentVideos = useMemo(
    () => sortRecent(filteredVideos),
    [filteredVideos],
  );

  const isSearching = !!activeQuery;

  return (
    <div className="min-h-screen bg-background" data-ocid="feed.page">
      {/* ── Search & filter bar ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="feed.search_input"
                type="text"
                placeholder="Search AI-generated videos, creators, tools…"
                value={inputValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-10 h-11 bg-background border-border focus-visible:ring-primary/50 text-sm"
              />
              {inputValue && (
                <button
                  type="button"
                  data-ocid="feed.search_clear_button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Upload CTA — authenticated users only */}
            {isAuthenticated && (
              <Button
                data-ocid="feed.upload_button"
                onClick={() => navigate({ to: "/upload" })}
                className="shrink-0 gap-2 h-11"
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </Button>
            )}
          </div>

          {/* AI Tool filter chips */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5" />
              Filter by AI tool:
            </span>
            {AI_TOOLS.map((tool) => (
              <button
                type="button"
                key={tool}
                data-ocid={`feed.filter.${tool.toLowerCase()}`}
                onClick={() => setActiveTool(activeTool === tool ? null : tool)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-smooth ${
                  activeTool === tool
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {tool}
              </button>
            ))}
            {activeTool && (
              <button
                type="button"
                data-ocid="feed.filter.clear_button"
                onClick={() => setActiveTool(null)}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-border text-muted-foreground hover:text-foreground transition-smooth"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Content area ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="feed.loading_state"
          >
            <LoadingSpinner size="lg" label="Loading videos…" />
          </div>
        ) : isError ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="feed.error_state"
          >
            <EmptyState
              icon={<Video className="w-7 h-7" />}
              title="Failed to load videos"
              description={
                feedError instanceof Error
                  ? feedError.message
                  : "Something went wrong. Please try refreshing the page."
              }
              action={
                <Button
                  variant="outline"
                  onClick={() => refetchFeed()}
                  data-ocid="feed.retry_button"
                >
                  Try Again
                </Button>
              }
            />
          </div>
        ) : isSearching ? (
          /* ── Search results view ── */
          <AnimatePresence mode="wait">
            <motion.section
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-ocid="feed.search_results"
            >
              <SectionHeader
                icon={<Search className="w-4 h-4" />}
                title={`Results for "${activeQuery}"`}
                count={filteredVideos.length}
              />
              <VideoGrid
                videos={filteredVideos}
                ocid="feed.search_results.list"
                emptyMessage="No videos match your search"
                emptyCta={
                  <Button
                    variant="outline"
                    onClick={clearSearch}
                    data-ocid="feed.clear_search_button"
                  >
                    Clear search
                  </Button>
                }
              />
            </motion.section>
          </AnimatePresence>
        ) : (
          /* ── Default feed: Trending + Recent ── */
          <>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              data-ocid="feed.trending_section"
            >
              <SectionHeader
                icon={<TrendingUp className="w-4 h-4" />}
                title="Trending Now"
                count={trendingVideos.length}
              />
              <VideoGrid
                videos={trendingVideos.slice(0, 8)}
                startIndex={1}
                ocid="feed.trending_section.list"
                emptyMessage="No trending videos yet"
              />
            </motion.section>

            <div className="border-t border-border" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              data-ocid="feed.recent_section"
            >
              <SectionHeader
                icon={<Sparkles className="w-4 h-4" />}
                title="Recently Uploaded"
                count={recentVideos.length}
              />
              <VideoGrid
                videos={recentVideos}
                startIndex={9}
                ocid="feed.recent_section.list"
                emptyMessage="No recent videos"
                emptyCta={
                  isAuthenticated ? (
                    <Button
                      onClick={() => navigate({ to: "/upload" })}
                      data-ocid="feed.upload_first_button"
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload the first video
                    </Button>
                  ) : undefined
                }
              />
            </motion.section>
          </>
        )}
      </main>
    </div>
  );
}
