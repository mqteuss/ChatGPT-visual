import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Check, Copy, Info, AlertTriangle, AlertCircle, Sparkles, CheckCircle2, ArrowUp, Plus, Paperclip, SlidersHorizontal, ChevronDown } from 'lucide-react';
import type {
  ButtonVariant,
  ButtonColor,
  ControlSize,
  AlertVariant,
  SemanticTone,
} from '../utils/skillData';

interface CgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ControlSize;
  pill?: boolean;
  uniform?: boolean;
}

const SIZE_CLASSES: Record<ControlSize, string> = {
  sm: 'h-[28px] px-2.5 text-[13px] rounded-[6px] gap-1',
  md: 'h-[32px] px-3 text-[14px] rounded-[8px] gap-1.5',
  lg: 'h-[36px] px-3.5 text-[14px] rounded-[8px] gap-1.5',
  xl: 'h-[40px] px-4 text-[14px] rounded-[10px] gap-2',
};

const UNIFORM_CLASSES: Record<ControlSize, string> = {
  sm: 'h-[28px] w-[28px] p-0 text-[13px] rounded-[6px]',
  md: 'h-[32px] w-[32px] p-0 text-[14px] rounded-[8px]',
  lg: 'h-[36px] w-[36px] p-0 text-[14px] rounded-[8px]',
  xl: 'h-[40px] w-[40px] p-0 text-[14px] rounded-[10px]',
};

function getButtonColors(variant: ButtonVariant, color: ButtonColor): string {
  if (variant === 'solid') {
    switch (color) {
      case 'primary':
        return 'bg-[var(--color-solid-bg)] text-[var(--color-solid-text)] hover:bg-[var(--color-solid-bg-hover)]';
      case 'secondary':
        return 'bg-[#5d5d5d] text-white hover:bg-[#414141] dark:bg-[#4f4f4f] dark:hover:bg-[#5d5d5d]';
      case 'info':
        return 'bg-[#0285ff] text-white hover:bg-[#0169cc]';
      case 'success':
        return 'bg-[#00a240] text-white hover:bg-[#008635]';
      case 'warning':
        return 'bg-[#e25507] text-white hover:bg-[#b9480d]';
      case 'danger':
        return 'bg-[#e02e2a] text-white hover:bg-[#ba2623]';
    }
  }
  if (variant === 'soft') {
    switch (color) {
      case 'primary':
      case 'secondary':
        return 'bg-[var(--color-soft-bg)] text-[var(--color-text)] hover:bg-[var(--color-soft-bg-hover)]';
      case 'info':
        return 'bg-[#0285ff]/12 text-[#0169cc] dark:text-[#66b5ff] hover:bg-[#0285ff]/20';
      case 'success':
        return 'bg-[#04b84c]/14 text-[#008635] dark:text-[#40c977] hover:bg-[#04b84c]/22';
      case 'warning':
        return 'bg-[#fb6a22]/14 text-[#b9480d] dark:text-[#ff8549] hover:bg-[#fb6a22]/22';
      case 'danger':
        return 'bg-[#fa423e]/14 text-[#ba2623] dark:text-[#ff6764] hover:bg-[#fa423e]/22';
    }
  }
  if (variant === 'outline') {
    switch (color) {
      case 'primary':
      case 'secondary':
        return 'bg-transparent text-[var(--color-text)] shadow-[inset_0_0_0_1px_var(--color-border-outline)] hover:bg-[var(--color-soft-bg)]';
      case 'info':
        return 'bg-transparent text-[#0169cc] dark:text-[#66b5ff] shadow-[inset_0_0_0_1px_#0169cc] hover:bg-[#0285ff]/8';
      case 'success':
        return 'bg-transparent text-[#008635] dark:text-[#40c977] shadow-[inset_0_0_0_1px_#008635] hover:bg-[#04b84c]/8';
      case 'warning':
        return 'bg-transparent text-[#b9480d] dark:text-[#ff8549] shadow-[inset_0_0_0_1px_#e25507] hover:bg-[#fb6a22]/8';
      case 'danger':
        return 'bg-transparent text-[#ba2623] dark:text-[#ff6764] shadow-[inset_0_0_0_1px_#e02e2a] hover:bg-[#fa423e]/8';
    }
  }
  // ghost
  switch (color) {
    case 'danger':
      return 'bg-transparent text-[#e02e2a] dark:text-[#ff6764] hover:bg-[#fa423e]/12';
    case 'secondary':
      return 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-soft-bg)]';
    default:
      return 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-soft-bg)]';
  }
}

