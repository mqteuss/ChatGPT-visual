import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { MOTION_CURVES, PRESS_SCALE_RULES } from '../utils/skillData';
import {
  CgButton,
  CgCodeBlock,
  CgShimmerText,
  CgLoadingDots,
  CgLoadingIndicator,
  CgCircularProgress,
  CgSegmentedControl,
  CgSwitch,
} from './ChatGPTPrimitives';

export function AnimationsView() {
  const [curvesAtEnd, setCurvesAtEnd] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [shaking, setShaking] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'compact' | 'expanded'>('compact');
  const [shimmerIdle, setShimmerIdle] = useState(false);
  const [progress, setProgress] = useState(68);

  const triggerShake = () => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-[32px] leading-[38px] font-semibold tracking-tight text-[var(--color-text)]">
          Motion &amp; Animations
        </h1>
        <p className="text-[16px] leading-[24px] text-[var(--color-text-secondary)] max-w-[68ch]">
          ChatGPT motion is calm, physically grounded, and decisive: overlays decelerate smoothly
          without bounce, buttons compress proportionally to their width, layout changes crossfade
          without snapping, and loading states rely on restrained monochrome shimmers and pulses.
        </p>
      </section>

      {/* 1. Easing Curves Playground */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Easing Curves &amp; Timing Tokens
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Zero spring overshoot. Entrances decelerate sharply; exits accelerate out cleanly.
            </p>
          </div>
          <CgButton
            variant="solid"
            size="md"
            pill
            onClick={() => setCurvesAtEnd((prev) => !prev)}
          >
            {curvesAtEnd ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset tracks</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Play curves</span>
              </>
            )}
          </CgButton>
        </div>

        <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] divide-y divide-[var(--color-border-subtle)]">
          {MOTION_CURVES.map((curve) => (
            <div key={curve.cssVar} className="p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[14px] font-semibold text-[var(--color-text)]">
                    {curve.name}
                  </span>
                  <code className="text-[12px] font-mono text-[var(--color-text-secondary)]">
                    {curve.cssVar}
                  </code>
                </div>
                <span className="text-[12px] font-mono tabular-nums text-[var(--color-text-tertiary)]">
                  {curve.bezier} · {curve.durationMs}
                </span>
              </div>

              <div className="relative h-8 rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-1.5 flex items-center overflow-hidden">
                <div
                  className="h-5 w-16 rounded-[5px] bg-[var(--color-solid-bg)]"
                  style={{
                    transform: curvesAtEnd ? 'translateX(calc(100vw * 0.25))' : 'translateX(0px)',
                    transitionProperty: 'transform',
                    transitionDuration: curve.cssVar === '--transition-duration-basic' ? '150ms' : '450ms',
                    transitionTimingFunction: curve.bezier,
                  }}
                />
              </div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">{curve.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Overlay Pop-In & Validation Shake */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Overlay Pop-In (scale 0.95 → 1)
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Popovers and menus enter over{' '}
              <code className="text-[12px] font-mono">350ms var(--cubic-enter)</code> anchored to
              their trigger.
            </p>
          </div>
          <div className="p-6 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] min-h-[210px] flex flex-col items-start justify-between gap-4">
            <CgButton
              variant="outline"
              size="md"
              pill
              onClick={() => setPopoverOpen((v) => !v)}
            >
              {popoverOpen ? 'Hide popover' : 'Show popover'}
            </CgButton>

            {popoverOpen && (
              <div
                style={{ transformOrigin: 'top left' }}
                className="cg-popover-enter w-full p-3.5 rounded-[12px] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-popover),var(--shadow-hairline)] space-y-1"
              >
                <div className="text-[14px] font-semibold text-[var(--color-text)]">
                  Model configuration
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)]">
                  Animated with <code className="text-[12px]">scale(0.95) → 1</code> and{' '}
                  <code className="text-[12px]">--cubic-enter</code>.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Validation Shake (400ms ease)
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Denied actions or invalid form inputs oscillate ±5px horizontally without harsh red flashes.
            </p>
          </div>
          <div className="p-6 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] min-h-[210px] flex flex-col justify-between gap-4">
            <div
              onAnimationEnd={() => setShaking(false)}
              className={`space-y-2 ${shaking ? 'cg-shake' : ''}`}
            >
              <label className="text-[13px] font-medium text-[var(--color-text)] block">
                API Endpoint URL
              </label>
              <input
                type="text"
                readOnly
                value="http://invalid-url"
                aria-label="Invalid endpoint example"
                className="w-full h-[36px] px-3 rounded-[8px] bg-transparent text-[14px] text-[var(--color-text)] shadow-[inset_0_0_0_1px_#e02e2a]"
              />
              <div className="text-[12px] text-[#e02e2a] dark:text-[#ff6764]">
                Must begin with https://
              </div>
            </div>

            <div>
              <CgButton variant="soft" color="danger" size="md" pill onClick={triggerShake}>
                Trigger validation shake
              </CgButton>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Layout Crossfade & Height Morph + Width-Adaptive Press */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Layout Height Morph (<code className="text-[17px] font-mono">AnimateLayout</code>)
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Containers interpolate height over{' '}
              <code className="text-[12px] font-mono">300ms var(--cubic-move)</code> when swapped
              content changes size.
            </p>
          </div>
          <div className="p-5 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-4">
            <CgSegmentedControl
              ariaLabel="Layout height demo"
              value={layoutMode}
              onChange={setLayoutMode}
              options={[
                { value: 'compact', label: 'Compact (108px)' },
                { value: 'expanded', label: 'Expanded (196px)' },
              ]}
            />
            <div
              className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5"
              style={{
                height: layoutMode === 'compact' ? '108px' : '196px',
                transition: 'height 300ms var(--cubic-move)',
              }}
            >
              <div className="text-[14px] font-semibold text-[var(--color-text)]">
                Deployment Summary
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
                Primary cluster active across 3 regions with automated health checks.
              </p>
              {layoutMode === 'expanded' && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] space-y-1.5 text-[13px] text-[var(--color-text-secondary)]">
                  <div>• eu-central-1: 18ms p95 · healthy</div>
                  <div>• us-west-2: 24ms p95 · healthy</div>
                  <div>• ap-northeast-1: 31ms p95 · healthy</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
              Width-Adaptive Press (<code className="text-[17px] font-mono">--scale</code>)
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
              Press compression scales inversely with element width so wide bars never feel rubbery.
            </p>
          </div>
          <div className="rounded-[12px] border border-[var(--color-border)] overflow-hidden">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">
                  <th className="py-2.5 px-3.5 font-medium">Width</th>
                  <th className="py-2.5 px-3.5 font-medium">--scale</th>
                  <th className="py-2.5 px-3.5 font-medium">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {PRESS_SCALE_RULES.map((rule) => (
                  <tr key={rule.rangeLabel}>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums text-[var(--color-text)]">
                      {rule.rangeLabel}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums text-[var(--color-text-secondary)]">
                      {rule.scale}
                    </td>
                    <td className="py-2.5 px-3.5 text-[var(--color-text-secondary)]">
                      {rule.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Async & Status Feedback */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[20px] leading-[26px] font-semibold text-[var(--color-text)]">
            Async &amp; Status Feedback
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
            Subtle monochrome feedback states keep long-running operations calm and legible.
          </p>
        </div>

        <div className="p-6 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="text-[12px] font-medium text-[var(--color-text-tertiary)]">
              ShimmerText (3s sweep + pause)
            </div>
            <div className="py-1">
              <CgShimmerText idle={shimmerIdle}>Analyzing repository structure...</CgShimmerText>
            </div>
            <CgSwitch
              id="shimmer-idle-switch"
              checked={shimmerIdle}
              onChange={setShimmerIdle}
              label="Idle (settled)"
            />
          </div>

          <div className="space-y-3">
            <div className="text-[12px] font-medium text-[var(--color-text-tertiary)]">
              LoadingDots &amp; Conic Spinner
            </div>
            <div className="flex items-center gap-5 pt-1">
              <CgLoadingDots />
              <CgLoadingIndicator size={20} />
            </div>
            <div className="text-[12px] text-[var(--color-text-secondary)]">
              1s staggered dot pulse · 0.8s conic mask rotation
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[12px] font-medium text-[var(--color-text-tertiary)] flex justify-between">
              <span>CircularProgress</span>
              <span className="font-mono tabular-nums">{progress}%</span>
            </div>
            <div className="flex items-center gap-4">
              <CgCircularProgress progress={progress} size={32} />
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                aria-label="Circular progress percentage"
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-[#00a240]"
              />
            </div>
          </div>
        </div>

        <CgCodeBlock
          filename="animations.css"
          code={`.cg-shimmer-text {
  background: currentColor linear-gradient(to left, currentColor, var(--shimmer-highlight) 50%, currentColor);
  background-clip: text;
  background-size: 50% 200%;
  -webkit-text-fill-color: transparent;
  animation: cg-shimmer 3s infinite 0.6s;
}

.cg-popover-enter {
  animation: cg-popover-in 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}`}
        />
      </section>
    </div>
  );
}
