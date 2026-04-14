import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import UserTypes "../types/user";

module {
  public func saveProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    input : UserTypes.SaveProfileInput,
  ) : () {
    let now = Time.now();
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with
          displayName = input.displayName;
          bio = input.bio;
          profilePicture = input.profilePicture;
          updatedAt = now;
        });
      };
      case null {
        profiles.add(userId, {
          id = userId;
          displayName = input.displayName;
          bio = input.bio;
          profilePicture = input.profilePicture;
          createdAt = now;
          updatedAt = now;
        });
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func getCallerProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(caller);
  };
};
