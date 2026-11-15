# ChatGPT Visual Style — Component Catalog & Usage Recipes

This reference documents each reusable UI component, its exact geometry/tokens, and how to use it across general web applications (SaaS tools, documentation, dashboards, workspaces, landing pages) to achieve the calm, tactile ChatGPT visual aesthetic.

---

## 1. App Shell & Surface Layering

**Visual Rule:** Depth comes from **surface luminance stacking** + **hairline alpha borders**, never heavy drop shadows on static layout regions.

- **Sidebar (`--color-surface-secondary`)**: `#f9f9f9` (light) / `#181818` (dark), `240px–260px` wide, `1px solid var(--color-border-subtle)` right divider.
- **Main Canvas (`--color-surface`)**: `#ffffff` (light) / `#212121` (dark).
- **Inset Panels / Cards (`--color-surface-secondary` or `--alpha-04`)**: `12px–16px` radius (`--radius-xl` / `--radius-2xl`), `1px solid var(--color-border)`.
- **Floating Overlays / Popovers (`--color-surface-elevated`)**: `#ffffff` (light) / `#303030` (dark) with `--shadow-popover, --shadow-hairline`.

**When to use:** Any workspace, dashboard, docs site, or multi-view web app.

---

## 2. Button

**Anatomy:** Inline-flex container, `line-height: 1`, `font-weight: 500`, `white-space: nowrap`, subtle press scale (`active:scale-[0.98]`), and 150ms transitions.

**Variants & Hierarchy:**
1. **`solid` (`primary`)**: High-contrast inverted monochrome (`#181818` bg / `#ffffff` text in light; `#f3f3f3` bg / `#0d0d0d` text in dark). Use for the **single primary CTA** per view (`Save`, `Create`, `Submit`).
2. **`soft` (`primary`/`secondary`)**: Translucent fill (`alpha-08` light / `alpha-12` dark). Use for **secondary actions** (`Dismiss`, `Cancel`, `Export`, toolbar pills).
3. **`outline`**: Transparent with `1px inset` border (`alpha-16` light / `alpha-25` dark). Use for **neutral utility actions** (`Copy`, `View code`, `Filter`).
4. **`ghost`**: Transparent until hovered (`alpha-08` hover). Use for **icon buttons, sidebar items, table row actions, header utilities**.

**Shape & Sizing:**
- Use `pill` (`border-radius: 9999px`) for conversational/hero CTAs, dismiss actions, and floating bar actions.
- Use `rounded-md` (`8px`) or `rounded-lg` (`10px`) for form actions, toolbars, and dense UI controls.
- Standard sizes: `sm` (`28px`, 14px text), `md` (`32px`, 14px text), `lg` (`36px`, 14px text), `xl` (`40px`, 14px text).
- **Pill gutter rule:** Multiply horizontal padding by `1.33×` when `pill` is active so rounded ends never feel cramped.

---

## 3. Input, Textarea & Composer Bar

**Anatomy:**
- **`Input` (`outline`)**: `1px inset` border (`alpha-16` default -> `alpha-25` hover -> `alpha-50` focus). Height matches control scale (`md: 32px`, `lg: 36px`, `xl: 40px`), radius `8px–10px` (or `full` for search pills).
- **`Input` (`soft`)**: Borderless translucent fill (`alpha-05` light / `alpha-08` dark), crisp `1px inset alpha-50` focus border. Ideal for sidebar search (`Find components...`) and inline filters.
- **`Composer Bar` (Signature ChatGPT Pattern)**: Elevated or soft rounded container (`24px` radius / `--radius-4xl`), `1px solid var(--color-border)`, subtle elevation shadow in light mode (`0 2px 8px rgb(0 0 0 / 4%)`), containing an auto-growing borderless `<textarea>` on top/center and a clean bottom/inline action row (left utility buttons in `ghost`, right primary submit circle button `32px–36px` in `solid` monochrome).

**When to use outside chat:** Command bars, global search prompts, feedback boxes, AI-assisted filters, issue/ticket quick-creators, note capture.

---

## 4. SegmentedControl

