import Value from "../src/Value";

const imageData = 'example.1.2,3,4';
const commentData = '# example';

test('value original', () => {
  expect((new Value(imageData))._original).toEqual(imageData);
});

test('value val', () => {
  expect((new Value(imageData))._val).toEqual('example');
});

test('value params', () => {
  expect((new Value(imageData))._params).toEqual([1, 2, 3, 4]);
});

test('comment value', () => {
  expect((new Value(commentData))._val).toEqual(commentData);
});

test('value with directory', () => {
  expect((new Value('../../example.1.2'))._params).toEqual([1, 2]);
});

test('value with offset', () => {
  expect((new Value('../../example.1.2,-1,-2'))._params).toEqual([1, 2, -1, -2]);
});
