import type { Principal } from "@icp-sdk/core/principal";

// ─── Identity / Auth ────────────────────────────────────────────────────────

export type VideoId = string;
export type UserId = string;
export type CollectionId = string;
export type CommentId = string;

// ─── Collaboration roles ─────────────────────────────────────────────────────

export type CollaboratorRole = "owner" | "editor" | "viewer";

export interface Collaborator {
  userId: UserId;
  principal: Principal;
  role: CollaboratorRole;
  displayName: string;
  avatarUrl?: string;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: UserId;
  principal: Principal;
  displayName: string;
  handle: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  subscriberCount: number;
  videoCount: number;
  createdAt: number;
}

// ─── Video ────────────────────────────────────────────────────────────────────

export type VideoStatus = "processing" | "published" | "draft" | "unlisted";
export type AITool =
  | "Sora"
  | "Runway"
  | "Pika"
  | "Kling"
  | "HeyGen"
  | "Synthesia"
  | "Other";

export interface VideoSummary {
  id: VideoId;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number; // seconds
  viewCount: number;
  likeCount: number;
  commentCount: number;
  uploaderName: string;
  uploaderAvatarUrl?: string;
  uploaderId: UserId;
  aiTool?: AITool;
  status: VideoStatus;
  collaborators?: Collaborator[];
  myRole?: CollaboratorRole;
  createdAt: number;
  updatedAt: number;
}

export interface VideoDetail extends VideoSummary {
  videoUrl: string;
  tags: string[];
  isPublic: boolean;
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface Collection {
  id: CollectionId;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoIds: VideoId[];
  ownerId: UserId;
  ownerName: string;
  collaborators: Collaborator[];
  createdAt: number;
  updatedAt: number;
}

// ─── Comment ──────────────────────────────────────────────────────────────────

export interface Comment {
  id: CommentId;
  videoId: VideoId;
  authorId: UserId;
  authorName: string;
  authorAvatarUrl?: string;
  content: string;
  createdAt: number;
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
}
