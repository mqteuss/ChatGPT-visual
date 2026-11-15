import { useState } from 'react';
import { Archive, Check, Copy, Download } from 'lucide-react';
import { SKILL_EXPORT_FILES } from '../utils/skillFiles';
import { buildZipArchive } from '../utils/zipBuilder';
import { CgButton, CgSegmentedControl } from './ChatGPTPrimitives';

export function SkillExportView() {
  const [selectedId, setSelectedId] = useState<'skill' | 'tokens' | 'components' | 'animations'>(
    'skill',
  );
  const [copied, setCopied] = useState(false);

  const activeFile =
    SKILL_EXPORT_FILES.find((file) => file.id === selectedId) ?? SKILL_EXPORT_FILES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = () => {
    const bytes = buildZipArchive(
      SKILL_EXPORT_FILES.map((file) => ({
        path: file.pathLabel,
        content: file.content,
      })),
    );
    const blob = new Blob([bytes.slice()], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chatgpt-visual-style.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-[32px] leading-[38px] font-semibold tracking-tight text-[var(--color-text)]">
          Skill Files &amp; Export
        </h1>
        <p className="text-[16px] leading-[24px] text-[var(--color-text-secondary)] max-w-[68ch]">
          Copy or download the generated skill package directly into your agent skills folder. It
          includes the core <code className="text-[14px]">SKILL.md</code> specification plus{' '}
          <code className="text-[14px]">tokens.css</code>,{' '}
          <code className="text-[14px]">components.md</code>, and{' '}
          <code className="text-[14px]">animations.md</code> references.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CgSegmentedControl
          ariaLabel="Skill file selector"
          value={selectedId}
          onChange={setSelectedId}
          options={[
            { value: 'skill', label: 'SKILL.md' },
            { value: 'tokens', label: 'tokens.css' },
            { value: 'components', label: 'components.md' },
            { value: 'animations', label: 'animations.md' },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2">
          <CgButton variant="outline" size="md" pill onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#00a240]" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copy {activeFile.filename}</span>
              </>
            )}
          </CgButton>
          <CgButton variant="outline" size="md" pill onClick={handleDownload}>
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download</span>
          </CgButton>
          <CgButton variant="solid" size="md" pill onClick={handleDownloadZip}>
            <Archive className="w-4 h-4" aria-hidden="true" />
            <span>Download Skill (.zip)</span>
          </CgButton>
        </div>
      </div>

      <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-code-bg)] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)] flex items-center justify-between">
          <span className="text-[12px] font-mono text-[var(--color-text-secondary)]">
            {activeFile.pathLabel}
          </span>
          <span className="text-[12px] font-mono tabular-nums text-[var(--color-text-tertiary)]">
            {activeFile.content.split('\n').length} lines
          </span>
        </div>
        <pre className="p-5 m-0 overflow-x-auto text-[13px] leading-[1.6] font-mono text-[var(--color-text)] whitespace-pre-wrap break-words max-h-[640px]">
          <code>{activeFile.content}</code>
        </pre>
      </div>
    </div>
  );
}
