var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./Key", "./Value", "./RegExp"], function (require, exports, Key_1, Value_1, RegExp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Key_1 = __importDefault(Key_1);
    Value_1 = __importDefault(Value_1);
    /**
     * dat記述の1行
     * foo=bar
     */
    var Param = /** @class */ (function () {
        function Param(original) {
            if (original.startsWith('#')) {
                this._key = new Key_1.default("");
                this._operator = "";
                this._value = new Value_1.default(original || "");
            }
            else {
                var tmp = original
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
        Object.defineProperty(Param.prototype, "key", {
            get: function () {
                return this._key._original;
            },
            set: function (key) {
                this._key = new Key_1.default(key);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "value", {
            get: function () {
                return this._value._original;
            },
            set: function (value) {
                this._value = new Value_1.default(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "keyVal", {
            get: function () {
                return this._key._val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "keyParams", {
            get: function () {
                return this._key._params;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "keyParam", {
            get: function () {
                return this._key._params.join(',');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "valueVal", {
            get: function () {
                return this._value._val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "valueParams", {
            get: function () {
                return this._value._params;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "valueParam", {
            get: function () {
                return this._value._params.join(',');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "isEmpty", {
            get: function () {
                return !this.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "isComment", {
            get: function () {
                return this.valueVal.startsWith('#');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Param.prototype, "isSplit", {
            get: function () {
                return this.valueVal.startsWith('---');
            },
            enumerable: false,
            configurable: true
        });
        Param.prototype.toString = function () {
            return "" + this.key + this._operator + this.value;
        };
        return Param;
    }());
    exports.default = Param;
});
