import { u as useActor, c as createActor } from "./backend-C7xtEXGZ.js";
import { u as useQueryClient, a as useQuery } from "./index-BWY2Fo0g.js";
import { u as useMutation } from "./useMutation-CUXAg1RN.js";
import { u as ue } from "./index-JwsgApHh.js";
function useMyVideos(isAuthenticated) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myVideos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyVideos();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 3e4
  });
}
function usePendingInvitations(isAuthenticated) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pendingInvitations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingInvitations();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useAcceptInvitation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.acceptInvitation(invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
      queryClient.invalidateQueries({ queryKey: ["myVideos"] });
    },
    onError: (err) => {
      ue.error(
        err instanceof Error ? `Failed to accept invitation: ${err.message}` : "Failed to accept invitation. Please try again."
      );
    }
  });
}
function useDeclineInvitation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.declineInvitation(invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      ue.error(
        err instanceof Error ? `Failed to decline invitation: ${err.message}` : "Failed to decline invitation. Please try again."
      );
    }
  });
}
function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.updateProfile({
        displayName: input.displayName,
        bio: input.bio
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      ue.error(
        err instanceof Error ? `Failed to update profile: ${err.message}` : "Failed to update profile. Please try again."
      );
    }
  });
}
export {
  useMyVideos as a,
  usePendingInvitations as b,
  useAcceptInvitation as c,
  useDeclineInvitation as d,
  useUpdateProfile as u
};
