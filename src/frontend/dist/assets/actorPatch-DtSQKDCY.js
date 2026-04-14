function encodeVideoVisibility(v) {
  const s = v;
  if (s === "public") return { public: null };
  if (s === "private") return { private: null };
  if (s === "collaboratorsOnly") return { collaboratorsOnly: null };
  return { public: null };
}
function encodeCollectionVisibility(v) {
  const s = v;
  if (s === "public") return { public: null };
  if (s === "private") return { private: null };
  return { public: null };
}
function patchActorVisibility(actor) {
  if (!actor) return actor;
  const inst = actor;
  const raw = inst.actor;
  const uploadFile = inst._uploadFile;
  if (!raw || !uploadFile) {
    return actor;
  }
  actor.uploadVideo = async (input) => {
    const videoBytes = await uploadFile(input.videoBlob);
    const thumbBytes = input.thumbnailBlob ? await uploadFile(input.thumbnailBlob) : void 0;
    const candidInput = {
      title: input.title,
      description: input.description,
      videoBlob: videoBytes,
      thumbnailBlob: thumbBytes ? [thumbBytes] : [],
      durationSeconds: input.durationSeconds,
      visibility: encodeVideoVisibility(input.visibility)
    };
    return raw.uploadVideo(candidInput);
  };
  actor.updateVideo = async (id, input) => {
    const candidInput = {
      title: input.title,
      description: input.description,
      visibility: encodeVideoVisibility(input.visibility)
    };
    return raw.updateVideo(id, candidInput);
  };
  actor.createCollection = async (input) => {
    const candidInput = {
      title: input.title,
      description: input.description,
      visibility: encodeCollectionVisibility(input.visibility)
    };
    return raw.createCollection(candidInput);
  };
  actor.updateCollection = async (id, input) => {
    const candidInput = {
      title: input.title,
      description: input.description,
      visibility: encodeCollectionVisibility(input.visibility)
    };
    return raw.updateCollection(id, candidInput);
  };
  return actor;
}
export {
  patchActorVisibility as p
};
