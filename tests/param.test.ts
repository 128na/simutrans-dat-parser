import Key from "../src/Key";
import Param from "../src/Param";
import Value from "../src/Value";

const data = 'image[0][1][2][3][4][5]=example.1.2,3,4';

test('param operator', () => {
  expect((new Param(data))._operator).toEqual('=');
});

test('param _key', () => {
  expect((new Param(data))._key).toBeInstanceOf(Key);
});

test('param _value', () => {
  expect((new Param(data))._value).toBeInstanceOf(Value);
});


test('param getter key', () => {
  expect((new Param(data)).key).toEqual('image[0][1][2][3][4][5]');
});
test('param getter keyVal', () => {
  expect((new Param(data)).keyVal).toEqual('image');
});
test('param getter keyParams', () => {
  expect((new Param(data)).keyParams).toEqual(['0', '1', '2', '3', '4', '5']);
});
test('param getter keyParam', () => {
  expect((new Param(data)).keyParam).toEqual('0,1,2,3,4,5');
});

test('param getter value', () => {
  expect((new Param(data)).value).toEqual('example.1.2,3,4');
});
test('param getter valueVal', () => {
  expect((new Param(data)).valueVal).toEqual('example');
});
test('param getter valueParams', () => {
  expect((new Param(data)).valueParams).toEqual([1, 2, 3, 4]);
});
test('param getter valueParam', () => {
  expect((new Param(data)).valueParam).toEqual('1,2,3,4');
});

test('param getter isEmpty', () => {
  expect((new Param(data)).isEmpty).toBeFalsy();
  expect((new Param('')).isEmpty).toBeTruthy();
});

test('param getter isComment', () => {
  expect((new Param(data)).isComment).toBeFalsy();
  expect((new Param('# example')).isComment).toBeTruthy();
});

test('param getter isSplit', () => {
  expect((new Param(data)).isSplit).toBeFalsy();
  expect((new Param('--- example')).isSplit).toBeTruthy();
});

test('param toString', () => {
  expect((new Param(data)).toString()).toEqual(data);
});

