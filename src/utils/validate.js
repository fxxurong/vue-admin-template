/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
  // str.trim() 去除str字符串两边的空格
  // valid_map.indexof（str）查找str在valid_map中的位置 没有就放回-1
  // 对比返回结果是否大于1 从而判断结果是 还是否
}
