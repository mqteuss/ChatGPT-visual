import { useState } from 'react';
import { Search, Inbox, Check, Sparkles } from 'lucide-react';
import {
  COMPONENT_SPECS,
  filterComponents,
  buildButtonSnippet,
  buildAlertSnippet,
  type ButtonVariant,
  type ButtonColor,
  type ControlSize,
  type AlertVariant,
  type SemanticTone,
} from '../utils/skillData';
import {
  CgButton,
  CgBadge,
  CgAlert,
  CgSegmentedControl,
  CgSwitch,
  CgCodeBlock,
  CgEmptyMessage,
  CgPopoverMenu,
  CgComposerBar,
} from './ChatGPTPrimitives';

const CATEGORIES = ['All', 'Actions', 'Inputs', 'Navigation', 'Feedback', 'Content'] as const;

export function ComponentsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>('All');

  // Button playground state
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>('solid');
  const [btnColor, setBtnColor] = useState<ButtonColor>('primary');
  const [btnSize, setBtnSize] = useState<ControlSize>('md');
  const [btnPill, setBtnPill] = useState(true);

  // Alert playground state
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('soft');
  const [alertTone, setAlertTone] = useState<SemanticTone>('info');

  // Interactive demo states
  const [segmentValue, setSegmentValue] = useState<'preview' | 'tokens' | 'usage'>('preview');
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [sliderVal, setSliderVal] = useState(64);
  const [outlineInput, setOutlineInput] = useState('');

  const filtered = filterComponents(COMPONENT_SPECS, searchQuery, category);

  const buttonCode = buildButtonSnippet({
    variant: btnVariant,
    color: btnColor,
    size: btnSize,
    pill: btnPill,
    label: 'Save changes',
  });

  const alertCode = buildAlertSnippet({
    variant: alertVariant,
    tone: alertTone,
    title: 'Scheduled maintenance',
    description: 'Database upgrade runs Sunday 02:00–04:00 UTC.',
  });

  return (
    <div className="space-y-12">
      {/* Header & Filter Bar */}
      <section className="space-y-4">
        <div>
          <h1 className="text-[32px] leading-[38px] font-semibold tracking-tight text-[var(--color-text)]">
            Components &amp; Usage Rules
          </h1>
          <p className="text-[16px] leading-[24px] text-[var(--color-text-secondary)] max-w-[68ch] mt-2">
            Every primitive is composable, accessible, and calibrated for both Light and Dark
            surfaces. Test variants live below and follow the usage guidance to keep your UI calm
            and legible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:max-w-[280px]">
            <Search
              className="w-4 h-4 text-[var(--color-text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter components..."
              aria-label="Filter components"
              className="w-full h-[34px] pl-9 pr-3 rounded-full bg-[var(--color-soft-bg)] text-[14px] text-[var(--color-text)] focus:outline-none focus:shadow-[inset_0_0_0_1px_var(--color-focus-border)] transition-shadow"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <CgButton
                key={cat}
                variant={category === cat ? 'solid' : 'ghost'}
                color="primary"
                size="sm"
                pill
                onClick={() => setCategory(cat)}
              >
                {cat}
              </CgButton>
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
          <CgEmptyMessage
            icon={<Inbox className="w-5 h-5" aria-hidden="true" />}
            title="No matching components"
            description="Try clearing your search filter or switching back to All categories."
            actionLabel="Reset filters"
            onAction={() => {
              setSearchQuery('');
              setCategory('All');
            }}
          />
        </div>
      ) : (
        <div className="space-y-10">
          {/* 1. Button Playground */}
          {filtered.some((c) => c.id === 'button') && (
            <ComponentSection
              title="Button"
              category="Actions"
              summary="Monochrome-first interactive trigger with solid, soft, outline, and ghost hierarchy."
              whenToUse="Use solid for one primary CTA per view, soft for secondary/dismiss actions, outline for utilities (Copy, Filter), and ghost for icons and sidebar items."
              avoidWhen="Avoid placing multiple solid primary buttons side by side or applying saturated gradient fills."
            >
              <div className="rounded-[16px] border border-[var(--color-border)] overflow-hidden">
                <div className="p-8 bg-[var(--color-surface)] flex flex-wrap items-center justify-center gap-4 min-h-[140px]">
                  <CgButton variant={btnVariant} color={btnColor} size={btnSize} pill={btnPill}>
                    Save changes
                  </CgButton>
                  <CgButton variant="soft" color="primary" size={btnSize} pill={btnPill}>
                    Cancel
                  </CgButton>
                  <CgButton variant="outline" color="primary" size={btnSize} pill={btnPill}>
                    Preview
                  </CgButton>
                  <CgButton variant="ghost" color="secondary" size={btnSize} pill={btnPill}>
                    Reset
                  </CgButton>
                </div>

                <div className="px-5 py-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)] flex flex-wrap items-center gap-5 text-[13px]">
                  <label className="flex items-center gap-2">
                    <span className="text-[var(--color-text-secondary)]">Variant</span>
                    <select
                      aria-label="Button variant"
                      value={btnVariant}
                      onChange={(e) => setBtnVariant(e.target.value as ButtonVariant)}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[var(--color-border-outline)] bg-[var(--color-surface)] text-[var(--color-text)] text-[13px]"
                    >
                      <option value="solid">solid</option>
                      <option value="soft">soft</option>
                      <option value="outline">outline</option>
                      <option value="ghost">ghost</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2">
                    <span className="text-[var(--color-text-secondary)]">Color</span>
                    <select
                      aria-label="Button color"
                      value={btnColor}
                      onChange={(e) => setBtnColor(e.target.value as ButtonColor)}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[var(--color-border-outline)] bg-[var(--color-surface)] text-[var(--color-text)] text-[13px]"
                    >
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="info">info</option>
                      <option value="success">success</option>
                      <option value="warning">warning</option>
                      <option value="danger">danger</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2">
                    <span className="text-[var(--color-text-secondary)]">Size</span>
                    <select
                      aria-label="Button size"
                      value={btnSize}
                      onChange={(e) => setBtnSize(e.target.value as ControlSize)}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[var(--color-border-outline)] bg-[var(--color-surface)] text-[var(--color-text)] text-[13px]"
                    >
                      <option value="sm">sm (28px)</option>
                      <option value="md">md (32px)</option>
                      <option value="lg">lg (36px)</option>
                      <option value="xl">xl (40px)</option>
                    </select>
                  </label>

                  <CgSwitch id="btn-pill-switch" checked={btnPill} onChange={setBtnPill} label="Pill radius" />
                </div>
              </div>

              <CgCodeBlock filename="ButtonExample.tsx" code={buttonCode} />
            </ComponentSection>
          )}

          {/* 2. Input & Composer Bar */}
          {filtered.some((c) => c.id === 'input-composer') && (
            <ComponentSection
              title="Input & Composer Bar"
              category="Inputs"
              summary="Inset-bordered fields and the signature 24px-radius floating composer container."
              whenToUse="Use outline inputs for structured settings forms, soft pill inputs for search, and the Composer Bar for command prompts, AI search, or quick creation."
              avoidWhen="Avoid heavy drop shadows on standard text fields or mixing sharp 2px inputs with 24px cards."
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
                  <div className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                    Standard Form Fields (<code className="text-[12px] font-mono">outline</code>{' '}
                    &amp; <code className="text-[12px] font-mono">soft</code>)
                  </div>
                  <div className="space-y-3">
                    <label className="block space-y-1.5">
                      <span className="text-[13px] font-medium text-[var(--color-text)]">
                        Workspace Name (outline)
                      </span>
                      <input
                        type="text"
                        value={outlineInput}
                        onChange={(e) => setOutlineInput(e.target.value)}
                        placeholder="e.g. Acme Design System"
                        className="w-full h-[36px] px-3 rounded-[8px] bg-transparent text-[14px] text-[var(--color-text)] shadow-[inset_0_0_0_1px_var(--color-border-outline)] hover:shadow-[inset_0_0_0_1px_var(--color-border-strong)] focus:outline-none focus:shadow-[inset_0_0_0_1px_var(--color-focus-border)] transition-shadow"
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-[13px] font-medium text-[var(--color-text)]">
                        Quick Filter (soft pill)
                      </span>
                      <input
                        type="text"
                        placeholder="Filter endpoints or keys..."
                        className="w-full h-[36px] px-4 rounded-full bg-[var(--color-soft-bg)] text-[14px] text-[var(--color-text)] focus:outline-none focus:shadow-[inset_0_0_0_1px_var(--color-focus-border)] transition-shadow"
                      />
                    </label>
                  </div>
                </div>

                <div className="p-5 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] flex flex-col justify-between gap-3">
                  <div className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                    Signature 24px Composer Bar (Command / Prompt Entry)
                  </div>
                  <CgComposerBar />
                </div>
              </div>
            </ComponentSection>
          )}

          {/* 3. SegmentedControl & Menu */}
          {(filtered.some((c) => c.id === 'segmented-control') ||
            filtered.some((c) => c.id === 'menu-popover')) && (
            <ComponentSection
              title="SegmentedControl & Elevated Menu"
              category="Navigation"
              summary="Instant view switching with elevated thumb contrast and floating 12px-radius action menus."
              whenToUse="Use SegmentedControl for 2–4 local view modes (Preview | Tokens | Usage) and Elevated Menu for contextual row or header actions."
              avoidWhen="Avoid using SegmentedControl for primary multi-page routing."
            >
              <div className="p-6 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2.5">
                  <div className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                    SegmentedControl (<code className="text-[12px] font-mono">pill</code> &amp;{' '}
                    <code className="text-[12px] font-mono">rounded-md</code>)
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <CgSegmentedControl
                      ariaLabel="Inspector mode"
                      value={segmentValue}
                      onChange={setSegmentValue}
                      options={[
                        { value: 'preview', label: 'Preview' },
                        { value: 'tokens', label: 'Tokens' },
                        { value: 'usage', label: 'Usage' },
                      ]}
                    />
                    <CgSegmentedControl
                      ariaLabel="Inspector mode pill"
                      value={segmentValue}
                      onChange={setSegmentValue}
                      pill
                      options={[
                        { value: 'preview', label: 'Preview' },
                        { value: 'tokens', label: 'Tokens' },
                        { value: 'usage', label: 'Usage' },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                    Elevated Action Menu (12px radius, 6px gutter)
                  </div>
                  <CgPopoverMenu
                    label="Workspace actions"
                    items={[
                      { id: 'dup', label: 'Duplicate project', shortcut: '⌘D', onSelect: () => {} },
                      { id: 'exp', label: 'Export tokens.css', shortcut: '⌘E', onSelect: () => {} },
                      { id: 'arc', label: 'Archive workspace', danger: true, onSelect: () => {} },
                    ]}
                  />
                </div>
              </div>
            </ComponentSection>
          )}

          {/* 4. Alert & Badge */}
          {(filtered.some((c) => c.id === 'alert') || filtered.some((c) => c.id === 'badge')) && (
            <ComponentSection
              title="Alert & Badge"
              category="Feedback"
              summary="Hairline-bordered semantic banners and compact status indicators—zero thick left borders."
              whenToUse="Use Alert for system notices or action prompts, and Badge strictly for real status labels or counts."
              avoidWhen="Never wrap static article dates or category lists in pill badges, and never use border-l-4 callouts."
            >
              <div className="rounded-[16px] border border-[var(--color-border)] overflow-hidden">
                <div className="p-6 bg-[var(--color-surface)] space-y-5">
                  <CgAlert
                    variant={alertVariant}
                    tone={alertTone}
                    title="Scheduled maintenance"
                    description="Database upgrade runs Sunday 02:00–04:00 UTC."
                    actions={
                      <CgButton
                        variant={alertVariant === 'solid' ? 'soft' : 'solid'}
                        size="sm"
                        pill
                      >
                        Acknowledge
                      </CgButton>
                    }
                  />

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[13px] text-[var(--color-text-secondary)] mr-2">
                      Badges:
                    </span>
                    <CgBadge tone="primary">Draft</CgBadge>
                    <CgBadge tone="info">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      <span>Beta</span>
                    </CgBadge>
                    <CgBadge tone="success">
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Operational</span>
                    </CgBadge>
                    <CgBadge tone="warning">Expiring soon</CgBadge>
                    <CgBadge tone="danger">3 errors</CgBadge>
                    <CgBadge tone="discovery" variant="outline">
                      v2.4
                    </CgBadge>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)] flex flex-wrap items-center gap-4 text-[13px]">
                  <label className="flex items-center gap-2">
                    <span className="text-[var(--color-text-secondary)]">Alert Variant</span>
                    <select
                      aria-label="Alert variant"
                      value={alertVariant}
                      onChange={(e) => setAlertVariant(e.target.value as AlertVariant)}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[var(--color-border-outline)] bg-[var(--color-surface)] text-[var(--color-text)] text-[13px]"
                    >
                      <option value="soft">soft</option>
                      <option value="outline">outline</option>
                      <option value="solid">solid</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-[var(--color-text-secondary)]">Tone</span>
                    <select
                      aria-label="Alert tone"
                      value={alertTone}
                      onChange={(e) => setAlertTone(e.target.value as SemanticTone)}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[var(--color-border-outline)] bg-[var(--color-surface)] text-[var(--color-text)] text-[13px]"
                    >
                      <option value="primary">primary</option>
                      <option value="info">info</option>
                      <option value="success">success</option>
                      <option value="warning">warning</option>
                      <option value="danger">danger</option>
                      <option value="discovery">discovery</option>
                    </select>
                  </label>
                </div>
              </div>

              <CgCodeBlock filename="AlertExample.tsx" code={alertCode} />
            </ComponentSection>
          )}

          {/* 5. Switch, Slider & AvatarGroup */}
          {filtered.some((c) => c.id === 'switch-slider') && (
            <ComponentSection
              title="Switch, Slider & AvatarGroup"
              category="Inputs"
              summary="Compact 32×19px toggle switches, hairline sliders, and cutout-ring avatar stacks."
              whenToUse="Use Switch for immediate settings toggles, Slider for continuous numeric bounds, and AvatarGroup for collaborators."
              avoidWhen="Use Checkbox instead of Switch when changes require an explicit form Submit."
            >
              <div className="p-6 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-3">
                  <CgSwitch
                    id="sw-sync"
                    checked={switchA}
                    onChange={setSwitchA}
                    label="Auto-sync tokens"
                  />
                  <CgSwitch
                    id="sw-compact"
                    checked={switchB}
                    onChange={setSwitchB}
                    label="Compact table rows"
                  />
                </div>

                <label className="space-y-2 block">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-[var(--color-text)]">Surface Contrast</span>
                    <span className="font-mono tabular-nums text-[var(--color-text-secondary)]">
                      {sliderVal}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-[#181818] dark:accent-[#0285ff]"
                  />
                </label>

                <div className="flex items-center md:justify-end gap-3">
                  <div className="flex -space-x-2">
                    {['AL', 'MK', 'SR', '+4'].map((initials, i) => (
                      <div
                        key={initials}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold ring-2 ring-[var(--color-surface)] ${
                          i === 3
                            ? 'bg-[var(--color-soft-bg)] text-[var(--color-text-secondary)]'
                            : 'bg-[#181818] text-white dark:bg-[#303030]'
                        }`}
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-[13px] text-[var(--color-text-secondary)]">
                    7 editors
                  </span>
                </div>
              </div>
            </ComponentSection>
          )}

          {/* 6. EmptyMessage */}
          {filtered.some((c) => c.id === 'code-empty') && (
            <ComponentSection
              title="EmptyMessage"
              category="Content"
              summary="Balanced zero-state layout with a 40px soft icon tile, 16px title, 14px description, and one pill CTA."
              whenToUse="Use whenever a table, search result, or newly created project has zero entries."
              avoidWhen="Avoid oversized illustrations or multi-button toolbars inside empty states."
            >
              <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                <CgEmptyMessage
                  icon={<Inbox className="w-5 h-5" aria-hidden="true" />}
                  title="No API keys created yet"
                  description="Generate a scoped key to authenticate requests from your application."
                  actionLabel="Create API key"
                  onAction={() => {}}
                />
              </div>
            </ComponentSection>
          )}
        </div>
      )}
    </div>
  );
}

function ComponentSection({
  title,
  category,
  summary,
  whenToUse,
  avoidWhen,
  children,
}: {
  title: string;
  category: string;
  summary: string;
  whenToUse: string;
  avoidWhen: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 pt-2 border-t border-[var(--color-border-subtle)] first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              {title}
            </h2>
            <span className="text-[12px] text-[var(--color-text-tertiary)]">· {category}</span>
          </div>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">{summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] leading-[1.45]">
        <div className="p-3.5 rounded-[10px] bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
          <span className="font-semibold text-[var(--color-text)]">When to use: </span>
          <span className="text-[var(--color-text-secondary)]">{whenToUse}</span>
        </div>
        <div className="p-3.5 rounded-[10px] bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
          <span className="font-semibold text-[var(--color-text)]">Avoid when: </span>
          <span className="text-[var(--color-text-secondary)]">{avoidWhen}</span>
        </div>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
}
