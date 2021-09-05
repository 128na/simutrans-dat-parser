import { regSpecial, regValueParam } from "./RegExp";

export default class Value {
  _original: string;
  _val: string;
  _params: number[];

  constructor(original: string) {
    if (original.startsWith('#')) {
      this._original = original;
      this._val = original;
      this._params = [];
    } else {
      this._original = original.replace(regSpecial, '')
      this._val = this._original.split(".")[0] || "";
      this._params = [...this._original.matchAll(regValueParam)].map(p => parseInt(p[1], 10) || 0);
    }
  }
}
