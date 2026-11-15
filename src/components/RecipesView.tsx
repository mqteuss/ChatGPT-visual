import { useState } from 'react';
import { FolderKanban, KeyRound, Settings2, ArrowUpRight, Search, FileText, Terminal } from 'lucide-react';
import {
  CgButton,
  CgBadge,
  CgAlert,
  CgSegmentedControl,
  CgCodeBlock,
  CgComposerBar,
} from './ChatGPTPrimitives';

type RecipeId = 'saas' | 'docs' | 'hub';

export function RecipesView() {
  const [recipe, setRecipe] = useState<RecipeId>('saas');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h1 className="text-[32px] leading-[38px] font-semibold tracking-tight text-[var(--color-text)]">
            Website Composition Recipes
          </h1>
          <p className="text-[16px] leading-[24px] text-[var(--color-text-secondary)] max-w-[68ch] mt-2">
            These live compositions prove the skill is not for cloning a chat interface. The exact
            same tokens, surfaces, hairline borders, and controls build SaaS consoles, documentation
            portals, and command-first workspaces.
          </p>
        </div>

        <CgSegmentedControl
          ariaLabel="Composition recipe selector"
          value={recipe}
          onChange={setRecipe}
          options={[
            { value: 'saas', label: 'SaaS Analytics Console' },
            { value: 'docs', label: 'Developer Docs Portal' },
            { value: 'hub', label: 'Command-First Hub' },
          ]}
        />
      </section>

      {recipe === 'saas' && (
        <div className="rounded-[16px] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[460px]">
            {/* Mini Sidebar */}
            <aside className="bg-[var(--color-surface-secondary)] border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)] p-3.5 space-y-4">
              <div className="px-2.5 py-1 text-[14px] font-semibold text-[var(--color-text)]">
                Northstar Cloud
              </div>
              <nav className="space-y-1 text-[13px]">
                {[
                  { icon: FolderKanban, label: 'Deployments', active: true },
                  { icon: KeyRound, label: 'API Keys', active: false },
                  { icon: Settings2, label: 'Billing & Limits', active: false },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2.5 h-[34px] px-2.5 rounded-[8px] ${
                        item.active
                          ? 'bg-[var(--color-soft-bg)] font-medium text-[var(--color-text)]'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Mini Main */}
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[12px] text-[var(--color-text-tertiary)]">
                    Production · eu-central-1
                  </div>
                  <h3 className="text-[20px] font-semibold text-[var(--color-text)]">
                    Deployment Metrics
                  </h3>
                </div>
                <div className="flex items-center gap-2.5">
                  <CgSegmentedControl
                    ariaLabel="Metrics timeframe"
                    value={timeframe}
                    onChange={setTimeframe}
                    options={[
                      { value: '7d', label: '7d' },
                      { value: '30d', label: '30d' },
                      { value: '90d', label: '90d' },
                    ]}
                  />
                  <CgButton variant="solid" size="md" pill>
                    New deploy
                  </CgButton>
                </div>
              </div>

              <CgAlert
                variant="soft"
                tone="success"
                title="All edge regions healthy"
                description={`99.98% uptime recorded over the last ${timeframe}.`}
              />

              <div className="rounded-[12px] border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">
                      <th className="py-2.5 px-4 font-medium">Service</th>
                      <th className="py-2.5 px-4 font-medium">Status</th>
                      <th className="py-2.5 px-4 font-medium text-right">P95 Latency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)]">
                    {[
                      { svc: 'edge-gateway', status: 'Healthy', tone: 'success' as const, p95: timeframe === '7d' ? '18ms' : '21ms' },
                      { svc: 'billing-worker', status: 'Healthy', tone: 'success' as const, p95: timeframe === '7d' ? '44ms' : '48ms' },
                      { svc: 'webhook-relay', status: 'Degraded', tone: 'warning' as const, p95: '132ms' },
                    ].map((row) => (
                      <tr key={row.svc}>
                        <td className="py-3 px-4 font-mono text-[var(--color-text)]">{row.svc}</td>
                        <td className="py-3 px-4">
                          <CgBadge tone={row.tone}>{row.status}</CgBadge>
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-[var(--color-text-secondary)]">
                          {row.p95}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {recipe === 'docs' && (
        <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-8">
            <div className="space-y-5 max-w-[660px]">
              <div className="space-y-2">
                <div className="text-[12px] text-[var(--color-text-tertiary)]">
                  API Reference · Authentication
                </div>
                <h3 className="text-[28px] leading-[34px] font-semibold text-[var(--color-text)]">
                  Bearer Token Verification
                </h3>
                <p className="text-[15px] leading-[24px] text-[var(--color-text-secondary)]">
                  Pass your scoped secret key in the Authorization header. Never expose private
                  keys inside client-side browser bundles.
                </p>
              </div>

              <CgAlert
                variant="soft"
                tone="warning"
                description="Rotate legacy v1 tokens before December 31 to avoid interrupted requests."
              />

              <CgCodeBlock
                filename="curl-example.sh"
                code={`curl https://api.example.com/v2/projects \\
  -H "Authorization: Bearer $API_TOKEN" \\
  -H "Content-Type: application/json"`}
              />
            </div>

            <aside className="hidden lg:block space-y-2 text-[13px] border-l border-[var(--color-border-subtle)] pl-4 h-fit">
              <div className="font-semibold text-[var(--color-text)] pb-1">On this page</div>
              <div className="text-[var(--color-text)] font-medium">Overview</div>
              <div className="text-[var(--color-text-secondary)]">Header format</div>
              <div className="text-[var(--color-text-secondary)]">Error codes</div>
              <div className="text-[var(--color-text-secondary)]">Key rotation</div>
            </aside>
          </div>
        </div>
      )}

      {recipe === 'hub' && (
        <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 md:py-16">
          <div className="max-w-[640px] mx-auto space-y-6 text-center">
            <h3 className="text-[32px] leading-[38px] font-semibold text-[var(--color-text)]">
              Where would you like to start?
            </h3>
            <p className="text-[15px] text-[var(--color-text-secondary)]">
              Search internal runbooks, launch workflows, or jump into a team space.
            </p>
            <div className="text-left">
              <CgComposerBar placeholder="Search docs, run a command, or type / to browse actions..." />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                { icon: Search, label: 'Search runbooks' },
                { icon: FileText, label: 'Draft RFC' },
                { icon: Terminal, label: 'Inspect logs' },
              ].map((chip) => {
                const Icon = chip.icon;
                return (
                  <CgButton key={chip.label} variant="outline" size="md" pill>
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{chip.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                  </CgButton>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
