import Param from "./Param";
import { regKeyParamAll } from "./RegExp";
import { sortForParam } from "./Sort";

export default class Obj {
  _line: number;
  _params: Param[];

  constructor(original: string, line: number) {
    this._line = line;
    this._params = original
      .split("\n")
      .map(l => new Param(l));
  }

  get firstLine(): number {
    return this._line;
  }
  get lastLine(): number {
    return this._line + this._params.length;
  }
  get obj(): string | undefined {
    return this.findParam('obj')?.valueVal;
  }
  get name(): string | undefined {
    return this.findParam('name')?.valueVal;
  }
  get comments(): Param[] {
    return this._params.filter(p => p.isComment);
  }

  updateFromString(original: string) {
    this._params = original
      .split("\n")
      .map(l => new Param(l));
  }
  updateOrCreate(key: string, value: string, operator = '=') {
    const param = this.findParam(key);
    if (param) {
      param.value = value;
      param._operator = operator;
    } else {
      this.updateFromString(`${this.toString()}\n${key}${operator}${value}`);
    }
  }
  deleteByKeyVal(keyVal: string, ...keyParams: [[string]]) {
    this._params = this._params
      .filter(p => p.keyVal !== keyVal || !keyParams.every((kp, i) => (kp.includes(p.keyParams[i]))));
  }

  /**
   * 指定キー値を含むParamを探す
   */
  findParamsByKeyVal(keyVal: string): Param[] {
    return this._params.filter(p => p.keyVal === keyVal)
  }
  /**
   * 指定キーに一致するParamを探す
   */
  findParam(key: string): Param | undefined {
    return this._params.find(p => p.key === key)
  }
  /**
   * 指定キーっぽいやつを探す
   * hoge[0][1][2] -> hoge[0][1][2][0][0][0], hoge[0][1][2][0][0], hoge[0][1][2][0], hoge[0][1][2], hoge[1][2], hoge[2]
   */
  findParamLike(key: string): Param | undefined {
    const keyParams = [...key.matchAll(regKeyParamAll)].map(p => p[1] || "");
    const last = keyParams.length - keyParams.slice().reverse().findIndex(p => p !== '0');

    let keyPattern = key.split('[0]')[0];
    for (let count = 0; count <= 6 - last; count++) {
      const param = this.findParam(keyPattern);
      if (param) {
        return param;
      }
      keyPattern += '[0]';
    }
  }
  findMaxParamKeyVal(keyVals: string[], index: number, defaultValue = 1): number {
    const params = keyVals.flatMap(keyVal => this.findParamsByKeyVal(keyVal));
    return params.reduce((curr, param) => Math.max(curr, Number(param.keyParams[index]) || 0), defaultValue);
  }

  toString(): string {
    this._params.sort(sortForParam);
    return this._params
      .filter(p => !p.isEmpty)
      .map(p => p.toString())
      .join("\n");
  }
}
