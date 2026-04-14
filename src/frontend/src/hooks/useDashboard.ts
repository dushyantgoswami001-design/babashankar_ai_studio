import type { CollaborationInvitation, VideoSummary } from "@/backend";
import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── My Videos ────────────────────────────────────────────────────────────────

export function useMyVideos(isAuthenticated: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoSummary[]>({
    queryKey: ["myVideos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyVideos();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Videos by User (for ProfilePage) ────────────────────────────────────────

export function useVideosByUser(userId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoSummary[]>({
    queryKey: ["videosByUser", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.listVideosByUser(userId);
    },
    enabled: !!userId && !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Pending Invitations ──────────────────────────────────────────────────────

export function usePendingInvitations(isAuthenticated: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CollaborationInvitation[]>({
    queryKey: ["pendingInvitations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingInvitations();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 15_000,
  });
}

// ─── Accept Invitation ────────────────────────────────────────────────────────

export function useAcceptInvitation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId: bigint) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.acceptInvitation(invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
      queryClient.invalidateQueries({ queryKey: ["myVideos"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error
          ? `Failed to accept invitation: ${err.message}`
          : "Failed to accept invitation. Please try again.",
      );
    },
  });
}

// ─── Decline Invitation ───────────────────────────────────────────────────────

export function useDeclineInvitation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId: bigint) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.declineInvitation(invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingInvitations"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error
          ? `Failed to decline invitation: ${err.message}`
          : "Failed to decline invitation. Please try again.",
      );
    },
  });
}

// ─── Update Profile ───────────────────────────────────────────────────────────

export function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { displayName: string; bio: string }) => {
      if (!actor)
        throw new Error("Not connected to the backend. Please try again.");
      return actor.updateProfile({
        displayName: input.displayName,
        bio: input.bio,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error
          ? `Failed to update profile: ${err.message}`
          : "Failed to update profile. Please try again.",
      );
    },
  });
}
