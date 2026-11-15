import { useState } from 'react';
import {
  SURFACE_STACK,
  SEMANTIC_ACCENTS,
  TYPOGRAPHY_SCALE,
  CONTROL_SIZES,
  RADIUS_SCALE,
  computeInnerRadius,
} from '../utils/skillData';
import { CgCodeBlock } from './ChatGPTPrimitives';

export function TokensView() {
  const [outerRadius, setOuterRadius] = useState(12);
  const [innerPadding, setInnerPadding] = useState(6);
  const computedInner = computeInnerRadius(outerRadius, innerPadding);

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="space-y-3">
        <h1 className="text-[32px] leading-[38px] font-semibold tracking-tight text-[var(--color-text)]">
          Foundations &amp; Design Tokens
        </h1>
        <p className="text-[16px] leading-[24px] text-[var(--color-text-secondary)] max-w-[68ch]">
          The ChatGPT visual aesthetic relies on calm monochrome luminance stacking, translucent
          hairline borders, restrained semantic color accents, and a strict 4px spatial grid.
          Every token adapts seamlessly between Light and Dark modes.
        </p>
      </section>

      {/* Surface Luminance Stack */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
            Surface Luminance Stack
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
            Hierarchy is established through subtle surface step changes rather than heavy box shadows.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SURFACE_STACK.map((surface) => (
            <div
              key={surface.cssVar}
              className="p-4 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] flex items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="text-[15px] font-semibold text-[var(--color-text)]">
                  {surface.name}
                </div>
                <code className="inline-block text-[12px] font-mono text-[var(--color-text-secondary)]">
                  {surface.cssVar}
                </code>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.45] pt-1">
                  {surface.role}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0 items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tabular-nums text-[var(--color-text-tertiary)]">
                    L {surface.lightHex}
                  </span>
                  <span
                    className="w-6 h-6 rounded-[6px] border border-black/15"
                    style={{ backgroundColor: surface.lightHex }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tabular-nums text-[var(--color-text-tertiary)]">
                    D {surface.darkHex}
                  </span>
                  <span
                    className="w-6 h-6 rounded-[6px] border border-white/15"
                    style={{ backgroundColor: surface.darkHex }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Accents */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
            Semantic Color Discipline (90 / 10 Rule)
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
            90% of the interface stays neutral monochrome. Accent hues are reserved strictly for
            focus rings, statuses, alerts, and syntax highlighting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEMANTIC_ACCENTS.map((accent) => (
            <div
              key={accent.tone}
              className="p-4 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[var(--color-text)]">
                  {accent.label}
                </span>
                <span
                  className="w-5 h-5 rounded-full border border-[var(--color-border)]"
                  style={{ backgroundColor: accent.hex }}
                />
              </div>
              <div className="text-[12px] font-mono tabular-nums text-[var(--color-text-tertiary)]">
                {accent.hex} · {accent.tone}
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.4]">
                {accent.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
            Typography Scale
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
            Native grotesque system stack (<code className="text-[12px] font-mono">ui-sans-serif</code>,{' '}
            <code className="text-[12px] font-mono">-apple-system</code>,{' '}
            <code className="text-[12px] font-mono">Segoe UI</code>), capping display and section
            headings at weight <code className="text-[12px] font-mono">600</code> (semibold).
          </p>
        </div>
        <div className="rounded-[12px] border border-[var(--color-border)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] text-[12px] font-medium text-[var(--color-text-secondary)]">
                <th className="py-2.5 px-4">Token &amp; Sample</th>
                <th className="py-2.5 px-4">Size</th>
                <th className="py-2.5 px-4">Line</th>
                <th className="py-2.5 px-4">Weight</th>
                <th className="py-2.5 px-4 hidden sm:table-cell">Primary Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)] text-[14px]">
              {TYPOGRAPHY_SCALE.map((row) => (
                <tr key={row.name} className="hover:bg-[var(--color-soft-bg)] transition-colors">
                  <td className="py-3 px-4">
                    <span
                      style={{
                        fontSize: `${Math.min(row.sizePx, 28)}px`,
                        lineHeight: 1.25,
                        fontWeight: row.weight,
                      }}
                      className="text-[var(--color-text)]"
                    >
                      {row.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[13px] tabular-nums text-[var(--color-text-secondary)]">
                    {row.sizePx}px
                  </td>
                  <td className="py-3 px-4 font-mono text-[13px] tabular-nums text-[var(--color-text-secondary)]">
                    {row.lineHeightPx}px
                  </td>
                  <td className="py-3 px-4 font-mono text-[13px] tabular-nums text-[var(--color-text-secondary)]">
                    {row.weight}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[var(--color-text-secondary)] hidden sm:table-cell">
                    {row.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Control Sizing & Nested Radius Math */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Control Height Scale
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Buttons, inputs, and segmented controls share aligned vertical heights.
            </p>
          </div>
          <div className="rounded-[12px] border border-[var(--color-border)] divide-y divide-[var(--color-border-subtle)]">
            {CONTROL_SIZES.map((item) => (
              <div key={item.size} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="inline-flex items-center justify-center px-3 bg-[var(--color-soft-bg)] text-[var(--color-text)] text-[13px] font-medium shrink-0"
                    style={{ height: `${item.heightPx}px`, borderRadius: `${item.radiusPx}px` }}
                  >
                    {item.size}
                  </span>
                  <span className="text-[13px] text-[var(--color-text-secondary)] truncate">
                    {item.usage}
                  </span>
                </div>
                <span className="text-[12px] font-mono tabular-nums text-[var(--color-text-tertiary)] shrink-0">
                  {item.heightPx}px / r{item.radiusPx}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Interactive Nested Radius Rule
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Keep concentric curves harmonious using <code className="text-[13px]">r_inner = r_outer - padding</code>.
            </p>
          </div>
          <div className="p-5 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-1.5 block">
                <span className="text-[12px] font-medium text-[var(--color-text-secondary)] flex justify-between">
                  <span>Outer Radius</span>
                  <span className="font-mono tabular-nums">{outerRadius}px</span>
                </span>
                <input
                  type="range"
                  min={8}
                  max={28}
                  value={outerRadius}
                  onChange={(e) => setOuterRadius(Number(e.target.value))}
                  className="w-full accent-[#181818] dark:accent-[#0285ff]"
                />
              </label>
              <label className="space-y-1.5 block">
                <span className="text-[12px] font-medium text-[var(--color-text-secondary)] flex justify-between">
                  <span>Container Padding</span>
                  <span className="font-mono tabular-nums">{innerPadding}px</span>
                </span>
                <input
                  type="range"
                  min={2}
                  max={16}
                  value={innerPadding}
                  onChange={(e) => setInnerPadding(Number(e.target.value))}
                  className="w-full accent-[#181818] dark:accent-[#0285ff]"
                />
              </label>
            </div>

            <div className="flex items-center justify-center py-4">
              <div
                className="w-full max-w-[320px] bg-[var(--color-surface-elevated)] border border-[var(--color-border-outline)] transition-all"
                style={{
                  borderRadius: `${outerRadius}px`,
                  padding: `${innerPadding}px`,
                }}
              >
                <div
                  className="px-3.5 py-2.5 bg-[var(--color-soft-bg)] text-[13px] font-medium text-[var(--color-text)] flex items-center justify-between"
                  style={{ borderRadius: `${computedInner}px` }}
                >
                  <span>Inner interactive item</span>
                  <span className="font-mono text-[12px] tabular-nums text-[var(--color-text-secondary)]">
                    r = {computedInner}px
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {RADIUS_SCALE.slice(0, 6).map((r) => (
                <div
                  key={r.token}
                  className="flex items-center justify-between text-[12px] px-2.5 py-1.5 rounded-[6px] bg-[var(--color-surface)] border border-[var(--color-border-subtle)]"
                >
                  <code className="font-mono text-[var(--color-text)]">{r.token}</code>
                  <span className="font-mono tabular-nums text-[var(--color-text-tertiary)]">
                    {typeof r.px === 'number' ? `${r.px}px` : r.px}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
          Quick CSS Setup
        </h2>
        <CgCodeBlock
          filename="tokens.css"
          code={`:root {
  color-scheme: light dark;
  --color-surface: light-dark(#ffffff, #212121);
  --color-surface-secondary: light-dark(#f9f9f9, #181818);
  --color-surface-elevated: light-dark(#ffffff, #303030);
  --color-border: light-dark(rgb(13 13 13 / 10%), rgb(255 255 255 / 12%));
  --cubic-enter: cubic-bezier(0.19, 1, 0.22, 1);
}`}
        />
      </section>
    </div>
  );
}