export function CgButton({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  pill = false,
  uniform = false,
  className = '',
  children,
  ...rest
}: CgButtonProps) {
  const shape = uniform ? UNIFORM_CLASSES[size] : SIZE_CLASSES[size];
  const radiusOverride = pill ? (uniform ? 'rounded-full' : 'rounded-full px-4') : '';
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium leading-none whitespace-nowrap shrink-0 select-none cursor-pointer transition-all duration-150 active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] ${shape} ${radiusOverride} ${getButtonColors(
        variant,
        color,
      )} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function CgBadge({
  tone = 'primary',
  variant = 'soft',
  children,
}: {
  tone?: SemanticTone;
  variant?: 'soft' | 'outline' | 'solid';
  children: React.ReactNode;
}) {
  const map: Record<SemanticTone, Record<'soft' | 'outline' | 'solid', string>> = {
    primary: {
      soft: 'bg-[var(--color-soft-bg)] text-[var(--color-text-secondary)]',
      outline: 'shadow-[inset_0_0_0_1px_var(--color-border-outline)] text-[var(--color-text-secondary)]',
      solid: 'bg-[var(--color-solid-bg)] text-[var(--color-solid-text)]',
    },
    info: {
      soft: 'bg-[#0285ff]/12 text-[#0169cc] dark:text-[#66b5ff]',
      outline: 'shadow-[inset_0_0_0_1px_rgb(2_133_255_/_55%)] text-[#0169cc] dark:text-[#66b5ff]',
      solid: 'bg-[#0285ff] text-white',
    },
    success: {
      soft: 'bg-[#04b84c]/14 text-[#008635] dark:text-[#40c977]',
      outline: 'shadow-[inset_0_0_0_1px_rgb(0_162_64_/_55%)] text-[#008635] dark:text-[#40c977]',
      solid: 'bg-[#00a240] text-white',
    },
    warning: {
      soft: 'bg-[#fb6a22]/14 text-[#b9480d] dark:text-[#ff8549]',
      outline: 'shadow-[inset_0_0_0_1px_rgb(226_85_7_/_55%)] text-[#b9480d] dark:text-[#ff8549]',
      solid: 'bg-[#e25507] text-white',
    },
    danger: {
      soft: 'bg-[#fa423e]/14 text-[#ba2623] dark:text-[#ff6764]',
      outline: 'shadow-[inset_0_0_0_1px_rgb(224_46_42_/_55%)] text-[#ba2623] dark:text-[#ff6764]',
      solid: 'bg-[#e02e2a] text-white',
    },
    discovery: {
      soft: 'bg-[#924ff7]/14 text-[#6b3ab4] dark:text-[#be95fa]',
      outline: 'shadow-[inset_0_0_0_1px_rgb(146_79_247_/_55%)] text-[#6b3ab4] dark:text-[#be95fa]',
      solid: 'bg-[#924ff7] text-white',
    },
  };

  return (
    <span
      className={`inline-flex items-center gap-1 h-[22px] px-2 rounded-[6px] text-[12px] font-semibold leading-none whitespace-nowrap shrink-0 ${map[tone][variant]}`}
    >
      {children}
    </span>
  );
}

