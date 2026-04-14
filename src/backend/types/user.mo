import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    displayName : Text;
    bio : Text;
    profilePicture : ?Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type SaveProfileInput = {
    displayName : Text;
    bio : Text;
    profilePicture : ?Storage.ExternalBlob;
  };
};
