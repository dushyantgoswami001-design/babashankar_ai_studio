import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "../types";

const SEED_PROFILES: Record<string, UserProfile> = {
  u1: {
    id: "u1",
    principal: {} as never,
    displayName: "Aria K.",
    handle: "@aria_creates",
    bio: "AI video artist exploring the boundaries of generative storytelling.",
    avatarUrl: "",
    subscriberCount: 4820,
    videoCount: 23,
    createdAt: Date.now() - 86400000 * 90,
  },
  u2: {
    id: "u2",
    principal: {} as never,
    displayName: "Chloe L.",
    handle: "@chloe_lab",
    bio: "Marketing innovator using AI to automate visual storytelling.",
    avatarUrl: "",
    subscriberCount: 2100,
    videoCount: 11,
    createdAt: Date.now() - 86400000 * 60,
  },
};

export function useProfile(userId: string) {
  return useQuery<UserProfile | null>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      // Will be wired to actor.getProfile(userId) when backend is connected
      await new Promise((r) => setTimeout(r, 200));
      return SEED_PROFILES[userId] ?? null;
    },
    enabled: !!userId,
  });
}

export function useMyProfile(principalText: string | null) {
  return useQuery<UserProfile | null>({
    queryKey: ["myProfile", principalText],
    queryFn: async () => {
      if (!principalText) return null;
      await new Promise((r) => setTimeout(r, 200));
      return SEED_PROFILES.u1 ?? null;
    },
    enabled: !!principalText,
    staleTime: 60_000,
  });
}
