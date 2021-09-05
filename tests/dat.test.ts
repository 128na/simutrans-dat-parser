import Dat from '../src/Dat';

const data = `obj=way
name=example_name_1
---
obj=way
name=example_name_2`;

test('dat getter objs', () => {
  expect((new Dat(data)).objs).toHaveLength(2);
});

test('dat findObjs', () => {
  expect((new Dat(data)).findObjs('name', 'example_name_2')).toHaveLength(1);
});

test('dat toString', () => {
  expect((new Dat(data)).toString()).toEqual(data);
});
