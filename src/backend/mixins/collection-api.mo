import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CollectionTypes "../types/collection";
import CollectionLib "../lib/collection";

mixin (
  accessControlState : AccessControl.AccessControlState,
  collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
  nextCollectionId : Common.Counter,
) {
  /// Create a new video collection
  public shared ({ caller }) func createCollection(input : CollectionTypes.CreateCollectionInput) : async Common.CollectionId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create collections");
    };
    let (col, newId) = CollectionLib.createCollection(collections, nextCollectionId.value, caller, input);
    nextCollectionId.value := newId;
    col.id;
  };

  /// Get a collection by ID
  public query ({ caller }) func getCollection(id : Common.CollectionId) : async ?CollectionTypes.Collection {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    CollectionLib.getCollection(collections, id, callerOpt);
  };

  /// Update collection metadata
  public shared ({ caller }) func updateCollection(id : Common.CollectionId, input : CollectionTypes.UpdateCollectionInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update collections");
    };
    CollectionLib.updateCollection(collections, id, caller, input);
  };

  /// Delete a collection
  public shared ({ caller }) func deleteCollection(id : Common.CollectionId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete collections");
    };
    CollectionLib.deleteCollection(collections, id, caller);
  };

  /// Add a video to a collection
  public shared ({ caller }) func addVideoToCollection(collectionId : Common.CollectionId, videoId : Common.VideoId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify collections");
    };
    CollectionLib.addVideoToCollection(collections, collectionId, videoId, caller);
  };

  /// Remove a video from a collection
  public shared ({ caller }) func removeVideoFromCollection(collectionId : Common.CollectionId, videoId : Common.VideoId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify collections");
    };
    CollectionLib.removeVideoFromCollection(collections, collectionId, videoId, caller);
  };

  /// List collections owned by a specific user
  public query ({ caller }) func listCollectionsByOwner(ownerId : Common.UserId) : async [CollectionTypes.Collection] {
    let callerOpt : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    CollectionLib.listCollectionsByOwner(collections, ownerId, callerOpt);
  };

  /// List collections the caller owns
  public query ({ caller }) func listMyCollections() : async [CollectionTypes.Collection] {
    CollectionLib.listCollectionsByOwner(collections, caller, ?caller);
  };
};
