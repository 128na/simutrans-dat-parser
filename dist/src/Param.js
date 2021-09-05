"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(require("./Key"));
const Value_1 = __importDefault(require("./Value"));
const RegExp_1 = require("./RegExp");
/**
 * dat記述の1行
 * foo=bar
 */
class Param {
    constructor(original) {
        if (original.startsWith('#')) {
            this._key = new Key_1.default("");
            this._operator = "";
            this._value = new Value_1.default(original || "");
        }
        else {
            const tmp = original
                .split('#')[0] // 末尾コメントを削除
                .match(RegExp_1.regParam) || [];
            // フォーマット不一致なら値として処理する（コメント行）
            if (!tmp[2]) {
                this._key = new Key_1.default("");
                this._operator = "";
                this._value = new Value_1.default(tmp[1] || "");
            }
            else {
                this._key = new Key_1.default((tmp[1] || "").toLowerCase());
                this._operator = tmp[2] || "";
                this._value = new Value_1.default(tmp[3] || "");
            }
        }
    }
    get key() {
        return this._key._original;
    }
    set key(key) {
        this._key = new Key_1.default(key);
    }
    get value() {
        return this._value._original;
    }
    set value(value) {
        this._value = new Value_1.default(value);
    }
    get keyVal() {
        return this._key._val;
    }
    get keyParams() {
        return this._key._params;
    }
    get keyParam() {
        return this._key._params.join(',');
    }
    get valueVal() {
        return this._value._val;
    }
    get valueParams() {
        return this._value._params;
    }
    get valueParam() {
        return this._value._params.join(',');
    }
    get isEmpty() {
        return !this.value;
    }
    get isComment() {
        return this.valueVal.startsWith('#');
    }
    get isSplit() {
        return this.valueVal.startsWith('---');
    }
    toString() {
        return `${this.key}${this._operator}${this.value}`;
    }
}
exports.default = Param;
