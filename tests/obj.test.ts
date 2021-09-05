import Obj from "../src/Obj";

const data = `obj=way
name=example1
copyright=example2
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
waytype=road
cost=123
maintenance=456
topspeed=789
system_type=1
# comment1
cursor=image.0.0
icon=> image.0.0
image[s]=image.0.0
image[w][0]=image.0.0
image[w][1]=image.0.0
image[n]=image.0.0`;

test('obj _line', () => {
  expect((new Obj(data, 0))._line).toEqual(0);
});

test('obj getter firstLine', () => {
  expect((new Obj(data, 123)).firstLine).toEqual(123);
});

test('obj getter lastLine', () => {
  expect((new Obj(data, 123)).lastLine).toEqual(123 + 19);
});

test('obj getter obj', () => {
  expect((new Obj(data, 0)).obj).toEqual('way');
});

test('obj getter obj', () => {
  expect((new Obj(data, 0)).obj).toEqual('way');
});

test('obj getter name', () => {
  expect((new Obj(data, 0)).name).toEqual('example1');
});

test('obj getter comments', () => {
  expect((new Obj(data, 0)).comments).toHaveLength(1);
  expect((new Obj(data, 0)).comments[0].value).toEqual('# comment1');
});

test('obj updateFromString', () => {
  const obj = new Obj(data, 0);
  obj.updateFromString('');
  expect(obj.toString()).toEqual('');
});

test('obj updateOrCreate', () => {
  const obj = new Obj(data, 0);
  obj.updateOrCreate('obj', 'building');
  expect(obj.findParam('obj')?.value).toEqual('building');

  obj.updateOrCreate('test', '1');
  expect(obj.findParam('test')?.value).toEqual('1');
});

test('obj deleteByKeyVal', () => {
  const obj = new Obj(data, 0);
  obj.deleteByKeyVal('image', ['s']);
  expect(obj.findParam('image[s]')).toBeUndefined();
});

test('obj findParamsByKeyVal', () => {
  expect((new Obj(data, 0)).findParamsByKeyVal('image')).toHaveLength(4);
});

test('obj findParam', () => {
  expect((new Obj(data, 0)).findParam('copyright')?.value).toEqual('example2');
});

test('obj findParamLike', () => {
  expect((new Obj(data, 0)).findParamLike('image[w]')?.toString()).toEqual('image[w][0]=image.0.0');
});

test('obj findMaxParamKeyVal', () => {
  expect((new Obj(data, 0)).findMaxParamKeyVal(['image'], 1)).toEqual(1);
});

test('obj toString', () => {
  expect((new Obj('way=road', 0)).toString()).toEqual('way=road');
});
