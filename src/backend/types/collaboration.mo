import Common "common";

module {
  public type CollaboratorRole = {
    #editor;
    #viewer;
  };

  public type InvitationStatus = {
    #pending;
    #accepted;
    #declined;
    #expired;
    #revoked;
  };

  public type Collaborator = {
    userId : Common.UserId;
    videoId : Common.VideoId;
    role : CollaboratorRole;
    joinedAt : Common.Timestamp;
  };

  public type CollaborationInvitation = {
    id : Common.InvitationId;
    videoId : Common.VideoId;
    inviterId : Common.UserId;
    inviteeId : Common.UserId;
    role : CollaboratorRole;
    status : InvitationStatus;
    createdAt : Common.Timestamp;
    expiresAt : Common.Timestamp;
  };
};
