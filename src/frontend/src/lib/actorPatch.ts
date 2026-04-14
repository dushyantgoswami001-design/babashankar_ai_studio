/**
 * actorPatch.ts
 *
 * Workaround for a caffeine-bindgen bug where enum members whose keys end with
 * `_` (VideoVisibility.public_, VideoVisibility.private_,
 * CollectionVisibility.public_, CollectionVisibility.private_) are not encoded
 * correctly into Candid variant objects.
 *
 * The generated `to_candid_variant_n57` function compares against
 * `VideoVisibility.public` (which is undefined because the real key is
 * `public_`) and falls through, returning the raw string "public" instead of
 * the required Candid object `{ public: null }`.
 *
 * This module exports helpers that convert VideoVisibility / CollectionVisibility
 * enum values to correctly-shaped Candid variant objects, and a patch function
 * that replaces the broken methods on a Backend instance with correct ones that
 * call the underlying raw Candid actor directly.
 */

import type {
  CollectionId,
  CollectionVisibility,
  CreateCollectionInput,
  CreateVideoInput,
  UpdateCollectionInput,
  UpdateVideoInput,
  VideoId,
  VideoVisibility,
  backendInterface,
} from "../backend.d.ts";
import type {
  CollectionVisibility as _CollectionVisibility,
  CreateCollectionInput as _CreateCollectionInput,
  CreateVideoInput as _CreateVideoInput,
  UpdateCollectionInput as _UpdateCollectionInput,
  UpdateVideoInput as _UpdateVideoInput,
  VideoVisibility as _VideoVisibility,
} from "../declarations/backend.did.d.ts";

// Convert TypeScript VideoVisibility enum value → correct Candid variant object
export function encodeVideoVisibility(v: VideoVisibility): _VideoVisibility {
  const s = v as string;
  if (s === "public") return { public: null };
  if (s === "private") return { private: null };
  if (s === "collaboratorsOnly") return { collaboratorsOnly: null };
  // Fallback — should never happen
  return { public: null };
}

// Convert TypeScript CollectionVisibility enum value → correct Candid variant object
export function encodeCollectionVisibility(
  v: CollectionVisibility,
): _CollectionVisibility {
  const s = v as string;
  if (s === "public") return { public: null };
  if (s === "private") return { private: null };
  // Fallback
  return { public: null };
}

type RawActor = Record<string, (...args: unknown[]) => Promise<unknown>>;
type UploadFn = (blob: unknown) => Promise<Uint8Array>;

/**
 * Patches an actor instance returned by useActor(createActor) to fix the
 * visibility encoding bug. The Backend class stores the raw Candid actor as
 * `this.actor` (private field). We access it at runtime via the prototype
 * chain and override the affected methods.
 */
export function patchActorVisibility(
  actor: backendInterface,
): backendInterface {
  if (!actor) return actor;

  const inst = actor as unknown as Record<string, unknown>;
  const raw = inst.actor as RawActor | undefined;
  const uploadFile = inst._uploadFile as UploadFn | undefined;

  if (!raw || !uploadFile) {
    return actor;
  }

  // Override uploadVideo
  actor.uploadVideo = async (input: CreateVideoInput): Promise<VideoId> => {
    const videoBytes = await uploadFile(input.videoBlob);
    const thumbBytes = input.thumbnailBlob
      ? await uploadFile(input.thumbnailBlob)
      : undefined;
    const candidInput: _CreateVideoInput = {
      title: input.title,
      description: input.description,
      videoBlob: videoBytes,
      thumbnailBlob: thumbBytes ? [thumbBytes] : [],
      durationSeconds: input.durationSeconds,
      visibility: encodeVideoVisibility(input.visibility),
    };
    return raw.uploadVideo(candidInput) as Promise<VideoId>;
  };

  // Override updateVideo
  actor.updateVideo = async (
    id: VideoId,
    input: UpdateVideoInput,
  ): Promise<void> => {
    const candidInput: _UpdateVideoInput = {
      title: input.title,
      description: input.description,
      visibility: encodeVideoVisibility(input.visibility),
    };
    return raw.updateVideo(id, candidInput) as Promise<void>;
  };

  // Override createCollection
  actor.createCollection = async (
    input: CreateCollectionInput,
  ): Promise<CollectionId> => {
    const candidInput: _CreateCollectionInput = {
      title: input.title,
      description: input.description,
      visibility: encodeCollectionVisibility(input.visibility),
    };
    return raw.createCollection(candidInput) as Promise<CollectionId>;
  };

  // Override updateCollection
  actor.updateCollection = async (
    id: CollectionId,
    input: UpdateCollectionInput,
  ): Promise<void> => {
    const candidInput: _UpdateCollectionInput = {
      title: input.title,
      description: input.description,
      visibility: encodeCollectionVisibility(input.visibility),
    };
    return raw.updateCollection(id, candidInput) as Promise<void>;
  };

  return actor;
}
