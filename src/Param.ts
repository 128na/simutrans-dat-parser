import Key from "./Key";
import Value from "./Value";
import { regParam } from "./RegExp";

/**
 * dat記述の1行
 * foo=bar
 */
export default class Param {
  _key: Key;
  _operator: string;
  _value: Value;

  constructor(original: string) {
    if (original.startsWith('#')) {
      this._key = new Key("");
      this._operator = "";
      this._value = new Value(original || "");
    } else {
      const tmp = original
        .split('#')[0]    // 末尾コメントを削除
        .match(regParam) || [];

      // フォーマット不一致なら値として処理する（コメント行）
      if (!tmp[2]) {
        this._key = new Key("");
        this._operator = "";
        this._value = new Value(tmp[1] || "");
      } else {
        this._key = new Key((tmp[1] || "").toLowerCase());
        this._operator = tmp[2] || "";
        this._value = new Value(tmp[3] || "");
      }
    }
  }

  get key(): string {
    return this._key._original;
  }
  set key(key: string) {
    this._key = new Key(key);
  }
  get value(): string {
    return this._value._original;
  }
  set value(value: string) {
    this._value = new Value(value);
  }

  get keyVal(): string {
    return this._key._val;
  }
  get keyParams(): string[] {
    return this._key._params;
  }
  get keyParam(): string {
    return this._key._params.join(',');
  }

  get valueVal(): string {
    return this._value._val;
  }
  get valueParams(): number[] {
    return this._value._params;
  }
  get valueParam(): string {
    return this._value._params.join(',');
  }

  get isEmpty(): boolean {
    return !this.value
  }

  get isComment(): boolean {
    return this.valueVal.startsWith('#');
  }
  get isSplit(): boolean {
    return this.valueVal.startsWith('---');
  }

  toString(): string {
    return `${this.key}${this._operator}${this.value}`;
  }
}