export function CgAlert({
  variant = 'soft',
  tone = 'primary',
  title,
  description,
  actions,
}: {
  variant?: AlertVariant;
  tone?: SemanticTone;
  title?: string;
  description: string;
  actions?: React.ReactNode;
}) {
  const IconComp =
    tone === 'success'
      ? CheckCircle2
      : tone === 'warning'
        ? AlertTriangle
        : tone === 'danger'
          ? AlertCircle
          : tone === 'discovery'
            ? Sparkles
            : Info;

  const toneStyle: Record<SemanticTone, Record<AlertVariant, string>> = {
    primary: {
      soft: 'bg-[var(--color-soft-bg)] shadow-[inset_0_0_0_1px_var(--color-border-subtle)] text-[var(--color-text)]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_var(--color-border-outline)] text-[var(--color-text)]',
      solid: 'bg-[var(--color-solid-bg)] text-[var(--color-solid-text)]',
    },
    info: {
      soft: 'bg-[#0285ff]/8 dark:bg-[#0285ff]/14 shadow-[inset_0_0_0_1px_rgb(2_133_255_/_20%)] text-[#0169cc] dark:text-[#99ceff]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_rgb(2_133_255_/_55%)] text-[#0169cc] dark:text-[#99ceff]',
      solid: 'bg-[#0285ff] text-white',
    },
    success: {
      soft: 'bg-[#04b84c]/10 dark:bg-[#04b84c]/15 shadow-[inset_0_0_0_1px_rgb(4_184_76_/_22%)] text-[#008635] dark:text-[#8cdfad]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_rgb(0_162_64_/_55%)] text-[#008635] dark:text-[#8cdfad]',
      solid: 'bg-[#00a240] text-white',
    },
    warning: {
      soft: 'bg-[#fb6a22]/10 dark:bg-[#fb6a22]/15 shadow-[inset_0_0_0_1px_rgb(251_106_34_/_22%)] text-[#b9480d] dark:text-[#ffb790]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_rgb(226_85_7_/_55%)] text-[#b9480d] dark:text-[#ffb790]',
      solid: 'bg-[#e25507] text-white',
    },
    danger: {
      soft: 'bg-[#fa423e]/10 dark:bg-[#fa423e]/15 shadow-[inset_0_0_0_1px_rgb(250_66_62_/_22%)] text-[#ba2623] dark:text-[#ffa4a2]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_rgb(224_46_42_/_55%)] text-[#ba2623] dark:text-[#ffa4a2]',
      solid: 'bg-[#e02e2a] text-white',
    },
    discovery: {
      soft: 'bg-[#924ff7]/10 dark:bg-[#924ff7]/15 shadow-[inset_0_0_0_1px_rgb(146_79_247_/_22%)] text-[#6b3ab4] dark:text-[#ceb0fb]',
      outline: 'bg-transparent shadow-[inset_0_0_0_1px_rgb(146_79_247_/_55%)] text-[#6b3ab4] dark:text-[#ceb0fb]',
      solid: 'bg-[#924ff7] text-white',
    },
  };

  return (
    <div
      role="status"
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full p-4 rounded-[12px] text-[14px] leading-[20px] ${toneStyle[tone][variant]}`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <IconComp className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="min-w-0">
          {title && <div className="font-semibold">{title}</div>}
          <div className={variant === 'solid' ? 'opacity-95' : 'opacity-90'}>{description}</div>
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function CgSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  pill = false,
  ariaLabel,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  pill?: boolean;
  ariaLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const thumb = thumbRef.current;
    if (!root || !thumb) return;
    const activeNode = root.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    if (!activeNode) return;
    thumb.style.width = `${Math.floor(activeNode.clientWidth)}px`;
    thumb.style.transform = `translateX(${activeNode.offsetLeft}px)`;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (thumbRef.current) {
            thumbRef.current.style.transition =
              'width 300ms var(--cubic-enter), transform 300ms var(--cubic-enter)';
          }
        });
      });
    }
  }, [value, options, pill]);

  return (
    <div
      ref={rootRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`relative inline-flex items-center gap-0.5 p-[2px] h-[34px] bg-[var(--color-track-bg)] ${
        pill ? 'rounded-full' : 'rounded-[8px]'
      }`}
    >
      <div
        ref={thumbRef}
        aria-hidden="true"
        className={`absolute top-[2px] bottom-[2px] left-0 bg-[var(--color-thumb-bg)] shadow-[var(--shadow-thumb)] pointer-events-none ${
          pill ? 'rounded-full' : 'rounded-[6px]'
        }`}
      />
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`relative z-10 h-[30px] px-3 text-[13px] font-semibold leading-none whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] ${
              pill ? 'rounded-full' : 'rounded-[6px]'
            } ${
              active
                ? 'text-[var(--color-text)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function CgSwitch({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  id: string;
}) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center w-[32px] h-[19px] rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] ${
          checked
            ? 'bg-[#181818] dark:bg-[#0285ff]'
            : 'bg-[#dfdfdf] dark:bg-[#414141] hover:bg-[#cdcdcd] dark:hover:bg-[#4f4f4f]'
        }`}
      >
        <span
          className={`inline-block w-[13px] h-[13px] rounded-full bg-white dark:bg-[#0d0d0d] shadow-[0_1px_2px_rgb(0_0_0_/_20%)] transition-transform duration-200 ${
            checked ? 'translate-x-[16px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
      <span className="text-[14px] text-[var(--color-text)]">{label}</span>
    </label>
  );
}

export function CgCodeBlock({
  code,
  filename,
}: {
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative rounded-[10px] border border-[var(--color-border)] bg-[var(--color-code-bg)] overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)]">
        <span className="text-[12px] font-mono text-[var(--color-text-secondary)] truncate">
          {filename || 'snippet.tsx'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied code' : 'Copy code'}
          className="inline-flex items-center gap-1.5 h-[26px] px-2.5 rounded-[6px] text-[12px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-soft-bg)] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00a240]" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 m-0 overflow-x-auto text-[13px] leading-[1.55] font-mono text-[var(--color-text)] whitespace-pre-wrap break-words">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CgEmptyMessage({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[var(--color-soft-bg)] text-[var(--color-text-secondary)] mb-3">
        {icon}
      </div>
      <h4 className="text-[16px] font-semibold text-[var(--color-text)] max-w-[90%]">{title}</h4>
      <p className="text-[14px] leading-[1.45] text-[var(--color-text-secondary)] mt-1.5 max-w-[380px]">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <CgButton variant="soft" size="md" pill onClick={onAction}>
            {actionLabel}
          </CgButton>
        </div>
      )}
    </div>
  );
}

