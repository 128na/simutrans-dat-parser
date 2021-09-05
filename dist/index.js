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
define("src/RegExp", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regValueParam = exports.regKeyParam = exports.regKeyParamAll = exports.regParam = exports.regObjSplitter = exports.regSpecial = exports.regNewLine = void 0;
    exports.regNewLine = /\n+/mgi;
    exports.regSpecial = /\s+/gi;
    exports.regObjSplitter = /---+/gi;
    exports.regParam = /^([^=]*)(=> |=)?(.*)?$/i;
    exports.regKeyParamAll = /\[([\w\d-]*)\]/ig;
    exports.regKeyParam = /\[([\w\d-]*)\]/i;
    exports.regValueParam = /[\.,]([-\d]*)/ig;
});
define("src/Key", ["require", "exports", "src/RegExp"], function (require, exports, RegExp_1) {
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
define("src/Value", ["require", "exports", "src/RegExp"], function (require, exports, RegExp_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Value = /** @class */ (function () {
        function Value(original) {
            if (original.startsWith('#')) {
                this._original = original;
                this._val = original;
                this._params = [];
            }
            else {
                this._original = original.replace(RegExp_2.regSpecial, '');
                this._val = this._original.split(".")[0] || "";
                this._params = __spreadArray([], __read(this._original.matchAll(RegExp_2.regValueParam)), false).map(function (p) { return parseInt(p[1], 10) || 0; });
            }
        }
        return Value;
    }());
    exports.default = Value;
});
define("src/Param", ["require", "exports", "src/Key", "src/Value", "src/RegExp"], function (require, exports, Key_1, Value_1, RegExp_3) {
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
                    .match(RegExp_3.regParam) || [];
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
define("src/Sort", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sortForParam = void 0;
    // datテキストソート基準
    var sortForParam = function (a, b) {
        var _a = __read([
            a.isComment ? SORT_KEYS.comment : SORT_KEYS[a.keyVal] || SORT_KEYS.unknown,
            b.isComment ? SORT_KEYS.comment : SORT_KEYS[b.keyVal] || SORT_KEYS.unknown
        ], 2), oa = _a[0], ob = _a[1];
        return oa - ob;
    };
    exports.sortForParam = sortForParam;
    // dat書き出し時の項目ソート順定義
    var SORT_KEYS = {
        // コメント
        comment: 0,
        // 不明
        unknown: 10000,
        // 一般
        obj: 1,
        name: 2,
        copyright: 3,
        intro_month: 10,
        intro_year: 11,
        retire_month: 20,
        retire_year: 21,
        // 金額関係
        cost: 100,
        maintenance: 101,
        runningcost: 102,
        // 建物
        type: 1000,
        dims: 1010,
        level: 1020,
        passengers: 1030,
        location: 1040,
        enables_pax: 1050,
        enables_post: 1051,
        enables_ware: 1052,
        extension_building: 1060,
        needs_ground: 1070,
        noconstruction: 1080,
        noinfo: 1090,
        allow_underground: 1110,
        build_time: 1120,
        chance: 1130,
        clusters: 1140,
        hq_level: 1150,
        // 工場
        distributionweight: 2000,
        productivity: 2010,
        range: 2020,
        inputgood: 2030,
        inputcapacity: 2031,
        inputfactor: 2032,
        inputsupplier: 2033,
        outputgood: 2040,
        outputcapacity: 2041,
        outputfactor: 2042,
        pax_level: 2050,
        expand_probability: 2070,
        expand_minimum: 2071,
        expand_range: 2072,
        expand_times: 2073,
        electricity_boost: 2080,
        passenger_boost: 2081,
        mail_boost: 2082,
        electricity_amount: 2090,
        passenger_demand: 2100,
        mail_demand: 2101,
        smoke: 2110,
        smoketile: 2111,
        smokeoffset: 2112,
        smokespeed: 2113,
        fields: 2120,
        has_snow: 2121,
        min_fields: 2122,
        max_fields: 2123,
        production_per_field: 2124,
        probability_to_spawn: 2125,
        storage_capacity: 2126,
        spawn_weight: 2127,
        start_fields: 2128,
        // 車両
        waytype: 3000,
        engine_type: 3010,
        freight: 3020,
        payload: 3030,
        speed: 3040,
        gear: 3050,
        weight: 3060,
        power: 3070,
        loading_time: 3080,
        length: 3090,
        sound: 3100,
        constraint: 3110,
        freightimagetype: 3120,
        // 信号
        min_speed: 4000,
        single_way: 4010,
        free_route: 4020,
        is_private: 4030,
        is_signal: 4040,
        is_presignal: 4050,
        is_longblocksignal: 4060,
        is_prioritysignal: 4070,
        end_of_choose: 4080,
        offset_left: 4090,
        // 軌道
        system_type: 5000,
        topspeed: 5010,
        draw_as_ding: 5020,
        max_weight: 5030,
        max_height: 5040,
        max_length: 5050,
        own_waytype: 5060,
        pillar_asymmetric: 5070,
        pillar_distance: 5080,
        // 木
        height: 6000,
        seasons: 6010,
        // 貨物
        metric: 7000,
        catg: 7010,
        value: 7020,
        speed_bonus: 7030,
        weight_per_unit: 7040,
        mapcolor: 7050,
        // その他
        trees_on_top: 8000,
        climates: 8010,
        // カーソル・アイコン
        cursor: 90000,
        icon: 90010,
        // 画像
        image: 90100,
        backimage: 90101,
        frontimage: 90102,
        emptyimage: 90103,
        freightimage: 90104,
        // 斜め
        diagonal: 90200,
        backdiagonal: 90201,
        frontdiagonal: 90202,
        // 傾斜
        imageup: 90300,
        backimageup: 90301,
        frontimageup: 90302,
        imageup2: 90310,
        backimageup2: 90311,
        frontimageup2: 90312,
        // 橋
        backimage2: 90401,
        frontimage2: 90402,
        backramp: 90411,
        frontramp: 90412,
        backramp2: 90421,
        frontramp2: 90422,
        backstart: 90431,
        frontstart: 90432,
        backstart2: 90441,
        frontstart2: 90442,
        backpillar: 90451,
        frontpillar: 90452,
        backpillar2: 90461,
        frontpillar2: 90462,
        // 踏切
        openimage: 90500,
        closedimage: 90501,
        front_openimage: 90510,
        front_closedimage: 90511,
    };
});
define("src/Obj", ["require", "exports", "src/Param", "src/RegExp", "src/Sort"], function (require, exports, Param_1, RegExp_4, Sort_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Param_1 = __importDefault(Param_1);
    var Obj = /** @class */ (function () {
        function Obj(original, line) {
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
            var keyParams = __spreadArray([], __read(key.matchAll(RegExp_4.regKeyParamAll)), false).map(function (p) { return p[1] || ""; });
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
define("src/Dat", ["require", "exports", "src/Obj", "src/RegExp"], function (require, exports, Obj_1, RegExp_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dat = void 0;
    Obj_1 = __importDefault(Obj_1);
    var Dat = /** @class */ (function () {
        function Dat(original) {
            var line = 1;
            this._objs = original
                .replace(/\r\n/gi, "\n") // win CRLF -> LF
                .replace(/\r/gi, "\n") // mac CR -> LF
                .replace(RegExp_5.regObjSplitter, '---').split('---\n') // 区切り文字の統一
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
                .replace(RegExp_5.regNewLine, '\n');
        };
        return Dat;
    }());
    exports.Dat = Dat;
});
