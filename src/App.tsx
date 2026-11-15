import { useState, useEffect } from 'react';
import {
  Palette,
  Layers,
  LayoutTemplate,
  FileCode2,
  Sun,
  Moon,
  Menu,
  X,
  Activity,
} from 'lucide-react';
import type { ThemeMode } from './utils/skillData';
import { CgButton } from './components/ChatGPTPrimitives';
import { TokensView } from './components/TokensView';
import { ComponentsView } from './components/ComponentsView';
import { AnimationsView } from './components/AnimationsView';
import { RecipesView } from './components/RecipesView';
import { SkillExportView } from './components/SkillExportView';

type SectionId = 'tokens' | 'components' | 'animations' | 'recipes' | 'export';

const NAV_ITEMS: Array<{
  id: SectionId;
  label: string;
  description: string;
  icon: typeof Palette;
}> = [
  {
    id: 'tokens',
    label: 'Foundations & Tokens',
    description: 'Surfaces, colors, type & radii',
    icon: Palette,
  },
  {
    id: 'components',
    label: 'Components & Usage',
    description: 'Interactive catalog & rules',
    icon: Layers,
  },
  {
    id: 'animations',
    label: 'Motion & Animations',
    description: 'Curves, press scale & shimmers',
    icon: Activity,
  },
  {
    id: 'recipes',
    label: 'Composition Recipes',
    description: 'Non-chat website layouts',
    icon: LayoutTemplate,
  },
  {
    id: 'export',
    label: 'Skill Export',
    description: 'SKILL.md, tokens.css & docs',
    icon: FileCode2,
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('components');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const activeNav = NAV_ITEMS.find((item) => item.id === activeSection) ?? NAV_ITEMS[0];

  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-surface)] text-[var(--color-text)] transition-colors duration-150">
      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/35 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar Rail */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-[256px] shrink-0 bg-[var(--color-surface-secondary)] border-r border-[var(--color-border-subtle)] flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3 space-y-6">
          {/* Brand Row */}
          <div className="flex items-center justify-between px-2.5 pt-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-[var(--color-text)] whitespace-nowrap">
              ChatGPT Visual Style
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="md:hidden inline-flex items-center justify-center w-7 h-7 rounded-[6px] text-[var(--color-text-secondary)] hover:bg-[var(--color-soft-bg)] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Primary Navigation */}
          <nav aria-label="Skill sections" className="space-y-1">
            <div className="px-2.5 pb-1.5 text-[12px] font-medium text-[var(--color-text-tertiary)]">
              Design System Skill
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSection(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2.5 h-[36px] px-2.5 rounded-[8px] text-[14px] text-left cursor-pointer transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] ${
                    isActive
                      ? 'bg-[var(--color-soft-bg)] font-medium text-[var(--color-text)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-soft-bg)]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Summary */}
        <div className="p-4 border-t border-[var(--color-border-subtle)] text-[12px] leading-[1.45] text-[var(--color-text-secondary)] space-y-1">
          <div className="font-medium text-[var(--color-text)]">OpenAI Apps SDK UI</div>
          <div>Components &amp; tokens extracted for building non-chat websites.</div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-[56px] px-4 sm:px-8 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-[8px] text-[var(--color-text)] hover:bg-[var(--color-soft-bg)] cursor-pointer"
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2 text-[14px] min-w-0 truncate">
              <span className="text-[var(--color-text-tertiary)] hidden sm:inline">Skill</span>
              <span className="text-[var(--color-text-tertiary)] hidden sm:inline">/</span>
              <span className="font-medium text-[var(--color-text)] truncate">
                {activeNav.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <CgButton
              variant="ghost"
              color="secondary"
              size="md"
              uniform
              pill
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Sun className="w-4 h-4" aria-hidden="true" />
              )}
            </CgButton>

            {activeSection !== 'export' && (
              <CgButton
                variant="solid"
                color="primary"
                size="md"
                pill
                onClick={() => setActiveSection('export')}
              >
                Export SKILL.md
              </CgButton>
            )}
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 w-full max-w-[960px] mx-auto px-5 sm:px-8 py-8 sm:py-10">
          {activeSection === 'tokens' && <TokensView />}
          {activeSection === 'components' && <ComponentsView />}
          {activeSection === 'animations' && <AnimationsView />}
          {activeSection === 'recipes' && <RecipesView />}
          {activeSection === 'export' && <SkillExportView />}
        </main>
      </div>
    </div>
  );
}
