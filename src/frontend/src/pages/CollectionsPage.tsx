import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookMarked,
  Check,
  ChevronDown,
  ChevronRight,
  Edit2,
  Film,
  Globe,
  Lock,
  MoreHorizontal,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { VideoCard } from "../components/VideoCard";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { Collection, VideoSummary } from "../types";

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_COLLECTIONS: Collection[] = [
  {
    id: "c1",
    title: "AI Cinematics",
    description: "Best cinematic sequences generated with Sora and Runway",
    videoIds: ["v1", "v3"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "c2",
    title: "Marketing Showcase",
    description: "AI-driven marketing content for campaigns",
    videoIds: ["v2"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 5,
  },
  {
    id: "c3",
    title: "Collab Experiments",
    description: "Multi-collaborator creative experiments",
    videoIds: ["v4", "v5", "v6"],
    ownerId: "u1",
    ownerName: "Aria K.",
    collaborators: [],
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 7,
  },
];

const SEED_VIDEOS: VideoSummary[] = [
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
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
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
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: "v3",
    title: "Synthesized Music Video Teaser",
    description: "Music video concept using AI visuals with generative audio.",
    thumbnailUrl: "/assets/generated/thumb-music.dim_640x360.jpg",
    duration: 94,
    viewCount: 21000,
    likeCount: 1320,
    commentCount: 92,
    uploaderName: "Aria K.",
    uploaderId: "u1",
    aiTool: "HeyGen",
    status: "published",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
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
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 4,
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
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 5,
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
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 6,
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

type Visibility = "public" | "private";

interface CollectionFormState {
  title: string;
  description: string;
  visibility: Visibility;
}

// ─── Hooks (simulated, wired to actor in production) ─────────────────────────

function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return SEED_COLLECTIONS;
    },
    staleTime: 30_000,
  });
}

