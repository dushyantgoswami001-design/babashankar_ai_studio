import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  /// Get the caller's own profile (returns null if not set up yet)
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getCallerProfile(profiles, caller);
  };

  /// Save/update the caller's profile
  public shared ({ caller }) func saveCallerUserProfile(input : UserTypes.SaveProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    UserLib.saveProfile(profiles, caller, input);
  };

  /// Get a user's public profile by ID
  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    UserLib.getProfile(profiles, userId);
  };

  /// Register caller as a user (auto-register on first login)
  public shared ({ caller }) func register() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must authenticate before registering");
    };
    switch (profiles.get(caller)) {
      case (?_) {}; // already registered, no-op
      case null {
        UserLib.saveProfile(profiles, caller, {
          displayName = "";
          bio = "";
          profilePicture = null;
        });
      };
    };
  };

  /// Get the caller's own profile (alias for dashboard)
  public query ({ caller }) func getProfile() : async ?UserTypes.UserProfile {
    UserLib.getCallerProfile(profiles, caller);
  };

  /// Update caller profile
  public shared ({ caller }) func updateProfile(input : UserTypes.SaveProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update profile");
    };
    UserLib.saveProfile(profiles, caller, input);
  };
};
