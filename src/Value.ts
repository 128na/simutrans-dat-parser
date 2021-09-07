import { regValueParam, regSpecial } from "./RegExp";

export default class Value {
  _original: string;
  _val: string;
  _params: number[];

  constructor(original: string) {
    if (original.startsWith('#') || original.startsWith('---')) {
      this._original = original;
      this._val = original;
      this._params = [];
    } else {
      this._original = original.replace(regSpecial, '');
      const tmp = this._original.match(regValueParam) || [];
      this._val = tmp[1] || this._original;
      this._params = [tmp[2], tmp[3], tmp[5], tmp[6]].filter(p => p !== undefined).map(p => parseInt(p, 10) || 0);
    }

  }
}
