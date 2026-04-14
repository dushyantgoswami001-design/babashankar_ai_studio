import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CollabTypes "../types/collaboration";
import VideoTypes "../types/video";
import CollabLib "../lib/collaboration";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
  invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
  nextInvitationId : Common.Counter,
) {
  /// Invite a user to collaborate on a video
  public shared ({ caller }) func inviteCollaborator(
    videoId : Common.VideoId,
    inviteeId : Common.UserId,
    role : CollabTypes.CollaboratorRole,
  ) : async Common.InvitationId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to invite collaborators");
    };
    // Only the video owner can invite
    switch (videos.get(videoId)) {
      case null { Runtime.trap("Video not found") };
      case (?video) {
        if (not Principal.equal(video.uploaderId, caller)) {
          Runtime.trap("Unauthorized: Only the video owner can invite collaborators");
        };
      };
    };
    let (inv, newId) = CollabLib.inviteCollaborator(invitations, collaborators, nextInvitationId.value, videoId, caller, inviteeId, role);
    nextInvitationId.value := newId;
    inv.id;
  };

  /// Accept a collaboration invitation
  public shared ({ caller }) func acceptInvitation(invitationId : Common.InvitationId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to accept invitations");
    };
    CollabLib.acceptInvitation(invitations, collaborators, invitationId, caller);
  };

  /// Decline a collaboration invitation
  public shared ({ caller }) func declineInvitation(invitationId : Common.InvitationId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to decline invitations");
    };
    CollabLib.declineInvitation(invitations, invitationId, caller);
  };

  /// Revoke a collaborator's access from a video
  public shared ({ caller }) func revokeCollaborator(videoId : Common.VideoId, targetUserId : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to revoke collaborators");
    };
    switch (videos.get(videoId)) {
      case null { Runtime.trap("Video not found") };
      case (?video) {
        if (not Principal.equal(video.uploaderId, caller)) {
          Runtime.trap("Unauthorized: Only the video owner can revoke collaborators");
        };
      };
    };
    CollabLib.revokeCollaborator(collaborators, invitations, videoId, targetUserId, caller);
  };

  /// Get a specific collaborator on a video
  public query ({ caller }) func getCollaborator(videoId : Common.VideoId, userId : Common.UserId) : async ?CollabTypes.Collaborator {
    CollabLib.getCollaborator(collaborators, videoId, userId);
  };

  /// List all active collaborators on a video
  public query ({ caller }) func listCollaborators(videoId : Common.VideoId) : async [CollabTypes.Collaborator] {
    CollabLib.listCollaborators(collaborators, videoId);
  };

  /// List pending invitations for the caller
  public query ({ caller }) func listPendingInvitations() : async [CollabTypes.CollaborationInvitation] {
    CollabLib.listPendingInvitations(invitations, caller);
  };
};