function useMyVideos() {
  return useQuery<VideoSummary[]>({
    queryKey: ["myVideos"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return SEED_VIDEOS;
    },
    staleTime: 60_000,
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface CollectionModalProps {
  initial?: { title: string; description: string; visibility: Visibility };
  onConfirm: (form: CollectionFormState) => void;
  onClose: () => void;
  mode: "create" | "edit";
}

function CollectionModal({
  initial,
  onConfirm,
  onClose,
  mode,
}: CollectionModalProps) {
  const [form, setForm] = useState<CollectionFormState>(
    initial ?? { title: "", description: "", visibility: "private" },
  );

  const set =
    (k: keyof CollectionFormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="collections.dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />
      <dialog
        aria-label={mode === "create" ? "Create collection" : "Edit collection"}
        open
        className="relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md p-6 space-y-5 z-10 m-0"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">
            {mode === "create" ? "New Collection" : "Edit Collection"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Close"
            data-ocid="collections.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="col-title"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Title *
            </label>
            <input
              id="col-title"
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="My awesome collection"
              className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="collections.title_input"
            />
          </div>

          <div>
            <label
              htmlFor="col-desc"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Description
            </label>
            <textarea
              id="col-desc"
              value={form.description}
              onChange={set("description")}
              placeholder="What's this collection about?"
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
              data-ocid="collections.description_textarea"
            />
          </div>

          <div>
            <label
              htmlFor="col-vis"
              className="block text-xs font-medium text-muted-foreground mb-1.5"
            >
              Visibility
            </label>
            <select
              id="col-vis"
              value={form.visibility}
              onChange={set("visibility")}
              className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="collections.visibility_select"
            >
              <option value="private">Private — only you</option>
              <option value="public">Public — anyone can view</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-smooth"
            data-ocid="collections.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(form)}
            disabled={!form.title.trim()}
            className="flex-1 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid="collections.confirm_button"
          >
            {mode === "create" ? "Create" : "Save Changes"}
          </button>
        </div>
      </dialog>
    </div>
  );
}

interface AddVideoPickerProps {
  existingVideoIds: string[];
  allVideos: VideoSummary[];
  onAdd: (videoId: string) => void;
  onClose: () => void;
}

function AddVideoPicker({
  existingVideoIds,
  allVideos,
  onAdd,
  onClose,
}: AddVideoPickerProps) {
  const available = allVideos.filter((v) => !existingVideoIds.includes(v.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="collections.add_video_dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />
      <dialog
        aria-label="Add video to collection"
        open
        className="relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-lg p-6 space-y-4 z-10 m-0"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">
            Add Video
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Close"
            data-ocid="collections.add_video_close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {available.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            All your videos are already in this collection.
          </p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {available.map((video, i) => (
              <li key={video.id}>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary transition-smooth cursor-pointer group text-left"
                  onClick={() => onAdd(video.id)}
                  data-ocid={`collections.add_video_item.${i + 1}`}
                >
                  <div className="w-16 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {video.aiTool}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </div>
  );
}

interface CollectionCardProps {
  collection: Collection;
  index: number;
  videos: VideoSummary[];
  onEdit: () => void;
  onDelete: () => void;
  onAddVideo: () => void;
  onRemoveVideo: (videoId: string) => void;
}

function CollectionCard({
  collection,
  index,
  videos,
  onEdit,
  onDelete,
  onAddVideo,
  onRemoveVideo,
}: CollectionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const collectionVideos = videos.filter((v) =>
    collection.videoIds.includes(v.id),
  );

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden transition-smooth hover:border-primary/30"
      data-ocid={`collections.item.${index}`}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Thumbnail mosaic */}
          <div className="w-20 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 flex-shrink-0 flex items-center justify-center">
            {collectionVideos[0]?.thumbnailUrl ? (
              <img
                src={collectionVideos[0].thumbnailUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <BookMarked className="w-7 h-7 text-primary/40" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-foreground leading-tight truncate">
                {collection.title}
              </h3>
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                  aria-label="Collection options"
                  data-ocid={`collections.options_button.${index}`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                      onKeyDown={(e) =>
                        e.key === "Escape" && setMenuOpen(false)
                      }
                      role="presentation"
                    />
                    <div
                      className="absolute right-0 top-8 z-20 bg-popover border border-border rounded-xl shadow-elevated py-1 min-w-[140px]"
                      data-ocid={`collections.dropdown_menu.${index}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onEdit();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        data-ocid={`collections.edit_button.${index}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onDelete();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        data-ocid={`collections.delete_button.${index}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {collection.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {collection.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Film className="w-3 h-3" />
                {collection.videoIds.length} video
                {collection.videoIds.length !== 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                {collection.videoIds.length > 0 ? (
                  <Globe className="w-3 h-3" />
                ) : (
                  <Lock className="w-3 h-3" />
                )}
                Public
              </span>
            </div>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 rounded-lg hover:bg-muted"
          data-ocid={`collections.expand_button.${index}`}
        >
          {expanded ? (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Hide videos
            </>
          ) : (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              Show {collection.videoIds.length} video
              {collection.videoIds.length !== 1 ? "s" : ""}
            </>
          )}
        </button>
      </div>

      {/* Expanded: videos */}
      {expanded && (
        <div className="border-t border-border bg-background/40 p-4 space-y-4">
          {collectionVideos.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No videos in this collection yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {collectionVideos.map((video, vi) => (
                <div
                  key={video.id}
                  className="relative group"
                  data-ocid={`collections.video_item.${vi + 1}`}
                >
                  <VideoCard video={video} index={vi + 1} />
                  <button
                    type="button"
                    onClick={() => onRemoveVideo(video.id)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive"
                    aria-label={`Remove "${video.title}" from collection`}
                    data-ocid={`collections.remove_video_button.${vi + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onAddVideo}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth"
            data-ocid={`collections.add_video_button.${index}`}
          >
            <Plus className="w-4 h-4" />
            Add video
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const { isAuthenticated, login } = useCurrentUser();
  const queryClient = useQueryClient();

  const { data: collections = [], isLoading } = useCollections();
  const { data: myVideos = [] } = useMyVideos();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );
  const [addVideoForCollection, setAddVideoForCollection] = useState<
    string | null
  >(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Local state mutations (in production these call actor)
  const createMutation = useMutation({
    mutationFn: async (form: CollectionFormState) => {
      await new Promise((r) => setTimeout(r, 300));
      return form;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setShowCreateModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (_form: CollectionFormState & { id: string }) => {
      await new Promise((r) => setTimeout(r, 300));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setEditingCollection(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (_id: string) => {
      await new Promise((r) => setTimeout(r, 200));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setDeleteConfirm(null);
    },
  });

  const handleRemoveVideo = useCallback(
    (_collectionId: string, _videoId: string) => {
      // actor.removeVideoFromCollection(collectionId, videoId)
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    [queryClient],
  );

  const handleAddVideo = useCallback(
    (_collectionId: string, _videoId: string) => {
      // actor.addVideoToCollection(collectionId, videoId)
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setAddVideoForCollection(null);
    },
    [queryClient],
  );

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
        <BookMarked className="w-12 h-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Your Collections
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Sign in to create and manage your video collections.
          </p>
        </div>
        <button
          type="button"
          onClick={login}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
          data-ocid="collections.login_button"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-ocid="collections.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-primary" />
            Collections
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your AI videos into curated collections
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle"
          data-ocid="collections.create_button"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-16"
          data-ocid="collections.loading_state"
        >
          <LoadingSpinner size="md" label="Loading collections…" />
        </div>
      ) : collections.length === 0 ? (
        <EmptyState
          icon={<BookMarked className="w-7 h-7" />}
          title="No collections yet"
          description="Create your first collection to organize your AI-generated videos."
          action={
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
              data-ocid="collections.empty_create_button"
            >
              Create Collection
            </button>
          }
          data-ocid="collections.empty_state"
        />
      ) : (
        <div className="space-y-4" data-ocid="collections.list">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              collection={col}
              index={i + 1}
              videos={myVideos}
              onEdit={() => setEditingCollection(col)}
              onDelete={() => setDeleteConfirm(col.id)}
              onAddVideo={() => setAddVideoForCollection(col.id)}
              onRemoveVideo={(videoId) => handleRemoveVideo(col.id, videoId)}
            />
          ))}
        </div>
      )}

      {/* Create modal */}
      {showCreateModal && (
        <CollectionModal
          mode="create"
          onConfirm={(form) => createMutation.mutate(form)}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit modal */}
      {editingCollection && (
        <CollectionModal
          mode="edit"
          initial={{
            title: editingCollection.title,
            description: editingCollection.description ?? "",
            visibility: "public",
          }}
          onConfirm={(form) =>
            updateMutation.mutate({ ...form, id: editingCollection.id })
          }
          onClose={() => setEditingCollection(null)}
        />
      )}

      {/* Add video picker */}
      {addVideoForCollection && (
        <AddVideoPicker
          existingVideoIds={
            collections.find((c) => c.id === addVideoForCollection)?.videoIds ??
            []
          }
          allVideos={myVideos}
          onAdd={(videoId) => handleAddVideo(addVideoForCollection, videoId)}
          onClose={() => setAddVideoForCollection(null)}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="collections.delete_dialog"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
            onKeyDown={(e) => e.key === "Escape" && setDeleteConfirm(null)}
            role="presentation"
          />
          <div className="relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm p-6 z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">
                  Delete Collection
                </h3>
                <p className="text-sm text-muted-foreground">
                  This cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-smooth"
                data-ocid="collections.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deleteConfirm)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50"
                data-ocid="collections.confirm_button"
              >
                {deleteMutation.isPending ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 animate-spin" />
                    Deleting…
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
