import Obj from "./Obj";
import { regNewLine, regObjSplitter } from "./RegExp";

export class Dat {
  _objs: Obj[];

  constructor(original: string) {
    let line = 1;
    this._objs = original
      .replace(/\r\n/gi, "\n") // win CRLF -> LF
      .replace(/\r/gi, "\n") // mac CR -> LF
      .replace(regObjSplitter, '---').split('---\n') // 区切り文字の統一
      .filter(l => l)
      .map(o => {
        const obj = new Obj(o, line);
        line = obj.lastLine;
        return obj;
      });
  }

  get objs(): Obj[] {
    return this._objs;
  }

  findObjs(key: string, value: string): Obj[] {
    return this._objs
      .filter(o => o.findParam(key)?.value === value);
  }

  toString(): string {
    return this._objs
      .map(o => o.toString())
      .join('\n---\n')
      .replace(regNewLine, '\n');
  }
}
