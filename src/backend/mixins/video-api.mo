import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import VideoTypes "../types/video";
import CollabTypes "../types/collaboration";
import VideoLib "../lib/video";
import CollabLib "../lib/collaboration";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
  nextVideoId : Common.Counter,
) {
  /// Upload a new AI-generated video
  public shared ({ caller }) func uploadVideo(input : VideoTypes.CreateVideoInput) : async Common.VideoId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to upload videos");
    };
    let (video, newId) = VideoLib.createVideo(videos, nextVideoId.value, caller, input);
    nextVideoId.value := newId;
    video.id;
  };

  /// Get full video details (increments view count)
  public shared ({ caller }) func getVideo(id : Common.VideoId) : async ?VideoTypes.Video {
    switch (videos.get(id)) {
      case null { null };
      case (?video) {
        if (video.status == #deleted) { return null };
        let collabList = CollabLib.listCollaborators(collaborators, id);
        let collabIds = collabList.map(func(c : CollabTypes.Collaborator) : Common.UserId { c.userId });
        let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
        if (not VideoLib.canView(video, callerOpt, collabIds)) {
          return null;
        };
        VideoLib.incrementViewCount(videos, id);
        videos.get(id);
      };
    };
  };

  /// Update video title, description, or visibility
  public shared ({ caller }) func updateVideo(id : Common.VideoId, input : VideoTypes.UpdateVideoInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update videos");
    };
    let isEditor = switch (CollabLib.getCollaborator(collaborators, id, caller)) {
      case (?(c)) { c.role == #editor };
      case null { false };
    };
    VideoLib.updateVideo(videos, id, caller, input, isEditor);
  };

  /// Soft-delete a video (marks as unavailable)
  public shared ({ caller }) func deleteVideo(id : Common.VideoId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete videos");
    };
    VideoLib.deleteVideo(videos, id, caller);
  };

  /// Browse recently uploaded public videos
  public query ({ caller }) func listRecentVideos(limit : Nat) : async [VideoTypes.VideoSummary] {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    VideoLib.listRecentVideos(videos, callerOpt, limit);
  };

  /// Browse trending public videos by view count
  public query ({ caller }) func listTrendingVideos(limit : Nat) : async [VideoTypes.VideoSummary] {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    VideoLib.listTrendingVideos(videos, callerOpt, limit);
  };

  /// Search videos by title or description
  public query ({ caller }) func searchVideos(searchTerm : Text) : async [VideoTypes.VideoSummary] {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    VideoLib.searchVideos(videos, callerOpt, searchTerm);
  };

  /// List videos by a specific uploader
  public query ({ caller }) func listVideosByUser(uploaderId : Common.UserId) : async [VideoTypes.VideoSummary] {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    VideoLib.listVideosByUploader(videos, uploaderId, callerOpt);
  };

  /// List videos the caller uploaded (for dashboard)
  public query ({ caller }) func listMyVideos() : async [VideoTypes.VideoSummary] {
    VideoLib.listVideosByUploader(videos, caller, ?caller);
  };

  /// Check whether caller can edit a specific video
  public query ({ caller }) func canEdit(videoId : Common.VideoId) : async Bool {
    switch (videos.get(videoId)) {
      case null { false };
      case (?video) {
        if (Principal.equal(video.uploaderId, caller)) { return true };
        switch (CollabLib.getCollaborator(collaborators, videoId, caller)) {
          case (?(c)) { c.role == #editor };
          case null { false };
        };
      };
    };
  };
};
