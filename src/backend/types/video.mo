import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type VideoVisibility = {
    #public_;
    #private_;
    #collaboratorsOnly;
  };

  public type VideoStatus = {
    #available;
    #deleted;
  };

  public type Video = {
    id : Common.VideoId;
    title : Text;
    description : Text;
    uploaderId : Common.UserId;
    videoBlob : Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    durationSeconds : Nat;
    visibility : VideoVisibility;
    status : VideoStatus;
    viewCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type VideoSummary = {
    id : Common.VideoId;
    title : Text;
    description : Text;
    uploaderId : Common.UserId;
    thumbnailBlob : ?Storage.ExternalBlob;
    durationSeconds : Nat;
    visibility : VideoVisibility;
    status : VideoStatus;
    viewCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type CreateVideoInput = {
    title : Text;
    description : Text;
    videoBlob : Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    durationSeconds : Nat;
    visibility : VideoVisibility;
  };

  public type UpdateVideoInput = {
    title : Text;
    description : Text;
    visibility : VideoVisibility;
  };
};
