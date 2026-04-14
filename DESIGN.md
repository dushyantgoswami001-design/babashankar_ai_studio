# Design Brief

## Direction

Dark Editorial AI-First — A modern video platform optimized for AI-generated content discovery and collaboration, featuring electric cyan accents signaling innovation.

## Tone

Forward-thinking and confident. Dark mode as primary acknowledges video consumption context; cyan accent signals tech and AI differentiation, rejecting generic video platform grey.

## Differentiation

Collaboration badges overlay video cards with role indicators (Editor, Viewer) — immediately communicates the platform's core differentiator: role-based shared access.

## Color Palette

| Token       | OKLCH             | Role                              |
| ----------- | ----------------- | --------------------------------- |
| background  | 0.12 0.008 260    | Deep charcoal UI backdrop         |
| foreground  | 0.94 0.006 260    | High-contrast body text           |
| card        | 0.16 0.01 260     | Elevated content containers       |
| primary     | 0.7 0.24 262      | Electric cyan — AI/innovation     |
| accent      | 0.65 0.2 52       | Warm amber — collaboration CTAs   |
| destructive | 0.56 0.23 24      | Vibrant red for warnings          |
| muted       | 0.19 0.01 260     | Tertiary UI elements              |
| border      | 0.24 0.012 260    | Subtle dividers & focus rings     |

## Typography

- Display: Space Grotesk — futuristic, distinctive, signals AI-forward positioning
- Body: DM Sans — clean humanist sans, highly readable at small scales for UI labels
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, labels `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Subtle elevated shadow hierarchy. Cards use `shadow-elevated` (strong drop) for video thumbnails; UI elements use `shadow-subtle` (soft underlay). No glows or neon effects — restraint maintains focus on content.

## Structural Zones

| Zone    | Background              | Border                  | Notes                                         |
| ------- | ----------------------- | ----------------------- | --------------------------------------------- |
| Header  | `bg-card` (0.16 L)      | `border-b border-border` | Search, user menu, logo on dark foundation   |
| Content | `bg-background` (0.12 L) | —                       | Alternating `bg-card/50` for section rhythm  |
| Footer  | `bg-muted/20` (0.19 L)  | `border-t border-border` | Links, branding, legal                        |

## Spacing & Rhythm

Large gaps between video sections (6-8 units) establish breathing room. Cards use 1-unit internal padding. Micro-spacing (0.5-1 unit) separates UI elements. Alternating card backgrounds every other row adds visual rhythm without decoration.

## Component Patterns

- Buttons: Cyan primary with inverse text for CTAs; neutral muted-bg for secondary; full-width for upload flows
- Cards: 8px border-radius, soft shadow-elevated, accent badge overlay for collaboration roles
- Badges: Pill-shaped (full radius), semantic colors (cyan for shared, amber for pending, red for access control)

## Motion

- Entrance: Fade + scale (100ms) on video cards as feed loads
- Hover: Subtle lift (shadow depth increase) + accent highlight on interactive cards
- Decorative: `pulse-accent` animation (2s) on collaboration indicators — draws attention to shared videos

## Constraints

- Dark mode only — optimized for video consumption and reduced eye strain
- No decorative gradients or patterns — content is the focus
- Cyan accent used sparingly for primary actions and AI differentiation badges only

## Signature Detail

Pulsing collaboration indicator on shared videos — animation category, syncs with platform differentiation (collaboration as core feature).


