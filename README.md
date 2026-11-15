# ChatGPT Visual Style Skill

A reusable AI agent skill and interactive design-system studio for building **any** website or web application (SaaS dashboards, documentation portals, developer tools, settings consoles, or command-first interfaces) with the calm, high-clarity visual language and motion system of ChatGPT and OpenAI's [`@openai/apps-sdk-ui`](https://github.com/openai/apps-sdk-ui) — **without** cloning `chatgpt.com`.

---

## Using the Skill with AI Agents

The installable skill lives in [`chatgpt-visual-style/`](./chatgpt-visual-style/):

```text
chatgpt-visual-style/
├── SKILL.md                    # Core rules, visual DNA, anti-patterns, and composition guide
└── references/
    ├── tokens.css              # Light/dark CSS variables, typography, radii, shadows, keyframes
    ├── components.md           # Button, Input, Composer Bar, SegmentedControl, Badge, Alert, Menu specs
    └── animations.md           # Easing curves, width-adaptive press scale, layout morphs, shimmers
```

### Option 1: Install via `skills` CLI

```bash
npx skills add <YOUR_GITHUB_USER>/<YOUR_REPO>
```

### Option 2: Copy into your project or global skills folder

Copy the `chatgpt-visual-style/` directory into the skills path used by your coding agent:

- **Project-scoped:** `.agents/skills/chatgpt-visual-style`, `.claude/skills/chatgpt-visual-style`, or `.cursor/skills/chatgpt-visual-style`
- **Global:** `~/.agents/skills/chatgpt-visual-style` or `~/.claude/skills/chatgpt-visual-style`

### Option 3: Download `.zip` from the Web Studio

Open the **Skill Export** tab in the interactive studio and click **Download Skill (.zip)** to download the complete `chatgpt-visual-style/` folder ready for drag-and-drop or unzipping.

---

## Interactive Skill Studio

This repository also includes a React + Vite + Tailwind v4 web application that demonstrates the skill live in both Light and Dark themes:

- **Foundations & Tokens** — Luminance surface stack, hairline alpha borders, monochrome + semantic accents, typography scale, and nested radius math calculator.
- **Components & Usage** — Live interactive playground (`Button`, `Input`, `Composer Bar`, `SegmentedControl`, `Elevated Menu`, `Alert`, `Badge`, `Switch`, `CodeBlock`, `EmptyMessage`) with usage guidance and snippet generator.
- **Motion & Animations** — Playable easing curves (`--cubic-enter`, `--cubic-exit`, `--cubic-move`), popover scale-in, validation shake, `AnimateLayout` height morph, width-adaptive `--scale`, `ShimmerText`, `LoadingDots`, `LoadingIndicator`, and `CircularProgress`.
- **Composition Recipes** — Three non-chat page layouts (SaaS Analytics Console, Documentation Portal, Command-First Workspace Hub).
- **Skill Export** — Preview, copy, download individual files, or export the entire skill as a `.zip` archive.

### Run Locally

```bash
npm install
npm run dev
```

Build and type-check:

```bash
npm run lint
npm run build
```

---

## Attribution & Scope

Design tokens, component proportions, and motion curves are grounded in OpenAI's open-source `@openai/apps-sdk-ui` design system. This skill applies those visual foundations to general-purpose web applications and explicitly avoids replicating `chatgpt.com` chat UIs.
