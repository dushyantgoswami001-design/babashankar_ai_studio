import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import VideoTypes "types/video";
import CollectionTypes "types/collection";
import CollabTypes "types/collaboration";
import CommentTypes "types/comment";
import UserTypes "types/user";
import VideoMixin "mixins/video-api";
import CollectionMixin "mixins/collection-api";
import CollaborationMixin "mixins/collaboration-api";
import CommentMixin "mixins/comment-api";
import UserMixin "mixins/user-api";

actor {
  // --- Infrastructure ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // --- State ---
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let videos = Map.empty<Common.VideoId, VideoTypes.Video>();
  let collections = Map.empty<Common.CollectionId, CollectionTypes.Collection>();
  let collaborators = Map.empty<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>();
  let invitations = Map.empty<Common.InvitationId, CollabTypes.CollaborationInvitation>();
  let comments = Map.empty<Common.CommentId, CommentTypes.Comment>();

  let videoIdCounter : Common.Counter = { var value = 0 };
  let collectionIdCounter : Common.Counter = { var value = 0 };
  let invitationIdCounter : Common.Counter = { var value = 0 };
  let commentIdCounter : Common.Counter = { var value = 0 };

  // --- Mixins ---
  include UserMixin(accessControlState, profiles);
  include VideoMixin(accessControlState, videos, collaborators, videoIdCounter);
  include CollectionMixin(accessControlState, collections, collectionIdCounter);
  include CollaborationMixin(accessControlState, videos, collaborators, invitations, invitationIdCounter);
  include CommentMixin(accessControlState, videos, comments, commentIdCounter);
};
