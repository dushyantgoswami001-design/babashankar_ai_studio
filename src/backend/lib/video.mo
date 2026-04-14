import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Common "../types/common";
import VideoTypes "../types/video";

module {
  public func createVideo(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    nextId : Nat,
    uploaderId : Common.UserId,
    input : VideoTypes.CreateVideoInput,
  ) : (VideoTypes.Video, Nat) {
    let now = Time.now();
    let video : VideoTypes.Video = {
      id = nextId;
      title = input.title;
      description = input.description;
      uploaderId = uploaderId;
      videoBlob = input.videoBlob;
      thumbnailBlob = input.thumbnailBlob;
      durationSeconds = input.durationSeconds;
      visibility = input.visibility;
      status = #available;
      viewCount = 0;
      createdAt = now;
      updatedAt = now;
    };
    videos.add(nextId, video);
    (video, nextId + 1);
  };

  public func getVideo(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    id : Common.VideoId,
  ) : ?VideoTypes.Video {
    videos.get(id);
  };

  public func updateVideo(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    id : Common.VideoId,
    caller : Common.UserId,
    input : VideoTypes.UpdateVideoInput,
    isCollaboratorEditor : Bool,
  ) : () {
    switch (videos.get(id)) {
      case null {};
      case (?video) {
        if (not Principal.equal(video.uploaderId, caller) and not isCollaboratorEditor) {
          Runtime.trap("Unauthorized: Only the owner or an editor collaborator can update this video");
        };
        videos.add(id, { video with
          title = input.title;
          description = input.description;
          visibility = input.visibility;
          updatedAt = Time.now();
        });
      };
    };
  };

  public func deleteVideo(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    id : Common.VideoId,
    caller : Common.UserId,
  ) : () {
    switch (videos.get(id)) {
      case null {};
      case (?video) {
        if (not Principal.equal(video.uploaderId, caller)) {
          Runtime.trap("Unauthorized: Only the video owner can delete this video");
        };
        videos.add(id, { video with status = #deleted; updatedAt = Time.now() });
      };
    };
  };

  public func incrementViewCount(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    id : Common.VideoId,
  ) : () {
    switch (videos.get(id)) {
      case null {};
      case (?video) {
        videos.add(id, { video with viewCount = video.viewCount + 1 });
      };
    };
  };

  public func listRecentVideos(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    caller : ?Common.UserId,
    limit : Nat,
  ) : [VideoTypes.VideoSummary] {
    let results = List.empty<VideoTypes.VideoSummary>();
    for ((_, video) in videos.entries()) {
      if (video.status == #available and canView(video, caller, [])) {
        results.add(toSummary(video));
      };
    };
    let sorted = results.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
    if (sorted.size() > limit) { sorted.truncate(limit) };
    sorted.toArray();
  };

  public func listTrendingVideos(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    caller : ?Common.UserId,
    limit : Nat,
  ) : [VideoTypes.VideoSummary] {
    let results = List.empty<VideoTypes.VideoSummary>();
    for ((_, video) in videos.entries()) {
      if (video.status == #available and canView(video, caller, [])) {
        results.add(toSummary(video));
      };
    };
    let sorted = results.sort(func(a, b) = Nat.compare(b.viewCount, a.viewCount));
    if (sorted.size() > limit) { sorted.truncate(limit) };
    sorted.toArray();
  };

  public func searchVideos(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    caller : ?Common.UserId,
    searchTerm : Text,
  ) : [VideoTypes.VideoSummary] {
    let lower = searchTerm.toLower();
    let results = List.empty<VideoTypes.VideoSummary>();
    for ((_, video) in videos.entries()) {
      if (
        video.status == #available and
        canView(video, caller, []) and
        (video.title.toLower().contains(#text lower) or video.description.toLower().contains(#text lower))
      ) {
        results.add(toSummary(video));
      };
    };
    results.toArray();
  };

  public func listVideosByUploader(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    uploaderId : Common.UserId,
    caller : ?Common.UserId,
  ) : [VideoTypes.VideoSummary] {
    let results = List.empty<VideoTypes.VideoSummary>();
    for ((_, video) in videos.entries()) {
      if (
        video.status == #available and
        Principal.equal(video.uploaderId, uploaderId) and
        canView(video, caller, [])
      ) {
        results.add(toSummary(video));
      };
    };
    let sorted = results.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
    sorted.toArray();
  };

  public func toSummary(video : VideoTypes.Video) : VideoTypes.VideoSummary {
    {
      id = video.id;
      title = video.title;
      description = video.description;
      uploaderId = video.uploaderId;
      thumbnailBlob = video.thumbnailBlob;
      durationSeconds = video.durationSeconds;
      visibility = video.visibility;
      status = video.status;
      viewCount = video.viewCount;
      createdAt = video.createdAt;
    };
  };

  public func canView(
    video : VideoTypes.Video,
    caller : ?Common.UserId,
    collaboratorUserIds : [Common.UserId],
  ) : Bool {
    switch (video.visibility) {
      case (#public_) { true };
      case (#private_) {
        switch (caller) {
          case null { false };
          case (?c) { Principal.equal(c, video.uploaderId) };
        };
      };
      case (#collaboratorsOnly) {
        switch (caller) {
          case null { false };
          case (?c) {
            if (Principal.equal(c, video.uploaderId)) { return true };
            collaboratorUserIds.any(func(uid) { Principal.equal(uid, c) });
          };
        };
      };
    };
  };
};
