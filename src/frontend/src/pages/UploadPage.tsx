import { ExternalBlob, VideoVisibility, createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { patchActorVisibility } from "@/lib/actorPatch";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Film,
  Globe,
  ImageIcon,
  Lock,
  Upload,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB
const MAX_VIDEO_SIZE_LABEL = "500 MB";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "An unexpected error occurred.";
  }
}

type VisibilityOption = {
  value: VideoVisibility;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const VISIBILITY_OPTIONS: VisibilityOption[] = [
  {
    value: VideoVisibility.public_,
    label: "Public",
    description: "Anyone can watch",
    icon: Globe,
  },
  {
    value: VideoVisibility.private_,
    label: "Private",
    description: "Only you",
    icon: Lock,
  },
  {
    value: VideoVisibility.collaboratorsOnly,
    label: "Collaborators",
    description: "Invited members only",
    icon: Users,
  },
];

// ─── Dropzone ─────────────────────────────────────────────────────────────────

interface DropzoneProps {
  accept: string;
  onFile: (file: File) => void;
  file: File | null;
  onClear: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  subLabel: string;
  dataOcid: string;
  disabled?: boolean;
  hasError?: boolean;
}

function Dropzone({
  accept,
  onFile,
  file,
  onClear,
  icon: Icon,
  label,
  subLabel,
  dataOcid,
  disabled,
  hasError,
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files[0];
      if (dropped) onFile(dropped);
    },
    [onFile, disabled],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) onFile(picked);
    e.target.value = "";
  };

  if (file) {
    return (
      <div
        className="flex items-center gap-3 p-4 rounded-xl border border-primary/40 bg-primary/5"
        data-ocid={`${dataOcid}_preview`}
      >
        <Icon className="h-8 w-8 text-primary shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatBytes(file.size)}
          </p>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Remove file"
            data-ocid={`${dataOcid}_clear_button`}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
        data-ocid={`${dataOcid}_input`}
      />
      <button
        type="button"
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        disabled={disabled}
        className={[
          "w-full flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed transition-smooth",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : hasError
              ? "border-destructive/60 bg-destructive/5 hover:border-destructive/80"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
        data-ocid={`${dataOcid}_dropzone`}
      >
        <Icon
          className={`h-9 w-9 ${hasError ? "text-destructive/70" : "text-muted-foreground"}`}
        />
        <div className="text-center space-y-1">
          <p
            className={`text-sm font-medium ${hasError ? "text-destructive" : "text-foreground"}`}
          >
            {label}
          </p>
          <p className="text-xs text-muted-foreground">{subLabel}</p>
        </div>
      </button>
    </>
  );
}

// ─── Inline Alert ─────────────────────────────────────────────────────────────

interface InlineAlertProps {
  variant: "error" | "warning";
  title: string;
  message: string;
  dataOcid: string;
}

function InlineAlert({ variant, title, message, dataOcid }: InlineAlertProps) {
  const isError = variant === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className={[
        "flex items-start gap-3 p-4 rounded-xl border",
        isError
          ? "bg-destructive/10 border-destructive/30"
          : "bg-amber-500/10 border-amber-500/30",
      ].join(" ")}
      role="alert"
      aria-live="polite"
      data-ocid={dataOcid}
    >
      {isError ? (
        <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
      )}
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold ${isError ? "text-destructive" : "text-amber-700 dark:text-amber-400"}`}
        >
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 break-words">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type UploadPhase = "idle" | "reading" | "uploading" | "saving" | "done";

export default function UploadPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useCurrentUser();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor ? patchActorVisibility(rawActor) : null;

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<VideoVisibility>(
    VideoVisibility.public_,
  );
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");
  const [thumbWarning, setThumbWarning] = useState<string | null>(null);

  // Validation errors shown inline (distinct from mutation errors)
  const [validationError, setValidationError] = useState<string | null>(null);

  // ─── Validation ────────────────────────────────────────────────────────────

  const validateVideoFile = (file: File): string | null => {
    if (!file.type.startsWith("video/")) {
      return `"${file.name}" is not a video file. Please select an MP4 or WebM video.`;
    }
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      return `This video is ${formatBytes(file.size)}, which exceeds the ${MAX_VIDEO_SIZE_LABEL} limit. Please compress or trim it before uploading.`;
    }
    return null;
  };

  const handleVideoFile = (file: File) => {
    const err = validateVideoFile(file);
    if (err) {
      setValidationError(err);
      setVideoFile(null);
      return;
    }
    setValidationError(null);
    setVideoFile(file);
  };

  // ─── Upload mutation ────────────────────────────────────────────────────────

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!actor)
        throw new Error(
          "Not connected to the backend. Please refresh the page and try again.",
        );
      if (!videoFile)
        throw new Error("Please select a video file before uploading.");
      if (!title.trim()) throw new Error("Please add a title for your video.");

      // Re-validate in case file was somehow set bypassing handleVideoFile
      const validationErr = validateVideoFile(videoFile);
      if (validationErr) throw new Error(validationErr);

      setUploadPhase("reading");
      setVideoProgress(0);
      setThumbProgress(0);
      setThumbWarning(null);

      // Step 1 — Read video bytes
      let videoBytes: Uint8Array<ArrayBuffer>;
      try {
        videoBytes = new Uint8Array(
          await videoFile.arrayBuffer(),
        ) as Uint8Array<ArrayBuffer>;
      } catch (err) {
        throw new Error(
          `Failed to read the video file. The file may be corrupted or inaccessible. (${extractErrorMessage(err)})`,
        );
      }

      // Step 2 — Create video ExternalBlob
      let videoBlob: ExternalBlob;
      try {
        videoBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress(
          (pct) => setVideoProgress(pct),
        );
      } catch (err) {
        throw new Error(
          `Failed to prepare the video for upload. Please try again. (${extractErrorMessage(err)})`,
        );
      }

      setUploadPhase("uploading");

      // Step 3 — Read and prepare thumbnail (optional — failure shows warning, not hard error)
      let thumbnailBlob: ExternalBlob | undefined;
      if (thumbFile) {
        try {
          const thumbBytes = new Uint8Array(await thumbFile.arrayBuffer());
          thumbnailBlob = ExternalBlob.fromBytes(thumbBytes).withUploadProgress(
            (pct) => setThumbProgress(pct),
          );
        } catch (err) {
          // Thumbnail failure is non-fatal — warn, continue without it
          setThumbWarning(
            `Thumbnail could not be read (${extractErrorMessage(err)}). Your video will be saved without a thumbnail.`,
          );
          thumbnailBlob = undefined;
        }
      }

      setUploadPhase("saving");

      // Step 4 — Call backend
      let videoId: bigint;
      try {
        videoId = await actor.uploadVideo({
          title: title.trim(),
          description: description.trim(),
          videoBlob,
          thumbnailBlob,
          durationSeconds: BigInt(0),
          visibility,
        });
      } catch (err) {
        const msg = extractErrorMessage(err);
        throw new Error(
          msg && msg !== "An unexpected error occurred."
            ? `Upload failed: ${msg}`
            : "Upload failed. Please check your connection and try again.",
        );
      }

      return videoId;
    },
    onSuccess: (videoId) => {
      setUploadPhase("done");
      if (thumbWarning) {
        toast.warning("Video uploaded — thumbnail was skipped.");
      } else {
        toast.success("Video uploaded successfully!");
      }
      navigate({ to: "/video/$id", params: { id: String(videoId) } });
    },
    onError: () => {
      setUploadPhase("idle");
      setVideoProgress(0);
      setThumbProgress(0);
      // Error is shown via the inline banner — no additional toast needed
    },
  });

  // ─── Loading state ────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // ─── Auth guard ───────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
        data-ocid="upload.auth_required"
      >
        <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
          <Lock className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Sign in to upload
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            You need to be signed in to share your AI-generated videos with the
            community.
          </p>
        </div>
        <Button
          size="lg"
          onClick={login}
          data-ocid="upload.login_button"
          className="min-w-[200px] gap-2"
        >
          Sign in with Internet Identity
        </Button>
      </motion.div>
    );
  }

  // ─── Upload form ──────────────────────────────────────────────────────────

  const isUploading = uploadMutation.isPending;
  const canSubmit =
    !!videoFile && title.trim().length > 0 && !isUploading && !validationError;

  const overallProgress = thumbFile
    ? Math.round(videoProgress * 0.7 + thumbProgress * 0.3)
    : videoProgress;

  const phaseLabel: Record<UploadPhase, string> = {
    idle: "",
    reading: "Reading file…",
    uploading: "Uploading files…",
    saving: "Saving to the network…",
    done: "Done!",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-10"
      data-ocid="upload.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/"
          search={{ q: undefined }}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="upload.back_link"
          aria-label="Back to feed"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Upload Video
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Share your AI-generated creation with the community
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Clear previous mutation error and validate before submitting
          uploadMutation.reset();
          if (!videoFile) {
            setValidationError("Please select a video file before uploading.");
            return;
          }
          if (!title.trim()) {
            setValidationError("Please add a title for your video.");
            return;
          }
          if (canSubmit) uploadMutation.mutate();
        }}
        className="space-y-7"
      >
        {/* Inline error banners — top of form for maximum visibility */}
        <AnimatePresence mode="wait">
          {uploadMutation.isError && (
            <InlineAlert
              key="mutation-error"
              variant="error"
              title="Upload failed"
              message={
                uploadMutation.error instanceof Error
                  ? uploadMutation.error.message
                  : "An unexpected error occurred. Please try again."
              }
              dataOcid="upload.error_state"
            />
          )}
          {validationError && !uploadMutation.isError && (
            <InlineAlert
              key="validation-error"
              variant="error"
              title="Cannot upload"
              message={validationError}
              dataOcid="upload.validation_error"
            />
          )}
          {thumbWarning && !uploadMutation.isError && (
            <InlineAlert
              key="thumb-warning"
              variant="warning"
              title="Thumbnail skipped"
              message={thumbWarning}
              dataOcid="upload.thumbnail_warning"
            />
          )}
        </AnimatePresence>

        {/* Video file dropzone */}
        <section className="space-y-2.5">
          <Label className="text-sm font-semibold">
            Video file <span className="text-destructive">*</span>
          </Label>
          <Dropzone
            accept="video/mp4,video/webm,video/*"
            onFile={handleVideoFile}
            file={videoFile}
            onClear={() => {
              setVideoFile(null);
              setVideoProgress(0);
              setValidationError(null);
            }}
            icon={Film}
            label="Drop your video here or click to browse"
            subLabel={`MP4 or WebM · Max ${MAX_VIDEO_SIZE_LABEL}`}
            dataOcid="upload.video"
            disabled={isUploading}
            hasError={!!validationError && !videoFile}
          />
        </section>

        {/* Title */}
        <section className="space-y-2">
          <Label htmlFor="upload-title" className="text-sm font-semibold">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="upload-title"
            placeholder="Give your video a compelling title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            disabled={isUploading}
            data-ocid="upload.title_input"
          />
          <p className="text-xs text-muted-foreground text-right">
            {title.length} / 120
          </p>
        </section>

        {/* Description */}
        <section className="space-y-2">
          <Label htmlFor="upload-desc" className="text-sm font-semibold">
            Description{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </Label>
          <Textarea
            id="upload-desc"
            placeholder="Describe the AI tools, prompts, or creative process behind this video…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={2000}
            disabled={isUploading}
            className="resize-none"
            data-ocid="upload.description_textarea"
          />
          <p className="text-xs text-muted-foreground text-right">
            {description.length} / 2000
          </p>
        </section>

        {/* Visibility */}
        <section className="space-y-3">
          <Label className="text-sm font-semibold">Visibility</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VISIBILITY_OPTIONS.map(
              ({ value, label, description: desc, icon: Icon }) => {
                const active = visibility === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    disabled={isUploading}
                    onClick={() => setVisibility(value)}
                    data-ocid={`upload.visibility_${label.toLowerCase().replace(/\s+/g, "_")}`}
                    className={[
                      "flex flex-col gap-1.5 p-4 rounded-xl border-2 text-left transition-smooth",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-muted/30",
                      isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span
                        className={`text-sm font-medium ${active ? "text-primary" : "text-foreground"}`}
                      >
                        {label}
                      </span>
                      {active && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary ml-auto shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </button>
                );
              },
            )}
          </div>
        </section>

        {/* Thumbnail */}
        <section className="space-y-2.5">
          <Label className="text-sm font-semibold">
            Thumbnail{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </Label>
          <Dropzone
            accept="image/jpeg,image/png,image/webp"
            onFile={setThumbFile}
            file={thumbFile}
            onClear={() => {
              setThumbFile(null);
              setThumbProgress(0);
            }}
            icon={ImageIcon}
            label="Drop a thumbnail image or click to browse"
            subLabel="JPEG, PNG or WebP · Recommended 1280×720"
            dataOcid="upload.thumbnail"
            disabled={isUploading}
          />
        </section>

        {/* Upload progress */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 p-4 rounded-xl bg-card border border-border overflow-hidden"
              data-ocid="upload.loading_state"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm font-medium text-foreground flex-1">
                  {phaseLabel[uploadPhase]}
                </p>
                {uploadPhase === "uploading" || uploadPhase === "saving" ? (
                  <Badge variant="outline" className="text-xs tabular-nums">
                    {overallProgress}%
                  </Badge>
                ) : null}
              </div>
              {(uploadPhase === "uploading" || uploadPhase === "saving") && (
                <Progress value={overallProgress} className="h-1.5" />
              )}
              {thumbFile && uploadPhase === "uploading" && (
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                  <div className="flex justify-between">
                    <span>Video</span>
                    <span className="text-foreground tabular-nums">
                      {videoProgress}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thumbnail</span>
                    <span className="text-foreground tabular-nums">
                      {thumbProgress}%
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button
            type="submit"
            disabled={!canSubmit}
            size="lg"
            className="flex-1 gap-2 font-semibold"
            data-ocid="upload.submit_button"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading…" : "Publish Video"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={isUploading}
            onClick={() => navigate({ to: "/", search: { q: undefined } })}
            data-ocid="upload.cancel_button"
          >
            Cancel
          </Button>
        </div>

        {!canSubmit &&
          !isUploading &&
          !validationError &&
          !uploadMutation.isError && (
            <p className="text-xs text-muted-foreground text-center -mt-3">
              {!videoFile && !title.trim()
                ? "Select a video and add a title to continue"
                : !videoFile
                  ? "Select a video file to continue"
                  : "Add a title to continue"}
            </p>
          )}
      </form>
    </motion.div>
  );
}
