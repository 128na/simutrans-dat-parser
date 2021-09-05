import { regKeyParamAll, regSpecial } from "./RegExp";

export default class Key {
  _original: string;
  _val: string;
  _params: string[];

  constructor(original: string) {
    this._original = original.replace(regSpecial, '')
    this._val = this._original.split("[")[0] || "";
    this._params = [...this._original.matchAll(regKeyParamAll)].map(p => p[1] || "");
  }
}
