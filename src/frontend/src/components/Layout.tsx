import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Bell,
  BookMarked,
  Clapperboard,
  HardDrive,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useMyProfile } from "../hooks/useProfile";
import { Avatar } from "./Avatar";
import { LoadingSpinner } from "./LoadingSpinner";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Studio", href: "/upload", icon: Clapperboard },
  { label: "Collaboration", href: "/invite", icon: Users },
  { label: "Library", href: "/collections", icon: BookMarked },
  { label: "Team Drive", href: "/collections", icon: HardDrive },
  { label: "Settings", href: "/profile/me", icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    principalText,
  } = useCurrentUser();
  const { data: myProfile } = useMyProfile(principalText);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate({ to: "/", search: { q: searchValue.trim() } });
    }
  };

  const displayName =
    myProfile?.displayName ??
    (principalText ? `${principalText.slice(0, 8)}…` : "");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle flex-shrink-0">
        <div className="flex items-center h-14 px-4 gap-3">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            search={{ q: undefined }}
            className="flex items-center gap-2 flex-shrink-0 group"
            data-ocid="nav.logo_link"
          >
            <span className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block group-hover:text-primary transition-colors">
              Vida
              <span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search AI video projects, creators, tools..."
                className="w-full pl-9 pr-4 py-2 rounded-full bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                data-ocid="nav.search_input"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Notifications"
                  data-ocid="nav.notifications_button"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                </button>

                <Link
                  to="/upload"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle"
                  data-ocid="nav.upload_button"
                >
                  <Plus className="w-4 h-4" />
                  Upload & Create
                </Link>
              </>
            )}

            {/* Auth */}
            {isInitializing ? (
              <LoadingSpinner size="sm" />
            ) : isAuthenticated ? (
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full hover:bg-secondary transition-colors p-1"
                  aria-label="User menu"
                  data-ocid="nav.user_menu_button"
                >
                  <Avatar
                    name={displayName}
                    src={myProfile?.avatarUrl}
                    size="sm"
                  />
                  <span className="hidden md:block text-sm font-medium text-foreground max-w-[80px] truncate">
                    {displayName}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-50">
                  <div className="p-1">
                    <Link
                      to="/profile/$userId"
                      params={{ userId: "me" }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-secondary transition-colors"
                      data-ocid="nav.profile_link"
                    >
                      <Avatar name={displayName} size="xs" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-secondary transition-colors"
                      data-ocid="nav.dashboard_link"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <div className="my-1 border-t border-border" />
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-destructive rounded-lg hover:bg-destructive/10 transition-colors w-full text-left"
                      data-ocid="nav.logout_button"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={login}
                disabled={isLoggingIn}
                className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 shadow-subtle"
                data-ocid="nav.login_button"
              >
                {isLoggingIn ? "Signing in…" : "Sign in"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-56 bg-card border-r border-border flex flex-col
            transform transition-transform duration-300 pt-14
            lg:static lg:translate-x-0 lg:flex
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Upload CTA in sidebar */}
          {isAuthenticated && (
            <div className="p-3 border-t border-border">
              <Link
                to="/upload"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth shadow-subtle"
                data-ocid="sidebar.upload_button"
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </Link>
            </div>
          )}
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            role="presentation"
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto min-w-0">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
