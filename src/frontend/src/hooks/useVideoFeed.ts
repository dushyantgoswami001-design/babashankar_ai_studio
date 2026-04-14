import { createActor } from "@/backend";
import type {
  Video as BackendVideo,
  VideoSummary as BackendVideoSummary,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import type { VideoSummary } from "../types";

// ─── Adapter: backend VideoSummary → frontend VideoSummary ───────────────────

function adaptVideoSummary(v: BackendVideoSummary): VideoSummary {
  return {
    id: v.id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailBlob ? v.thumbnailBlob.getDirectURL() : "",
    duration: Number(v.durationSeconds),
    viewCount: Number(v.viewCount),
    likeCount: 0,
    commentCount: 0,
    uploaderName: `${v.uploaderId.toText().slice(0, 10)}…`,
    uploaderAvatarUrl: "",
    uploaderId: v.uploaderId.toText(),
    aiTool: undefined,
    status: "published",
    createdAt: Number(v.createdAt / 1_000_000n), // nanoseconds → ms
    updatedAt: Number(v.createdAt / 1_000_000n),
  };
}

export function adaptBackendVideo(
  v: BackendVideo,
): VideoSummary & { videoUrl: string } {
  return {
    id: v.id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailBlob ? v.thumbnailBlob.getDirectURL() : "",
    videoUrl: v.videoBlob.getDirectURL(),
    duration: Number(v.durationSeconds),
    viewCount: Number(v.viewCount),
    likeCount: 0,
    commentCount: 0,
    uploaderName: `${v.uploaderId.toText().slice(0, 10)}…`,
    uploaderAvatarUrl: "",
    uploaderId: v.uploaderId.toText(),
    aiTool: undefined,
    status: "published",
    createdAt: Number(v.createdAt / 1_000_000n),
    updatedAt: Number(v.updatedAt / 1_000_000n),
  };
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

const FEED_LIMIT = BigInt(24);

export function useVideoFeed(searchQuery?: string) {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  return useQuery<VideoSummary[]>({
    queryKey: ["videoFeed", searchQuery ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      try {
        let results: BackendVideoSummary[];
        if (searchQuery?.trim()) {
          results = await actor.searchVideos(searchQuery.trim());
        } else {
          results = await actor.listRecentVideos(FEED_LIMIT);
        }
        return results.map(adaptVideoSummary);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to load videos: ${msg}`);
      }
    },
    enabled: !!actor && !actorLoading,
    staleTime: 30_000,
  });
}

export function useVideoById(id: string) {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  return useQuery<(VideoSummary & { videoUrl: string }) | null>({
    queryKey: ["video", id],
    queryFn: async () => {
      if (!actor) return null;
      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        throw new Error("Invalid video ID.");
      }
      try {
        const video = await actor.getVideo(BigInt(numericId));
        if (!video) return null;
        return adaptBackendVideo(video);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to load video: ${msg}`);
      }
    },
    enabled: !!actor && !actorLoading && !!id,
    staleTime: 15_000,
    retry: 1,
  });
}
