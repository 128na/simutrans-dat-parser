"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Param_1 = __importDefault(require("./Param"));
const RegExp_1 = require("./RegExp");
const Sort_1 = require("./Sort");
class Obj {
    constructor(original, line = 0) {
        this._line = line;
        this._params = original
            .split("\n")
            .map(l => new Param_1.default(l));
    }
    get firstLine() {
        return this._line;
    }
    get lastLine() {
        return this._line + this._params.length;
    }
    get obj() {
        var _a;
        return (_a = this.findParam('obj')) === null || _a === void 0 ? void 0 : _a.valueVal;
    }
    get name() {
        var _a;
        return (_a = this.findParam('name')) === null || _a === void 0 ? void 0 : _a.valueVal;
    }
    get comments() {
        return this._params.filter(p => p.isComment);
    }
    updateFromString(original) {
        this._params = original
            .split("\n")
            .map(l => new Param_1.default(l));
    }
    updateOrCreate(key, value, operator = '=') {
        const param = this.findParam(key);
        if (param) {
            param.value = value;
            param._operator = operator;
        }
        else {
            this.updateFromString(`${this.toString()}\n${key}${operator}${value}`);
        }
    }
    deleteByKeyVal(keyVal, ...keyParams) {
        this._params = this._params
            .filter(p => p.keyVal !== keyVal || !keyParams.every((kp, i) => (kp.includes(p.keyParams[i]))));
    }
    /**
     * 指定キー値を含むParamを探す
     */
    findParamsByKeyVal(keyVal) {
        return this._params.filter(p => p.keyVal === keyVal);
    }
    /**
     * 指定キーに一致するParamを探す
     */
    findParam(key) {
        return this._params.find(p => p.key === key);
    }
    /**
     * 指定キーっぽいやつを探す
     * hoge[0][1][2] -> hoge[0][1][2][0][0][0], hoge[0][1][2][0][0], hoge[0][1][2][0], hoge[0][1][2], hoge[1][2], hoge[2]
     */
    findParamLike(key) {
        const keyParams = [...key.matchAll(RegExp_1.regKeyParamAll)].map(p => p[1] || "");
        const last = keyParams.length - keyParams.slice().reverse().findIndex(p => p !== '0');
        let keyPattern = key.split('[0]')[0];
        for (let count = 0; count <= 6 - last; count++) {
            const param = this.findParam(keyPattern);
            if (param) {
                return param;
            }
            keyPattern += '[0]';
        }
    }
    findMaxParamKeyVal(keyVals, index, defaultValue = 1) {
        const params = keyVals.flatMap(keyVal => this.findParamsByKeyVal(keyVal));
        return params.reduce((curr, param) => Math.max(curr, Number(param.keyParams[index]) || 0), defaultValue);
    }
    toString() {
        this._params.sort(Sort_1.sortForParam);
        return this._params
            .filter(p => !p.isEmpty)
            .map(p => p.toString())
            .join("\n");
    }
}
exports.default = Obj;
