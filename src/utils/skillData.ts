export type ThemeMode = 'light' | 'dark';
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
export type ControlSize = 'sm' | 'md' | 'lg' | 'xl';
export type AlertVariant = 'soft' | 'outline' | 'solid';
export type SemanticTone = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'discovery';

export interface SurfaceToken {
  name: string;
  cssVar: string;
  lightHex: string;
  darkHex: string;
  role: string;
}

export interface TypographyToken {
  name: string;
  sizePx: number;
  lineHeightPx: number;
  weight: number;
  role: string;
}

export interface ControlSizeToken {
  size: string;
  heightPx: number;
  radiusPx: number;
  fontSizePx: number;
  usage: string;
}

export interface RadiusToken {
  token: string;
  px: number | string;
  usage: string;
}

export interface ComponentSpec {
  id: string;
  name: string;
  category: 'Actions' | 'Inputs' | 'Feedback' | 'Navigation' | 'Content';
  summary: string;
  whenToUse: string;
  avoidWhen: string;
}

export const SURFACE_STACK: SurfaceToken[] = [
  {
    name: 'Surface Primary',
    cssVar: '--color-surface',
    lightHex: '#ffffff',
    darkHex: '#212121',
    role: 'Main reading canvas, primary workspace background',
  },
  {
    name: 'Surface Secondary',
    cssVar: '--color-surface-secondary',
    lightHex: '#f9f9f9',
    darkHex: '#181818',
    role: 'Sidebar navigation rail, subtle inset cards, table headers',
  },
  {
    name: 'Surface Tertiary',
    cssVar: '--color-surface-tertiary',
    lightHex: '#f3f3f3',
    darkHex: '#131313',
    role: 'Deep wells, segmented control tracks, subtle code regions',
  },
  {
    name: 'Surface Elevated',
    cssVar: '--color-surface-elevated',
    lightHex: '#ffffff',
    darkHex: '#303030',
    role: 'Floating menus, popovers, dialogs, active segmented thumbs',
  },
];

export const SEMANTIC_ACCENTS: Array<{
  tone: SemanticTone;
  label: string;
  hex: string;
  softLight: string;
  softDark: string;
  role: string;
}> = [
  {
    tone: 'primary',
    label: 'Primary Monochrome',
    hex: '#181818',
    softLight: 'rgb(13 13 13 / 8%)',
    softDark: 'rgb(255 255 255 / 12%)',
    role: 'Primary CTAs, active navigation, default containers',
  },
  {
    tone: 'info',
    label: 'Info Blue',
    hex: '#0285ff',
    softLight: 'rgb(2 133 255 / 10%)',
    softDark: 'rgb(2 133 255 / 16%)',
    role: 'Focus rings, informational banners, dark-mode active switches',
  },
  {
    tone: 'success',
    label: 'Success Green',
    hex: '#00a240',
    softLight: 'rgb(4 184 76 / 12%)',
    softDark: 'rgb(4 184 76 / 18%)',
    role: 'Completed states, verified badges, positive confirmations',
  },
  {
    tone: 'warning',
    label: 'Warning Orange',
    hex: '#e25507',
    softLight: 'rgb(251 106 34 / 12%)',
    softDark: 'rgb(251 106 34 / 18%)',
    role: 'Expiring credentials, quota cautions, non-blocking warnings',
  },
  {
    tone: 'danger',
    label: 'Danger Red',
    hex: '#e02e2a',
    softLight: 'rgb(250 66 62 / 12%)',
    softDark: 'rgb(250 66 62 / 18%)',
    role: 'Destructive actions, validation errors, critical outages',
  },
  {
    tone: 'discovery',
    label: 'Discovery Purple',
    hex: '#924ff7',
    softLight: 'rgb(146 79 247 / 12%)',
    softDark: 'rgb(146 79 247 / 18%)',
    role: 'New capability callouts, beta feature flags',
  },
];

export const TYPOGRAPHY_SCALE: TypographyToken[] = [
  { name: 'heading-3xl', sizePx: 48, lineHeightPx: 48, weight: 600, role: 'Landing hero display' },
  { name: 'heading-2xl', sizePx: 36, lineHeightPx: 42, weight: 600, role: 'Major feature titles' },
  { name: 'heading-xl', sizePx: 32, lineHeightPx: 38, weight: 600, role: 'Documentation page title' },
  { name: 'heading-lg', sizePx: 24, lineHeightPx: 28, weight: 600, role: 'Section heading' },
  { name: 'heading-md', sizePx: 20, lineHeightPx: 26, weight: 600, role: 'Sub-section / modal title' },
  { name: 'heading-xs', sizePx: 16, lineHeightPx: 24, weight: 600, role: 'Card title / empty state' },
  { name: 'text-md', sizePx: 16, lineHeightPx: 24, weight: 400, role: 'Editorial & prose reading' },
  { name: 'text-sm', sizePx: 14, lineHeightPx: 20, weight: 400, role: 'Default UI controls & tables' },
  { name: 'text-xs', sizePx: 12, lineHeightPx: 18, weight: 400, role: 'Captions & metadata' },
];

