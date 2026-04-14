import { Link } from "@tanstack/react-router";
import { Eye, MessageCircle, Play, Sparkles } from "lucide-react";
import type { VideoSummary } from "../types";
import { Avatar } from "./Avatar";
import { Badge, RoleBadge } from "./Badge";

interface VideoCardProps {
  video: VideoSummary;
  index?: number;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

export function VideoCard({ video, index = 1 }: VideoCardProps) {
  const hasCollaborators =
    video.collaborators && video.collaborators.length > 0;
  const ocid = `video.item.${index}`;

  return (
    <Link
      to="/video/$id"
      params={{ id: video.id }}
      className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-smooth shadow-subtle hover:shadow-elevated"
      data-ocid={ocid}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Play className="w-10 h-10 text-muted-foreground" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-black/30">
          <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated">
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          </span>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-mono font-medium">
          {formatDuration(video.duration)}
        </span>

        {/* Collaborator role badge overlay */}
        {video.myRole && (
          <span className="absolute top-2 right-2">
            <RoleBadge role={video.myRole} />
          </span>
        )}

        {/* Collaborator avatars overlay */}
        {hasCollaborators && (
          <div className="absolute top-2 left-2 flex -space-x-1.5">
            {video.collaborators!.slice(0, 3).map((c) => (
              <Avatar
                key={c.userId}
                name={c.displayName}
                src={c.avatarUrl}
                size="xs"
                className="ring-1 ring-card"
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2 min-w-0">
          <Avatar
            name={video.uploaderName}
            src={video.uploaderAvatarUrl}
            size="sm"
            className="flex-shrink-0 mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {video.uploaderName}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatCount(video.viewCount)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {video.commentCount}
            </span>
          </div>
          {video.aiTool && (
            <Badge variant="ai-tool">
              <Sparkles className="w-2.5 h-2.5" />
              {video.aiTool}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
