import type { backendInterface } from "../backend";
import {
  CollaboratorRole,
  CollectionVisibility,
  InvitationStatus,
  UserRole,
  VideoStatus,
  VideoVisibility,
  ExternalBlob,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toText: () => "mock-user-principal" } as unknown as Principal;

const thumbnailUrl1 = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&h=360&fit=crop";
const thumbnailUrl2 = "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=640&h=360&fit=crop";
const thumbnailUrl3 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=360&fit=crop";
const thumbnailUrl4 = "https://images.unsplash.com/photo-1678995543929-8e0f6e6f3d5b?w=640&h=360&fit=crop";
const thumbnailUrl5 = "https://images.unsplash.com/photo-1684487747720-1ba29cda82fa?w=640&h=360&fit=crop";
const thumbnailUrl6 = "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=640&h=360&fit=crop";

function makeThumbnail(url: string): ExternalBlob {
  return ExternalBlob.fromURL(url);
}

const sampleVideos = [
  {
    id: BigInt(1),
    status: VideoStatus.available,
    title: "Neural Style Transfer: Turning Photos into Art",
    createdAt: BigInt(Date.now() - 3600000),
    description: "How diffusion models transform ordinary photos into stunning artwork",
    thumbnailBlob: makeThumbnail(thumbnailUrl1),
    viewCount: BigInt(142500),
    durationSeconds: BigInt(847),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(2),
    status: VideoStatus.available,
    title: "AI Music Composition: From Prompt to Symphony",
    createdAt: BigInt(Date.now() - 7200000),
    description: "Exploring how generative AI creates full orchestral compositions",
    thumbnailBlob: makeThumbnail(thumbnailUrl2),
    viewCount: BigInt(89300),
    durationSeconds: BigInt(1203),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(3),
    status: VideoStatus.available,
    title: "Real-Time AI Video Upscaling Demo",
    createdAt: BigInt(Date.now() - 14400000),
    description: "Watch 240p footage transformed to stunning 4K using neural networks",
    thumbnailBlob: makeThumbnail(thumbnailUrl3),
    viewCount: BigInt(254100),
    durationSeconds: BigInt(634),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(4),
    status: VideoStatus.available,
    title: "Text-to-3D: The Future of Virtual Worlds",
    createdAt: BigInt(Date.now() - 28800000),
    description: "Building entire 3D environments from natural language descriptions",
    thumbnailBlob: makeThumbnail(thumbnailUrl4),
    viewCount: BigInt(67800),
    durationSeconds: BigInt(925),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(5),
    status: VideoStatus.available,
    title: "AI Animation: Breathing Life into Still Images",
    createdAt: BigInt(Date.now() - 43200000),
    description: "Motion synthesis techniques that animate portrait photos realistically",
    thumbnailBlob: makeThumbnail(thumbnailUrl5),
    viewCount: BigInt(312000),
    durationSeconds: BigInt(742),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(6),
    status: VideoStatus.available,
    title: "Generative Cityscape: 24 Hours of AI Architecture",
    createdAt: BigInt(Date.now() - 86400000),
    description: "A day in the life of an AI-generated city, hour by hour",
    thumbnailBlob: makeThumbnail(thumbnailUrl6),
    viewCount: BigInt(198700),
    durationSeconds: BigInt(1440),
    visibility: VideoVisibility.public_,
    uploaderId: mockPrincipal,
  },
];

