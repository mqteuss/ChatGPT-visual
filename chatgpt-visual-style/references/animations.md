# ChatGPT Visual Style — Motion & Animations Reference

Motion in the ChatGPT / OpenAI Apps SDK UI system feels **calm, physically grounded, and decisive**: overlays decelerate quickly without bounce, buttons compress proportionally to their width, layout changes crossfade cleanly, and progress feedback uses restrained monochrome shimmers and subtle pulses instead of flashy spinners.

---

## 1. Timing & Easing Tokens

| Token | Value | Use Case |
| :--- | :--- | :--- |
| `--cubic-enter` | `cubic-bezier(0.19, 1, 0.22, 1)` | Exponential deceleration for entering overlays, menus, popovers, sliding thumbs (`300ms–500ms`) |
| `--cubic-exit` | `cubic-bezier(0.8, 0, 0.4, 1)` | Crisp acceleration out for closing menus, popovers, and exiting items (`200ms–300ms`) |
| `--cubic-exit-snappy` | `cubic-bezier(0.65, 0, 0.4, 1)` | Faster exit with minimal inertia lag (`200ms`) |
| `--cubic-move` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric ease-in-out for Switches (`250ms`) and `AnimateLayout` height/width shifts (`300ms`) |
| `--transition-duration-basic` | `150ms` (`ease`) | Hover colors, border focus rings, menu item highlights |

---

## 2. Tactile Press Scale (`--scale`)

Instead of a single hardcoded `active:scale-95` (which makes wide buttons warp dramatically and tiny buttons barely move), ChatGPT computes press scale from the element's width:

| Element Width | `--scale` | Visual Effect |
| :--- | :--- | :--- |
| `<= 80px` (icon / compact pill) | `0.96` | Noticeable tactile click |
| `81px – 150px` (standard button) | `0.97` | Balanced desktop button press |
| `151px – 220px` (wide CTA) | `0.98` | Controlled compression |
| `221px – 600px` (block button) | `0.985` | Subtle surface dip |
| `> 600px` (full-width bar) | `0.995` | Barely perceptible micro-feedback |

Apply the scale to the `::before` background layer so text inside stays crisp without subpixel blur.

---

## 3. Component & Pattern Animations

### A. Popover & Menu Scale-In (`350ms` enter / `200ms` exit)
- **Enter:** `opacity: 0; transform: scale(0.95)` → `opacity: 1; transform: scale(1)` using `var(--cubic-enter)`, anchored to `transform-origin`.
- **Exit:** `opacity: 1; transform: scale(1)` → `opacity: 0; transform: scale(0.95)` using `var(--cubic-exit)`.
- **Menu Item Highlight:** Pseudo-element `::before` scales from `0.98` to `1` with `150ms var(--cubic-enter)`.

### B. SegmentedControl Sliding Thumb (`300ms`)
- An elevated thumb div sits behind the option labels (`position: absolute`).
- Measure `activeOption.clientWidth` and `activeOption.offsetLeft` and animate `width` + `transform: translateX(...)` over `300ms var(--cubic-enter)`.
- **Mount Rule:** Set initial position *before* enabling `transition` (after 2 animation frames) so the thumb never slides in from `x = 0` on initial page load.

### C. Switch Slide (`250ms`)
- Track background and thumb `translateX` both animate over `250ms var(--cubic-move)`.

### D. Content & Layout Crossfade (`Animate` & `AnimateLayout`)
- **`Animate`:** Combines `opacity`, `translateY(6px–10px)`, `scale(0.96–1)`, and optional `blur(4px)` (`400ms–500ms` enter, `200ms–300ms` exit). Interrupted transitions clear `transition-delay: 0ms`.
- **`AnimateLayout`:** Smoothly animates container `height` or `width` (`300ms var(--cubic-move)`) while crossfading swapped children (`100ms` enter delay so the exiting content clears first).

### E. Status & Async Feedback (`ShimmerText`, `LoadingDots`, `LoadingIndicator`, `Shake`)
1. **`ShimmerText` (`3s` sweep):** `linear-gradient(to left, currentcolor, var(--shimmer-highlight) 50%, currentcolor)` clipped to text (`background-size: 50% 200%`), sweeping `background-position` from `-100% top` to `250% top` by `70%` and pausing cleanly until `100%` (with `0.6s` initial delay). Ideal for non-intrusive async status labels (*"Analyzing files..."*, *"Syncing workspace..."*).
2. **`LoadingDots` (`1s` staggered pulse):** Three `8px` circles (`gap: 4px`) inside a `24px` line-height box pulsing opacity `0.15 -> 0.4 -> 0.15` with `0s`, `0.2s`, `0.4s` delays.
3. **`LoadingIndicator` (`0.8s` conic spinner):** `1em` ring using `mask-image: conic-gradient(transparent, black)` + rounded leading dot, rotating linearly.
4. **Validation Shake (`400ms ease`):** Horizontal `translateX` oscillation (`0 -> -5px -> +5px -> -5px -> +5px -> 0`) for invalid form submissions or blocked actions.

---

## 4. Accessibility (`prefers-reduced-motion`)

Always honor `@media (prefers-reduced-motion: reduce)`:
- Collapse transform/scale transitions (`none` or `0.01ms`) and stop infinite shimmer sweeps.
- Keep simple opacity state changes short (`100ms`) so UI updates remain clear without vestibular discomfort.
