---
name: chatgpt-visual-style
description: >
  Design system, visual tokens, component catalog, and composition rules to
  build any website (SaaS dashboards, documentation portals, developer tools,
  settings consoles, or command-first apps) with the calm, minimalist,
  high-clarity ChatGPT / OpenAI Apps SDK UI aesthetic—without cloning
  chatgpt.com.
---

# ChatGPT Visual Style — Design System & Component Skill

Use this skill whenever the goal is to give a website or web application the **signature visual language of ChatGPT** (`chatgpt.com` and OpenAI's official `@openai/apps-sdk-ui` design system): calm monochrome luminance stacking, ultra-fine hairline borders, crisp grotesque typography, restrained semantic color accents, tactile pill and rounded-rectangle controls, and generous breathing room.

**Scope Rule:** Do **not** use this skill to recreate a ChatGPT clone. Apply its **tokens, components, and spatial rhythm** to any domain—analytics consoles, documentation sites, knowledge workspaces, configuration portals, or editorial tools.

---

## 1. Visual DNA (The 5 Defining Rules)

1. **Luminance Stacking Over Drop Shadows:**
   Never rely on heavy box shadows to separate page sections. Create hierarchy through subtle neutral surface steps:
   - **Light Mode:** Base canvas `#ffffff` -> Secondary sidebar/inset `#f9f9f9` -> Tertiary/subtle `#f3f3f3` -> Elevated popover `#ffffff` + hairline.
   - **Dark Mode:** Deepest rail `#181818` / `#0d0d0d` -> Main canvas `#212121` -> Elevated controls/popovers `#303030` -> Hover/highlight `#414141`.
2. **Hairline Alpha Borders:**
   Borders are translucent rather than opaque grays so they blend cleanly on any surface:
   - Subtle divider: `rgb(13 13 13 / 5%)` (light) / `rgb(255 255 255 / 6%)` (dark)
   - Standard border: `rgb(13 13 13 / 10%)` (light) / `rgb(255 255 255 / 12%)` (dark)
   - Control outline: `rgb(13 13 13 / 16%)` (light) / `rgb(255 255 255 / 25%)` (dark)
3. **Monochrome Primary Actions + Surgical Semantic Accents:**
   90% of the interface is pure neutral grayscale. Primary CTAs are **inverted monochrome** (`#181818` on light, `#f3f3f3` on dark). Color (`#0285ff` blue, `#00a240` green, `#e25507` orange, `#e02e2a` red, `#924ff7` purple) is reserved strictly for status indicators, focus rings, syntax tokens, and semantic alerts.
4. **Crisp Grotesque Typography (Max Weight `600`):**
   Use the native system grotesque stack (`ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", sans-serif`) with `-webkit-font-smoothing: antialiased`.
   - Headings: `600` (`font-semibold`), tight/normal tracking (`0em`).
   - Controls & nav links: `500` (`font-medium`).
   - Body prose: `400` (`font-normal`), `14px–16px`, `1.5` line-height.
   - Code & numeric tables: `ui-monospace` + `tabular-nums`.
5. **Tactile Scale & Snappy Deceleration:**
   All controls snap onto a `4px` grid (`28px` sm, `32px` md, `36px` lg, `40px` xl, `44px` 2xl). Interactive buttons compress subtly (`scale(0.98)`) on press, and floating menus enter with `cubic-bezier(0.19, 1, 0.22, 1)`.

---

## 2. Core Design Tokens

See [`references/tokens.css`](references/tokens.css) for the complete drop-in stylesheet. Key tokens:

| Token | Light Mode | Dark Mode | Role |
| :--- | :--- | :--- | :--- |
| `--color-surface` | `#ffffff` | `#212121` | Primary page & reading canvas |
| `--color-surface-secondary` | `#f9f9f9` | `#181818` | Sidebar, inset cards, table headers |
| `--color-surface-tertiary` | `#f3f3f3` | `#131313` | Deep wells, subtle track backgrounds |
| `--color-surface-elevated` | `#ffffff` | `#303030` | Dropdown menus, popovers, dialogs |
| `--color-text` | `#0d0d0d` | `#ffffff` | Primary headings & body text |
| `--color-text-secondary` | `#5d5d5d` | `#afafaf` | Descriptions, labels, inactive tabs |
| `--color-text-tertiary` | `#8f8f8f` | `#8f8f8f` | Placeholders, captions, metadata |
| `--color-border` | `rgb(13 13 13 / 10%)` | `rgb(255 255 255 / 12%)` | Cards, inputs, code blocks, separators |
| `--color-bg-primary-solid` | `#181818` | `#f3f3f3` | Primary CTA fill |
| `--color-text-primary-solid` | `#ffffff` | `#0d0d0d` | Primary CTA text |
| `--color-ring` | `#0169cc` | `#0285ff` | Keyboard `focus-visible` outline |

### Typography Scale
- **Display / Hero (`heading-3xl` to `heading-5xl`)**: `48px–72px`, weight `600`, `1.0` line-height.
- **Page Title (`heading-xl` / `heading-2xl`)**: `32px–36px`, weight `600`, `38px–42px` line-height.
- **Section Heading (`heading-md` / `heading-lg`)**: `20px–24px`, weight `600`, `26px–28px` line-height.
- **Card / Subheading (`heading-xs` / `heading-sm`)**: `16px–18px`, weight `600`, `24px–26px` line-height.
- **Body (`text-sm` / `text-md`)**: `14px / 20px` (UI & dense views) or `16px / 24px` (editorial & docs).
- **Caption / Metadata (`text-xs`)**: `12px / 18px`, `--color-text-secondary`.

### Nested Radius Math
Always compute inner radius from outer radius minus container padding:
$$r_{\text{inner}} = r_{\text{outer}} - \text{padding}$$
Example: A Menu (`12px` radius, `6px` gutter) gives menu items `6px` radius (`12 - 6 = 6`). A Composer card (`24px` radius, `12px` padding) gives inner action pills `12px` or `full` radius.

---

## 3. Component Catalog & Usage Rules

Full specifications and CSS patterns live in [`references/components.md`](references/components.md). Quick selection guide:

| Component | Variants / Options | Primary Use Case |
| :--- | :--- | :--- |
| **Button** | `solid`, `soft`, `outline`, `ghost`; `pill` or `rounded-md`; `3xs`–`3xl` | `solid` for 1 primary CTA; `soft` for secondary/dismiss; `outline` for utility; `ghost` for icons & nav |
| **Input** | `outline` (1px inset), `soft` (alpha fill); start/end adornments | `soft` + `pill` for search bars; `outline` for structured forms |
| **Composer Bar** | `24px` radius surface + auto-grow textarea + bottom toolbar | Command palettes, AI search bars, quick ticket/note creators |
| **SegmentedControl** | Sliding elevated thumb on muted track; `md`/`lg`, optional `pill` | View mode toggles (`Preview \| Code`), time filters, theme switches |
| **Badge** | `soft`, `outline`, `solid`; semantic colors (`secondary`, `info`, `success`, `warning`, `danger`, `discovery`) | Functional status labels & counts only (never decorative tag clouds) |
| **Alert** | `soft`, `outline`, `solid`; auto `end` or `bottom` actions | System notices, inline warnings, validation feedback |
| **Menu / Popover** | Elevated `#fff`/`#303030`, `12px` radius, `6px` gutter, `shadow-popover + hairline` | Contextual dropdowns, user account menus, filter popovers |
| **Switch & Slider** | `32×19px` pill switch (`#181818` light / `#0285ff` dark); `4px` track slider | Settings toggles, numeric parameter tuning |
| **CodeBlock** | `1px` border, `8px` radius, `#fcfcfc`/`#101010` well, top-right Copy button | API snippets, config blocks, CLI commands |
| **EmptyMessage** | `40px` soft icon tile + balanced title + description + 1 CTA | Zero-data states, search no-results, onboarding prompts |

---

## 4. Motion & Animation System

See [`references/animations.md`](references/animations.md) for full keyframes, press-scale tables, and code recipes. Core motion rules:

- **Decelerating Entrances (`--cubic-enter: cubic-bezier(0.19, 1, 0.22, 1)`):** Menus, popovers, dialogs (`scale(0.95) -> 1`, `350ms`), and `SegmentedControl` sliding thumbs (`300ms`).
- **Crisp Exits (`--cubic-exit: cubic-bezier(0.8, 0, 0.4, 1)`):** Closing overlays (`200ms`) and unmounting items (`200ms–300ms`).
- **Symmetric Spatial Shifts (`--cubic-move: cubic-bezier(0.65, 0, 0.35, 1)`):** `Switch` toggles (`250ms`) and `AnimateLayout` height/width transitions (`300ms`).
- **Width-Adaptive Press Scale (`--scale`):** Buttons compress subtly on `:active` proportional to width (`0.96` for `<=80px`, `0.97` for `<=150px`, `0.985` for `<=600px`, `0.995` for wider bars).
- **Calm Async Feedback:** `ShimmerText` (`3s` gradient text sweep with pause), `LoadingDots` (`1s` staggered 3-dot opacity pulse), `LoadingIndicator` (`0.8s` conic-masked spinner), and `400ms` horizontal `shake` for validation errors.
- **Reduced Motion:** Always respect `prefers-reduced-motion: reduce`.

---

## 5. Composition Patterns for Non-Chat Websites

1. **SaaS / Analytics Console:**
   - Fixed `256px` left sidebar (`--color-surface-secondary`) with `ghost` nav items (`height: 36px`, `8px` radius) and `soft` search input at top.
   - Main canvas (`--color-surface`) with a clean 1-row header (breadcrumb + 1 `solid` primary CTA), a `SegmentedControl` filter bar, hairline-bordered metric/data tables (`tabular-nums`), and a `soft` `Alert` for system notices.
2. **Documentation / Knowledge Portal:**
   - Left component/topic rail + centered `max-w-[740px]` prose column (`16px` body, `32px` page title) + optional right `On this page` anchor rail with a crisp `2px` active indicator bar.
   - Interactive preview cards: top `1px` bordered stage + bottom `CodeBlock` with `Copy` button.
3. **Command-First Landing / Workspace Hub:**
   - Generous whitespace (`py-20`), balanced `36px–48px` semibold headline, centered `Composer Bar` (`max-w-[680px]`, `24px` radius) acting as a search/command entry point, 3–4 `outline` / `soft` quick-action pills beneath, and a clean 2-column grid of hairline-bordered feature cards (`16px` radius).

---

## 6. Strict Anti-Patterns (Avoid These)

- **No neon glows or saturated gradient backgrounds** — keep surfaces strictly neutral and calm.
- **No thick colored left borders (`border-l-4`)** on alerts or callouts — use full `1px` hairline inset borders and subtle semantic alpha fills.
- **No heavy drop shadows on static cards** — reserve shadows exclusively for floating popovers, menus, and active segmented-control thumbs.
- **No static pill badge clutter** — metadata (`date · author · category`) stays plain secondary text separated by `·`.
- **No oversized bold weights (`800/900`) or uppercase micro-labels** — stick to `400`, `500`, and `600` in natural sentence/title case.
- **No bouncy spring overshoot (`cubic-bezier` > 1)** — ChatGPT motion decelerates smoothly without cartoonish bounce.