const sampleCollaborators = [
  {
    userId: mockPrincipal,
    joinedAt: BigInt(Date.now() - 172800000),
    role: CollaboratorRole.editor,
    videoId: BigInt(1),
  },
];

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "PUT", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true, topped_up_amount: BigInt(0) }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  acceptInvitation: async () => undefined,
  addComment: async () => BigInt(1),
  addVideoToCollection: async () => undefined,
  assignCallerUserRole: async () => undefined,
  canEdit: async () => true,
  createCollection: async () => BigInt(1),
  declineInvitation: async () => undefined,
  deleteCollection: async () => undefined,
  deleteComment: async () => undefined,
  deleteVideo: async () => undefined,
  getCallerUserProfile: async () => ({
    id: mockPrincipal,
    bio: "AI content creator & digital artist",
    displayName: "NeuralVisions",
    createdAt: BigInt(Date.now() - 2592000000),
    updatedAt: BigInt(Date.now() - 86400000),
    profilePicture: undefined,
  }),
  getCallerUserRole: async () => UserRole.user,
  getCollaborator: async () => sampleCollaborators[0],
  getCollection: async () => ({
    id: BigInt(1),
    title: "AI Art Showcase",
    ownerId: mockPrincipal,
    createdAt: BigInt(Date.now() - 1209600000),
    description: "Best AI-generated art and videos",
    updatedAt: BigInt(Date.now() - 86400000),
    visibility: CollectionVisibility.public_,
    videoIds: [BigInt(1), BigInt(2), BigInt(3)],
  }),
  getProfile: async () => ({
    id: mockPrincipal,
    bio: "AI content creator & digital artist",
    displayName: "NeuralVisions",
    createdAt: BigInt(Date.now() - 2592000000),
    updatedAt: BigInt(Date.now() - 86400000),
    profilePicture: undefined,
  }),
  getUserProfile: async () => ({
    id: mockPrincipal,
    bio: "AI enthusiast and creative technologist",
    displayName: "PixelDreamer",
    createdAt: BigInt(Date.now() - 5184000000),
    updatedAt: BigInt(Date.now() - 172800000),
    profilePicture: undefined,
  }),
  getVideo: async () => ({
    ...sampleVideos[0],
    updatedAt: sampleVideos[0].createdAt,
    videoBlob: ExternalBlob.fromURL("https://example.com/sample.mp4"),
  }),
  inviteCollaborator: async () => BigInt(1),
  isCallerAdmin: async () => false,
  listCollaborators: async () => sampleCollaborators,
  listCollectionsByOwner: async () => [],
  listMyCollections: async () => [
    {
      id: BigInt(1),
      title: "AI Art Showcase",
      ownerId: mockPrincipal,
      createdAt: BigInt(Date.now() - 1209600000),
      description: "Best AI-generated art and videos",
      updatedAt: BigInt(Date.now() - 86400000),
      visibility: CollectionVisibility.public_,
      videoIds: [BigInt(1), BigInt(2)],
    },
  ],
  listMyVideos: async () => sampleVideos.slice(0, 3),
  listPendingInvitations: async () => [
    {
      id: BigInt(1),
      status: InvitationStatus.pending,
      expiresAt: BigInt(Date.now() + 604800000),
      createdAt: BigInt(Date.now() - 86400000),
      role: CollaboratorRole.editor,
      inviteeId: mockPrincipal,
      inviterId: mockPrincipal,
      videoId: BigInt(2),
    },
  ],
  listRecentVideos: async () => sampleVideos,
  listTrendingVideos: async () => [...sampleVideos].sort((a, b) => Number(b.viewCount - a.viewCount)),
  listVideoComments: async () => [
    {
      id: BigInt(1),
      authorId: mockPrincipal,
      createdAt: BigInt(Date.now() - 3600000),
      text: "This is absolutely stunning! The level of detail is incredible.",
      timestampSeconds: BigInt(45),
      videoId: BigInt(1),
    },
    {
      id: BigInt(2),
      authorId: mockPrincipal,
      createdAt: BigInt(Date.now() - 7200000),
      text: "What model did you use for this? The color transitions are seamless.",
      timestampSeconds: BigInt(120),
      videoId: BigInt(1),
    },
  ],
  listVideosByUser: async () => sampleVideos.slice(0, 4),
  register: async () => undefined,
  removeVideoFromCollection: async () => undefined,
  revokeCollaborator: async () => undefined,
  saveCallerUserProfile: async () => undefined,
  searchVideos: async () => sampleVideos.slice(0, 3),
  updateCollection: async () => undefined,
  updateProfile: async () => undefined,
  updateVideo: async () => undefined,
  uploadVideo: async () => BigInt(7),
};