export function CgPopoverMenu({
  label,
  items,
}: {
  label: string;
  items: Array<{ id: string; label: string; shortcut?: string; danger?: boolean; onSelect: () => void }>;
}) {
  const [open, setOpen] = useState(false);
  const [lastPicked, setLastPicked] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="relative inline-flex items-center gap-3" ref={wrapRef}>
      <CgButton
        variant="outline"
        size="md"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
      </CgButton>
      {lastPicked && (
        <span className="text-[13px] text-[var(--color-text-secondary)]">
          Selected: <strong className="font-medium text-[var(--color-text)]">{lastPicked}</strong>
        </span>
      )}
      {open && (
        <div
          role="menu"
          style={{ transformOrigin: 'top left' }}
          className="cg-popover-enter absolute left-0 top-[calc(100%+6px)] z-30 min-w-[220px] p-[6px] rounded-[12px] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-popover),var(--shadow-hairline)]"
        >
          {items.map((item, idx) => (
            <React.Fragment key={item.id}>
              {item.danger && idx > 0 && (
                <div className="my-1 -mx-[6px] h-px bg-[var(--color-border)]" />
              )}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onSelect();
                  setLastPicked(item.label);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-4 px-2.5 py-1.5 rounded-[6px] text-[14px] text-left cursor-pointer transition-colors ${
                  item.danger
                    ? 'text-[#e02e2a] dark:text-[#ff6764] hover:bg-[#fa423e]/12'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-soft-bg)]'
                }`}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <kbd className="text-[12px] font-mono text-[var(--color-text-tertiary)]">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export function CgComposerBar({
  placeholder = 'Search knowledge base, run a command, or create an item...',
  onSubmitText,
}: {
  placeholder?: string;
  onSubmitText?: (value: string) => void;
}) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(text.trim());
    onSubmitText?.(text.trim());
    setText('');
  };

  return (
    <div className="w-full space-y-2.5">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[#303030] px-4 pt-3.5 pb-2.5 shadow-[0_2px_10px_rgb(0_0_0_/_4%)] focus-within:border-[var(--color-focus-border)] transition-colors"
      >
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={placeholder}
          aria-label="Command composer input"
          className="w-full resize-none bg-transparent text-[15px] leading-[1.5] text-[var(--color-text)] focus:outline-none"
        />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <CgButton variant="ghost" color="secondary" size="sm" pill aria-label="Add attachment">
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Attach</span>
            </CgButton>
            <CgButton variant="ghost" color="secondary" size="sm" pill aria-label="Filter scope">
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Scope</span>
            </CgButton>
            <CgButton variant="ghost" color="secondary" size="sm" uniform pill aria-label="Upload file">
              <Paperclip className="w-4 h-4" aria-hidden="true" />
            </CgButton>
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            aria-label="Submit command"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-solid-bg)] text-[var(--color-solid-text)] hover:bg-[var(--color-solid-bg-hover)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </form>
      {submitted && (
        <div className="text-[13px] text-[var(--color-text-secondary)] px-2">
          Dispatched: <span className="text-[var(--color-text)] font-medium">“{submitted}”</span>
        </div>
      )}
    </div>
  );
}

export function CgShimmerText({
  children,
  idle = false,
  className = '',
}: {
  children: React.ReactNode;
  idle?: boolean;
  className?: string;
}) {
  return (
    <span
      data-idle={idle ? 'true' : undefined}
      className={`cg-shimmer-text text-[14px] font-medium text-[var(--color-text-secondary)] ${className}`}
    >
      {children}
    </span>
  );
}

export function CgLoadingDots({ label = 'Loading' }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center gap-1 h-[24px]">
      {[0, 0.2, 0.4].map((delay, idx) => (
        <span
          key={idx}
          className="cg-dot w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

export function CgLoadingIndicator({ size = 18 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="In progress"
      className="cg-spinner inline-block relative rounded-full"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full border-2 border-[var(--color-text)]"
        style={{
          maskImage: 'conic-gradient(rgb(0 0 0 / 0%), rgb(0 0 0))',
          WebkitMaskImage: 'conic-gradient(rgb(0 0 0 / 0%), rgb(0 0 0))',
        }}
      />
    </span>
  );
}

export function CgCircularProgress({ progress, size = 28 }: { progress: number; size?: number }) {
  const clamped = Math.max(0, Math.min(100, progress));
  const circumference = 50;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-label={`${clamped}% complete`}>
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="var(--color-soft-bg)"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="#00a240"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 10 10)"
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  );
}

