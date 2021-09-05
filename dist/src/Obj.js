var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./Param", "./RegExp", "./Sort"], function (require, exports, Param_1, RegExp_1, Sort_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Param_1 = __importDefault(Param_1);
    var Obj = /** @class */ (function () {
        function Obj(original, line) {
            if (line === void 0) { line = 0; }
            this._line = line;
            this._params = original
                .split("\n")
                .map(function (l) { return new Param_1.default(l); });
        }
        Object.defineProperty(Obj.prototype, "firstLine", {
            get: function () {
                return this._line;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "lastLine", {
            get: function () {
                return this._line + this._params.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "obj", {
            get: function () {
                var _a;
                return (_a = this.findParam('obj')) === null || _a === void 0 ? void 0 : _a.valueVal;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "name", {
            get: function () {
                var _a;
                return (_a = this.findParam('name')) === null || _a === void 0 ? void 0 : _a.valueVal;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "comments", {
            get: function () {
                return this._params.filter(function (p) { return p.isComment; });
            },
            enumerable: false,
            configurable: true
        });
        Obj.prototype.updateFromString = function (original) {
            this._params = original
                .split("\n")
                .map(function (l) { return new Param_1.default(l); });
        };
        Obj.prototype.updateOrCreate = function (key, value, operator) {
            if (operator === void 0) { operator = '='; }
            var param = this.findParam(key);
            if (param) {
                param.value = value;
                param._operator = operator;
            }
            else {
                this.updateFromString(this.toString() + "\n" + key + operator + value);
            }
        };
        Obj.prototype.deleteByKeyVal = function (keyVal) {
            var keyParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                keyParams[_i - 1] = arguments[_i];
            }
            this._params = this._params
                .filter(function (p) { return p.keyVal !== keyVal || !keyParams.every(function (kp, i) { return (kp.includes(p.keyParams[i])); }); });
        };
        /**
         * 指定キー値を含むParamを探す
         */
        Obj.prototype.findParamsByKeyVal = function (keyVal) {
            return this._params.filter(function (p) { return p.keyVal === keyVal; });
        };
        /**
         * 指定キーに一致するParamを探す
         */
        Obj.prototype.findParam = function (key) {
            return this._params.find(function (p) { return p.key === key; });
        };
        /**
         * 指定キーっぽいやつを探す
         * hoge[0][1][2] -> hoge[0][1][2][0][0][0], hoge[0][1][2][0][0], hoge[0][1][2][0], hoge[0][1][2], hoge[1][2], hoge[2]
         */
        Obj.prototype.findParamLike = function (key) {
            var keyParams = __spreadArray([], __read(key.matchAll(RegExp_1.regKeyParamAll)), false).map(function (p) { return p[1] || ""; });
            var last = keyParams.length - keyParams.slice().reverse().findIndex(function (p) { return p !== '0'; });
            var keyPattern = key.split('[0]')[0];
            for (var count = 0; count <= 6 - last; count++) {
                var param = this.findParam(keyPattern);
                if (param) {
                    return param;
                }
                keyPattern += '[0]';
            }
        };
        Obj.prototype.findMaxParamKeyVal = function (keyVals, index, defaultValue) {
            var _this = this;
            if (defaultValue === void 0) { defaultValue = 1; }
            var params = keyVals.flatMap(function (keyVal) { return _this.findParamsByKeyVal(keyVal); });
            return params.reduce(function (curr, param) { return Math.max(curr, Number(param.keyParams[index]) || 0); }, defaultValue);
        };
        Obj.prototype.toString = function () {
            this._params.sort(Sort_1.sortForParam);
            return this._params
                .filter(function (p) { return !p.isEmpty; })
                .map(function (p) { return p.toString(); })
                .join("\n");
        };
        return Obj;
    }());
    exports.default = Obj;
});
