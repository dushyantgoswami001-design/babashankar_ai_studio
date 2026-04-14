import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Common "../types/common";
import CommentTypes "../types/comment";

module {
  public func addComment(
    comments : Map.Map<Common.CommentId, CommentTypes.Comment>,
    nextId : Nat,
    authorId : Common.UserId,
    input : CommentTypes.CreateCommentInput,
  ) : (CommentTypes.Comment, Nat) {
    let comment : CommentTypes.Comment = {
      id = nextId;
      videoId = input.videoId;
      authorId = authorId;
      text = input.text;
      timestampSeconds = input.timestampSeconds;
      createdAt = Time.now();
    };
    comments.add(nextId, comment);
    (comment, nextId + 1);
  };

  public func deleteComment(
    comments : Map.Map<Common.CommentId, CommentTypes.Comment>,
    commentId : Common.CommentId,
    caller : Common.UserId,
    videoUploaderId : Common.UserId,
  ) : () {
    switch (comments.get(commentId)) {
      case null {};
      case (?comment) {
        let isAuthor = Principal.equal(comment.authorId, caller);
        let isVideoOwner = Principal.equal(videoUploaderId, caller);
        if (not isAuthor and not isVideoOwner) {
          Runtime.trap("Unauthorized: Only the comment author or video owner can delete this comment");
        };
        comments.remove(commentId);
      };
    };
  };

  public func listCommentsForVideo(
    comments : Map.Map<Common.CommentId, CommentTypes.Comment>,
    videoId : Common.VideoId,
  ) : [CommentTypes.Comment] {
    let results = List.empty<CommentTypes.Comment>();
    for ((_, comment) in comments.entries()) {
      if (comment.videoId == videoId) {
        results.add(comment);
      };
    };
    let sorted = results.sort(func(a, b) = Int.compare(a.createdAt, b.createdAt));
    sorted.toArray();
  };
};
