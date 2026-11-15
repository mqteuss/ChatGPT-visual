import skillMdRaw from '../../chatgpt-visual-style/SKILL.md?raw';
import tokensCssRaw from '../../chatgpt-visual-style/references/tokens.css?raw';
import componentsMdRaw from '../../chatgpt-visual-style/references/components.md?raw';
import animationsMdRaw from '../../chatgpt-visual-style/references/animations.md?raw';

export interface SkillExportFile {
  id: 'skill' | 'tokens' | 'components' | 'animations';
  filename: string;
  pathLabel: string;
  language: string;
  content: string;
}

export const SKILL_EXPORT_FILES: SkillExportFile[] = [
  {
    id: 'skill',
    filename: 'SKILL.md',
    pathLabel: 'chatgpt-visual-style/SKILL.md',
    language: 'markdown',
    content: skillMdRaw,
  },
  {
    id: 'tokens',
    filename: 'tokens.css',
    pathLabel: 'chatgpt-visual-style/references/tokens.css',
    language: 'css',
    content: tokensCssRaw,
  },
  {
    id: 'components',
    filename: 'components.md',
    pathLabel: 'chatgpt-visual-style/references/components.md',
    language: 'markdown',
    content: componentsMdRaw,
  },
  {
    id: 'animations',
    filename: 'animations.md',
    pathLabel: 'chatgpt-visual-style/references/animations.md',
    language: 'markdown',
    content: animationsMdRaw,
  },
];
