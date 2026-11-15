import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SURFACE_STACK,
  SEMANTIC_ACCENTS,
  COMPONENT_SPECS,
  computeInnerRadius,
  buildButtonSnippet,
  buildAlertSnippet,
  filterComponents,
  MOTION_CURVES,
  computePressScale,
} from './skillData';

test('surface stack includes all four luminance layers', () => {
  assert.equal(SURFACE_STACK.length, 4);
  assert.equal(SURFACE_STACK[0].lightHex, '#ffffff');
  assert.equal(SURFACE_STACK[0].darkHex, '#212121');
});

test('semantic accents cover monochrome primary and status tones', () => {
  const tones = SEMANTIC_ACCENTS.map((a) => a.tone);
  assert.deepEqual(tones, ['primary', 'info', 'success', 'warning', 'danger', 'discovery']);
});

test('nested radius math clamps at zero and subtracts padding cleanly', () => {
  assert.equal(computeInnerRadius(12, 6), 6);
  assert.equal(computeInnerRadius(24, 12), 12);
  assert.equal(computeInnerRadius(6, 10), 0);
});

test('buildButtonSnippet formats props with optional pill attribute', () => {
  const withPill = buildButtonSnippet({
    variant: 'solid',
    color: 'primary',
    size: 'md',
    pill: true,
    label: 'Save changes',
  });
  assert.match(withPill, /variant="solid"/);
  assert.match(withPill, /\bpill\b/);
  assert.match(withPill, /Save changes/);

  const withoutPill = buildButtonSnippet({
    variant: 'outline',
    color: 'secondary',
    size: 'lg',
    pill: false,
    label: 'Cancel',
  });
  assert.doesNotMatch(withoutPill, /\bpill\b/);
});

test('buildAlertSnippet embeds variant, color, and copy', () => {
  const snippet = buildAlertSnippet({
    variant: 'soft',
    tone: 'warning',
    title: 'Quota approaching',
    description: '85% of monthly tokens used.',
  });
  assert.match(snippet, /variant="soft"/);
  assert.match(snippet, /color="warning"/);
  assert.match(snippet, /Quota approaching/);
});

test('filterComponents filters by category and search query', () => {
  const all = filterComponents(COMPONENT_SPECS, '', 'All');
  assert.equal(all.length, COMPONENT_SPECS.length);

  const feedback = filterComponents(COMPONENT_SPECS, '', 'Feedback');
  assert.deepEqual(
    feedback.map((c) => c.id),
    ['alert', 'badge'],
  );

  const composer = filterComponents(COMPONENT_SPECS, 'composer', 'All');
  assert.deepEqual(
    composer.map((c) => c.id),
    ['input-composer'],
  );
});

test('computePressScale adapts press scale by element width', () => {
  assert.equal(computePressScale(36), 0.96);
  assert.equal(computePressScale(120), 0.97);
  assert.equal(computePressScale(200), 0.98);
  assert.equal(computePressScale(420), 0.985);
  assert.equal(computePressScale(720), 0.995);
  assert.equal(MOTION_CURVES.length, 4);
});

