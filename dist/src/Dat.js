var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./Obj", "./RegExp"], function (require, exports, Obj_1, RegExp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Obj_1 = __importDefault(Obj_1);
    var Dat = /** @class */ (function () {
        function Dat(original) {
            var line = 1;
            this._objs = original
                .replace(/\r\n/gi, "\n") // win CRLF -> LF
                .replace(/\r/gi, "\n") // mac CR -> LF
                .replace(RegExp_1.regObjSplitter, '---').split('---\n') // 区切り文字の統一
                .filter(function (l) { return l; })
                .map(function (o) {
                var obj = new Obj_1.default(o, line);
                line = obj.lastLine;
                return obj;
            });
        }
        Object.defineProperty(Dat.prototype, "objs", {
            get: function () {
                return this._objs;
            },
            enumerable: false,
            configurable: true
        });
        Dat.prototype.findObjs = function (key, value) {
            return this._objs
                .filter(function (o) { var _a; return ((_a = o.findParam(key)) === null || _a === void 0 ? void 0 : _a.value) === value; });
        };
        Dat.prototype.toString = function () {
            return this._objs
                .map(function (o) { return o.toString(); })
                .join('\n---\n')
                .replace(RegExp_1.regNewLine, '\n');
        };
        return Dat;
    }());
    exports.default = Dat;
});
