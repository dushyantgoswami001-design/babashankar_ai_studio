import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CommentTypes "../types/comment";
import VideoTypes "../types/video";
import CommentLib "../lib/comment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  comments : Map.Map<Common.CommentId, CommentTypes.Comment>,
  nextCommentId : Common.Counter,
) {
  /// Leave a timestamped comment on a video
  public shared ({ caller }) func addComment(input : CommentTypes.CreateCommentInput) : async Common.CommentId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to comment");
    };
    let (comment, newId) = CommentLib.addComment(comments, nextCommentId.value, caller, input);
    nextCommentId.value := newId;
    comment.id;
  };

  /// Delete a comment (own comment or video uploader can delete any)
  public shared ({ caller }) func deleteComment(commentId : Common.CommentId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete comments");
    };
    switch (comments.get(commentId)) {
      case null { Runtime.trap("Comment not found") };
      case (?comment) {
        let uploaderId = switch (videos.get(comment.videoId)) {
          case null { Principal.fromText("2vxsx-fae") }; // fallback anonymous; won't match
          case (?video) { video.uploaderId };
        };
        CommentLib.deleteComment(comments, commentId, caller, uploaderId);
      };
    };
  };

  /// List all comments on a video
  public query ({ caller }) func listVideoComments(videoId : Common.VideoId) : async [CommentTypes.Comment] {
    CommentLib.listCommentsForVideo(comments, videoId);
  };
};