export const CONTROL_SIZES: ControlSizeToken[] = [
  { size: 'xs', heightPx: 26, radiusPx: 6, fontSizePx: 14, usage: 'Compact inline badges & table actions' },
  { size: 'sm', heightPx: 28, radiusPx: 6, fontSizePx: 14, usage: 'Dense toolbars & code block copy buttons' },
  { size: 'md', heightPx: 32, radiusPx: 8, fontSizePx: 14, usage: 'Default buttons, inputs, segmented controls' },
  { size: 'lg', heightPx: 36, radiusPx: 8, fontSizePx: 14, usage: 'Sidebar nav items, prominent form fields' },
  { size: 'xl', heightPx: 40, radiusPx: 10, fontSizePx: 14, usage: 'Primary page CTAs & search inputs' },
  { size: '2xl', heightPx: 44, radiusPx: 12, fontSizePx: 16, usage: 'Touch-friendly mobile & hero controls' },
];

export const RADIUS_SCALE: RadiusToken[] = [
  { token: '--radius-xs', px: 4, usage: 'Small badges, keyboard shortcuts' },
  { token: '--radius-sm', px: 6, usage: 'Menu items, small buttons, checkboxes' },
  { token: '--radius-md', px: 8, usage: 'Default buttons, inputs, code blocks' },
  { token: '--radius-lg', px: 10, usage: 'Large inputs & xl buttons' },
  { token: '--radius-xl', px: 12, usage: 'Alerts, menus, popovers, inline cards' },
  { token: '--radius-2xl', px: 16, usage: 'Feature cards & preview stages' },
  { token: '--radius-4xl', px: 24, usage: 'Floating composer & command bars' },
  { token: '--radius-full', px: '9999px', usage: 'Pill CTAs, switches, avatars' },
];

export const COMPONENT_SPECS: ComponentSpec[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    summary: 'Monochrome-first interactive trigger with solid, soft, outline, and ghost variants.',
    whenToUse: 'Use solid for one primary action per view, soft for dismiss/secondary, outline for neutral utilities, and ghost for icon/sidebar controls.',
    avoidWhen: 'Avoid placing multiple solid primary buttons next to each other or using bright brand gradients.',
  },
  {
    id: 'input-composer',
    name: 'Input & Composer Bar',
    category: 'Inputs',
    summary: 'Crisp inset-bordered fields and the signature 24px-radius floating composer container.',
    whenToUse: 'Use soft pill inputs for search/filtering, outline inputs for structured forms, and the composer bar for command, search, or prompt entry.',
    avoidWhen: 'Avoid heavy drop shadows on form inputs or mixing pill and sharp square inputs in the same form.',
  },
  {
    id: 'segmented-control',
    name: 'SegmentedControl',
    category: 'Navigation',
    summary: 'Muted track with an elevated floating thumb for zero-latency view switching.',
    whenToUse: 'Use for 2–4 mutually exclusive views (Preview | Code, 7d | 30d | 90d, Light | Dark).',
    avoidWhen: 'Avoid using for >5 options or primary top-level site navigation.',
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    summary: 'Full-bleed 12px rounded notice with semantic alpha surface, 1px inset border, and smart action placement.',
    whenToUse: 'Use for system notices, inline validation summaries, or permission callouts with optional pill actions.',
    avoidWhen: 'Never use thick colored left borders (border-l-4); always wrap the full alert in a subtle 1px hairline.',
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Feedback',
    summary: 'Compact 20–24px status indicator with soft alpha, solid, or outline variants.',
    whenToUse: 'Reserve strictly for functional status or counts (Active, Deprecated, 3 errors).',
    avoidWhen: 'Never render decorative pill clouds or wrap static article metadata (dates, tags) in pill boxes.',
  },
  {
    id: 'menu-popover',
    name: 'Menu & Popover',
    category: 'Navigation',
    summary: 'Elevated #fff / #303030 surface with 12px outer radius, 6px gutter, and 6px inner item highlight.',
    whenToUse: 'Use for contextual action menus, account switchers, and compact filter popovers.',
    avoidWhen: 'Avoid placing nested multi-column mega-menus inside lightweight popovers.',
  },
  {
    id: 'switch-slider',
    name: 'Switch & Slider',
    category: 'Inputs',
    summary: '32×19px pill switch and hairline track slider for settings and parameter tuning.',
    whenToUse: 'Use Switch for immediate binary preferences and Slider for continuous numeric bounds.',
    avoidWhen: 'Do not use Switch inside multi-field forms that require an explicit Submit button (use Checkbox instead).',
  },
  {
    id: 'code-empty',
    name: 'CodeBlock & EmptyMessage',
    category: 'Content',
    summary: 'Restrained 5-color syntax block with top-right Copy button, plus balanced zero-state layouts.',
    whenToUse: 'Use CodeBlock for copyable snippets/CLI commands and EmptyMessage whenever a filtered list or workspace has zero items.',
    avoidWhen: 'Avoid dark-only code blocks inside light mode—keep CodeBlock surfaces theme-aware (#fcfcfc / #161616).',
  },
];

