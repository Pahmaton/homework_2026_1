'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Возвращает пустой объект, если массив ключей пуст', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = [];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Результат должен быть пустым объектом {}');
    });

    QUnit.test('Возвращает пустой объект, если исходный объект пуст', (assert) => {
        const originalObject = {};
        const keysToFilter = ['a', 'b'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, {}, 'Результат должен быть пустым объектом, так как ключей нет в источнике');
    });

    QUnit.test('Сохраняет ссылки на вложенные объекты', (assert) => {
        const nestedObj = { x: 10 };
        const originalObject = { a: 1, b: nestedObj };
        const keysToFilter = ['b'];
        
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { x: 10 } }, 'Структура объекта верна');
        
        assert.strictEqual(result.b, originalObject.b, 'Вложенный объект должен быть скопирован по ссылке');
        
        nestedObj.x = 20;
        assert.strictEqual(result.b.x, 20, 'Изменение исходного вложенного объекта должно отражаться в результате');
    });

    QUnit.test('Возвращает пустой объект, если вместо объекта передан null', (assert) => {
        const result = filterObjectByKeys(null, ['a']);
        assert.deepEqual(result, {}, 'Должен вернуть {} при null');
    });

    QUnit.test('Возвращает пустой объект, если вместо объекта undefined', (assert) => {
        const result = filterObjectByKeys(undefined, ['a']);
        assert.deepEqual(result, {}, 'Должен вернуть {} при undefined');
    });

    QUnit.test('Возвращает пустой объект, если передана строка вместо объекта', (assert) => {
        const result = filterObjectByKeys('not an object', ['a']);
        assert.deepEqual(result, {}, 'Должен вернуть {} при неверном типе первого аргумента');
    });

    QUnit.test('Возвращает пустой объект, если keys не является массивом', (assert) => {
        const originalObject = { a: 1 };
        const result = filterObjectByKeys(originalObject, 'not-an-array');
        assert.deepEqual(result, {}, 'Должен вернуть {}, если keys не массив');
    });
    
    QUnit.test('Возвращает пустой объект, если keys равен null', (assert) => {
        const originalObject = { a: 1 };
        const result = filterObjectByKeys(originalObject, null);
        assert.deepEqual(result, {}, 'Должен вернуть {}, если keys is null');
    });
});
