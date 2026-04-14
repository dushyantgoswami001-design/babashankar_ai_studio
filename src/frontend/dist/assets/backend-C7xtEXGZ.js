var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { t as ProtocolError, T as TimeoutWaitingForResponseErrorCode, w as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, C as Certificate, x as lookupResultToBuffer, R as RequestStatusResponseStatus, y as UnknownError, z as RequestStatusDoneNoReplyErrorCode, D as RejectError, F as CertifiedRejectErrorCode, G as UNREACHABLE_ERROR, I as InputError, H as InvalidReadStateRequestErrorCode, J as ReadRequestType, K as Principal, N as IDL, O as MissingCanisterIdErrorCode, Q as HttpAgent, V as encode, W as QueryResponseStatus, Y as UncertifiedRejectErrorCode, Z as isV3ResponseBody, $ as isV2ResponseBody, a0 as UncertifiedRejectUpdateErrorCode, a1 as UnexpectedErrorCode, a2 as decode, a3 as useInternetIdentity, u as useQueryClient, a as useQuery, r as reactExports, a4 as createActorWithConfig, a5 as Record, a6 as Text, a7 as Opt, a8 as Nat, a9 as Bool, aa as Variant, ab as Null, ac as Vec, ad as Nat8, ae as Int, af as Principal$1, ag as Service, ah as Func } from "./index-BWY2Fo0g.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const InvitationId = Nat;
const VideoId = Nat;
const CreateCommentInput = Record({
  "text": Text,
  "timestampSeconds": Nat,
  "videoId": VideoId
});
const CommentId = Nat;
const CollectionId = Nat;
const UserRole$1 = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const CollectionVisibility$1 = Variant({
  "public": Null,
  "private": Null
});
const CreateCollectionInput = Record({
  "title": Text,
  "description": Text,
  "visibility": CollectionVisibility$1
});
const UserId = Principal$1;
const Timestamp = Int;
const ExternalBlob$1 = Vec(Nat8);
const UserProfile = Record({
  "id": UserId,
  "bio": Text,
  "displayName": Text,
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "profilePicture": Opt(ExternalBlob$1)
});
const CollaboratorRole$1 = Variant({
  "editor": Null,
  "viewer": Null
});
const Collaborator = Record({
  "userId": UserId,
  "joinedAt": Timestamp,
  "role": CollaboratorRole$1,
  "videoId": VideoId
});
const Collection = Record({
  "id": CollectionId,
  "title": Text,
  "ownerId": UserId,
  "createdAt": Timestamp,
  "description": Text,
  "updatedAt": Timestamp,
  "visibility": CollectionVisibility$1,
  "videoIds": Vec(VideoId)
});
const VideoStatus$1 = Variant({
  "deleted": Null,
  "available": Null
});
const VideoVisibility$1 = Variant({
  "public": Null,
  "private": Null,
  "collaboratorsOnly": Null
});
const Video = Record({
  "id": VideoId,
  "status": VideoStatus$1,
  "title": Text,
  "createdAt": Timestamp,
  "description": Text,
  "videoBlob": ExternalBlob$1,
  "thumbnailBlob": Opt(ExternalBlob$1),
  "updatedAt": Timestamp,
  "viewCount": Nat,
  "durationSeconds": Nat,
  "visibility": VideoVisibility$1,
  "uploaderId": UserId
});
const VideoSummary = Record({
  "id": VideoId,
  "status": VideoStatus$1,
  "title": Text,
  "createdAt": Timestamp,
  "description": Text,
  "thumbnailBlob": Opt(ExternalBlob$1),
  "viewCount": Nat,
  "durationSeconds": Nat,
  "visibility": VideoVisibility$1,
  "uploaderId": UserId
});
const InvitationStatus$1 = Variant({
  "revoked": Null,
  "expired": Null,
  "pending": Null,
  "accepted": Null,
  "declined": Null
});
const CollaborationInvitation = Record({
  "id": InvitationId,
  "status": InvitationStatus$1,
  "expiresAt": Timestamp,
  "createdAt": Timestamp,
  "role": CollaboratorRole$1,
  "inviteeId": UserId,
  "inviterId": UserId,
  "videoId": VideoId
});
const Comment = Record({
  "id": CommentId,
  "authorId": UserId,
  "createdAt": Timestamp,
  "text": Text,
  "timestampSeconds": Nat,
  "videoId": VideoId
});
const SaveProfileInput = Record({
  "bio": Text,
  "displayName": Text,
  "profilePicture": Opt(ExternalBlob$1)
});
const UpdateCollectionInput = Record({
  "title": Text,
  "description": Text,
  "visibility": CollectionVisibility$1
});
const UpdateVideoInput = Record({
  "title": Text,
  "description": Text,
  "visibility": VideoVisibility$1
});
const CreateVideoInput = Record({
  "title": Text,
  "description": Text,
  "videoBlob": ExternalBlob$1,
  "thumbnailBlob": Opt(ExternalBlob$1),
  "durationSeconds": Nat,
  "visibility": VideoVisibility$1
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "acceptInvitation": Func([InvitationId], [], []),
  "addComment": Func([CreateCommentInput], [CommentId], []),
  "addVideoToCollection": Func([CollectionId, VideoId], [], []),
  "assignCallerUserRole": Func([Principal$1, UserRole$1], [], []),
  "canEdit": Func([VideoId], [Bool], ["query"]),
  "createCollection": Func([CreateCollectionInput], [CollectionId], []),
  "declineInvitation": Func([InvitationId], [], []),
  "deleteCollection": Func([CollectionId], [], []),
  "deleteComment": Func([CommentId], [], []),
  "deleteVideo": Func([VideoId], [], []),
  "getCallerUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getCallerUserRole": Func([], [UserRole$1], ["query"]),
  "getCollaborator": Func(
    [VideoId, UserId],
    [Opt(Collaborator)],
    ["query"]
  ),
  "getCollection": Func([CollectionId], [Opt(Collection)], ["query"]),
  "getProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getUserProfile": Func([UserId], [Opt(UserProfile)], ["query"]),
  "getVideo": Func([VideoId], [Opt(Video)], []),
  "inviteCollaborator": Func(
    [VideoId, UserId, CollaboratorRole$1],
    [InvitationId],
    []
  ),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "listCollaborators": Func([VideoId], [Vec(Collaborator)], ["query"]),
  "listCollectionsByOwner": Func(
    [UserId],
    [Vec(Collection)],
    ["query"]
  ),
  "listMyCollections": Func([], [Vec(Collection)], ["query"]),
  "listMyVideos": Func([], [Vec(VideoSummary)], ["query"]),
  "listPendingInvitations": Func(
    [],
    [Vec(CollaborationInvitation)],
    ["query"]
  ),
  "listRecentVideos": Func([Nat], [Vec(VideoSummary)], ["query"]),
  "listTrendingVideos": Func(
    [Nat],
    [Vec(VideoSummary)],
    ["query"]
  ),
  "listVideoComments": Func([VideoId], [Vec(Comment)], ["query"]),
  "listVideosByUser": Func([UserId], [Vec(VideoSummary)], ["query"]),
  "register": Func([], [], []),
  "removeVideoFromCollection": Func([CollectionId, VideoId], [], []),
  "revokeCollaborator": Func([VideoId, UserId], [], []),
  "saveCallerUserProfile": Func([SaveProfileInput], [], []),
  "searchVideos": Func([Text], [Vec(VideoSummary)], ["query"]),
  "updateCollection": Func([CollectionId, UpdateCollectionInput], [], []),
  "updateProfile": Func([SaveProfileInput], [], []),
  "updateVideo": Func([VideoId, UpdateVideoInput], [], []),
  "uploadVideo": Func([CreateVideoInput], [VideoId], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const InvitationId2 = IDL2.Nat;
  const VideoId2 = IDL2.Nat;
  const CreateCommentInput2 = IDL2.Record({
    "text": IDL2.Text,
    "timestampSeconds": IDL2.Nat,
    "videoId": VideoId2
  });
  const CommentId2 = IDL2.Nat;
  const CollectionId2 = IDL2.Nat;
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const CollectionVisibility2 = IDL2.Variant({
    "public": IDL2.Null,
    "private": IDL2.Null
  });
  const CreateCollectionInput2 = IDL2.Record({
    "title": IDL2.Text,
    "description": IDL2.Text,
    "visibility": CollectionVisibility2
  });
  const UserId2 = IDL2.Principal;
  const Timestamp2 = IDL2.Int;
  const ExternalBlob2 = IDL2.Vec(IDL2.Nat8);
  const UserProfile2 = IDL2.Record({
    "id": UserId2,
    "bio": IDL2.Text,
    "displayName": IDL2.Text,
    "createdAt": Timestamp2,
    "updatedAt": Timestamp2,
    "profilePicture": IDL2.Opt(ExternalBlob2)
  });
  const CollaboratorRole2 = IDL2.Variant({
    "editor": IDL2.Null,
    "viewer": IDL2.Null
  });
  const Collaborator2 = IDL2.Record({
    "userId": UserId2,
    "joinedAt": Timestamp2,
    "role": CollaboratorRole2,
    "videoId": VideoId2
  });
  const Collection2 = IDL2.Record({
    "id": CollectionId2,
    "title": IDL2.Text,
    "ownerId": UserId2,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "updatedAt": Timestamp2,
    "visibility": CollectionVisibility2,
    "videoIds": IDL2.Vec(VideoId2)
  });
  const VideoStatus2 = IDL2.Variant({
    "deleted": IDL2.Null,
    "available": IDL2.Null
  });
  const VideoVisibility2 = IDL2.Variant({
    "public": IDL2.Null,
    "private": IDL2.Null,
    "collaboratorsOnly": IDL2.Null
  });
  const Video2 = IDL2.Record({
    "id": VideoId2,
    "status": VideoStatus2,
    "title": IDL2.Text,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "videoBlob": ExternalBlob2,
    "thumbnailBlob": IDL2.Opt(ExternalBlob2),
    "updatedAt": Timestamp2,
    "viewCount": IDL2.Nat,
    "durationSeconds": IDL2.Nat,
    "visibility": VideoVisibility2,
    "uploaderId": UserId2
  });
  const VideoSummary2 = IDL2.Record({
    "id": VideoId2,
    "status": VideoStatus2,
    "title": IDL2.Text,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "thumbnailBlob": IDL2.Opt(ExternalBlob2),
    "viewCount": IDL2.Nat,
    "durationSeconds": IDL2.Nat,
    "visibility": VideoVisibility2,
    "uploaderId": UserId2
  });
  const InvitationStatus2 = IDL2.Variant({
    "revoked": IDL2.Null,
    "expired": IDL2.Null,
    "pending": IDL2.Null,
    "accepted": IDL2.Null,
    "declined": IDL2.Null
  });
  const CollaborationInvitation2 = IDL2.Record({
    "id": InvitationId2,
    "status": InvitationStatus2,
    "expiresAt": Timestamp2,
    "createdAt": Timestamp2,
    "role": CollaboratorRole2,
    "inviteeId": UserId2,
    "inviterId": UserId2,
    "videoId": VideoId2
  });
  const Comment2 = IDL2.Record({
    "id": CommentId2,
    "authorId": UserId2,
    "createdAt": Timestamp2,
    "text": IDL2.Text,
    "timestampSeconds": IDL2.Nat,
    "videoId": VideoId2
  });
  const SaveProfileInput2 = IDL2.Record({
    "bio": IDL2.Text,
    "displayName": IDL2.Text,
    "profilePicture": IDL2.Opt(ExternalBlob2)
  });
  const UpdateCollectionInput2 = IDL2.Record({
    "title": IDL2.Text,
    "description": IDL2.Text,
    "visibility": CollectionVisibility2
  });
  const UpdateVideoInput2 = IDL2.Record({
    "title": IDL2.Text,
    "description": IDL2.Text,
    "visibility": VideoVisibility2
  });
  const CreateVideoInput2 = IDL2.Record({
    "title": IDL2.Text,
    "description": IDL2.Text,
    "videoBlob": ExternalBlob2,
    "thumbnailBlob": IDL2.Opt(ExternalBlob2),
    "durationSeconds": IDL2.Nat,
    "visibility": VideoVisibility2
  });
  return IDL2.Service({
    "_immutableObjectStorageBlobsAreLive": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [IDL2.Vec(IDL2.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControl": IDL2.Func([], [], []),
    "acceptInvitation": IDL2.Func([InvitationId2], [], []),
    "addComment": IDL2.Func([CreateCommentInput2], [CommentId2], []),
    "addVideoToCollection": IDL2.Func([CollectionId2, VideoId2], [], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "canEdit": IDL2.Func([VideoId2], [IDL2.Bool], ["query"]),
    "createCollection": IDL2.Func([CreateCollectionInput2], [CollectionId2], []),
    "declineInvitation": IDL2.Func([InvitationId2], [], []),
    "deleteCollection": IDL2.Func([CollectionId2], [], []),
    "deleteComment": IDL2.Func([CommentId2], [], []),
    "deleteVideo": IDL2.Func([VideoId2], [], []),
    "getCallerUserProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getCollaborator": IDL2.Func(
      [VideoId2, UserId2],
      [IDL2.Opt(Collaborator2)],
      ["query"]
    ),
    "getCollection": IDL2.Func(
      [CollectionId2],
      [IDL2.Opt(Collection2)],
      ["query"]
    ),
    "getProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getUserProfile": IDL2.Func([UserId2], [IDL2.Opt(UserProfile2)], ["query"]),
    "getVideo": IDL2.Func([VideoId2], [IDL2.Opt(Video2)], []),
    "inviteCollaborator": IDL2.Func(
      [VideoId2, UserId2, CollaboratorRole2],
      [InvitationId2],
      []
    ),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "listCollaborators": IDL2.Func(
      [VideoId2],
      [IDL2.Vec(Collaborator2)],
      ["query"]
    ),
    "listCollectionsByOwner": IDL2.Func(
      [UserId2],
      [IDL2.Vec(Collection2)],
      ["query"]
    ),
    "listMyCollections": IDL2.Func([], [IDL2.Vec(Collection2)], ["query"]),
    "listMyVideos": IDL2.Func([], [IDL2.Vec(VideoSummary2)], ["query"]),
    "listPendingInvitations": IDL2.Func(
      [],
      [IDL2.Vec(CollaborationInvitation2)],
      ["query"]
    ),
    "listRecentVideos": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(VideoSummary2)],
      ["query"]
    ),
    "listTrendingVideos": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(VideoSummary2)],
      ["query"]
    ),
    "listVideoComments": IDL2.Func([VideoId2], [IDL2.Vec(Comment2)], ["query"]),
    "listVideosByUser": IDL2.Func([UserId2], [IDL2.Vec(VideoSummary2)], ["query"]),
    "register": IDL2.Func([], [], []),
    "removeVideoFromCollection": IDL2.Func([CollectionId2, VideoId2], [], []),
    "revokeCollaborator": IDL2.Func([VideoId2, UserId2], [], []),
    "saveCallerUserProfile": IDL2.Func([SaveProfileInput2], [], []),
    "searchVideos": IDL2.Func([IDL2.Text], [IDL2.Vec(VideoSummary2)], ["query"]),
    "updateCollection": IDL2.Func(
      [CollectionId2, UpdateCollectionInput2],
      [],
      []
    ),
    "updateProfile": IDL2.Func([SaveProfileInput2], [], []),
    "updateVideo": IDL2.Func([VideoId2, UpdateVideoInput2], [], []),
    "uploadVideo": IDL2.Func([CreateVideoInput2], [VideoId2], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class ExternalBlob {
  constructor(directURL, blob) {
    __publicField(this, "_blob");
    __publicField(this, "directURL");
    __publicField(this, "onProgress");
    if (blob) {
      this._blob = blob;
    }
    this.directURL = directURL;
  }
  static fromURL(url) {
    return new ExternalBlob(url, null);
  }
  static fromBytes(blob) {
    const url = URL.createObjectURL(new Blob([
      new Uint8Array(blob)
    ], {
      type: "application/octet-stream"
    }));
    return new ExternalBlob(url, blob);
  }
  async getBytes() {
    if (this._blob) {
      return this._blob;
    }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  getDirectURL() {
    return this.directURL;
  }
  withUploadProgress(onProgress) {
    this.onProgress = onProgress;
    return this;
  }
}
var CollaboratorRole = /* @__PURE__ */ ((CollaboratorRole2) => {
  CollaboratorRole2["editor"] = "editor";
  CollaboratorRole2["viewer"] = "viewer";
  return CollaboratorRole2;
})(CollaboratorRole || {});
var CollectionVisibility = /* @__PURE__ */ ((CollectionVisibility2) => {
  CollectionVisibility2["public_"] = "public";
  CollectionVisibility2["private_"] = "private";
  return CollectionVisibility2;
})(CollectionVisibility || {});
var InvitationStatus = /* @__PURE__ */ ((InvitationStatus2) => {
  InvitationStatus2["revoked"] = "revoked";
  InvitationStatus2["expired"] = "expired";
  InvitationStatus2["pending"] = "pending";
  InvitationStatus2["accepted"] = "accepted";
  InvitationStatus2["declined"] = "declined";
  return InvitationStatus2;
})(InvitationStatus || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["admin"] = "admin";
  UserRole2["user"] = "user";
  UserRole2["guest"] = "guest";
  return UserRole2;
})(UserRole || {});
var VideoStatus = /* @__PURE__ */ ((VideoStatus2) => {
  VideoStatus2["deleted"] = "deleted";
  VideoStatus2["available"] = "available";
  return VideoStatus2;
})(VideoStatus || {});
var VideoVisibility = /* @__PURE__ */ ((VideoVisibility2) => {
  VideoVisibility2["public_"] = "public";
  VideoVisibility2["private_"] = "private";
  VideoVisibility2["collaboratorsOnly"] = "collaboratorsOnly";
  return VideoVisibility2;
})(VideoVisibility || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async acceptInvitation(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.acceptInvitation(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.acceptInvitation(arg0);
      return result;
    }
  }
  async addComment(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addComment(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addComment(arg0);
      return result;
    }
  }
  async addVideoToCollection(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.addVideoToCollection(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addVideoToCollection(arg0, arg1);
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async canEdit(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.canEdit(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.canEdit(arg0);
      return result;
    }
  }
  async createCollection(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createCollection(to_candid_CreateCollectionInput_n10(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCollection(to_candid_CreateCollectionInput_n10(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async declineInvitation(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.declineInvitation(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.declineInvitation(arg0);
      return result;
    }
  }
  async deleteCollection(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCollection(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCollection(arg0);
      return result;
    }
  }
  async deleteComment(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteComment(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteComment(arg0);
      return result;
    }
  }
  async deleteVideo(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteVideo(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteVideo(arg0);
      return result;
    }
  }
  async getCallerUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserProfile();
        return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserProfile();
      return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n19(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n19(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCollaborator(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getCollaborator(arg0, arg1);
        return from_candid_opt_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCollaborator(arg0, arg1);
      return from_candid_opt_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCollection(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getCollection(arg0);
        return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCollection(arg0);
      return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getProfile();
        return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProfile();
      return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile(arg0);
        return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile(arg0);
      return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async getVideo(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getVideo(arg0);
        return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVideo(arg0);
      return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async inviteCollaborator(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.inviteCollaborator(arg0, arg1, to_candid_CollaboratorRole_n38(this._uploadFile, this._downloadFile, arg2));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.inviteCollaborator(arg0, arg1, to_candid_CollaboratorRole_n38(this._uploadFile, this._downloadFile, arg2));
      return result;
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async listCollaborators(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listCollaborators(arg0);
        return from_candid_vec_n40(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listCollaborators(arg0);
      return from_candid_vec_n40(this._uploadFile, this._downloadFile, result);
    }
  }
  async listCollectionsByOwner(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listCollectionsByOwner(arg0);
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listCollectionsByOwner(arg0);
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async listMyCollections() {
    if (this.processError) {
      try {
        const result = await this.actor.listMyCollections();
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listMyCollections();
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async listMyVideos() {
    if (this.processError) {
      try {
        const result = await this.actor.listMyVideos();
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listMyVideos();
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async listPendingInvitations() {
    if (this.processError) {
      try {
        const result = await this.actor.listPendingInvitations();
        return from_candid_vec_n45(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listPendingInvitations();
      return from_candid_vec_n45(this._uploadFile, this._downloadFile, result);
    }
  }
  async listRecentVideos(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listRecentVideos(arg0);
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listRecentVideos(arg0);
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async listTrendingVideos(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listTrendingVideos(arg0);
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listTrendingVideos(arg0);
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async listVideoComments(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listVideoComments(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listVideoComments(arg0);
      return result;
    }
  }
  async listVideosByUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listVideosByUser(arg0);
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listVideosByUser(arg0);
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async register() {
    if (this.processError) {
      try {
        const result = await this.actor.register();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.register();
      return result;
    }
  }
  async removeVideoFromCollection(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.removeVideoFromCollection(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeVideoFromCollection(arg0, arg1);
      return result;
    }
  }
  async revokeCollaborator(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.revokeCollaborator(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.revokeCollaborator(arg0, arg1);
      return result;
    }
  }
  async saveCallerUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCallerUserProfile(await to_candid_SaveProfileInput_n50(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCallerUserProfile(await to_candid_SaveProfileInput_n50(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async searchVideos(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchVideos(arg0);
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchVideos(arg0);
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateCollection(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCollection(arg0, to_candid_UpdateCollectionInput_n53(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCollection(arg0, to_candid_UpdateCollectionInput_n53(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProfile(await to_candid_SaveProfileInput_n50(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProfile(await to_candid_SaveProfileInput_n50(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async updateVideo(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateVideo(arg0, to_candid_UpdateVideoInput_n54(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateVideo(arg0, to_candid_UpdateVideoInput_n54(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async uploadVideo(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadVideo(await to_candid_CreateVideoInput_n58(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadVideo(await to_candid_CreateVideoInput_n58(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
}
function from_candid_CollaborationInvitation_n46(_uploadFile, _downloadFile, value) {
  return from_candid_record_n47(_uploadFile, _downloadFile, value);
}
function from_candid_CollaboratorRole_n24(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_Collaborator_n22(_uploadFile, _downloadFile, value) {
  return from_candid_record_n23(_uploadFile, _downloadFile, value);
}
function from_candid_CollectionVisibility_n29(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n30(_uploadFile, _downloadFile, value);
}
function from_candid_Collection_n27(_uploadFile, _downloadFile, value) {
  return from_candid_record_n28(_uploadFile, _downloadFile, value);
}
async function from_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_InvitationStatus_n48(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n49(_uploadFile, _downloadFile, value);
}
async function from_candid_UserProfile_n15(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n16(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n19(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_VideoStatus_n34(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n35(_uploadFile, _downloadFile, value);
}
async function from_candid_VideoSummary_n43(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n44(_uploadFile, _downloadFile, value);
}
function from_candid_VideoVisibility_n36(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n37(_uploadFile, _downloadFile, value);
}
async function from_candid_Video_n32(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n33(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
async function from_candid_opt_n14(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_UserProfile_n15(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n17(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n21(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Collaborator_n22(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n26(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Collection_n27(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n31(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Video_n32(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_record_n16(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    bio: value.bio,
    displayName: value.displayName,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    profilePicture: record_opt_to_undefined(await from_candid_opt_n17(_uploadFile, _downloadFile, value.profilePicture))
  };
}
function from_candid_record_n23(_uploadFile, _downloadFile, value) {
  return {
    userId: value.userId,
    joinedAt: value.joinedAt,
    role: from_candid_CollaboratorRole_n24(_uploadFile, _downloadFile, value.role),
    videoId: value.videoId
  };
}
function from_candid_record_n28(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    title: value.title,
    ownerId: value.ownerId,
    createdAt: value.createdAt,
    description: value.description,
    updatedAt: value.updatedAt,
    visibility: from_candid_CollectionVisibility_n29(_uploadFile, _downloadFile, value.visibility),
    videoIds: value.videoIds
  };
}
async function from_candid_record_n33(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_VideoStatus_n34(_uploadFile, _downloadFile, value.status),
    title: value.title,
    createdAt: value.createdAt,
    description: value.description,
    videoBlob: await from_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value.videoBlob),
    thumbnailBlob: record_opt_to_undefined(await from_candid_opt_n17(_uploadFile, _downloadFile, value.thumbnailBlob)),
    updatedAt: value.updatedAt,
    viewCount: value.viewCount,
    durationSeconds: value.durationSeconds,
    visibility: from_candid_VideoVisibility_n36(_uploadFile, _downloadFile, value.visibility),
    uploaderId: value.uploaderId
  };
}
async function from_candid_record_n44(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_VideoStatus_n34(_uploadFile, _downloadFile, value.status),
    title: value.title,
    createdAt: value.createdAt,
    description: value.description,
    thumbnailBlob: record_opt_to_undefined(await from_candid_opt_n17(_uploadFile, _downloadFile, value.thumbnailBlob)),
    viewCount: value.viewCount,
    durationSeconds: value.durationSeconds,
    visibility: from_candid_VideoVisibility_n36(_uploadFile, _downloadFile, value.visibility),
    uploaderId: value.uploaderId
  };
}
function from_candid_record_n47(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_InvitationStatus_n48(_uploadFile, _downloadFile, value.status),
    expiresAt: value.expiresAt,
    createdAt: value.createdAt,
    role: from_candid_CollaboratorRole_n24(_uploadFile, _downloadFile, value.role),
    inviteeId: value.inviteeId,
    inviterId: value.inviterId,
    videoId: value.videoId
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
  return "editor" in value ? "editor" : "viewer" in value ? "viewer" : value;
}
function from_candid_variant_n30(_uploadFile, _downloadFile, value) {
  return "public" in value ? CollectionVisibility.public : "private" in value ? CollectionVisibility.private : value;
}
function from_candid_variant_n35(_uploadFile, _downloadFile, value) {
  return "deleted" in value ? "deleted" : "available" in value ? "available" : value;
}
function from_candid_variant_n37(_uploadFile, _downloadFile, value) {
  return "public" in value ? VideoVisibility.public : "private" in value ? VideoVisibility.private : "collaboratorsOnly" in value ? "collaboratorsOnly" : value;
}
function from_candid_variant_n49(_uploadFile, _downloadFile, value) {
  return "revoked" in value ? "revoked" : "expired" in value ? "expired" : "pending" in value ? "pending" : "accepted" in value ? "accepted" : "declined" in value ? "declined" : value;
}
function from_candid_vec_n40(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Collaborator_n22(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n41(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Collection_n27(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n42(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_VideoSummary_n43(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n45(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_CollaborationInvitation_n46(_uploadFile, _downloadFile, x));
}
function to_candid_CollaboratorRole_n38(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n39(_uploadFile, _downloadFile, value);
}
function to_candid_CollectionVisibility_n12(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n13(_uploadFile, _downloadFile, value);
}
function to_candid_CreateCollectionInput_n10(_uploadFile, _downloadFile, value) {
  return to_candid_record_n11(_uploadFile, _downloadFile, value);
}
async function to_candid_CreateVideoInput_n58(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n59(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n52(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
async function to_candid_SaveProfileInput_n50(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n51(_uploadFile, _downloadFile, value);
}
function to_candid_UpdateCollectionInput_n53(_uploadFile, _downloadFile, value) {
  return to_candid_record_n11(_uploadFile, _downloadFile, value);
}
function to_candid_UpdateVideoInput_n54(_uploadFile, _downloadFile, value) {
  return to_candid_record_n55(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n8(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function to_candid_VideoVisibility_n56(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n57(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    description: value.description,
    visibility: to_candid_CollectionVisibility_n12(_uploadFile, _downloadFile, value.visibility)
  };
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
async function to_candid_record_n51(_uploadFile, _downloadFile, value) {
  return {
    bio: value.bio,
    displayName: value.displayName,
    profilePicture: value.profilePicture ? candid_some(await to_candid_ExternalBlob_n52(_uploadFile, _downloadFile, value.profilePicture)) : candid_none()
  };
}
function to_candid_record_n55(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    description: value.description,
    visibility: to_candid_VideoVisibility_n56(_uploadFile, _downloadFile, value.visibility)
  };
}
async function to_candid_record_n59(_uploadFile, _downloadFile, value) {
  return {
    title: value.title,
    description: value.description,
    videoBlob: await to_candid_ExternalBlob_n52(_uploadFile, _downloadFile, value.videoBlob),
    thumbnailBlob: value.thumbnailBlob ? candid_some(await to_candid_ExternalBlob_n52(_uploadFile, _downloadFile, value.thumbnailBlob)) : candid_none(),
    durationSeconds: value.durationSeconds,
    visibility: to_candid_VideoVisibility_n56(_uploadFile, _downloadFile, value.visibility)
  };
}
function to_candid_variant_n13(_uploadFile, _downloadFile, value) {
  return value == CollectionVisibility.public ? {
    public_: null
  } : value == CollectionVisibility.private ? {
    private_: null
  } : value;
}
function to_candid_variant_n39(_uploadFile, _downloadFile, value) {
  return value == "editor" ? {
    editor: null
  } : value == "viewer" ? {
    viewer: null
  } : value;
}
function to_candid_variant_n57(_uploadFile, _downloadFile, value) {
  return value == VideoVisibility.public ? {
    public_: null
  } : value == VideoVisibility.private ? {
    private_: null
  } : value == "collaboratorsOnly" ? {
    collaboratorsOnly: null
  } : value;
}
function to_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
const backend = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Backend,
  CollaboratorRole,
  CollectionVisibility,
  ExternalBlob,
  InvitationStatus,
  UserRole,
  VideoStatus,
  VideoVisibility,
  createActor
}, Symbol.toStringTag, { value: "Module" }));
export {
  CollaboratorRole as C,
  ExternalBlob as E,
  VideoVisibility as V,
  backend as b,
  createActor as c,
  useActor as u
};