**Anatomy:** Track container (`height: 32px` or `36px`, `padding: 2px`, `gap: 2px`, `background: var(--gray-100)` light / `#181818` dark, `border-radius: 8px` or `full` for `pill`). Active option sits on a crisp elevated thumb (`#ffffff` light / `#303030` dark, `box-shadow: 0 1px 4px -1px rgb(0 0 0 / 20%)`) with `font-weight: 600`. Inactive options use `--color-text-secondary` and brighten on hover.

**When to use:** Switching views (`Preview | Code`), timeframes (`7d | 30d | 90d`), theme modes (`Light | Dark`), or billing cycles without page reloads.

---

## 5. Badge

**Anatomy:** Compact inline indicator (`height: 20px–24px`, `border-radius: 4px–6px`, `font-size: 12px–14px`, `font-weight: 600`, `padding: 0 6px–8px`).

**Variants:**
- `soft`: Tinted alpha fill (`--green-a50`, `--blue-a50`, `--orange-a50`, `--red-a50`, `--purple-a50`) with high-contrast matching text.
- `outline`: `1px inset` colored border, transparent background.
- `solid`: Full semantic fill with white text.

**Usage Discipline:** Reserve badges strictly for **functional state or counts** (`Beta`, `Deprecated`, `3 errors`, `Active`). Never use pill badges as decorative tag clouds on cards.

---

## 6. Alert

**Anatomy:** Full-width rounded banner (`border-radius: 12px`, `padding: 16px`, `gap: 12px`), `14px` text (`line-height: 20px`), `600` semibold title, secondary/matching description, semantic leading icon (`20px`), and optional right-aligned (`end`) or bottom-aligned (`bottom`) pill buttons.

**Variants:** `soft` (subtle tinted surface + hairline inset border), `outline` (transparent + `1px` semantic border), `solid` (high-urgency banner).

**When to use:** Maintenance notices, validation summaries, feature announcements, permission warnings.

---

## 7. Menu & Popover

**Anatomy:** Floating panel on `--color-surface-elevated` (`#ffffff` light / `#303030` dark), `border-radius: 12px`, `padding: 6px` (`--menu-gutter`), `box-shadow: var(--shadow-popover), var(--shadow-hairline)`.
- **Menu Items:** `padding: 6px 8px`, `border-radius: 6px` (`outer radius 12px - gutter 6px`), hover/highlight fill `rgb(13 13 13 / 8%)` light / `rgb(255 255 255 / 10%)` dark, `14px` text.
- **Separators:** `1px` full-bleed hairline (`--color-border`) with `6px` vertical margin.
- **Motion:** Scale `0.95 -> 1` + opacity `0 -> 1` over `200ms–350ms` using `cubic-bezier(0.19, 1, 0.22, 1)`.

---

## 8. Switch, Slider & AvatarGroup

- **Switch:** `32px × 19px` pill track (`#dfdfdf` off / `#181818` light-on / `#0285ff` dark-on), `13px` circular white thumb (`#ffffff` light / `#0d0d0d` dark) with `3px` offset and `250ms cubic-bezier(0.65, 0, 0.35, 1)` slide.
- **Slider:** Thin `4px` rounded track (`#dfdfdf` light / `#414141` dark), solid active range, crisp circular thumb.
- **Avatar & AvatarGroup:** Circular frames (`28px` default) with `1px` subtle alpha border; stacked groups use a `3px` cutout ring matching `--color-surface` and `-8px` overlap.

---

## 9. CodeBlock & EmptyMessage

- **CodeBlock:** `border: 1px solid var(--color-border)`, `border-radius: 8px`, `background: var(--gray-25)` (`#fcfcfc` light / `#101010` dark), `14px` monospace text (`line-height: 1.5`), top-right sticky `Copy` button. Syntax colors stay restrained (amber, blue, green, pink, purple).
- **EmptyMessage:** Vertically/horizontally centered column with a `40px × 40px` soft rounded-md (`8px`) icon container, `16px` semibold balanced title, `14px` secondary description (`max-w-[90%]`, `line-height: 1.45`), and `16px` margin before a single primary CTA button.
