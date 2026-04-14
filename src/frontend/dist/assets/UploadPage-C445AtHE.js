import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as useNavigate, b as useCurrentUser, f as Link, g as Users, U as Upload, X } from "./index-BWY2Fo0g.js";
import { u as useActor, V as VideoVisibility, E as ExternalBlob, c as createActor } from "./backend-C7xtEXGZ.js";
import { c as createSlot, b as cn, m as motion, B as Button, A as AnimatePresence, I as Input, a as Badge } from "./proxy-Bb0FoSGH.js";
import { p as patchActorVisibility } from "./actorPatch-DtSQKDCY.js";
import { u as useMutation } from "./useMutation-CUXAg1RN.js";
import { u as ue } from "./index-JwsgApHh.js";
import { L as Lock } from "./lock-BIsBLHgl.js";
import { A as ArrowLeft } from "./arrow-left-qu1d3muw.js";
import { F as Film } from "./film-DGFsL5Y6.js";
import { G as Globe } from "./globe-OGSLdOk0.js";
import { C as CircleCheck } from "./circle-check-DwaqEsQv.js";
import { C as CircleAlert } from "./circle-alert-UMMsptV2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root$1 = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024;
const MAX_VIDEO_SIZE_LABEL = "500 MB";
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function extractErrorMessage(err) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "An unexpected error occurred.";
  }
}
const VISIBILITY_OPTIONS = [
  {
    value: VideoVisibility.public_,
    label: "Public",
    description: "Anyone can watch",
    icon: Globe
  },
  {
    value: VideoVisibility.private_,
    label: "Private",
    description: "Only you",
    icon: Lock
  },
  {
    value: VideoVisibility.collaboratorsOnly,
    label: "Collaborators",
    description: "Invited members only",
    icon: Users
  }
];
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
  hasError
}) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files[0];
      if (dropped) onFile(dropped);
    },
    [onFile, disabled]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleChange = (e) => {
    var _a;
    const picked = (_a = e.target.files) == null ? void 0 : _a[0];
    if (picked) onFile(picked);
    e.target.value = "";
  };
  if (file) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-4 rounded-xl border border-primary/40 bg-primary/5",
        "data-ocid": `${dataOcid}_preview`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatBytes(file.size) })
          ] }),
          !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "aria-label": "Remove file",
              "data-ocid": `${dataOcid}_clear_button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept,
        className: "sr-only",
        onChange: handleChange,
        disabled,
        "data-ocid": `${dataOcid}_input`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.click());
        },
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        disabled,
        className: [
          "w-full flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed transition-smooth",
          isDragging ? "border-primary bg-primary/10 scale-[1.01]" : hasError ? "border-destructive/60 bg-destructive/5 hover:border-destructive/80" : "border-border hover:border-primary/50 hover:bg-muted/30",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ].join(" "),
        "data-ocid": `${dataOcid}_dropzone`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: `h-9 w-9 ${hasError ? "text-destructive/70" : "text-muted-foreground"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm font-medium ${hasError ? "text-destructive" : "text-foreground"}`,
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subLabel })
          ] })
        ]
      }
    )
  ] });
}
function InlineAlert({ variant, title, message, dataOcid }) {
  const isError = variant === "error";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.25 },
      className: [
        "flex items-start gap-3 p-4 rounded-xl border",
        isError ? "bg-destructive/10 border-destructive/30" : "bg-amber-500/10 border-amber-500/30"
      ].join(" "),
      role: "alert",
      "aria-live": "polite",
      "data-ocid": dataOcid,
      children: [
        isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-destructive mt-0.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-amber-600 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm font-semibold ${isError ? "text-destructive" : "text-amber-700 dark:text-amber-400"}`,
              children: title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 break-words", children: message })
        ] })
      ]
    }
  );
}
function UploadPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useCurrentUser();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor ? patchActorVisibility(rawActor) : null;
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const [thumbFile, setThumbFile] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [visibility, setVisibility] = reactExports.useState(
    VideoVisibility.public_
  );
  const [videoProgress, setVideoProgress] = reactExports.useState(0);
  const [thumbProgress, setThumbProgress] = reactExports.useState(0);
  const [uploadPhase, setUploadPhase] = reactExports.useState("idle");
  const [thumbWarning, setThumbWarning] = reactExports.useState(null);
  const [validationError, setValidationError] = reactExports.useState(null);
  const validateVideoFile = (file) => {
    if (!file.type.startsWith("video/")) {
      return `"${file.name}" is not a video file. Please select an MP4 or WebM video.`;
    }
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      return `This video is ${formatBytes(file.size)}, which exceeds the ${MAX_VIDEO_SIZE_LABEL} limit. Please compress or trim it before uploading.`;
    }
    return null;
  };
  const handleVideoFile = (file) => {
    const err = validateVideoFile(file);
    if (err) {
      setValidationError(err);
      setVideoFile(null);
      return;
    }
    setValidationError(null);
    setVideoFile(file);
  };
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!actor)
        throw new Error(
          "Not connected to the backend. Please refresh the page and try again."
        );
      if (!videoFile)
        throw new Error("Please select a video file before uploading.");
      if (!title.trim()) throw new Error("Please add a title for your video.");
      const validationErr = validateVideoFile(videoFile);
      if (validationErr) throw new Error(validationErr);
      setUploadPhase("reading");
      setVideoProgress(0);
      setThumbProgress(0);
      setThumbWarning(null);
      let videoBytes;
      try {
        videoBytes = new Uint8Array(
          await videoFile.arrayBuffer()
        );
      } catch (err) {
        throw new Error(
          `Failed to read the video file. The file may be corrupted or inaccessible. (${extractErrorMessage(err)})`
        );
      }
      let videoBlob;
      try {
        videoBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress(
          (pct) => setVideoProgress(pct)
        );
      } catch (err) {
        throw new Error(
          `Failed to prepare the video for upload. Please try again. (${extractErrorMessage(err)})`
        );
      }
      setUploadPhase("uploading");
      let thumbnailBlob;
      if (thumbFile) {
        try {
          const thumbBytes = new Uint8Array(await thumbFile.arrayBuffer());
          thumbnailBlob = ExternalBlob.fromBytes(thumbBytes).withUploadProgress(
            (pct) => setThumbProgress(pct)
          );
        } catch (err) {
          setThumbWarning(
            `Thumbnail could not be read (${extractErrorMessage(err)}). Your video will be saved without a thumbnail.`
          );
          thumbnailBlob = void 0;
        }
      }
      setUploadPhase("saving");
      let videoId;
      try {
        videoId = await actor.uploadVideo({
          title: title.trim(),
          description: description.trim(),
          videoBlob,
          thumbnailBlob,
          durationSeconds: BigInt(0),
          visibility
        });
      } catch (err) {
        const msg = extractErrorMessage(err);
        throw new Error(
          msg && msg !== "An unexpected error occurred." ? `Upload failed: ${msg}` : "Upload failed. Please check your connection and try again."
        );
      }
      return videoId;
    },
    onSuccess: (videoId) => {
      setUploadPhase("done");
      if (thumbWarning) {
        ue.warning("Video uploaded — thumbnail was skipped.");
      } else {
        ue.success("Video uploaded successfully!");
      }
      navigate({ to: "/video/$id", params: { id: String(videoId) } });
    },
    onError: () => {
      setUploadPhase("idle");
      setVideoProgress(0);
      setThumbProgress(0);
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4",
        "data-ocid": "upload.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-2xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Sign in to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "You need to be signed in to share your AI-generated videos with the community." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: login,
              "data-ocid": "upload.login_button",
              className: "min-w-[200px] gap-2",
              children: "Sign in with Internet Identity"
            }
          )
        ]
      }
    );
  }
  const isUploading = uploadMutation.isPending;
  const canSubmit = !!videoFile && title.trim().length > 0 && !isUploading && !validationError;
  const overallProgress = thumbFile ? Math.round(videoProgress * 0.7 + thumbProgress * 0.3) : videoProgress;
  const phaseLabel = {
    idle: "",
    reading: "Reading file…",
    uploading: "Uploading files…",
    saving: "Saving to the network…",
    done: "Done!"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "max-w-2xl mx-auto px-4 py-10",
      "data-ocid": "upload.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              search: { q: void 0 },
              className: "p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "upload.back_link",
              "aria-label": "Back to feed",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Upload Video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Share your AI-generated creation with the community" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
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
            },
            className: "space-y-7",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                uploadMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InlineAlert,
                  {
                    variant: "error",
                    title: "Upload failed",
                    message: uploadMutation.error instanceof Error ? uploadMutation.error.message : "An unexpected error occurred. Please try again.",
                    dataOcid: "upload.error_state"
                  },
                  "mutation-error"
                ),
                validationError && !uploadMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InlineAlert,
                  {
                    variant: "error",
                    title: "Cannot upload",
                    message: validationError,
                    dataOcid: "upload.validation_error"
                  },
                  "validation-error"
                ),
                thumbWarning && !uploadMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InlineAlert,
                  {
                    variant: "warning",
                    title: "Thumbnail skipped",
                    message: thumbWarning,
                    dataOcid: "upload.thumbnail_warning"
                  },
                  "thumb-warning"
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
                  "Video file ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Dropzone,
                  {
                    accept: "video/mp4,video/webm,video/*",
                    onFile: handleVideoFile,
                    file: videoFile,
                    onClear: () => {
                      setVideoFile(null);
                      setVideoProgress(0);
                      setValidationError(null);
                    },
                    icon: Film,
                    label: "Drop your video here or click to browse",
                    subLabel: `MP4 or WebM · Max ${MAX_VIDEO_SIZE_LABEL}`,
                    dataOcid: "upload.video",
                    disabled: isUploading,
                    hasError: !!validationError && !videoFile
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "upload-title", className: "text-sm font-semibold", children: [
                  "Title ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "upload-title",
                    placeholder: "Give your video a compelling title",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    maxLength: 120,
                    disabled: isUploading,
                    "data-ocid": "upload.title_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                  title.length,
                  " / 120"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "upload-desc", className: "text-sm font-semibold", children: [
                  "Description",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "upload-desc",
                    placeholder: "Describe the AI tools, prompts, or creative process behind this video…",
                    value: description,
                    onChange: (e) => setDescription(e.target.value),
                    rows: 4,
                    maxLength: 2e3,
                    disabled: isUploading,
                    className: "resize-none",
                    "data-ocid": "upload.description_textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                  description.length,
                  " / 2000"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Visibility" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: VISIBILITY_OPTIONS.map(
                  ({ value, label, description: desc, icon: Icon }) => {
                    const active = visibility === value;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": active,
                        disabled: isUploading,
                        onClick: () => setVisibility(value),
                        "data-ocid": `upload.visibility_${label.toLowerCase().replace(/\s+/g, "_")}`,
                        className: [
                          "flex flex-col gap-1.5 p-4 rounded-xl border-2 text-left transition-smooth",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-muted/30",
                          isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        ].join(" "),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Icon,
                              {
                                className: `h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `text-sm font-medium ${active ? "text-primary" : "text-foreground"}`,
                                children: label
                              }
                            ),
                            active && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-primary ml-auto shrink-0" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                        ]
                      },
                      value
                    );
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
                  "Thumbnail",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Dropzone,
                  {
                    accept: "image/jpeg,image/png,image/webp",
                    onFile: setThumbFile,
                    file: thumbFile,
                    onClear: () => {
                      setThumbFile(null);
                      setThumbProgress(0);
                    },
                    icon: Image,
                    label: "Drop a thumbnail image or click to browse",
                    subLabel: "JPEG, PNG or WebP · Recommended 1280×720",
                    dataOcid: "upload.thumbnail",
                    disabled: isUploading
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  className: "space-y-3 p-4 rounded-xl bg-card border border-border overflow-hidden",
                  "data-ocid": "upload.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground flex-1", children: phaseLabel[uploadPhase] }),
                      uploadPhase === "uploading" || uploadPhase === "saving" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs tabular-nums", children: [
                        overallProgress,
                        "%"
                      ] }) : null
                    ] }),
                    (uploadPhase === "uploading" || uploadPhase === "saving") && /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: overallProgress, className: "h-1.5" }),
                    thumbFile && uploadPhase === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Video" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground tabular-nums", children: [
                          videoProgress,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Thumbnail" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground tabular-nums", children: [
                          thumbProgress,
                          "%"
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: !canSubmit,
                    size: "lg",
                    className: "flex-1 gap-2 font-semibold",
                    "data-ocid": "upload.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                      isUploading ? "Uploading…" : "Publish Video"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "lg",
                    disabled: isUploading,
                    onClick: () => navigate({ to: "/", search: { q: void 0 } }),
                    "data-ocid": "upload.cancel_button",
                    children: "Cancel"
                  }
                )
              ] }),
              !canSubmit && !isUploading && !validationError && !uploadMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center -mt-3", children: !videoFile && !title.trim() ? "Select a video and add a title to continue" : !videoFile ? "Select a video file to continue" : "Add a title to continue" })
            ]
          }
        )
      ]
    }
  );
}
export {
  UploadPage as default
};
