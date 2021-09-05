"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegExp_1 = require("./RegExp");
class Value {
    constructor(original) {
        if (original.startsWith('#')) {
            this._original = original;
            this._val = original;
            this._params = [];
        }
        else {
            this._original = original.replace(RegExp_1.regSpecial, '');
            this._val = this._original.split(".")[0] || "";
            this._params = [...this._original.matchAll(RegExp_1.regValueParam)].map(p => parseInt(p[1], 10) || 0);
        }
    }
}
exports.default = Value;
