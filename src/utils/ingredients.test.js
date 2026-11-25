import test from 'node:test';
import assert from 'node:assert/strict';
import { scaleIngredientText } from './ingredients.js';

test('scales mixed fraction quantities while preserving ingredient units', () => {
  assert.equal(scaleIngredientText('1 1/2 cups flour', 2), '3 cups flour');
});

test('scales unicode fractions and leading quantities without whitespace', () => {
  assert.equal(scaleIngredientText('½tsp salt', 2), '1tsp salt');
  assert.equal(scaleIngredientText('1½ cups milk', 2), '3 cups milk');
});

test('scales both ends of a quantity range', () => {
  assert.equal(scaleIngredientText('1-2 cloves garlic', 2), '2-4 cloves garlic');
});

test('leaves non-quantity ingredient descriptions unchanged', () => {
  assert.equal(scaleIngredientText('salt to taste', 2), 'salt to taste');
});
