import { u as useActor, c as createActor } from "./backend-C7xtEXGZ.js";
import { a as useQuery, K as Principal, aj as JSON_KEY_PRINCIPAL, ak as base32Decode, al as base32Encode, am as getCrc32 } from "./index-BWY2Fo0g.js";
function adaptVideoSummary(v) {
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
    aiTool: void 0,
    status: "published",
    createdAt: Number(v.createdAt / 1000000n),
    // nanoseconds → ms
    updatedAt: Number(v.createdAt / 1000000n)
  };
}
function adaptBackendVideo(v) {
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
    aiTool: void 0,
    status: "published",
    createdAt: Number(v.createdAt / 1000000n),
    updatedAt: Number(v.updatedAt / 1000000n)
  };
}
const FEED_LIMIT = BigInt(24);
function useVideoFeed(searchQuery) {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  return useQuery({
    queryKey: ["videoFeed", searchQuery ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      try {
        let results;
        if (searchQuery == null ? void 0 : searchQuery.trim()) {
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
    staleTime: 3e4
  });
}
function useVideoById(id) {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  return useQuery({
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
    staleTime: 15e3,
    retry: 1
  });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
export {
  useVideoById as a,
  index as i,
  useVideoFeed as u
};
