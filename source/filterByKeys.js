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
const filterObjectByKeys = function (obj, keys) {
    if (!obj || typeof obj !== 'object' || obj === null) {
        return {};
    }
    if (!Array.isArray(keys)) {
        return {};
    }

    return keys.reduce((new_obj, key) => {
        if (key in obj) {
            new_obj[key] = obj[key];
        }
        return new_obj;
    }, {});
};