import Common "common";

module {
  public type CollectionVisibility = {
    #public_;
    #private_;
  };

  public type Collection = {
    id : Common.CollectionId;
    ownerId : Common.UserId;
    title : Text;
    description : Text;
    videoIds : [Common.VideoId];
    visibility : CollectionVisibility;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateCollectionInput = {
    title : Text;
    description : Text;
    visibility : CollectionVisibility;
  };

  public type UpdateCollectionInput = {
    title : Text;
    description : Text;
    visibility : CollectionVisibility;
  };
};
