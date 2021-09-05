"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Obj_1 = __importDefault(require("./Obj"));
const RegExp_1 = require("./RegExp");
class Dat {
    constructor(original) {
        let line = 1;
        this._objs = original
            .replace(/\r\n/gi, "\n") // win CRLF -> LF
            .replace(/\r/gi, "\n") // mac CR -> LF
            .replace(RegExp_1.regObjSplitter, '---').split('---\n') // 区切り文字の統一
            .filter(l => l)
            .map(o => {
            const obj = new Obj_1.default(o, line);
            line = obj.lastLine;
            return obj;
        });
    }
    get objs() {
        return this._objs;
    }
    findObjs(key, value) {
        return this._objs
            .filter(o => { var _a; return ((_a = o.findParam(key)) === null || _a === void 0 ? void 0 : _a.value) === value; });
    }
    toString() {
        return this._objs
            .map(o => o.toString())
            .join('\n---\n')
            .replace(RegExp_1.regNewLine, '\n');
    }
}
exports.default = Dat;
