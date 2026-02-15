'use strict';

/**
 * Создает новый объект, содержащий только указанные ключи из исходного объекта.
 * Если ключ отсутствует в исходном объекте, он игнорируется.
 *
 * @param {Object} obj - Исходный объект для фильтрации.
 * @param {string[]} keys - Массив ключей, которые нужно сохранить.
 * 
 * @example
 * // returns { a: 1, c: 3 }
 * filterObjectByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * 
 * @returns {Object} Новый объект с отфильтрованными свойствами.
 */
const filterObjectByKeys = (obj, keys) => {
    if (!obj || typeof obj !== 'object' || obj === null) {
        return {};
    }
    if (!Array.isArray(keys)) {
        return {};
    }

    return keys.reduce((newObj, key) => {
        if (Object.hasOwn(obj, key)) {
            newObj[key] = obj[key];
        }
        return newObj;
    }, {});
};