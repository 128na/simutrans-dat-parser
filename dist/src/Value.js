"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegExp_1 = require("./RegExp");
class Value {
    constructor(original) {
        if (original.startsWith('#') || original.startsWith('---')) {
            this._original = original;
            this._val = original;
            this._params = [];
        }
        else {
            this._original = original.replace(RegExp_1.regSpecial, '');
            const tmp = this._original.match(RegExp_1.regValueParam) || [];
            this._val = tmp[1] || this._original;
            this._params = [tmp[2], tmp[3], tmp[5], tmp[6]].filter(p => p !== undefined).map(p => parseInt(p, 10) || 0);
        }
    }
}
exports.default = Value;
