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
define(["require", "exports", "./RegExp"], function (require, exports, RegExp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Key = /** @class */ (function () {
        function Key(original) {
            this._original = original.replace(RegExp_1.regSpecial, '');
            this._val = this._original.split("[")[0] || "";
            this._params = __spreadArray([], __read(this._original.matchAll(RegExp_1.regKeyParamAll)), false).map(function (p) { return p[1] || ""; });
        }
        return Key;
    }());
    exports.default = Key;
});
