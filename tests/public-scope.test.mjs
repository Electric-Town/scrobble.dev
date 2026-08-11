import assert from 'node:assert/strict';
import test from 'node:test';
import { findScopeHits } from '../scripts/validate-public.mjs';

test('blocks adjacent repository and research vocabulary', () => {
  assert.deepEqual(findScopeHits('A neutral sentence about scrobbling.'), []);
  assert.ok(findScopeHits('An identifier resolution tutorial.').includes('adjacent-problem'));
  assert.ok(findScopeHits('A crosswalk for two providers.').includes('adjacent-domain-term'));
});
