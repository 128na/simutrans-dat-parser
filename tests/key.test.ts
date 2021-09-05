import Key from "../src/Key";

const data = 'image[0][1][2][3][4][5]';

test('key original', () => {
  expect((new Key(data))._original).toEqual(data);
});

test('key val', () => {
  expect((new Key(data))._val).toEqual('image');
});

test('key params', () => {
  expect((new Key(data))._params).toEqual(['0', '1', '2', '3', '4', '5']);
});
