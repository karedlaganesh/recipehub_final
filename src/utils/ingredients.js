const unicodeFractions = {
  '½': 0.5,
  '¼': 0.25,
  '¾': 0.75,
  '⅓': 1 / 3,
  '⅔': 2 / 3,
  '⅛': 0.125,
  '⅜': 0.375,
  '⅝': 0.625,
  '⅞': 0.875,
};

function parseQuantity(value) {
  const normalized = value.trim();
  if (unicodeFractions[normalized]) return unicodeFractions[normalized];
  const mixedUnicode = normalized.match(/^(\d+)\s*([½¼¾⅓⅔⅛⅜⅝⅞])$/);
  if (mixedUnicode) return Number(mixedUnicode[1]) + unicodeFractions[mixedUnicode[2]];
  if (normalized.includes('/')) {
    const [whole, fraction] = normalized.split(/\s+/);
    if (!fraction) {
      const [numerator, denominator] = whole.split('/').map(Number);
      return denominator ? numerator / denominator : Number.NaN;
    }
    const [numerator, denominator] = fraction.split('/').map(Number);
    return denominator ? Number(whole) + numerator / denominator : Number.NaN;
  }
  return Number(normalized);
}

function formatQuantity(value) {
  const rounded = Number(value.toFixed(3));
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  if (fraction < 0.001) return String(whole);
  const fractions = [
    [1 / 8, '⅛'], [1 / 4, '¼'], [1 / 3, '⅓'], [3 / 8, '⅜'],
    [1 / 2, '½'], [5 / 8, '⅝'], [2 / 3, '⅔'], [3 / 4, '¾'], [7 / 8, '⅞'],
  ];
  const nearest = fractions.reduce((best, item) => Math.abs(item[0] - fraction) < Math.abs(best[0] - fraction) ? item : best);
  if (Math.abs(nearest[0] - fraction) < 0.015) return `${whole ? `${whole} ` : ''}${nearest[1]}`;
  return String(rounded);
}

export function scaleIngredientText(ingredient, multiplier) {
  if (typeof ingredient !== 'string' || !Number.isFinite(multiplier) || multiplier <= 0) return ingredient;
  const quantityPattern = '(?:\\d+(?:\\.\\d+)?(?:\\s*\\d+\\/\\d+|\\s*[½¼¾⅓⅔⅛⅜⅝⅞]|\\/\\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞])';
  const match = ingredient.match(new RegExp(`^(\\s*)(${quantityPattern})(?:\\s*[-–]\\s*(${quantityPattern}))?(\\s*)(.*)$`));
  if (!match) return ingredient;
  const [, leadingSpace, first, second, separator, remainder] = match;
  const firstValue = parseQuantity(first);
  const secondValue = second ? parseQuantity(second) : null;
  if (!Number.isFinite(firstValue) || (second && !Number.isFinite(secondValue))) return ingredient;
  const scaledFirst = formatQuantity(firstValue * multiplier);
  const scaledSecond = second ? `-${formatQuantity(secondValue * multiplier)}` : '';
  return `${leadingSpace}${scaledFirst}${scaledSecond}${separator}${remainder}`;
}
