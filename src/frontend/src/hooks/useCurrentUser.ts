import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useCurrentUser() {
  const {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
    loginStatus,
  } = useInternetIdentity();

  const queryClient = useQueryClient();

  const principal = identity?.getPrincipal() ?? null;
  const principalText = principal?.toString() ?? null;

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return {
    identity,
    principal,
    principalText,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoading: isInitializing || isLoggingIn,
    login: handleLogin,
    logout: handleLogout,
    loginStatus,
  };
}
