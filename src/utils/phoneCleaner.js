// src/utils/phoneCleaner.js

// Map spoken tokens to digits
const map = {
  zero: '0', oh: '0', o: '0',
  one: '1', two: '2', three: '3',
  four: '4', five: '5', six: '6',
  seven: '7', eight: '8', nine: '9',
  nil: '0',
};

/**
 * Strip everything except number-words and digits,
 * returning a plain string of digits.
 */
export function extractDigits(transcript) {
  return transcript
    .toLowerCase()
    .split(/[\s,.]+/)    // split on spaces, commas or dots
    .reduce((digits, tok) => {
      if (map[tok] !== undefined) return digits + map[tok];
      if (/^[0-9]$/.test(tok))      return digits + tok;
      return digits;
    }, '');
}

/**
 * Format a 10-digit Australian-style number: "04 XXXX XXXX"
 */
export function formatPhoneNumber(digits) {
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 6);
  const part3 = digits.slice(6, 10);
  return [part1, part2, part3].filter(Boolean).join(' ');
}