export function computeInnerRadius(outerRadiusPx: number, paddingPx: number): number {
  return Math.max(0, outerRadiusPx - paddingPx);
}

export function buildButtonSnippet(opts: {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ControlSize;
  pill: boolean;
  label: string;
}): string {
  const props: string[] = [
    `variant="${opts.variant}"`,
    `color="${opts.color}"`,
    `size="${opts.size}"`,
  ];
  if (opts.pill) {
    props.push('pill');
  }
  return `<Button ${props.join(' ')}>\n  ${opts.label}\n</Button>`;
}

export function buildAlertSnippet(opts: {
  variant: AlertVariant;
  tone: SemanticTone;
  title: string;
  description: string;
}): string {
  return `<Alert
  variant="${opts.variant}"
  color="${opts.tone}"
  title="${opts.title}"
  description="${opts.description}"
  actions={<Button variant="soft" size="sm" pill>Dismiss</Button>}
/>`;
}

export function filterComponents(
  specs: ComponentSpec[],
  query: string,
  category: string,
): ComponentSpec[] {
  const normalizedQuery = query.trim().toLowerCase();
  return specs.filter((spec) => {
    const matchesCategory = category === 'All' || spec.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      spec.name.toLowerCase().includes(normalizedQuery) ||
      spec.summary.toLowerCase().includes(normalizedQuery) ||
      spec.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export interface MotionCurveToken {
  name: string;
  cssVar: string;
  bezier: string;
  durationMs: string;
  role: string;
}

export const MOTION_CURVES: MotionCurveToken[] = [
  {
    name: 'Enter (Deceleration)',
    cssVar: '--cubic-enter',
    bezier: 'cubic-bezier(0.19, 1, 0.22, 1)',
    durationMs: '300–500ms',
    role: 'Menus, popovers, dialogs, SegmentedControl sliding thumb',
  },
  {
    name: 'Exit (Acceleration)',
    cssVar: '--cubic-exit',
    bezier: 'cubic-bezier(0.8, 0, 0.4, 1)',
    durationMs: '200–300ms',
    role: 'Closing popovers, unmounting cards, exiting layout items',
  },
  {
    name: 'Move (Symmetric)',
    cssVar: '--cubic-move',
    bezier: 'cubic-bezier(0.65, 0, 0.35, 1)',
    durationMs: '250–300ms',
    role: 'Switch thumb slide, AnimateLayout height/width changes',
  },
  {
    name: 'Basic Micro-Feedback',
    cssVar: '--transition-duration-basic',
    bezier: 'ease',
    durationMs: '150ms',
    role: 'Hover backgrounds, border focus rings, menu item highlights',
  },
];

export const PRESS_SCALE_RULES: Array<{
  rangeLabel: string;
  maxWidthPx: number | null;
  scale: number;
  example: string;
}> = [
  { rangeLabel: '<= 80px', maxWidthPx: 80, scale: 0.96, example: 'Icon buttons, compact pills' },
  { rangeLabel: '81px – 150px', maxWidthPx: 150, scale: 0.97, example: 'Standard buttons (Save, Cancel)' },
  { rangeLabel: '151px – 220px', maxWidthPx: 220, scale: 0.98, example: 'Wide action CTAs' },
  { rangeLabel: '221px – 600px', maxWidthPx: 600, scale: 0.985, example: 'Block buttons, list cards' },
  { rangeLabel: '> 600px', maxWidthPx: null, scale: 0.995, example: 'Full-width action bars' },
];

export function computePressScale(widthPx: number): number {
  if (widthPx <= 80) return 0.96;
  if (widthPx <= 150) return 0.97;
  if (widthPx <= 220) return 0.98;
  if (widthPx <= 600) return 0.985;
  return 0.995;
}

