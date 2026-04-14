import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Common "../types/common";
import CollectionTypes "../types/collection";

module {
  public func createCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    nextId : Nat,
    ownerId : Common.UserId,
    input : CollectionTypes.CreateCollectionInput,
  ) : (CollectionTypes.Collection, Nat) {
    let now = Time.now();
    let collection : CollectionTypes.Collection = {
      id = nextId;
      ownerId = ownerId;
      title = input.title;
      description = input.description;
      videoIds = [];
      visibility = input.visibility;
      createdAt = now;
      updatedAt = now;
    };
    collections.add(nextId, collection);
    (collection, nextId + 1);
  };

  public func getCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    id : Common.CollectionId,
    caller : ?Common.UserId,
  ) : ?CollectionTypes.Collection {
    switch (collections.get(id)) {
      case null { null };
      case (?col) {
        switch (col.visibility) {
          case (#public_) { ?col };
          case (#private_) {
            switch (caller) {
              case null { null };
              case (?c) {
                if (Principal.equal(c, col.ownerId)) { ?col } else { null };
              };
            };
          };
        };
      };
    };
  };

  public func updateCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    id : Common.CollectionId,
    caller : Common.UserId,
    input : CollectionTypes.UpdateCollectionInput,
  ) : () {
    switch (collections.get(id)) {
      case null {};
      case (?col) {
        if (not Principal.equal(col.ownerId, caller)) {
          Runtime.trap("Unauthorized: Only the collection owner can update it");
        };
        collections.add(id, { col with
          title = input.title;
          description = input.description;
          visibility = input.visibility;
          updatedAt = Time.now();
        });
      };
    };
  };

  public func deleteCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    id : Common.CollectionId,
    caller : Common.UserId,
  ) : () {
    switch (collections.get(id)) {
      case null {};
      case (?col) {
        if (not Principal.equal(col.ownerId, caller)) {
          Runtime.trap("Unauthorized: Only the collection owner can delete it");
        };
        collections.remove(id);
      };
    };
  };

  public func addVideoToCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    collectionId : Common.CollectionId,
    videoId : Common.VideoId,
    caller : Common.UserId,
  ) : () {
    switch (collections.get(collectionId)) {
      case null {};
      case (?col) {
        if (not Principal.equal(col.ownerId, caller)) {
          Runtime.trap("Unauthorized: Only the collection owner can add videos");
        };
        let alreadyIn = col.videoIds.any(func(vid) { vid == videoId });
        if (not alreadyIn) {
          collections.add(collectionId, { col with
            videoIds = col.videoIds.concat([videoId]);
            updatedAt = Time.now();
          });
        };
      };
    };
  };

  public func removeVideoFromCollection(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    collectionId : Common.CollectionId,
    videoId : Common.VideoId,
    caller : Common.UserId,
  ) : () {
    switch (collections.get(collectionId)) {
      case null {};
      case (?col) {
        if (not Principal.equal(col.ownerId, caller)) {
          Runtime.trap("Unauthorized: Only the collection owner can remove videos");
        };
        let filtered = col.videoIds.filter(func(vid) { vid != videoId });
        collections.add(collectionId, { col with videoIds = filtered; updatedAt = Time.now() });
      };
    };
  };

  public func listCollectionsByOwner(
    collections : Map.Map<Common.CollectionId, CollectionTypes.Collection>,
    ownerId : Common.UserId,
    caller : ?Common.UserId,
  ) : [CollectionTypes.Collection] {
    let results = List.empty<CollectionTypes.Collection>();
    for ((_, col) in collections.entries()) {
      if (Principal.equal(col.ownerId, ownerId)) {
        let visible = switch (col.visibility) {
          case (#public_) { true };
          case (#private_) {
            switch (caller) {
              case null { false };
              case (?c) { Principal.equal(c, ownerId) };
            };
          };
        };
        if (visible) { results.add(col) };
      };
    };
    let sorted = results.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
    sorted.toArray();
  };
};
