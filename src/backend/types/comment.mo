import Common "common";

module {
  public type Comment = {
    id : Common.CommentId;
    videoId : Common.VideoId;
    authorId : Common.UserId;
    text : Text;
    timestampSeconds : Nat;
    createdAt : Common.Timestamp;
  };

  public type CreateCommentInput = {
    videoId : Common.VideoId;
    text : Text;
    timestampSeconds : Nat;
  };
};
