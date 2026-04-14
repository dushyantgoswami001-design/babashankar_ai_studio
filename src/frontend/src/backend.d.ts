import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: VideoId;
    status: VideoStatus;
    title: string;
    createdAt: Timestamp;
    description: string;
    videoBlob: ExternalBlob;
    thumbnailBlob?: ExternalBlob;
    updatedAt: Timestamp;
    viewCount: bigint;
    durationSeconds: bigint;
    visibility: VideoVisibility;
    uploaderId: UserId;
}
export type Timestamp = bigint;
export interface CreateCommentInput {
    text: string;
    timestampSeconds: bigint;
    videoId: VideoId;
}
export interface VideoSummary {
    id: VideoId;
    status: VideoStatus;
    title: string;
    createdAt: Timestamp;
    description: string;
    thumbnailBlob?: ExternalBlob;
    viewCount: bigint;
    durationSeconds: bigint;
    visibility: VideoVisibility;
    uploaderId: UserId;
}
export interface UpdateCollectionInput {
    title: string;
    description: string;
    visibility: CollectionVisibility;
}
export interface CreateVideoInput {
    title: string;
    description: string;
    videoBlob: ExternalBlob;
    thumbnailBlob?: ExternalBlob;
    durationSeconds: bigint;
    visibility: VideoVisibility;
}
export interface CollaborationInvitation {
    id: InvitationId;
    status: InvitationStatus;
    expiresAt: Timestamp;
    createdAt: Timestamp;
    role: CollaboratorRole;
    inviteeId: UserId;
    inviterId: UserId;
    videoId: VideoId;
}
export interface UpdateVideoInput {
    title: string;
    description: string;
    visibility: VideoVisibility;
}
export interface Collaborator {
    userId: UserId;
    joinedAt: Timestamp;
    role: CollaboratorRole;
    videoId: VideoId;
}
export type VideoId = bigint;
export type CollectionId = bigint;
export interface SaveProfileInput {
    bio: string;
    displayName: string;
    profilePicture?: ExternalBlob;
}
export interface CreateCollectionInput {
    title: string;
    description: string;
    visibility: CollectionVisibility;
}
export type CommentId = bigint;
export interface Comment {
    id: CommentId;
    authorId: UserId;
    createdAt: Timestamp;
    text: string;
    timestampSeconds: bigint;
    videoId: VideoId;
}
export type UserId = Principal;
export interface Collection {
    id: CollectionId;
    title: string;
    ownerId: UserId;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    visibility: CollectionVisibility;
    videoIds: Array<VideoId>;
}
export interface UserProfile {
    id: UserId;
    bio: string;
    displayName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    profilePicture?: ExternalBlob;
}
export type InvitationId = bigint;
export enum CollaboratorRole {
    editor = "editor",
    viewer = "viewer"
}
export enum CollectionVisibility {
    public_ = "public",
    private_ = "private"
}
export enum InvitationStatus {
    revoked = "revoked",
    expired = "expired",
    pending = "pending",
    accepted = "accepted",
    declined = "declined"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VideoStatus {
    deleted = "deleted",
    available = "available"
}
export enum VideoVisibility {
    public_ = "public",
    private_ = "private",
    collaboratorsOnly = "collaboratorsOnly"
}
export interface backendInterface {
    acceptInvitation(invitationId: InvitationId): Promise<void>;
    addComment(input: CreateCommentInput): Promise<CommentId>;
    addVideoToCollection(collectionId: CollectionId, videoId: VideoId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    canEdit(videoId: VideoId): Promise<boolean>;
    createCollection(input: CreateCollectionInput): Promise<CollectionId>;
    declineInvitation(invitationId: InvitationId): Promise<void>;
    deleteCollection(id: CollectionId): Promise<void>;
    deleteComment(commentId: CommentId): Promise<void>;
    deleteVideo(id: VideoId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCollaborator(videoId: VideoId, userId: UserId): Promise<Collaborator | null>;
    getCollection(id: CollectionId): Promise<Collection | null>;
    getProfile(): Promise<UserProfile | null>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    getVideo(id: VideoId): Promise<Video | null>;
    inviteCollaborator(videoId: VideoId, inviteeId: UserId, role: CollaboratorRole): Promise<InvitationId>;
    isCallerAdmin(): Promise<boolean>;
    listCollaborators(videoId: VideoId): Promise<Array<Collaborator>>;
    listCollectionsByOwner(ownerId: UserId): Promise<Array<Collection>>;
    listMyCollections(): Promise<Array<Collection>>;
    listMyVideos(): Promise<Array<VideoSummary>>;
    listPendingInvitations(): Promise<Array<CollaborationInvitation>>;
    listRecentVideos(limit: bigint): Promise<Array<VideoSummary>>;
    listTrendingVideos(limit: bigint): Promise<Array<VideoSummary>>;
    listVideoComments(videoId: VideoId): Promise<Array<Comment>>;
    listVideosByUser(uploaderId: UserId): Promise<Array<VideoSummary>>;
    register(): Promise<void>;
    removeVideoFromCollection(collectionId: CollectionId, videoId: VideoId): Promise<void>;
    revokeCollaborator(videoId: VideoId, targetUserId: UserId): Promise<void>;
    saveCallerUserProfile(input: SaveProfileInput): Promise<void>;
    searchVideos(searchTerm: string): Promise<Array<VideoSummary>>;
    updateCollection(id: CollectionId, input: UpdateCollectionInput): Promise<void>;
    updateProfile(input: SaveProfileInput): Promise<void>;
    updateVideo(id: VideoId, input: UpdateVideoInput): Promise<void>;
    uploadVideo(input: CreateVideoInput): Promise<VideoId>;
}
