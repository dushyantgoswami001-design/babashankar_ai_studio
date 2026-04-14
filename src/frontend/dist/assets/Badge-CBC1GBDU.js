import { j as jsxRuntimeExports } from "./index-BWY2Fo0g.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center gap-4 py-16 px-8 text-center ${className}`,
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: action })
      ]
    }
  );
}
const roleStyles = {
  owner: "bg-primary/20 text-primary border border-primary/40",
  editor: "bg-accent/20 text-accent border border-accent/40",
  viewer: "bg-muted text-muted-foreground border border-border"
};
const roleLabels = {
  owner: "Owner",
  editor: "Editor",
  viewer: "Viewer"
};
function Badge({
  children,
  variant = "default",
  role,
  className = ""
}) {
  let styles = "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap";
  if (variant === "role" && role) {
    styles += ` ${roleStyles[role]} animate-pulse-accent`;
  } else if (variant === "ai-tool") {
    styles += " bg-primary/10 text-primary border border-primary/30";
  } else if (variant === "status") {
    styles += " bg-muted text-muted-foreground border border-border";
  } else {
    styles += " bg-secondary text-secondary-foreground";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles} ${className}`, children });
}
function RoleBadge({ role }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "role", role, children: roleLabels[role] });
}
export {
  Badge as B,
  EmptyState as E,
  RoleBadge as R
};
