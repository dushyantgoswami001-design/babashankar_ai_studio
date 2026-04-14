import type { CollaboratorRole } from "../types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "role" | "ai-tool" | "status" | "default";
  role?: CollaboratorRole;
  className?: string;
}

const roleStyles: Record<CollaboratorRole, string> = {
  owner: "bg-primary/20 text-primary border border-primary/40",
  editor: "bg-accent/20 text-accent border border-accent/40",
  viewer: "bg-muted text-muted-foreground border border-border",
};

const roleLabels: Record<CollaboratorRole, string> = {
  owner: "Owner",
  editor: "Editor",
  viewer: "Viewer",
};

export function Badge({
  children,
  variant = "default",
  role,
  className = "",
}: BadgeProps) {
  let styles =
    "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap";

  if (variant === "role" && role) {
    styles += ` ${roleStyles[role]} animate-pulse-accent`;
  } else if (variant === "ai-tool") {
    styles += " bg-primary/10 text-primary border border-primary/30";
  } else if (variant === "status") {
    styles += " bg-muted text-muted-foreground border border-border";
  } else {
    styles += " bg-secondary text-secondary-foreground";
  }

  return <span className={`${styles} ${className}`}>{children}</span>;
}

export function RoleBadge({ role }: { role: CollaboratorRole }) {
  return (
    <Badge variant="role" role={role}>
      {roleLabels[role]}
    </Badge>
  );
}
