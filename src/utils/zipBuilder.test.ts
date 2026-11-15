import assert from 'node:assert/strict';
import test from 'node:test';
import { buildZipArchive, crc32 } from './zipBuilder.ts';

test('crc32 computes standard IEEE 802.3 checksum for "123456789"', () => {
  const bytes = new TextEncoder().encode('123456789');
  assert.equal(crc32(bytes), 0xcbf43926);
});

test('buildZipArchive produces valid ZIP local header, central directory, and EOCD', () => {
  const archive = buildZipArchive([
    { path: 'chatgpt-visual-style/SKILL.md', content: '# Skill\n' },
    { path: 'chatgpt-visual-style/references/tokens.css', content: ':root {}\n' },
  ]);

  const view = new DataView(archive.buffer, archive.byteOffset, archive.byteLength);

  // Local file header signature PK\x03\x04
  assert.equal(view.getUint32(0, true), 0x04034b50);

  // End of central directory signature at the tail (22 bytes)
  const eocdOffset = archive.length - 22;
  assert.equal(view.getUint32(eocdOffset, true), 0x06054b50);
  assert.equal(view.getUint16(eocdOffset + 8, true), 2);
  assert.equal(view.getUint16(eocdOffset + 10, true), 2);

  // Contains both file paths
  const decoded = new TextDecoder().decode(archive);
  assert.ok(decoded.includes('chatgpt-visual-style/SKILL.md'));
  assert.ok(decoded.includes('chatgpt-visual-style/references/tokens.css'));
});
