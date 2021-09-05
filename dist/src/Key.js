"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegExp_1 = require("./RegExp");
class Key {
    constructor(original) {
        this._original = original.replace(RegExp_1.regSpecial, '');
        this._val = this._original.split("[")[0] || "";
        this._params = [...this._original.matchAll(RegExp_1.regKeyParamAll)].map(p => p[1] || "");
    }
}
exports.default = Key;
