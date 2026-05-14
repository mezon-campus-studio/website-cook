/**
 * Vietnamese text normalization utilities.
 *
 * Provides accent removal and normalization so that
 * "thit bo" can match "Thịt bò".
 */

/**
 * Remove Vietnamese diacritical marks (accents) from a string.
 *
 * Examples:
 *   removeVietnameseAccents('Thịt bò')  => 'thit bo'
 *   removeVietnameseAccents('Cá hồi')   => 'ca hoi'
 *
 * @param {string} str - Input string.
 * @returns {string} Lowercased ASCII-only version of the input.
 */
function removeVietnameseAccents(str) {
  if (!str) return '';

  // Mapping of Vietnamese characters to their ASCII equivalents
  const accentsMap = [
    { base: 'a', letters: /[àáạảãâầấậẩẫăằắặẳẵ]/g },
    { base: 'e', letters: /[èéẹẻẽêềếệểễ]/g },
    { base: 'i', letters: /[ìíịỉĩ]/g },
    { base: 'o', letters: /[òóọỏõôồốộổỗơờớợởỡ]/g },
    { base: 'u', letters: /[ùúụủũưừứựửữ]/g },
    { base: 'y', letters: /[ỳýỵỷỹ]/g },
    { base: 'd', letters: /[đ]/g }
  ];

  let result = str.toLowerCase();

  for (const { base, letters } of accentsMap) {
    result = result.replace(letters, base);
  }

  return result.trim();
}

/**
 * Normalize a Vietnamese string for comparison/searching.
 * Lowercases AND removes accents.
 *
 * @param {string} str
 * @returns {string}
 */
function normalizeVietnamese(str) {
  return removeVietnameseAccents(str);
}

module.exports = { removeVietnameseAccents, normalizeVietnamese };
