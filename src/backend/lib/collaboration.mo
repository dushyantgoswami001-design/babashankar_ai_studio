import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Common "../types/common";
import CollabTypes "../types/collaboration";

module {
  // Compare function for tuple key (VideoId, UserId) = (Nat, Principal)
  public func videoUserCompare(a : (Common.VideoId, Common.UserId), b : (Common.VideoId, Common.UserId)) : Order.Order {
    let vidCmp = Nat.compare(a.0, b.0);
    if (vidCmp != #equal) { vidCmp } else { Principal.compare(a.1, b.1) };
  };
  // 30 days in nanoseconds (pre-computed literal)
  public let INVITATION_TTL_NANOS : Int = 2_592_000_000_000_000;

  public func inviteCollaborator(
    invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
    _collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
    nextId : Nat,
    videoId : Common.VideoId,
    inviterId : Common.UserId,
    inviteeId : Common.UserId,
    role : CollabTypes.CollaboratorRole,
  ) : (CollabTypes.CollaborationInvitation, Nat) {
    let now = Time.now();
    let invitation : CollabTypes.CollaborationInvitation = {
      id = nextId;
      videoId = videoId;
      inviterId = inviterId;
      inviteeId = inviteeId;
      role = role;
      status = #pending;
      createdAt = now;
      expiresAt = now + INVITATION_TTL_NANOS;
    };
    invitations.add(nextId, invitation);
    (invitation, nextId + 1);
  };

  public func acceptInvitation(
    invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
    collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
    invitationId : Common.InvitationId,
    caller : Common.UserId,
  ) : () {
    switch (invitations.get(invitationId)) {
      case null { Runtime.trap("Invitation not found") };
      case (?inv) {
        if (not Principal.equal(inv.inviteeId, caller)) {
          Runtime.trap("Unauthorized: Only the invitee can accept this invitation");
        };
        if (inv.status != #pending) {
          Runtime.trap("Invitation is no longer pending");
        };
        if (isExpired(inv)) {
          invitations.add(invitationId, { inv with status = #expired });
          Runtime.trap("Invitation has expired");
        };
        invitations.add(invitationId, { inv with status = #accepted });
        collaborators.add(videoUserCompare, (inv.videoId, caller), {
          userId = caller;
          videoId = inv.videoId;
          role = inv.role;
          joinedAt = Time.now();
        });
      };
    };
  };

  public func declineInvitation(
    invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
    invitationId : Common.InvitationId,
    caller : Common.UserId,
  ) : () {
    switch (invitations.get(invitationId)) {
      case null { Runtime.trap("Invitation not found") };
      case (?inv) {
        if (not Principal.equal(inv.inviteeId, caller)) {
          Runtime.trap("Unauthorized: Only the invitee can decline this invitation");
        };
        if (inv.status != #pending) {
          Runtime.trap("Invitation is no longer pending");
        };
        invitations.add(invitationId, { inv with status = #declined });
      };
    };
  };

  public func revokeCollaborator(
    collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
    invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
    videoId : Common.VideoId,
    targetUserId : Common.UserId,
    _caller : Common.UserId,
  ) : () {
    collaborators.remove(videoUserCompare, (videoId, targetUserId));
    // Mark any accepted invitations as revoked — collect IDs first to avoid mutating during iteration
    let toRevoke = List.empty<Common.InvitationId>();
    for ((id, inv) in invitations.entries()) {
      if (
        inv.videoId == videoId and
        Principal.equal(inv.inviteeId, targetUserId) and
        inv.status == #accepted
      ) {
        toRevoke.add(id);
      };
    };
    for (id in toRevoke.values()) {
      switch (invitations.get(id)) {
        case null {};
        case (?inv) { invitations.add(id, { inv with status = #revoked }) };
      };
    };
  };

  public func getCollaborator(
    collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
    videoId : Common.VideoId,
    userId : Common.UserId,
  ) : ?CollabTypes.Collaborator {
    collaborators.get(videoUserCompare, (videoId, userId));
  };

  public func listCollaborators(
    collaborators : Map.Map<(Common.VideoId, Common.UserId), CollabTypes.Collaborator>,
    videoId : Common.VideoId,
  ) : [CollabTypes.Collaborator] {
    let results = List.empty<CollabTypes.Collaborator>();
    for (((vid, _), collab) in collaborators.entries()) {
      if (vid == videoId) {
        results.add(collab);
      };
    };
    results.toArray();
  };

  public func listPendingInvitations(
    invitations : Map.Map<Common.InvitationId, CollabTypes.CollaborationInvitation>,
    inviteeId : Common.UserId,
  ) : [CollabTypes.CollaborationInvitation] {
    let results = List.empty<CollabTypes.CollaborationInvitation>();
    for ((_, inv) in invitations.entries()) {
      if (Principal.equal(inv.inviteeId, inviteeId) and inv.status == #pending and not isExpired(inv)) {
        results.add(inv);
      };
    };
    results.toArray();
  };

  public func isExpired(invitation : CollabTypes.CollaborationInvitation) : Bool {
    Time.now() > invitation.expiresAt;
  };
};
